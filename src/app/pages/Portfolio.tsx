import { Link, useNavigate } from "react-router";
import { TioSitting, TioWaving, TioThumbsUp } from "../components/TioMascot";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { projectId, publicAnonKey } from "/utils/supabase/info";
import { Loader2, ExternalLink, Code2, Paintbrush, TrendingUp, ShoppingBag } from "lucide-react";

const SERVER_URL = `https://${projectId}.supabase.co/functions/v1/make-server-df0cbbe5`;

const roleIcons: Record<string, any> = {
  "Creative Director": Paintbrush,
  "Tech Lead": Code2,
  "Marketing Specialist": TrendingUp,
};

const roleColors: Record<string, string> = {
  "Creative Director": "#FF6B6B",
  "Tech Lead": "#00D1FF",
  "Marketing Specialist": "#6BCB77",
};

const roleProjects: Record<string, { title: string; desc: string }[]> = {
  "Creative Director": [
    { title: "Brand Identity System", desc: "Logo, color palette & visual guidelines" },
    { title: "Social Media Graphics Pack", desc: "Reusable templates for all platforms" },
    { title: "Marketing Collateral", desc: "Flyers, banners, and print materials" },
  ],
  "Tech Lead": [
    { title: "T-Bud Website", desc: "Full-stack React + Supabase web platform" },
    { title: "Barcode Generator Tool", desc: "Automated product barcode system" },
    { title: "Backend API & Auth", desc: "Secure user management system" },
  ],
  "Marketing Specialist": [
    { title: "Social Media Strategy", desc: "Content calendar & campaign planning" },
    { title: "Growth Analytics Dashboard", desc: "Tracking reach, engagement & conversions" },
    { title: "Community Building", desc: "Audience engagement & brand advocacy" },
  ],
};

/* ── Glowing Tree Root SVG ── */
function GlowingRoots({ color }: { color: string }) {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30 group-hover:opacity-60 transition-opacity duration-500"
      viewBox="0 0 320 200" fill="none" style={{ overflow: "visible" }}>
      <defs>
        <filter id={`glow-${color.replace("#","")}`}>
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <linearGradient id={`streak-${color.replace("#","")}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={color} stopOpacity="0" />
          <stop offset="50%" stopColor={color} stopOpacity="1" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Root branches */}
      <path d="M160 180 C160 150, 140 120, 100 90" stroke={color} strokeWidth="1.5" fill="none" filter={`url(#glow-${color.replace("#","")})`} opacity="0.5"/>
      <path d="M160 180 C160 150, 180 120, 220 90" stroke={color} strokeWidth="1.5" fill="none" filter={`url(#glow-${color.replace("#","")})`} opacity="0.5"/>
      <path d="M160 180 C160 140, 160 110, 160 70" stroke={color} strokeWidth="1.5" fill="none" filter={`url(#glow-${color.replace("#","")})`} opacity="0.4"/>
      <path d="M100 90 C80 70, 60 60, 40 50" stroke={color} strokeWidth="1" fill="none" opacity="0.35"/>
      <path d="M100 90 C90 70, 95 55, 90 40" stroke={color} strokeWidth="1" fill="none" opacity="0.35"/>
      <path d="M220 90 C240 70, 260 60, 280 50" stroke={color} strokeWidth="1" fill="none" opacity="0.35"/>
      <path d="M220 90 C230 70, 225 55, 230 40" stroke={color} strokeWidth="1" fill="none" opacity="0.35"/>
      {/* Speed-light streaks */}
      <motion.rect y="88" width="40" height="2" rx="1" fill={`url(#streak-${color.replace("#","")})`}
        animate={{ x: [60, 115, 60], opacity: [0, 1, 0] }} transition={{ duration: 1.8, repeat: Infinity, delay: 0 }} />
      <motion.rect y="88" width="40" height="2" rx="1" fill={`url(#streak-${color.replace("#","")})`}
        animate={{ x: [165, 220, 165], opacity: [0, 1, 0] }} transition={{ duration: 2.1, repeat: Infinity, delay: 0.5 }} />
      <motion.rect x="155" width="2" height="30" rx="1" fill={color} opacity="0.6"
        animate={{ y: [155, 85, 155], opacity: [0, 0.9, 0] }} transition={{ duration: 1.6, repeat: Infinity, delay: 0.9 }} />
      {/* Glowing node dots */}
      {[[100,90],[220,90],[160,70],[40,50],[280,50]].map(([cx,cy],i) => (
        <motion.circle key={i} cx={cx} cy={cy} r="3" fill={color} filter={`url(#glow-${color.replace("#","")})`}
          animate={{ scale: [0.5,1.4,0.5], opacity: [0.3,1,0.3] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }} />
      ))}
    </svg>
  );
}

interface TeamMember {
  id: string; name: string; role: string; bio: string;
  photo: string; skills: { name: string; tier: string }[]; tags: string[];
}

export function Portfolio() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${SERVER_URL}/team`, { headers: { Authorization: `Bearer ${publicAnonKey}` } })
      .then(r => r.json())
      .then(data => { if (data.members) setTeam(data.members); else setError("Failed to load team."); })
      .catch(() => setError("Could not connect to server."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="w-full min-h-screen py-20">
      <div style={{ width: "min(1400px, 90%)", margin: "0 auto" }}>

        {/* Header */}
        <div className="text-center mb-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="text-xs text-[#00D1FF] uppercase tracking-widest mb-3 block" style={{ fontFamily: "Inter", fontWeight: 600 }}>
              The Team
            </span>
            <h1 className="text-white mb-4" style={{ fontFamily: "Inter", fontWeight: 800, fontSize: "clamp(32px,5vw,56px)", letterSpacing: "-0.02em" }}>
              Meet the Humans Behind Tio
            </h1>
            <p className="text-[#94A3B8] text-lg max-w-xl mx-auto" style={{ fontFamily: "Inter", lineHeight: 1.75 }}>
              A passionate team of creatives, engineers, and marketers — building the future of digital services together.
            </p>
          </motion.div>
        </div>

        {loading && <div className="flex justify-center py-20"><Loader2 size={40} className="animate-spin text-[#00D1FF]" /></div>}
        {error && <div className="text-center text-red-400 py-20">{error}</div>}

        {!loading && !error && (
          <>
            {/* Team Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
              {team.map((member, i) => {
                const color = roleColors[member.role] || "#00D1FF";
                const Icon = roleIcons[member.role] || TioSitting;
                const projects = roleProjects[member.role] || [];
                const isActive = activeCard === member.id;

                return (
                  <motion.div key={member.id}
                    className="relative bg-[#0D1117] rounded-2xl overflow-hidden group cursor-pointer"
                    style={{ border: `1px solid ${isActive ? color : "rgba(0,209,255,0.15)"}` }}
                    initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    whileHover={{ y: -8, boxShadow: `0 0 40px ${color}25` }}
                    onClick={() => setActiveCard(isActive ? null : member.id)}>

                    {/* Glowing root animation */}
                    <GlowingRoots color={color} />

                    {/* Top banner */}
                    <div className="relative h-44 overflow-hidden" style={{ background: `linear-gradient(135deg, #060C1A 0%, ${color}20 100%)` }}>
                      <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
                      {/* Role icon */}
                      <div className="absolute top-4 left-4 w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ background: `${color}20`, border: `1px solid ${color}40` }}>
                        <Icon size={20} style={{ color }} />
                      </div>
                      {/* Role badge */}
                      <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold"
                        style={{ fontFamily: "Inter", background: `${color}20`, color, border: `1px solid ${color}40` }}>
                        {member.role}
                      </div>
                      {/* Photo */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                        <div className="w-20 h-20 rounded-2xl overflow-hidden"
                          style={{ border: `3px solid ${color}`, boxShadow: `0 0 20px ${color}50` }}>
                          <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
                        </div>
                      </div>
                    </div>

                    {/* Body */}
                    <div className="pt-6 p-6">
                      <div className="text-center mb-5">
                        <h3 className="text-white font-bold text-lg mb-1" style={{ fontFamily: "Inter" }}>{member.name}</h3>
                        <p className="text-[#94A3B8] text-sm" style={{ fontFamily: "Inter" }}>{member.bio}</p>
                      </div>

                      {/* Skills */}
                      <div className="mb-5">
                        <h4 className="text-white text-xs font-semibold mb-3 uppercase tracking-wider" style={{ fontFamily: "Inter" }}>Skills</h4>
                        <div className="space-y-2">
                          {member.skills.map((skill, idx) => (
                            <div key={idx} className="flex items-center gap-3">
                              <div className="flex-1">
                                <div className="flex justify-between mb-1">
                                  <span className="text-white/80 text-xs" style={{ fontFamily: "Inter" }}>{skill.name}</span>
                                  <span className="text-xs font-bold" style={{ color, fontFamily: "Inter" }}>{skill.tier === "high" ? "Expert" : "Proficient"}</span>
                                </div>
                                <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                                  <motion.div className="h-full rounded-full"
                                    style={{ background: `linear-gradient(90deg, ${color}80, ${color})` }}
                                    initial={{ width: 0 }}
                                    animate={{ width: skill.tier === "high" ? "90%" : "65%" }}
                                    transition={{ duration: 1, delay: idx * 0.15 }} />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {member.tags.map((tag, idx) => (
                          <span key={idx} className="text-xs px-2.5 py-1 rounded-full"
                            style={{ fontFamily: "Inter", background: `${color}12`, color, border: `1px solid ${color}30` }}>
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* View Projects button */}
                      <Link to="/projects"
                        className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-bold transition-all hover:opacity-85"
                        style={{ fontFamily: "Inter", background: `${color}18`, color, border: `1px solid ${color}35` }}
                        onClick={e => e.stopPropagation()}>
                        <ExternalLink size={14} /> View Projects
                      </Link>
                    </div>

                    {/* Expandable projects panel */}
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: isActive ? "auto" : 0, opacity: isActive ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ overflow: "hidden", borderTop: isActive ? `1px solid ${color}25` : "none" }}>
                      <div className="p-5">
                        <h4 className="text-white text-xs font-semibold mb-3 uppercase tracking-wider" style={{ fontFamily: "Inter" }}>Recent Work</h4>
                        <div className="space-y-2.5">
                          {projects.map((proj, pi) => (
                            <div key={pi} className="flex items-start gap-3 p-3 rounded-xl"
                              style={{ background: `${color}08`, border: `1px solid ${color}20` }}>
                              <span style={{ color }} className="mt-0.5 text-sm">▹</span>
                              <div>
                                <p className="text-white text-sm font-semibold" style={{ fontFamily: "Inter" }}>{proj.title}</p>
                                <p className="text-[#94A3B8] text-xs" style={{ fontFamily: "Inter" }}>{proj.desc}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA */}
            <motion.div className="bg-[#0D1117] rounded-2xl p-12 text-center relative overflow-hidden"
              style={{ border: "1px solid rgba(0,209,255,0.2)", boxShadow: "0 0 48px rgba(0,209,255,0.08)" }}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(0,209,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,209,255,0.025) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-8">
                <TioThumbsUp className="w-24 h-24 flex-shrink-0" />
                <div className="text-left">
                  <h2 className="text-white text-2xl font-bold mb-2" style={{ fontFamily: "Inter" }}>Want to see our IT projects?</h2>
                  <p className="text-[#94A3B8] mb-5" style={{ fontFamily: "Inter" }}>Explore barcode generators, automation tools, and more real-world solutions.</p>
                  <Link to="/projects" className="inline-flex items-center gap-2 bg-[#0EA5E9] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#0EA5E9]/85 transition-all"
                    style={{ fontFamily: "Inter", boxShadow: "0 0 20px rgba(14,165,233,0.35)" }}>
                    <ExternalLink size={16} /> View All Projects
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}
