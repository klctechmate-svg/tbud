import { motion } from "motion/react";
import { Link } from "react-router";
import { TioThumbsUp, TioCoding } from "../components/TioMascot";

const projects = [
  {
    id: 1,
    category: "Automation",
    title: "Product Barcode Generator",
    description: "Instantly generate EAN-13, Code128, and QR barcodes for your products. Supports bulk export for inventory management and e-commerce stores.",
    tags: ["Barcode", "Inventory", "Export"],
    icon: "▦",
    color: "#00D1FF",
    status: "Available",
    features: ["EAN-13 / Code128 / QR", "Bulk CSV import", "PNG/SVG export", "Label printing ready"],
  },
  {
    id: 2,
    category: "Automation",
    title: "Social Media Scheduler",
    description: "Schedule and auto-post content across platforms. Set it once and let automation handle the rest — consistent posting without the manual work.",
    tags: ["Social Media", "Automation", "Scheduling"],
    icon: "📅",
    color: "#6BCB77",
    status: "Available",
    features: ["Multi-platform support", "Calendar view", "Auto-posting", "Analytics tracking"],
  },
  {
    id: 3,
    category: "IT Solution",
    title: "Invoice & Receipt Builder",
    description: "Professional invoice and receipt generator for freelancers and small businesses. Custom branding, tax calculation, and PDF export included.",
    tags: ["Finance", "PDF", "Business"],
    icon: "🧾",
    color: "#FFD93D",
    status: "Available",
    features: ["Custom branding", "Tax calculation", "PDF export", "Client management"],
  },
  {
    id: 4,
    category: "IT Solution",
    title: "QR Code Campaign Tool",
    description: "Create dynamic QR codes linked to landing pages, menus, contact cards, or promotions. Track scans and update destinations without reprinting.",
    tags: ["QR Code", "Marketing", "Tracking"],
    icon: "⬛",
    color: "#FF6B6B",
    status: "Available",
    features: ["Dynamic QR codes", "Scan tracking", "Landing page links", "Custom colors & logo"],
  },
  {
    id: 5,
    category: "Automation",
    title: "Email Automation Toolkit",
    description: "Set up automated email sequences for onboarding, follow-ups, and promotions. Connect to your existing email and start automating in minutes.",
    tags: ["Email", "Automation", "CRM"],
    icon: "📧",
    color: "#A855F7",
    status: "Coming Soon",
    features: ["Drip campaigns", "Trigger-based emails", "Template editor", "Open rate tracking"],
  },
  {
    id: 6,
    category: "IT Solution",
    title: "Basic Inventory System",
    description: "A lightweight web-based inventory tracker for small businesses. Monitor stock levels, set reorder alerts, and generate simple inventory reports.",
    tags: ["Inventory", "Small Business", "Reports"],
    icon: "📦",
    color: "#F97316",
    status: "Coming Soon",
    features: ["Stock tracking", "Reorder alerts", "Category management", "Export to Excel"],
  },
];

const categories = ["All", "Automation", "IT Solution"];

import { useState } from "react";

export function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All" ? projects : projects.filter(p => p.category === activeCategory);

  return (
    <div className="w-full min-h-screen py-20">
      <div style={{ width: "min(1400px, 90%)", margin: "0 auto" }}>

        {/* Header */}
        <div className="text-center mb-16 relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="text-xs text-[#00D1FF] uppercase tracking-widest mb-3 block" style={{ fontFamily: "Inter", fontWeight: 600 }}>
              IT Projects
            </span>
            <h1 className="text-white mb-4" style={{ fontFamily: "Inter", fontWeight: 800, fontSize: "clamp(32px,5vw,52px)", letterSpacing: "-0.02em" }}>
              View Projects
            </h1>
            <p className="text-[#94A3B8] max-w-xl mx-auto text-lg" style={{ fontFamily: "Inter", lineHeight: 1.75 }}>
              Simple, practical IT solutions built for real-world needs — from barcode generators to automation tools.
            </p>
          </motion.div>

          {/* Tio floating top-right */}
          <motion.div className="absolute -top-6 right-0 hidden lg:block"
            animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity }}>
            <TioCoding className="w-20 h-20" />
          </motion.div>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center gap-3 mb-12">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className="px-5 py-2 rounded-lg text-sm font-semibold transition-all"
              style={{
                fontFamily: "Inter",
                background: activeCategory === cat ? "#0EA5E9" : "rgba(0,209,255,0.06)",
                color: activeCategory === cat ? "white" : "#94A3B8",
                border: activeCategory === cat ? "1px solid #0EA5E9" : "1px solid rgba(0,209,255,0.2)",
              }}>
              {cat}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filtered.map((project, i) => (
            <motion.div key={project.id}
              className="bg-[#0D1117] rounded-2xl overflow-hidden group"
              style={{ border: "1px solid rgba(0,209,255,0.14)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.07 }}
              whileHover={{ y: -8, boxShadow: `0 0 36px ${project.color}20` }}>

              {/* Card top */}
              <div className="h-[140px] flex items-center justify-center relative overflow-hidden" style={{ background: "#060C1A" }}>
                {/* Glow bg */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                  style={{ background: `radial-gradient(ellipse at center, ${project.color}18 0%, transparent 70%)` }} />
                {/* Grid pattern */}
                <div className="absolute inset-0" style={{
                  backgroundImage: `linear-gradient(${project.color}10 1px, transparent 1px), linear-gradient(90deg, ${project.color}10 1px, transparent 1px)`,
                  backgroundSize: "24px 24px"
                }} />
                <span className="text-6xl relative z-10">{project.icon}</span>
                {/* Status badge */}
                <div className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-bold`}
                  style={{
                    fontFamily: "Inter",
                    background: project.status === "Available" ? "rgba(107,203,119,0.2)" : "rgba(255,107,107,0.2)",
                    color: project.status === "Available" ? "#6BCB77" : "#FF6B6B",
                    border: `1px solid ${project.status === "Available" ? "#6BCB7750" : "#FF6B6B50"}`,
                  }}>
                  {project.status === "Available" ? "✓ Available" : "⏳ Coming Soon"}
                </div>
              </div>

              {/* Color line */}
              <div className="h-0.5" style={{ background: `linear-gradient(90deg, ${project.color}, transparent)` }} />

              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs px-2.5 py-1 rounded-full font-semibold"
                    style={{ fontFamily: "Inter", background: `${project.color}18`, color: project.color, border: `1px solid ${project.color}35` }}>
                    {project.category}
                  </span>
                </div>

                <h3 className="text-white mb-2 font-bold" style={{ fontFamily: "Inter", fontSize: "17px" }}>{project.title}</h3>
                <p className="text-[#94A3B8] text-sm mb-5" style={{ fontFamily: "Inter", lineHeight: 1.65 }}>{project.description}</p>

                {/* Features */}
                <div className="grid grid-cols-2 gap-1.5 mb-5">
                  {project.features.map((f, fi) => (
                    <div key={fi} className="flex items-center gap-1.5 text-xs text-[#94A3B8]" style={{ fontFamily: "Inter" }}>
                      <span style={{ color: project.color }}>✓</span> {f}
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.tags.map((tag, ti) => (
                    <span key={ti} className="text-xs px-2.5 py-1 rounded-full"
                      style={{ fontFamily: "Inter", background: "rgba(0,209,255,0.06)", color: "#94A3B8", border: "1px solid rgba(0,209,255,0.15)" }}>
                      {tag}
                    </span>
                  ))}
                </div>

                <Link to="/contact"
                  className="block w-full text-center py-2.5 rounded-lg text-sm font-semibold transition-all hover:opacity-80"
                  style={{ fontFamily: "Inter", background: `${project.color}18`, color: project.color, border: `1px solid ${project.color}35` }}>
                  {project.status === "Available" ? "Request This Tool →" : "Get Notified →"}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div className="mt-20 text-center bg-[#0D1117] rounded-2xl p-12 relative overflow-hidden"
          style={{ border: "1px solid rgba(0,209,255,0.2)", boxShadow: "0 0 48px rgba(0,209,255,0.08)" }}
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
          <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(0,209,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,209,255,0.03) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
          <div className="relative z-10">
            <TioThumbsUp className="w-20 h-20 mx-auto mb-5" />
            <h2 className="text-white text-2xl font-bold mb-3" style={{ fontFamily: "Inter" }}>
              Need a Custom IT Solution?
            </h2>
            <p className="text-[#94A3B8] mb-7 max-w-md mx-auto" style={{ fontFamily: "Inter", lineHeight: 1.75 }}>
              Don't see what you need? Tell us your problem and Tio will help figure out the right tool for you.
            </p>
            <Link to="/contact"
              className="inline-block bg-[#0EA5E9] text-white px-10 py-4 rounded-xl font-bold hover:bg-[#0EA5E9]/85 transition-all"
              style={{ fontFamily: "Inter", boxShadow: "0 0 24px rgba(14,165,233,0.35)" }}>
              Contact Us →
            </Link>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
