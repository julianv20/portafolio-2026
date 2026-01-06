import type { ReactNode } from "react";
import type { WindowType } from "../../../core/types/window.types";

interface DesktopIconProps {
  title: string;
  icon: ReactNode;
  type: WindowType;
  onClick: (type: WindowType) => void;
  index: number;
}

// Colores según el tipo de icono
const getIconColor = (type: WindowType) => {
  const colors = {
    about: { bg: "#3EB0F9", text: "#000000" },
    projects: "#FF5500",
    skills: "#FFA61E",
    contact: "#3EB0F9",
  };
  return colors[type] || "#3EB0F9";
};

export default function DesktopIcon({
  title,
  icon,
  type,
  onClick,
  index,
}: DesktopIconProps) {
  const bgColor = getIconColor(type);

  return (
    <button
      onClick={() => onClick(type)}
      className="group flex flex-col items-center gap-3 p-5 rounded-lg
                 border-2 transition-all duration-75
                 cursor-pointer w-full max-w-[140px]
                 animate-slideUp"
      style={{
        backgroundColor: typeof bgColor === "string" ? bgColor : bgColor.bg,
        borderColor: "#EBEBEB",
        boxShadow: "3px 3px 0px 0px #EBEBEB",
        animationDelay: `${index * 0.1}s`,
        opacity: 0,
        animationFillMode: "forwards",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translate(-3px, -3px)";
        e.currentTarget.style.boxShadow = "6px 6px 0px 0px #F7F7F7";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translate(0, 0)";
        e.currentTarget.style.boxShadow = "3px 3px 0px 0px #F7F7F7";
      }}
    >
      {/* Icono */}
      <div
        className="text-4xl transition-all duration-75"
        style={{
          color: typeof bgColor === "object" ? bgColor.text : "#000000",
        }}
      >
        {icon}
      </div>

      {/* Título */}
      <span
        className="text-sm text-center font-semibold"
        style={{
          color: typeof bgColor === "object" ? bgColor.text : "#000000",
        }}
      >
        {title}
      </span>
    </button>
  );
}
