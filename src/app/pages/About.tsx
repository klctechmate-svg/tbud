import { TioReading, TioSitting, TioWaving, TioFlying, TioThumbsUp } from "../components/TioMascot";
import { motion } from "motion/react";

export function About() {
  const values = [
    { icon: "⚡", title: "Innovation", description: "Pushing boundaries with cutting-edge solutions" },
    { icon: "🛡️", title: "Reliability", description: "Consistent service you can always count on" },
    { icon: "🤝", title: "Integrity", description: "Honest, transparent, and ethical in everything" },
    { icon: "👤", title: "Client-First", description: "Your success is our top priority" },
  ];

  const evolution = [
    { stage: "Idea", year: "January 18, 2026", icon: TioSitting, description: "The vision begins", color: "#94A3B8" },
    { stage: "Build", year: "February 28, 2026", icon: TioWaving, description: "Foundations laid", color: "#0EA5E9" },
    { stage: "Launched", year: "April 6, 2026", icon: TioFlying, description: "Taking flight", color: "#00D1FF" },
    { stage: "Growing", year: "June 5, 2026", icon: TioThumbsUp, description: "Soaring high", color: "#2563EB" },
  ];

  return (
    <div className="w-full min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-white text-center mb-16" style={{ fontFamily: "Inter", fontWeight: 700, fontSize: "48px" }}>
          Who We Are
        </h1>

        <div className="mb-16 relative">
          <div
            className="backdrop-blur-sm bg-white/5 rounded-2xl p-8 relative"
            style={{ borderLeft: "4px solid #0EA5E9" }}
          >
            <TioReading className="absolute -top-8 right-8 w-20 h-20" />
            <h2 className="text-white mb-4" style={{ fontFamily: "Inter", fontWeight: 700, fontSize: "28px" }}>
              Built for a World That Never Stops Changing
            </h2>
            <p className="text-[#94A3B8] leading-relaxed" style={{ fontFamily: "Inter", fontSize: "16px" }}>
              At T-Bud, we believe technology should empower everyone, not just the few. Founded in 2026, we set out to break down the barriers that make digital services expensive and inaccessible. With Tio as our guide and mascot, we've created a platform where innovation meets simplicity—where anyone can access professional-grade IT services without paying a dime.
              <br /><br />
              Our story started with a simple question: Why should quality digital services come with a hefty price tag? From graphic design to marketing, from education to e-commerce, we saw talented people being held back by cost. So we built T-Bud—a place where your ambition is the only requirement. Whether you're a student, entrepreneur, creator, or dreamer, we're here to help you build, grow, and thrive in the digital world.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div
            className="backdrop-blur-sm bg-white/5 rounded-2xl p-8"
            style={{ borderLeft: "4px solid #00D1FF" }}
          >
            <h3 className="text-white mb-3" style={{ fontFamily: "Inter", fontWeight: 700, fontSize: "24px" }}>
              Our Mission
            </h3>
            <p className="text-[#94A3B8]" style={{ fontFamily: "Inter", lineHeight: "1.7" }}>
              To democratize digital services by providing commission-based, high-quality IT solutions that empower individuals and businesses to succeed in an ever-evolving digital landscape.
            </p>
          </div>

          <div
            className="backdrop-blur-sm bg-white/5 rounded-2xl p-8"
            style={{ borderLeft: "4px solid #2563EB" }}
          >
            <h3 className="text-white mb-3" style={{ fontFamily: "Inter", fontWeight: 700, fontSize: "24px" }}>
              Our Vision
            </h3>
            <p className="text-[#94A3B8]" style={{ fontFamily: "Inter", lineHeight: "1.7" }}>
              A world where everyone has equal access to the tools they need to build their digital future—where creativity, innovation, and success are no longer limited by budget.
            </p>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-white text-center mb-12" style={{ fontFamily: "Inter", fontWeight: 700, fontSize: "36px" }}>
            Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <motion.div
                key={i}
                className="bg-[#0D1117] border border-[#00D1FF]/20 rounded-xl p-6 text-center hover:border-[#00D1FF] transition-all"
                whileHover={{ y: -8 }}
              >
                <div className="text-5xl mb-4">{value.icon}</div>
                <h4 className="text-white mb-2" style={{ fontFamily: "Inter", fontWeight: 700, fontSize: "18px" }}>
                  {value.title}
                </h4>
                <p className="text-[#94A3B8] text-sm" style={{ fontFamily: "Inter" }}>
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-white text-center mb-12" style={{ fontFamily: "Inter", fontWeight: 700, fontSize: "36px" }}>
            Why T-Bud? The Evolution
          </h2>
          <div className="relative max-w-5xl mx-auto">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-[#94A3B8] via-[#0EA5E9] via-[#00D1FF] to-[#2563EB] -translate-y-1/2 hidden lg:block"></div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative z-10">
              {evolution.map((stage, i) => {
                const Icon = stage.icon;
                return (
                  <motion.div
                    key={i}
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2 }}
                  >
                    <div
                      className="bg-[#0D1117] border-4 rounded-2xl p-6 mb-4 mx-auto inline-block"
                      style={{ borderColor: stage.color }}
                    >
                      <Icon className="w-24 h-24" />
                    </div>
                    <h4
                      className="text-white mb-2"
                      style={{ fontFamily: "Inter", fontWeight: 700, fontSize: "20px", color: stage.color }}
                    >
                      {stage.stage}
                    </h4>
                    <p className="text-[#94A3B8] text-sm mb-1" style={{ fontFamily: "Inter" }}>
                      {stage.description}
                    </p>
                    <p className="text-[#00D1FF] text-xs" style={{ fontFamily: "Inter", fontWeight: 700 }}>
                      {stage.year}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
