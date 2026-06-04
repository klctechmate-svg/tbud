import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";

const app = new Hono();

app.use('*', logger(console.log));

app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

app.get("/make-server-df0cbbe5/health", (c) => {
  return c.json({ status: "ok" });
});

// ─── CONTACT ────────────────────────────────────────────────────────────────

app.post("/make-server-df0cbbe5/contact", async (c) => {
  try {
    const body = await c.req.json();
    const { name, email, phone, service, message } = body;
    if (!name || !email || !service || !message) {
      return c.json({ error: "Missing required fields: name, email, service, message" }, 400);
    }

    const id = crypto.randomUUID();
    const timestamp = new Date().toISOString();
    const key = `contact:${timestamp}:${id}`;
    await kv.set(key, { id, name, email, phone: phone || "", service, message, timestamp, read: false });

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (RESEND_API_KEY) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: "T-Bud Contact Form <onboarding@resend.dev>",
            to: ["klc.techmate@gmail.com"],
            subject: `New Contact Form Submission from ${name}`,
            html: `
              <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; background: #0D1117; color: #ffffff; padding: 32px; border-radius: 12px; border: 1px solid #00D1FF;">
                <h1 style="color: #00D1FF; margin-bottom: 24px;">📬 New Message from T-Bud Website</h1>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr><td style="padding: 8px 0; color: #94A3B8; width: 120px;">Name</td><td style="padding: 8px 0; color: #ffffff; font-weight: 600;">${name}</td></tr>
                  <tr><td style="padding: 8px 0; color: #94A3B8;">Email</td><td style="padding: 8px 0; color: #0EA5E9;">${email}</td></tr>
                  <tr><td style="padding: 8px 0; color: #94A3B8;">Phone</td><td style="padding: 8px 0; color: #ffffff;">${phone || "Not provided"}</td></tr>
                  <tr><td style="padding: 8px 0; color: #94A3B8;">Service</td><td style="padding: 8px 0; color: #ffffff;">${service}</td></tr>
                  <tr><td style="padding: 8px 0; color: #94A3B8; vertical-align: top;">Message</td><td style="padding: 8px 0; color: #ffffff;">${message}</td></tr>
                  <tr><td style="padding: 8px 0; color: #94A3B8;">Submitted</td><td style="padding: 8px 0; color: #94A3B8; font-size: 12px;">${timestamp}</td></tr>
                </table>
                <p style="margin-top: 24px; color: #94A3B8; font-size: 12px;">Sent from T-Bud website contact form</p>
              </div>
            `,
          }),
        });
      } catch (emailErr) {
        console.log(`Email notification failed (non-fatal): ${emailErr}`);
      }
    }

    return c.json({ success: true, id });
  } catch (err) {
    return c.json({ error: `Failed to save contact submission: ${err}` }, 500);
  }
});

app.get("/make-server-df0cbbe5/contacts", async (c) => {
  try {
    const submissions = await kv.getByPrefix("contact:");
    const sorted = submissions.sort((a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    return c.json({ submissions: sorted });
  } catch (err) {
    return c.json({ error: `Failed to retrieve contact submissions: ${err}` }, 500);
  }
});

app.put("/make-server-df0cbbe5/contacts/:id/read", async (c) => {
  try {
    const id = c.req.param("id");
    const submissions = await kv.getByPrefix("contact:");
    const submission = submissions.find((s: any) => s.id === id);
    if (!submission) return c.json({ error: "Submission not found" }, 404);
    const key = `contact:${submission.timestamp}:${id}`;
    await kv.set(key, { ...submission, read: true });
    return c.json({ success: true });
  } catch (err) {
    return c.json({ error: `Failed to update submission: ${err}` }, 500);
  }
});

// ─── USER AUTH ───────────────────────────────────────────────────────────────

app.post("/make-server-df0cbbe5/auth/register", async (c) => {
  try {
    const body = await c.req.json();
    const { lastName, firstName, middleName, birthday, email, password } = body;
    if (!lastName || !firstName || !birthday || !email || !password) {
      return c.json({ error: "Missing required fields." }, 400);
    }

    const existing = await kv.get(`user:${email.toLowerCase()}`);
    if (existing) return c.json({ error: "This email is already registered." }, 409);

    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashedPassword = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");

    const fullName = `${lastName}, ${firstName}${middleName ? " " + middleName : ""}`;
    const user = {
      id: crypto.randomUUID(),
      fullName,
      lastName,
      firstName,
      middleName: middleName || "",
      birthday,
      email: email.toLowerCase(),
      hashedPassword,
      createdAt: new Date().toISOString(),
    };

    await kv.set(`user:${email.toLowerCase()}`, user);
    console.log(`New user registered: ${email}`);

    // ===== RESEND DEBUG START =====
    console.log("RESEND_API_KEY:", !!Deno.env.get("RESEND_API_KEY"));
    // ===== RESEND DEBUG END =====

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (RESEND_API_KEY) {
      console.log("Starting welcome email....");
      try {
        const response = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${RESEND_API_KEY}` },
          body: JSON.stringify({
            from: "T-Bud <onboarding@resend.dev>",
            to: [user.email],
            subject: `Welcome to T-Bud, ${firstName}! 🎉`,
            html: `<div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;background:#0D1117;color:#fff;padding:40px;border-radius:16px;border:1px solid #00D1FF"><div style="text-align:center;margin-bottom:32px"><h1 style="color:#00D1FF;font-size:28px;font-family:'Courier New',monospace">T-Bud</h1><p style="color:#94A3B8;font-size:14px">Your Digital Buddy</p></div><h2 style="color:#fff;font-size:24px;margin-bottom:16px">Welcome aboard, ${firstName}! 👋</h2><p style="color:#94A3B8;line-height:1.7;margin-bottom:24px">Your T-Bud account has been created successfully. We are excited to have you join our growing community of digital learners and creators!</p><div style="background:#060C1A;border-radius:12px;padding:24px;margin-bottom:24px;border:1px solid rgba(0,209,255,0.2)"><h3 style="color:#00D1FF;margin-bottom:16px;font-size:16px">Your Account Details</h3><table style="width:100%"><tr><td style="color:#94A3B8;padding:6px 0;width:120px">Full Name</td><td style="color:#fff;font-weight:600">${fullName}</td></tr><tr><td style="color:#94A3B8;padding:6px 0">Email</td><td style="color:#0EA5E9">${user.email}</td></tr></table></div><div style="background:linear-gradient(135deg,#0EA5E9,#2563EB);border-radius:12px;padding:24px;margin-bottom:24px;text-align:center"><h3 style="color:#fff;margin-bottom:8px">What can you do now?</h3><p style="color:rgba(255,255,255,0.85);font-size:14px;margin-bottom:16px">Explore our services, check out IT projects, and connect with Tio!</p></div><p style="color:#94A3B8;font-size:13px;text-align:center">Questions? Contact us at klc.techmate@gmail.com<br/><span style="color:rgba(148,163,184,0.5)">Copyright 2026 | T-Bud</span></p></div>`,
          }),
        });

        // ===== RESEND RESPONSE DEBUG =====
        const result = await response.text();
        console.log("Resend Status:", response.status);
        console.log("Resend Response:", result);
        // ===== END RESEND RESPONSE DEBUG =====

      } catch (emailErr) {
        console.log("Welcome email failed:", emailErr);
      }
    }

    return c.json({ success: true, name: fullName, email: user.email });
  } catch (err) {
    return c.json({ error: `Registration failed: ${err}` }, 500);
  }
});

app.post("/make-server-df0cbbe5/auth/signin", async (c) => {
  try {
    const body = await c.req.json();
    const { email, password } = body;
    if (!email || !password) return c.json({ error: "Email and password are required." }, 400);

    const user = await kv.get(`user:${email.toLowerCase()}`);
    if (!user) return c.json({ error: "Invalid email or password." }, 401);

    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashedPassword = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");

    if (hashedPassword !== user.hashedPassword) {
      return c.json({ error: "Invalid email or password." }, 401);
    }

    console.log(`User signed in: ${email}`);
    return c.json({ success: true, name: user.fullName, email: user.email });
  } catch (err) {
    return c.json({ error: `Sign in failed: ${err}` }, 500);
  }
});

// ─── COMMISSION ORDERS ───────────────────────────────────────────────────────

app.post("/make-server-df0cbbe5/orders", async (c) => {
  try {
    const body = await c.req.json();
    const { email, service, projectDescription } = body;

    if (!email || !service || !projectDescription) {
      return c.json({ error: "Missing required fields: email, service, projectDescription" }, 400);
    }

    // Verify user exists (logged-in users only)
    const user = await kv.get(`user:${email.toLowerCase()}`);
    if (!user) return c.json({ error: "Unauthorized. Please sign in to place an order." }, 401);

    const orderId = crypto.randomUUID();
    const orderNumber = `TBD-${Date.now().toString().slice(-6)}`;
    const timestamp = new Date().toISOString();

    const order = {
      id: orderId,
      orderNumber,
      userEmail: email.toLowerCase(),
      userName: user.fullName,
      service,
      projectDescription,
      status: "pending",
      timestamp,
    };

    await kv.set(`order:${timestamp}:${orderId}`, order);
    console.log(`New commission order: ${orderNumber} from ${email}`);

    // ─── Send receipt emails ───────────────────────────────────────────────
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (RESEND_API_KEY) {

      const buildReceiptHtml = (forTeam: boolean) => `
        <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;background:#0D1117;color:#fff;padding:40px;border-radius:16px;border:1px solid #00D1FF;">

          <div style="text-align:center;margin-bottom:32px;">
            <h1 style="color:#00D1FF;font-size:28px;font-family:'Courier New',monospace;margin:0;">T-Bud</h1>
            <p style="color:#94A3B8;font-size:13px;margin:4px 0 0;">Your Digital Buddy</p>
          </div>

          <h2 style="color:#ffffff;font-size:22px;margin-bottom:8px;">
            ${forTeam ? "📋 New Commission Order Received" : "🧾 Your Commission Order Receipt"}
          </h2>
          <p style="color:#94A3B8;font-size:14px;line-height:1.6;margin-bottom:28px;">
            ${forTeam
              ? `A new order has been submitted by <strong style="color:#fff;">${user.fullName}</strong>. Review the details below.`
              : `Hi <strong style="color:#fff;">${user.firstName}</strong>! We have received your commission request. Here is a summary of what you submitted.`
            }
          </p>

          <div style="background:#060C1A;border:1px solid rgba(0,209,255,0.3);border-radius:10px;padding:16px 20px;margin-bottom:24px;">
            <span style="color:#94A3B8;font-size:13px;">Order Number</span>
            <span style="color:#00D1FF;font-size:18px;font-family:'Courier New',monospace;font-weight:700;float:right;">${orderNumber}</span>
          </div>

          <div style="background:#060C1A;border-radius:12px;padding:24px;margin-bottom:24px;border:1px solid rgba(255,255,255,0.06);">
            <h3 style="color:#00D1FF;font-size:13px;text-transform:uppercase;letter-spacing:1px;margin:0 0 16px;">Order Details</h3>
            <table style="width:100%;border-collapse:collapse;">
              <tr style="border-bottom:1px solid rgba(255,255,255,0.06);">
                <td style="color:#94A3B8;padding:10px 0;font-size:13px;width:140px;">Client Name</td>
                <td style="color:#fff;padding:10px 0;font-size:14px;font-weight:600;">${user.fullName}</td>
              </tr>
              <tr style="border-bottom:1px solid rgba(255,255,255,0.06);">
                <td style="color:#94A3B8;padding:10px 0;font-size:13px;">Client Email</td>
                <td style="color:#0EA5E9;padding:10px 0;font-size:14px;">${user.email}</td>
              </tr>
              <tr style="border-bottom:1px solid rgba(255,255,255,0.06);">
                <td style="color:#94A3B8;padding:10px 0;font-size:13px;">Service</td>
                <td style="padding:10px 0;">
                  <span style="background:rgba(0,209,255,0.1);color:#00D1FF;padding:3px 10px;border-radius:20px;font-size:12px;font-weight:600;">${service}</span>
                </td>
              </tr>
              <tr style="border-bottom:1px solid rgba(255,255,255,0.06);">
                <td style="color:#94A3B8;padding:10px 0;font-size:13px;">Status</td>
                <td style="padding:10px 0;">
                  <span style="background:rgba(234,179,8,0.15);color:#EAB308;padding:3px 10px;border-radius:20px;font-size:12px;font-weight:600;">Pending Review</span>
                </td>
              </tr>
              <tr style="border-bottom:1px solid rgba(255,255,255,0.06);">
                <td style="color:#94A3B8;padding:10px 0;font-size:13px;">Submitted</td>
                <td style="color:#94A3B8;padding:10px 0;font-size:13px;">${new Date(timestamp).toLocaleString("en-PH", { timeZone: "Asia/Manila", dateStyle: "long", timeStyle: "short" })}</td>
              </tr>
              <tr>
                <td style="color:#94A3B8;padding:12px 0 0;font-size:13px;vertical-align:top;">Project Description</td>
                <td style="color:#fff;padding:12px 0 0;font-size:14px;line-height:1.7;">${projectDescription}</td>
              </tr>
            </table>
          </div>

          ${!forTeam ? `
          <div style="background:linear-gradient(135deg,rgba(14,165,233,0.15),rgba(37,99,235,0.15));border:1px solid rgba(14,165,233,0.3);border-radius:12px;padding:24px;margin-bottom:24px;">
            <h3 style="color:#fff;font-size:15px;margin:0 0 12px;">What happens next?</h3>
            <ul style="color:#94A3B8;font-size:14px;line-height:1.9;margin:0;padding-left:20px;">
              <li>Our team will review your project description.</li>
              <li>We will reach out to you within <strong style="color:#fff;">1–2 business days</strong>.</li>
              <li>We will discuss pricing, timeline, and any clarifications.</li>
            </ul>
          </div>
          ` : ""}

          <p style="color:#94A3B8;font-size:12px;text-align:center;margin-top:8px;">
            Questions? Contact us at <a href="mailto:klc.techmate@gmail.com" style="color:#0EA5E9;text-decoration:none;">klc.techmate@gmail.com</a><br/>
            <span style="color:rgba(148,163,184,0.4);">Copyright 2026 | T-Bud</span>
          </p>

        </div>
      `;

      // 1. Receipt to the user
      try {
        const userRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${RESEND_API_KEY}` },
          body: JSON.stringify({
            from: "T-Bud <onboarding@resend.dev>",
            to: [user.email],
            subject: `Your Commission Order Receipt — ${orderNumber} 🧾`,
            html: buildReceiptHtml(false),
          }),
        });
        const userResult = await userRes.text();
        console.log("Order receipt (user) Status:", userRes.status);
        console.log("Order receipt (user) Response:", userResult);
      } catch (e) {
        console.log("Order receipt to user failed:", e);
      }

      // 2. Notification to the team
      try {
        const teamRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${RESEND_API_KEY}` },
          body: JSON.stringify({
            from: "T-Bud Orders <onboarding@resend.dev>",
            to: ["klc.techmate@gmail.com"],
            subject: `New Commission Order: ${orderNumber} from ${user.fullName}`,
            html: buildReceiptHtml(true),
          }),
        });
        const teamResult = await teamRes.text();
        console.log("Order receipt (team) Status:", teamRes.status);
        console.log("Order receipt (team) Response:", teamResult);
      } catch (e) {
        console.log("Order receipt to team failed:", e);
      }
    }

    return c.json({ success: true, orderId, orderNumber });
  } catch (err) {
    return c.json({ error: `Failed to place order: ${err}` }, 500);
  }
});

app.get("/make-server-df0cbbe5/orders", async (c) => {
  try {
    const orders = await kv.getByPrefix("order:");
    const sorted = orders.sort((a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    return c.json({ orders: sorted });
  } catch (err) {
    return c.json({ error: `Failed to retrieve orders: ${err}` }, 500);
  }
});

app.get("/make-server-df0cbbe5/orders/user/:email", async (c) => {
  try {
    const email = c.req.param("email").toLowerCase();
    const all = await kv.getByPrefix("order:");
    const userOrders = all
      .filter((o: any) => o.userEmail === email)
      .sort((a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    return c.json({ orders: userOrders });
  } catch (err) {
    return c.json({ error: `Failed to retrieve user orders: ${err}` }, 500);
  }
});

app.put("/make-server-df0cbbe5/orders/:id/status", async (c) => {
  try {
    const id = c.req.param("id");
    const { status } = await c.req.json();
    const all = await kv.getByPrefix("order:");
    const order = all.find((o: any) => o.id === id);
    if (!order) return c.json({ error: "Order not found" }, 404);
    const key = `order:${order.timestamp}:${id}`;
    await kv.set(key, { ...order, status });
    return c.json({ success: true });
  } catch (err) {
    return c.json({ error: `Failed to update order status: ${err}` }, 500);
  }
});

// ─── TEAM MEMBERS ────────────────────────────────────────────────────────────

app.get("/make-server-df0cbbe5/team", async (c) => {
  try {
    let members = await kv.getByPrefix("team:");
    if (!members || members.length === 0) {
      const defaults = [
        { id: "1", order: 1, name: "Christian Del Rosario", role: "Creative Director", bio: "Leads the creative vision with expertise in digital design. Passionate about pixel-perfect interfaces and brand storytelling.", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop", skills: [{ name: "Graphic & Creative Design", tier: "high" }, { name: "Brand Identity & Assets", tier: "high" }, { name: "Educational Content", tier: "medium" }], tags: ["UI/UX", "Branding", "Figma", "Adobe Suite"] },
        { id: "2", order: 2, name: "Lea Louela Evangelista", role: "Tech Lead", bio: "Full-stack engineer specializing in modern web technologies. Builds scalable solutions and mentors junior developers.", photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop", skills: [{ name: "Online Business Setup", tier: "high" }, { name: "Platform Integration", tier: "high" }, { name: "Social Media Tech", tier: "medium" }], tags: ["React", "Node.js", "AWS", "TypeScript"] },
        { id: "3", order: 3, name: "Kian Ryle Co", role: "Marketing Specialist", bio: "Digital marketing expert with a data-driven approach. Crafts campaigns that convert and builds communities that engage.", photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop", skills: [{ name: "Social Media & Marketing", tier: "high" }, { name: "Digital Campaign Strategy", tier: "high" }, { name: "Online Business Growth", tier: "medium" }], tags: ["SEO", "Social Media", "Analytics", "Content"] },
      ];
      for (const m of defaults) await kv.set(`team:${m.id}`, m);
      members = defaults;
    }
    members.sort((a: any, b: any) => a.order - b.order);
    return c.json({ members });
  } catch (err) {
    return c.json({ error: `Failed to retrieve team members: ${err}` }, 500);
  }
});

app.post("/make-server-df0cbbe5/team", async (c) => {
  try {
    const body = await c.req.json();
    const id = crypto.randomUUID();
    const member = { ...body, id };
    await kv.set(`team:${id}`, member);
    return c.json({ success: true, member });
  } catch (err) {
    return c.json({ error: `Failed to create team member: ${err}` }, 500);
  }
});

app.put("/make-server-df0cbbe5/team/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    await kv.set(`team:${id}`, { ...body, id });
    return c.json({ success: true });
  } catch (err) {
    return c.json({ error: `Failed to update team member: ${err}` }, 500);
  }
});

app.delete("/make-server-df0cbbe5/team/:id", async (c) => {
  try {
    const id = c.req.param("id");
    await kv.del(`team:${id}`);
    return c.json({ success: true });
  } catch (err) {
    return c.json({ error: `Failed to delete team member: ${err}` }, 500);
  }
});

// ─── SERVICES ────────────────────────────────────────────────────────────────

app.get("/make-server-df0cbbe5/services", async (c) => {
  try {
    let services = await kv.getByPrefix("service:");
    if (!services || services.length === 0) {
      const defaults = [
        { id: "1", order: 1, title: "Graphic & Creative Services", icon: "🎨", description: "Design that stands out — logos, banners, social media graphics and more.", available: true },
        { id: "2", order: 2, title: "Educational & Training Services", icon: "📚", description: "Learn and grow — tutorials, workshops, and training materials.", available: true },
        { id: "3", order: 3, title: "Social Media & Marketing", icon: "📱", description: "Amplify your reach — content strategy, campaigns, and analytics.", available: true },
        { id: "4", order: 4, title: "Online Business Services", icon: "🛒", description: "Scale your store — e-commerce setup, platform integration, and growth.", available: true },
      ];
      for (const s of defaults) await kv.set(`service:${s.id}`, s);
      services = defaults;
    }
    services.sort((a: any, b: any) => a.order - b.order);
    return c.json({ services });
  } catch (err) {
    return c.json({ error: `Failed to retrieve services: ${err}` }, 500);
  }
});

app.post("/make-server-df0cbbe5/services", async (c) => {
  try {
    const body = await c.req.json();
    const id = crypto.randomUUID();
    const service = { ...body, id };
    await kv.set(`service:${id}`, service);
    return c.json({ success: true, service });
  } catch (err) {
    return c.json({ error: `Failed to create service: ${err}` }, 500);
  }
});

app.put("/make-server-df0cbbe5/services/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    await kv.set(`service:${id}`, { ...body, id });
    return c.json({ success: true });
  } catch (err) {
    return c.json({ error: `Failed to update service: ${err}` }, 500);
  }
});

app.delete("/make-server-df0cbbe5/services/:id", async (c) => {
  try {
    const id = c.req.param("id");
    await kv.del(`service:${id}`);
    return c.json({ success: true });
  } catch (err) {
    return c.json({ error: `Failed to delete service: ${err}` }, 500);
  }
});

Deno.serve(app.fetch);
