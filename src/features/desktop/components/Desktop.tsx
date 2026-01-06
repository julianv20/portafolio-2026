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

      {/* Decoraciones - estrellas que se mueven diagonalmente con parpadeo */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Estrella 1 - Mediana */}
        <div
          className="absolute top-[5%] left-[10%]"
          style={{ animation: 'starMove 50s linear infinite' }}
        >
          <div
            className="star"
            style={{ animation: 'twinkle 3s ease-in-out infinite' }}
          />
        </div>

        {/* Estrella 2 - Pequeña */}
        <div
          className="absolute top-[15%] left-[25%]"
          style={{ animation: 'starMoveFast 35s linear infinite 8s' }}
        >
          <div
            className="star-small"
            style={{ animation: 'twinkleFast 2s ease-in-out infinite 0.5s' }}
          />
        </div>

        {/* Estrella 3 - Grande */}
        <div
          className="absolute top-[8%] left-[40%]"
          style={{ animation: 'starMoveSlow 70s linear infinite 18s' }}
        >
          <div
            className="star-large"
            style={{ animation: 'twinkleSlow 4s ease-in-out infinite 1s' }}
          />
        </div>

        {/* Estrella 4 - Mediana */}
        <div
          className="absolute top-[20%] left-[5%]"
          style={{ animation: 'starMove 55s linear infinite 28s' }}
        >
          <div
            className="star"
            style={{ animation: 'twinkle 3.5s ease-in-out infinite 1.5s' }}
          />
        </div>

        {/* Estrella 5 - Pequeña */}
        <div
          className="absolute top-[12%] left-[55%]"
          style={{ animation: 'starMoveFast 38s linear infinite 14s' }}
        >
          <div
            className="star-small"
            style={{ animation: 'twinkleFast 2.5s ease-in-out infinite 0.3s' }}
          />
        </div>

        {/* Estrella 6 - Mediana */}
        <div
          className="absolute top-[18%] left-[70%]"
          style={{ animation: 'starMoveSlow 65s linear infinite 38s' }}
        >
          <div
            className="star"
            style={{ animation: 'twinkleSlow 4.5s ease-in-out infinite 2s' }}
          />
        </div>

        {/* Estrella 7 - Pequeña */}
        <div
          className="absolute top-[10%] left-[35%]"
          style={{ animation: 'starMove 48s linear infinite 22s' }}
        >
          <div
            className="star-small"
            style={{ animation: 'twinkle 3.2s ease-in-out infinite 0.8s' }}
          />
        </div>

        {/* Estrella 8 - Mediana */}
        <div
          className="absolute top-[6%] left-[20%]"
          style={{ animation: 'starMoveFast 32s linear infinite 5s' }}
        >
          <div
            className="star"
            style={{ animation: 'twinkleFast 2.3s ease-in-out infinite 0.2s' }}
          />
        </div>

        {/* Estrella 9 - Grande */}
        <div
          className="absolute top-[14%] left-[50%]"
          style={{ animation: 'starMoveSlow 75s linear infinite 45s' }}
        >
          <div
            className="star-large"
            style={{ animation: 'twinkleSlow 4.2s ease-in-out infinite 1.8s' }}
          />
        </div>

        {/* Estrella 10 - Pequeña */}
        <div
          className="absolute top-[22%] left-[15%]"
          style={{ animation: 'starMove 52s linear infinite 32s' }}
        >
          <div
            className="star-small"
            style={{ animation: 'twinkle 3.8s ease-in-out infinite 1.2s' }}
          />
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
