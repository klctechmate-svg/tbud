import { Link, useNavigate } from "react-router";
import { TioWaving, TioFlying, TioThumbsUp } from "../components/TioMascot";
import { motion } from "motion/react";
import { useAuth } from "../context/AuthContext";

const BASE = "https://mjsafqsqahwygjbpevvi.supabase.co/storage/v1/object/public/team-photos";

const services = [
  {
    id: "1", image: `${BASE}/GCR.png`, title: "Graphic & Creative Services", tagline: "Express. Design. Inspire.",
    learn: "Master tools like Canva, Adobe, and Figma",
    enhance: "Build a visual brand identity that stands out",
    grow: "Attract clients with professional graphics",
    color: "#FF6B6B",
  },
  {
    id: "2", image: `${BASE}/ETS.png`, title: "Educational & Training Services", tagline: "Learn. Develop. Excel.",
    learn: "Gain digital skills through guided workshops",
    enhance: "Sharpen knowledge with structured training",
    grow: "Level up with in-demand tech competencies",
    color: "#FFD93D",
  },
  {
    id: "3", image: `${BASE}/SMM.png`, title: "Social Media & Marketing", tagline: "Reach. Engage. Convert.",
    learn: "Understand algorithms, content, and analytics",
    enhance: "Build campaigns that connect with your audience",
    grow: "Turn followers into loyal brand advocates",
    color: "#6BCB77",
  },
  {
    id: "4", image: `${BASE}/OBS.png`, title: "Online Business Services", tagline: "Launch. Sell. Scale.",
    learn: "Set up your store with the right platforms",
    enhance: "Optimize listings, payments, and integrations",
    grow: "Scale with automation and smart strategies",
    color: "#00D1FF",
  },
];

/* ── ROOT NEST SVG around Tio ── */
function RootNest() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 480 480" fill="none" style={{ overflow: "visible" }}>
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        {/* Speed-light gradient */}
        <linearGradient id="streak1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00D1FF" stopOpacity="0" />
          <stop offset="50%" stopColor="#00D1FF" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#0EA5E9" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="streak2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#2563EB" stopOpacity="0" />
          <stop offset="60%" stopColor="#00D1FF" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#00D1FF" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Outer root arcs forming nest */}
      <path d="M80 400 C60 300, 80 180, 240 160" stroke="rgba(0,209,255,0.25)" strokeWidth="2" fill="none" filter="url(#glow)" />
      <path d="M400 400 C420 300, 400 180, 240 160" stroke="rgba(0,209,255,0.2)" strokeWidth="2" fill="none" filter="url(#glow)" />
      <path d="M60 350 C40 240, 120 140, 240 140" stroke="rgba(14,165,233,0.2)" strokeWidth="1.5" fill="none" />
      <path d="M420 350 C440 240, 360 140, 240 140" stroke="rgba(14,165,233,0.2)" strokeWidth="1.5" fill="none" />
      {/* Inner nest branches */}
      <path d="M120 420 C100 340, 150 260, 240 240" stroke="rgba(0,209,255,0.3)" strokeWidth="1.5" fill="none" filter="url(#glow)" />
      <path d="M360 420 C380 340, 330 260, 240 240" stroke="rgba(0,209,255,0.3)" strokeWidth="1.5" fill="none" filter="url(#glow)" />
      <path d="M160 430 C150 370, 190 300, 240 280" stroke="rgba(37,99,235,0.25)" strokeWidth="1" fill="none" />
      <path d="M320 430 C330 370, 290 300, 240 280" stroke="rgba(37,99,235,0.25)" strokeWidth="1" fill="none" />
      {/* Root tips — small dots */}
      {[[80,400],[400,400],[60,350],[420,350],[120,420],[360,420]].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r="3" fill="#00D1FF" opacity="0.5" filter="url(#glow)" />
      ))}

      {/* Glowing tubes — horizontal speed streaks */}
      <motion.rect x="50" y="230" width="80" height="3" rx="1.5" fill="url(#streak1)"
        animate={{ x: [50, 140, 50], opacity: [0, 1, 0] }} transition={{ duration: 2.4, repeat: Infinity, delay: 0 }} />
      <motion.rect x="350" y="210" width="80" height="3" rx="1.5" fill="url(#streak2)"
        animate={{ x: [350, 260, 350], opacity: [0, 1, 0] }} transition={{ duration: 2.8, repeat: Infinity, delay: 0.7 }} />
      <motion.rect x="50" y="310" width="60" height="2" rx="1" fill="url(#streak1)"
        animate={{ x: [50, 120, 50], opacity: [0, 0.8, 0] }} transition={{ duration: 2.1, repeat: Infinity, delay: 1.3 }} />
      <motion.rect x="370" y="290" width="60" height="2" rx="1" fill="url(#streak2)"
        animate={{ x: [370, 300, 370], opacity: [0, 0.8, 0] }} transition={{ duration: 2.5, repeat: Infinity, delay: 0.4 }} />

      {/* Glowing node circles on tubes */}
      <motion.circle cx="90" cy="231" r="4" fill="#00D1FF" filter="url(#glow)"
        animate={{ cx: [90,170,90], opacity: [0,1,0] }} transition={{ duration: 2.4, repeat: Infinity }} />
      <motion.circle cx="390" cy="211" r="4" fill="#0EA5E9" filter="url(#glow)"
        animate={{ cx: [390,310,390], opacity: [0,1,0] }} transition={{ duration: 2.8, repeat: Infinity, delay: 0.7 }} />
    </svg>
  );
}

export function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const handleExplore = () => navigate(user ? "/services" : "/signin");

  return (
    <div className="w-full" style={{ scrollBehavior: "smooth" }}>

      {/* ── HERO ── */}
      <section className="relative min-h-[680px] overflow-hidden">
        {/* Grid */}
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(0,209,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,209,255,0.05) 1px, transparent 1px)`,
          backgroundSize: "52px 52px"
        }} />
        {/* Top glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[320px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(14,165,233,0.12) 0%, transparent 70%)" }} />

        {/* Floating particles */}
        {[...Array(18)].map((_, i) => (
          <motion.div key={i} className="absolute w-1 h-1 rounded-full bg-[#00D1FF]"
            style={{ left: `${4 + (i * 5.3) % 92}%`, top: `${8 + (i * 6.7) % 84}%` }}
            animate={{ y: [0, -18, 0], opacity: [0.15, 0.7, 0.15] }}
            transition={{ duration: 2.5 + (i % 4) * 0.5, repeat: Infinity, delay: i * 0.15 }} />
        ))}

        <div style={{ width: "min(1400px, 90%)", margin: "0 auto" }} className="py-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">

            {/* Text */}
            <motion.div className="lg:col-span-3" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-7"
                style={{ background: "rgba(14,165,233,0.12)", border: "1px solid rgba(0,209,255,0.35)" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-[#00D1FF] animate-pulse" />
                <span className="text-xs text-[#00D1FF]" style={{ fontFamily: "Inter", fontWeight: 600, letterSpacing: "0.07em" }}>
                  Meet Tio — Your Digital Buddy
                </span>
              </div>

              <h1 className="text-white mb-5" style={{ fontFamily: "Inter", fontWeight: 800, fontSize: "clamp(38px,5.5vw,66px)", lineHeight: 1.07, letterSpacing: "-0.025em" }}>
                Your Digital Buddy,<br />
                <span style={{ background: "linear-gradient(92deg, #0EA5E9, #00D1FF 60%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  Always Ready.
                </span>
              </h1>

              <p className="text-[#94A3B8] text-lg mb-10 max-w-lg" style={{ fontFamily: "Inter", lineHeight: 1.75 }}>
                T-Bud delivers modern digital services — from creative design to online business support. Commission-based, human-powered, and built for your growth.
              </p>

              <div className="flex flex-wrap gap-4">
                <button onClick={handleExplore}
                  className="bg-[#0EA5E9] text-white px-8 py-3.5 rounded-xl hover:bg-[#0EA5E9]/85 transition-all font-bold"
                  style={{ fontFamily: "Inter", boxShadow: "0 0 28px rgba(14,165,233,0.4)" }}>
                  Explore Services
                </button>
                <Link to="/about" className="text-white px-8 py-3.5 rounded-xl hover:bg-white/5 transition-all font-semibold"
                  style={{ fontFamily: "Inter", border: "1px solid rgba(0,209,255,0.35)" }}>
                  Meet Tio →
                </Link>
              </div>
            </motion.div>

            {/* Tio + Root Nest */}
            <motion.div className="lg:col-span-2 flex justify-center"
              initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }}>
              <div className="relative w-[340px] h-[380px]">
                <RootNest />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="rounded-2xl p-6 relative"
                    style={{ background: "rgba(13,17,23,0.65)", border: "1px solid rgba(0,209,255,0.18)", backdropFilter: "blur(14px)" }}>
                    {/* Corner accents */}
                    {["tl","tr","bl","br"].map(c => (
                      <div key={c} className={`absolute w-5 h-5 ${c.startsWith("t") ? "top-0" : "bottom-0"} ${c.endsWith("l") ? "left-0" : "right-0"}`}
                        style={{
                          borderTop: c.startsWith("t") ? "2px solid #00D1FF" : undefined,
                          borderBottom: c.startsWith("b") ? "2px solid #00D1FF" : undefined,
                          borderLeft: c.endsWith("l") ? "2px solid #00D1FF" : undefined,
                          borderRight: c.endsWith("r") ? "2px solid #00D1FF" : undefined,
                          borderRadius: c === "tl" ? "8px 0 0 0" : c === "tr" ? "0 8px 0 0" : c === "bl" ? "0 0 0 8px" : "0 0 8px 0"
                        }} />
                    ))}
                    <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}>
                      <TioWaving className="w-[240px] h-[240px]" />
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ width: "min(1400px, 90%)", margin: "0 auto" }} className="py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {[
            { number: "4", label: "Services Offered", sub: "Creative · Educational · Social · Business" },
            { number: "3", label: "Team Members", sub: "Dedicated professionals" },
            { number: "∞", label: "Possibilities", sub: "Grow without limits" },
            { number: "2026", label: "Founded", sub: "Built for the future" },
          ].map((s, i) => (
            <motion.div key={i} className="bg-[#0D1117] rounded-xl p-6 text-center"
              style={{ border: "1px solid rgba(0,209,255,0.14)" }}
              whileHover={{ y: -5, boxShadow: "0 0 28px rgba(0,209,255,0.12)" }}>
              <div className="text-[#00D1FF] mb-1" style={{ fontFamily: "Inter", fontWeight: 800, fontSize: "42px" }}>{s.number}</div>
              <div className="text-white text-sm font-semibold mb-1" style={{ fontFamily: "Inter" }}>{s.label}</div>
              <div className="text-[#94A3B8] text-xs" style={{ fontFamily: "Inter" }}>{s.sub}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── SERVICE PREVIEW CARDS ── */}
      <section style={{ width: "min(1400px, 90%)", margin: "0 auto" }} className="py-16">
        <div className="text-center mb-14">
          <span className="text-xs text-[#00D1FF] uppercase tracking-widest mb-3 block" style={{ fontFamily: "Inter", fontWeight: 600 }}>What We Offer</span>
          <h2 className="text-white mb-4" style={{ fontFamily: "Inter", fontWeight: 800, fontSize: "clamp(26px,3.5vw,42px)", letterSpacing: "-0.01em" }}>
            Services Built for Your Growth
          </h2>
          <p className="text-[#94A3B8] max-w-xl mx-auto" style={{ fontFamily: "Inter", lineHeight: 1.75 }}>
            Every service is designed to help you learn new skills, enhance your capabilities, and grow your digital presence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((svc, i) => (
            <motion.div key={svc.id}
              className="bg-[#0D1117] rounded-2xl overflow-hidden group cursor-pointer"
              style={{ border: "1px solid rgba(0,209,255,0.14)" }}
              whileHover={{ y: -9, boxShadow: `0 0 36px ${svc.color}22` }}
              transition={{ duration: 0.28 }}
              onClick={handleExplore}>
              <div className="h-[180px] flex items-center justify-center relative overflow-hidden" style={{ background: "#060C1A" }}>
                <img src={svc.image} alt={svc.title}
                  className="h-full w-full object-contain p-4 transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                  style={{ background: `radial-gradient(ellipse at center, ${svc.color}18 0%, transparent 70%)` }} />
              </div>
              <div className="h-0.5" style={{ background: `linear-gradient(90deg, ${svc.color}, transparent)` }} />
              <div className="p-5">
                <p className="text-xs mb-2 font-semibold" style={{ fontFamily: "Inter", color: svc.color }}>{svc.tagline}</p>
                <h3 className="text-white mb-4 leading-snug" style={{ fontFamily: "Inter", fontWeight: 700, fontSize: "14px" }}>{svc.title}</h3>
                <div className="space-y-2 mb-5">
                  {[{ icon: "📖", label: "Learn", text: svc.learn },
                    { icon: "⚡", label: "Enhance", text: svc.enhance },
                    { icon: "🚀", label: "Grow", text: svc.grow }].map(item => (
                    <div key={item.label} className="flex items-start gap-2">
                      <span className="text-xs mt-0.5">{item.icon}</span>
                      <div>
                        <span className="text-[#00D1FF] text-xs font-semibold" style={{ fontFamily: "Inter" }}>{item.label}: </span>
                        <span className="text-[#94A3B8] text-xs" style={{ fontFamily: "Inter" }}>{item.text}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <button onClick={e => { e.stopPropagation(); handleExplore(); }}
                  className="w-full py-2.5 rounded-lg text-sm font-semibold transition-all hover:opacity-80"
                  style={{ fontFamily: "Inter", background: `${svc.color}1A`, color: svc.color, border: `1px solid ${svc.color}35` }}>
                  Explore →
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── BRAND TICKER ── */}
      <section className="py-10 overflow-hidden" style={{ background: "#060C1A", borderTop: "1px solid rgba(0,209,255,0.08)", borderBottom: "1px solid rgba(0,209,255,0.08)" }}>
        <div className="flex items-center gap-16 animate-scroll">
          {["Canva", "Google", "Meta", "Shopify", "WordPress", "YouTube", "Figma", "Adobe", "Canva", "Google", "Meta", "Shopify"].map((b, i) => (
            <div key={i} className="text-[#94A3B8]/40 text-base font-semibold whitespace-nowrap hover:text-[#00D1FF] transition-colors select-none"
              style={{ fontFamily: "Inter" }}>{b}</div>
          ))}
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-20 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0EA5E9 0%, #2563EB 55%, #1E3A8A 100%)" }}>
        <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "36px 36px" }} />
        <div style={{ width: "min(1000px, 90%)", margin: "0 auto" }} className="text-center relative z-10">
          <h2 className="text-white text-3xl mb-3" style={{ fontFamily: "Inter", fontWeight: 800 }}>
            Commission-Based. Results-Driven.
          </h2>
          <p className="text-white/75 mb-8 text-lg" style={{ fontFamily: "Inter" }}>
            T-Bud works alongside you — no hidden fees, just real results.
          </p>
          <button onClick={handleExplore}
            className="bg-white text-[#0EA5E9] px-10 py-4 rounded-xl text-base font-bold hover:bg-white/90 transition-all"
            style={{ fontFamily: "Inter", boxShadow: "0 6px 24px rgba(0,0,0,0.25)" }}>
            Start Your Journey
          </button>
        </div>
        <motion.div className="absolute right-[7%] top-1/2 -translate-y-1/2"
          animate={{ x: [0, 90, 0] }} transition={{ duration: 11, repeat: Infinity, ease: "linear" }}>
          <TioFlying className="w-20 h-20 opacity-75" />
        </motion.div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{ width: "min(900px, 90%)", margin: "0 auto" }} className="py-20 text-center">
        <div className="bg-[#0D1117] border border-[#00D1FF]/22 rounded-2xl p-12 relative"
          style={{ boxShadow: "0 0 56px rgba(0,209,255,0.1)" }}>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-8 bg-[#00D1FF]/35" />
          <h2 className="text-white text-3xl mb-3" style={{ fontFamily: "Inter", fontWeight: 800 }}>
            Ready to start? Tio is waiting.
          </h2>
          <p className="text-[#94A3B8] mb-8" style={{ fontFamily: "Inter" }}>
            Join T-Bud today and take the first step toward your digital growth.
          </p>
          <div className="flex items-center justify-center gap-8">
            <TioThumbsUp className="w-24 h-24" />
            <div className="flex flex-col gap-3">
              <button onClick={handleExplore}
                className="bg-[#0EA5E9] text-white px-10 py-4 rounded-xl text-lg hover:bg-[#0EA5E9]/85 transition-all font-bold"
                style={{ fontFamily: "Inter", boxShadow: "0 0 28px rgba(14,165,233,0.35)" }}>
                Get Started
              </button>
              {!user && (
                <Link to="/signin" className="text-[#94A3B8] text-sm hover:text-[#00D1FF] transition-colors" style={{ fontFamily: "Inter" }}>
                  Already have an account? Sign in →
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-scroll { animation: scroll 32s linear infinite; }
      `}</style>
    </div>
  );
}
