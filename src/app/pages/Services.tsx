import { Link } from "react-router";
import { TioWaving } from "../components/TioMascot";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { projectId, publicAnonKey } from "/utils/supabase/info";
import { Loader2 } from "lucide-react";

const SERVER_URL = `https://${projectId}.supabase.co/functions/v1/make-server-df0cbbe5`;
const BASE = "https://mjsafqsqahwygjbpevvi.supabase.co/storage/v1/object/public/team-photos";

const serviceImages: Record<string, string> = {
  "1": `${BASE}/GCR.png`,
  "2": `${BASE}/ETS.png`,
  "3": `${BASE}/SMM.png`,
  "4": `${BASE}/OBS.png`,
};

interface Service {
  id: string;
  title: string;
  icon: string;
  description: string;
  available: boolean;
  order: number;
}

export function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${SERVER_URL}/services`, {
      headers: { Authorization: `Bearer ${publicAnonKey}` },
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.services) setServices(data.services);
        else setError("Failed to load services.");
      })
      .catch(() => setError("Could not connect to server."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="w-full min-h-screen py-20">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="text-center mb-16 relative">
          <h1 className="text-white mb-4" style={{ fontFamily: "Inter", fontWeight: 700, fontSize: "48px" }}>
            What We Offer
          </h1>
          <p className="text-[#94A3B8] text-xl" style={{ fontFamily: "Inter" }}>
            All services Commission-Based — Tio has got you covered
          </p>
          <motion.div
            className="absolute -top-16 left-1/2 -translate-x-1/2"
            animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <div className="relative">
              <TioWaving className="w-16 h-16" />
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-[#0EA5E9] text-white px-3 py-1 rounded text-xs whitespace-nowrap" style={{ fontFamily: "Inter", fontWeight: 700 }}>
                Commission-Based
              </div>
            </div>
          </motion.div>
        </div>

        {loading && (
          <div className="flex justify-center items-center py-20">
            <Loader2 size={40} className="animate-spin text-[#00D1FF]" />
          </div>
        )}

        {error && (
          <div className="text-center text-red-400 py-20">{error}</div>
        )}

        {!loading && !error && (
          <div className="flex flex-row gap-6 overflow-x-auto pb-4">
            {services.map((service, i) => (
              <motion.div
                key={service.id}
                className="bg-[#0D1117] border border-[#0EA5E9] rounded-xl overflow-hidden group flex-1 min-w-[220px]"
                whileHover={{ y: -8, borderColor: "#00D1FF", boxShadow: "0 0 30px rgba(0, 209, 255, 0.3)" }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative overflow-hidden h-[200px] flex items-center justify-center" style={{ background: "#060C1A" }}>
                  {serviceImages[service.id] ? (
                    <img
                      src={serviceImages[service.id]}
                      alt={service.title}
                      className="h-full w-full object-contain p-3 transition-transform duration-300 group-hover:scale-110"
                    />
                  ) : (
                    <span style={{ fontSize: "64px" }}>{service.icon}</span>
                  )}
                </div>
                <div className="h-px bg-[#00D1FF]" />
                <div className="p-5">
                  <h3 className="text-[#0EA5E9] mb-2" style={{ fontFamily: "Inter", fontWeight: 600, fontSize: "16px" }}>{service.title}</h3>
                  <p className="text-[#94A3B8] text-sm mb-4" style={{ fontFamily: "Inter", lineHeight: "1.5" }}>{service.description}</p>
                  <div className="h-px bg-[#94A3B8]/20 mb-4" />
                  <div className="flex justify-between items-center mb-4 text-sm">
                    <span className="text-white/80" style={{ fontFamily: "Inter" }}>Available Now</span>
                    <span className="text-[#00D1FF]" style={{ fontFamily: "Inter", fontWeight: 700 }}>Commission-Based</span>
                  </div>
                  <Link to="/contact" className="block w-full bg-[#0EA5E9] text-white text-center py-3 rounded-lg hover:bg-[#0EA5E9]/90 transition-colors text-sm" style={{ fontFamily: "Inter", fontWeight: 700 }}>
                    Get Started
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
