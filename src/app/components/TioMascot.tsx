import tio1 from "../../imports/1.png";
import tio2 from "../../imports/2.png";
import tio3 from "../../imports/3.png";
import tio4 from "../../imports/4.png";
import tio5 from "../../imports/5.png";
import tio6 from "../../imports/6.png";
import tio7 from "../../imports/7.png";
import tio8 from "../../imports/8.png";
import tio9 from "../../imports/9.png";

export function TioWaving({ className = "" }: { className?: string }) {
  return <img src={tio1} alt="Tio waving" className={className} style={{ objectFit: "contain" }} />;
}

export function TioSitting({ className = "" }: { className?: string }) {
  return <img src={tio2} alt="Tio sitting" className={className} style={{ objectFit: "contain" }} />;
}

export function TioThumbsUp({ className = "" }: { className?: string }) {
  return <img src={tio3} alt="Tio holding trophy" className={className} style={{ objectFit: "contain" }} />;
}

export function TioReading({ className = "" }: { className?: string }) {
  return <img src={tio4} alt="Tio with screen" className={className} style={{ objectFit: "contain" }} />;
}

export function TioFlying({ className = "" }: { className?: string }) {
  return <img src={tio5} alt="Tio delivering mail" className={className} style={{ objectFit: "contain" }} />;
}

export function TioCoding({ className = "" }: { className?: string }) {
  return <img src={tio6} alt="Tio with laptop" className={className} style={{ objectFit: "contain" }} />;
}

export function TioWinking({ className = "" }: { className?: string }) {
  return <img src={tio7} alt="Tio winking" className={className} style={{ objectFit: "contain" }} />;
}

export function TioHappy({ className = "" }: { className?: string }) {
  return <img src={tio8} alt="Tio happy" className={className} style={{ objectFit: "contain" }} />;
}

export function TioSleeping({ className = "" }: { className?: string }) {
  return <img src={tio9} alt="Tio confused" className={className} style={{ objectFit: "contain" }} />;
}
