import { Outlet, Link, useLocation, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { LogOut, ChevronDown, Shield, FileText, Map } from "lucide-react";

export function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClick = () => setDropdownOpen(false);
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  useEffect(() => {
    const protectedRoutes = ["/services", "/portfolio", "/projects"];
    if (!user && protectedRoutes.some(r => location.pathname.startsWith(r))) {
      navigate("/signin");
    }
  }, [location.pathname, user, navigate]);

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const handleSignOut = () => { signOut(); navigate("/"); };

  const displayName = user?.name?.split(",")[1]?.trim().split(" ")[0] || user?.name?.split(" ")[0] || user?.name || "";

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/services", label: "Services" },
    { path: "/portfolio", label: "Portfolio" },
    { path: "/projects", label: "Projects" },
    { path: "/about", label: "About Us" },
    { path: "/contact", label: "Contact Us" },
  ];

  return (
    <div className="min-h-screen bg-[#0D1117] flex flex-col" style={{ scrollBehavior: "smooth" }}>
      {/* ── HEADER ── */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "backdrop-blur-xl bg-[#0D1117]/95 shadow-lg" : "bg-[#0D1117]"}`}
        style={{ borderBottom: "1px solid rgba(0,209,255,0.18)" }}>
        <div style={{ width: "min(1400px, 90%)", margin: "0 auto" }} className="py-4 flex items-center justify-between">
          {/* Logo — clean, no roots */}
          <Link to="/" className="flex items-center gap-2 group">
            <span className="text-[#00D1FF] text-2xl group-hover:text-white transition-colors" style={{ fontFamily: "'Press Start 2P', cursive" }}>
              T-Bud
            </span>
          </Link>

          {/* Nav */}
          <div className="flex items-center gap-7">
            {navLinks.map(({ path, label }) => (
              <Link key={path} to={path}
                className={`text-sm transition-colors relative ${isActive(path) ? "text-[#00D1FF]" : "text-white/70 hover:text-white"}`}
                style={{ fontFamily: "Inter" }}>
                {label}
                {isActive(path) && (
                  <span className="absolute -bottom-1 left-0 right-0 h-px bg-[#00D1FF] rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* Auth */}
          <div className="flex items-center gap-4">
            {user ? (
              <div className="relative" onClick={e => e.stopPropagation()}>
                <button onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 text-sm text-[#00D1FF] hover:text-white transition-colors"
                  style={{ fontFamily: "Inter", fontWeight: 600 }}>
                  <span className="w-7 h-7 rounded-full bg-[#0EA5E9] flex items-center justify-center text-white text-xs font-bold">
                    {displayName[0]?.toUpperCase()}
                  </span>
                  Hello, {displayName}!
                  <ChevronDown size={14} className={`transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 top-10 bg-[#0D1117] border border-[#00D1FF]/30 rounded-xl p-2 min-w-[160px] shadow-2xl">
                    <button onClick={handleSignOut}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                      style={{ fontFamily: "Inter" }}>
                      <LogOut size={14} /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/signin" className="text-white/70 hover:text-white text-sm transition-colors" style={{ fontFamily: "Inter" }}>
                Sign In
              </Link>
            )}
            <Link to="/contact"
              className="bg-[#0EA5E9] text-white px-5 py-2 rounded-lg text-sm hover:bg-[#0EA5E9]/85 transition-all"
              style={{ fontFamily: "Inter", fontWeight: 700, boxShadow: "0 0 14px rgba(14,165,233,0.3)" }}>
              Commission-Based
            </Link>
          </div>
        </div>
      </nav>

      {/* ── PAGE ── */}
      <main className="flex-1"><Outlet /></main>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#060C1A", borderTop: "1px solid rgba(0,209,255,0.12)" }}>
        <div style={{ width: "min(1400px, 90%)", margin: "0 auto" }} className="py-14">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
            <div className="md:col-span-2">
              <span className="text-[#00D1FF] text-xl block mb-3" style={{ fontFamily: "'Press Start 2P', cursive" }}>T-Bud</span>
              <p className="text-[#94A3B8] text-sm mb-5 max-w-sm" style={{ fontFamily: "Inter", lineHeight: 1.8 }}>
                Your digital buddy for creative, educational, and business services — commission-based, human-powered, built for your growth.
              </p>
              <div className="flex gap-3">
                {["FB", "IG", "YT"].map(s => (
                  <div key={s} className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-[#00D1FF] hover:bg-[#00D1FF]/10 cursor-pointer transition-colors"
                    style={{ border: "1px solid rgba(0,209,255,0.3)", fontFamily: "Inter" }}>
                    {s}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold mb-4" style={{ fontFamily: "Inter" }}>Quick Links</h4>
              <div className="space-y-2.5">
                {navLinks.map(({ path, label }) => (
                  <Link key={path} to={path} className="block text-[#94A3B8] text-sm hover:text-[#00D1FF] transition-colors" style={{ fontFamily: "Inter" }}>
                    {label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold mb-4" style={{ fontFamily: "Inter" }}>Get in Touch</h4>
              <div className="space-y-2.5">
                <p className="text-[#94A3B8] text-sm" style={{ fontFamily: "Inter" }}>klc.techmate@gmail.com</p>
                <p className="text-[#94A3B8] text-sm" style={{ fontFamily: "Inter" }}>Philippines 🇵🇭</p>
                <Link to="/contact" className="inline-block mt-2 bg-[#0EA5E9] text-white text-xs px-4 py-2 rounded-lg hover:bg-[#0EA5E9]/85 transition-colors"
                  style={{ fontFamily: "Inter", fontWeight: 700 }}>
                  Contact Us →
                </Link>
              </div>
            </div>
          </div>
          <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4"
            style={{ borderTop: "1px solid rgba(0,209,255,0.08)" }}>
            <p className="text-[#94A3B8] text-xs" style={{ fontFamily: "Inter" }}>
              Copyright © 2026 | T-Bud | All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link to="/signin" className="flex items-center gap-1 text-[#94A3B8] text-xs hover:text-[#00D1FF] transition-colors" style={{ fontFamily: "Inter" }}>
                <Shield size={11} /> Privacy Policy
              </Link>
              <Link to="/contact" className="flex items-center gap-1 text-[#94A3B8] text-xs hover:text-[#00D1FF] transition-colors" style={{ fontFamily: "Inter" }}>
                <FileText size={11} /> Terms
              </Link>
              <Link to="/" className="flex items-center gap-1 text-[#94A3B8] text-xs hover:text-[#00D1FF] transition-colors" style={{ fontFamily: "Inter" }}>
                <Map size={11} /> Sitemap
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
