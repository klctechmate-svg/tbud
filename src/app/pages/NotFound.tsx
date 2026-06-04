import { Link } from "react-router";
import { TioSleeping } from "../components/TioMascot";
import { motion } from "motion/react";

export function NotFound() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="text-center px-6">
        <div className="relative mb-8 inline-block">
          <div className="relative">
            <svg width="400" height="300" viewBox="0 0 400 300" className="mx-auto">
              <rect x="50" y="80" width="300" height="180" rx="10" fill="#1E293B" opacity="0.5" />
              <path d="M 80 120 L 150 80 L 220 120" stroke="#EF4444" strokeWidth="8" fill="none" strokeLinecap="round" />
              <path d="M 180 120 L 250 80 L 320 120" stroke="#EF4444" strokeWidth="8" fill="none" strokeLinecap="round" />
              <line x1="100" y1="200" x2="300" y2="200" stroke="#64748B" strokeWidth="4" strokeLinecap="round" opacity="0.3" />
              <line x1="120" y1="230" x2="280" y2="230" stroke="#64748B" strokeWidth="4" strokeLinecap="round" opacity="0.3" />
            </svg>

            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <TioSleeping className="w-32 h-32" />
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h1
            className="text-white mb-4"
            style={{ fontFamily: "Inter", fontWeight: 700, fontSize: "48px" }}
          >
            Oops! Tio fell asleep on this page.
          </h1>
          <p
            className="text-[#94A3B8] text-xl mb-8"
            style={{ fontFamily: "Inter" }}
          >
            Error 404 - Page not found
          </p>

          <Link
            to="/"
            className="inline-block bg-[#0EA5E9] text-white px-8 py-4 rounded-lg hover:bg-[#0EA5E9]/90 transition-all"
            style={{ fontFamily: "Inter", fontWeight: 700, fontSize: "18px" }}
          >
            Wake Tio Up
          </Link>
        </motion.div>

        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-[#94A3B8] text-sm" style={{ fontFamily: "Inter" }}>
            Or try these links instead:
          </p>
          <div className="flex justify-center gap-4 mt-4 flex-wrap">
            {[
              { to: "/", label: "Home" },
              { to: "/services", label: "Services" },
              { to: "/portfolio", label: "Portfolio" },
              { to: "/about", label: "About" },
              { to: "/contact", label: "Contact" },
            ].map((link, i) => (
              <Link
                key={i}
                to={link.to}
                className="text-[#00D1FF] hover:text-white transition-colors text-sm"
                style={{ fontFamily: "Inter", fontWeight: 600 }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
