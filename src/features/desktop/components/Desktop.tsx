import { DESKTOP_ICONS } from "../../../core/constants/portfolio.constants";
import type { WindowType } from "../../../core/types/window.types";
import DesktopIcon from "./DesktopIcon";

interface DesktopProps {
  onOpenWindow: (type: WindowType) => void;
}

export default function Desktop({ onOpenWindow }: DesktopProps) {
  return (
    <div className="relative w-full h-screen overflow-hidden" style={{ backgroundColor: '#1A1A1A' }}>
      {/* Fondo con patrón de grid sutil */}
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.8) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.8) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Decoraciones - asteriscos flotantes animados */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-[10%] left-[15%] text-white text-2xl"
          style={{ animation: 'twinkle 3s ease-in-out infinite' }}
        >
          ✦
        </div>
        <div
          className="absolute top-[25%] right-[20%] text-white text-xl"
          style={{ animation: 'twinkleFast 2s ease-in-out infinite 0.5s' }}
        >
          ✦
        </div>
        <div
          className="absolute top-[60%] left-[10%] text-white text-3xl"
          style={{ animation: 'twinkleSlow 4s ease-in-out infinite 1s' }}
        >
          ✦
        </div>
        <div
          className="absolute top-[45%] right-[15%] text-white text-2xl"
          style={{ animation: 'twinkle 3.5s ease-in-out infinite 1.5s' }}
        >
          ✦
        </div>
        <div
          className="absolute bottom-[20%] left-[25%] text-white text-xl"
          style={{ animation: 'twinkleFast 2.5s ease-in-out infinite 0.3s' }}
        >
          ✦
        </div>
        <div
          className="absolute bottom-[35%] right-[30%] text-white text-2xl"
          style={{ animation: 'twinkleSlow 4.5s ease-in-out infinite 2s' }}
        >
          ✦
        </div>
      </div>

      {/* Contenedor de iconos */}
      <div className="relative z-10 p-8 flex flex-col gap-4 items-start">
        {DESKTOP_ICONS.map((iconData, index) => (
          <DesktopIcon
            key={iconData.id}
            title={iconData.title}
            icon={iconData.icon}
            type={iconData.type}
            onClick={onOpenWindow}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
