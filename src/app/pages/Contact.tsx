import { TioFlying, TioThumbsUp } from "../components/TioMascot";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Loader2 } from "lucide-react";
import { projectId, publicAnonKey } from "/utils/supabase/info";

const SERVER_URL = `https://${projectId}.supabase.co/functions/v1/make-server-df0cbbe5`;

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${SERVER_URL}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send message");

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: "", email: "", phone: "", service: "", message: "" });
      }, 3000);
    } catch (err: any) {
      console.error("Contact form submission error:", err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    { icon: Mail, label: "Email", value: "klc.techmate@gmail.com", color: "#0EA5E9" },
    { icon: Phone, label: "Phone", value: "+63 987-654-3210", color: "#00D1FF" },
    { icon: MapPin, label: "Location", value: "Philippines", color: "#2563EB" },
    { icon: Clock, label: "Hours", value: "24/7 - Always Available", color: "#10B981" },
  ];

  return (
    <div className="w-full min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 relative">
          <h1 className="text-white mb-4" style={{ fontFamily: "Inter", fontWeight: 700, fontSize: "48px" }}>
            Talk to Tio
          </h1>
          <p className="text-[#94A3B8] text-xl" style={{ fontFamily: "Inter" }}>
            Drop us a message — Tio will deliver it personally
          </p>
          <motion.div
            className="absolute top-0 right-1/4"
            animate={{
              x: [0, 100, 0],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <TioFlying className="w-16 h-16" />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-8 border border-[#00D1FF]/20">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-white mb-2 text-sm" style={{ fontFamily: "Inter", fontWeight: 600 }}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#0D1117] border border-[#00D1FF]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00D1FF] transition-colors"
                    style={{ fontFamily: "Inter" }}
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label className="block text-white mb-2 text-sm" style={{ fontFamily: "Inter", fontWeight: 600 }}>
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#0D1117] border border-[#00D1FF]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00D1FF] transition-colors"
                    style={{ fontFamily: "Inter" }}
                    placeholder="klc.techmate@gmail.com"
                  />
                </div>

                <div>
                  <label className="block text-white mb-2 text-sm" style={{ fontFamily: "Inter", fontWeight: 600 }}>
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-[#0D1117] border border-[#00D1FF]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00D1FF] transition-colors"
                    style={{ fontFamily: "Inter" }}
                    placeholder="+63 987-654-3210"
                  />
                </div>

                <div>
                  <label className="block text-white mb-2 text-sm" style={{ fontFamily: "Inter", fontWeight: 600 }}>
                    Service
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#0D1117] border border-[#00D1FF]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00D1FF] transition-colors"
                    style={{ fontFamily: "Inter" }}
                  >
                    <option value="">Select a service</option>
                    <option value="graphic">Graphic & Creative Services</option>
                    <option value="education">Educational & Training Services</option>
                    <option value="social">Social Media & Marketing</option>
                    <option value="business">Online Business Services</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white mb-2 text-sm" style={{ fontFamily: "Inter", fontWeight: 600 }}>
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full bg-[#0D1117] border border-[#00D1FF]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00D1FF] transition-colors resize-none"
                    style={{ fontFamily: "Inter" }}
                    placeholder="Tell us about your project..."
                  />
                </div>

                {error && (
                  <div className="text-red-400 text-sm text-center py-2 px-4 bg-red-400/10 rounded-lg border border-red-400/30" style={{ fontFamily: "Inter" }}>
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#0EA5E9] text-white py-4 rounded-lg hover:bg-[#0EA5E9]/90 transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ fontFamily: "Inter", fontWeight: 700, fontSize: "16px" }}
                >
                  {loading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send to Tio"
                  )}
                </button>
              </form>

              <AnimatePresence>
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
                  >
                    <div className="bg-[#0D1117] border-2 border-[#00D1FF] rounded-2xl p-8 text-center shadow-2xl pointer-events-auto">
                      <TioThumbsUp className="w-24 h-24 mx-auto mb-4" />
                      <h3 className="text-white text-2xl mb-2" style={{ fontFamily: "Inter", fontWeight: 700 }}>
                        Got it!
                      </h3>
                      <p className="text-[#94A3B8]" style={{ fontFamily: "Inter" }}>
                        Tio is on the way with your message!
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-4">
            {contactInfo.map((info, i) => {
              const Icon = info.icon;
              return (
                <motion.div
                  key={i}
                  className="backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-[#00D1FF]/20 hover:border-[#00D1FF]/50 transition-all"
                  whileHover={{ x: 8 }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="p-3 rounded-lg"
                      style={{ background: `${info.color}20`, border: `1px solid ${info.color}` }}
                    >
                      <Icon size={24} style={{ color: info.color }} />
                    </div>
                    <div>
                      <h4 className="text-white mb-1" style={{ fontFamily: "Inter", fontWeight: 600, fontSize: "16px" }}>
                        {info.label}
                      </h4>
                      <p className="text-[#94A3B8] text-sm" style={{ fontFamily: "Inter" }}>
                        {info.value}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
