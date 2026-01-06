import { useEffect, useState, useRef } from "react";
import type { WindowState } from "../../../core/types/window.types";
import WindowHeader from "./WindowHeader";
import AboutSection from "../../sections/about/components/AboutSection";
import ProjectsSection from "../../sections/projects/components/ProjectsSection";
import SkillsSection from "../../sections/skills/components/SkillsSection";
import ContactSection from "../../sections/contact/components/ContactSection";

type ResizeDirection = "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw";

// Helper para obtener coordenadas uniformes de mouse y touch
const getEventCoordinates = (e: MouseEvent | TouchEvent | React.MouseEvent | React.TouchEvent) => {
  if ('touches' in e) {
    // Evento táctil
    const touch = e.touches[0] || e.changedTouches[0];
    return { clientX: touch.clientX, clientY: touch.clientY };
  }
  // Evento de mouse
  return { clientX: (e as MouseEvent | React.MouseEvent).clientX, clientY: (e as MouseEvent | React.MouseEvent).clientY };
};

interface FloatingWindowProps {
  window: WindowState;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onBringToFront: () => void;
  onUpdatePosition: (id: string, x: number, y: number) => void;
  onUpdateSize: (id: string, width: number, height: number) => void;
}

export default function FloatingWindow({
  window: windowState,
  onClose,
  onMinimize,
  onMaximize,
  onBringToFront,
  onUpdatePosition,
  onUpdateSize,
}: FloatingWindowProps) {
  const windowRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0, windowX: 0, windowY: 0 });
  const resizeStartRef = useRef({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    windowX: 0,
    windowY: 0,
    direction: "" as ResizeDirection,
  });

  // Drag Handler - Soporta mouse y touch
  const handleDragStart = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (windowState.isMaximized) return;

    const coords = getEventCoordinates(e);
    setIsDragging(true);
    dragStartRef.current = {
      x: coords.clientX,
      y: coords.clientY,
      windowX: windowState.position.x,
      windowY: windowState.position.y,
    };
  };

  // Resize Handler - Soporta mouse y touch
  const handleResizeStart = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
    direction: ResizeDirection
  ) => {
    if (windowState.isMaximized) return;

    e.stopPropagation();
    e.preventDefault();

    const coords = getEventCoordinates(e);

    console.log("🔧 Resize Start:", {
      direction,
      startX: coords.clientX,
      startY: coords.clientY,
      currentSize: windowState.size,
      currentPosition: windowState.position,
    });

    setIsResizing(true);
    resizeStartRef.current = {
      x: coords.clientX,
      y: coords.clientY,
      width: windowState.size.width,
      height: windowState.size.height,
      windowX: windowState.position.x,
      windowY: windowState.position.y,
      direction,
    };
  };

  // Global move handler - Soporta mouse y touch
  useEffect(() => {
    const handleMove = (e: MouseEvent | TouchEvent) => {
      const coords = getEventCoordinates(e);

      // Handle dragging
      if (isDragging) {
        const deltaX = coords.clientX - dragStartRef.current.x;
        const deltaY = coords.clientY - dragStartRef.current.y;

        const newX = dragStartRef.current.windowX + deltaX;
        const newY = dragStartRef.current.windowY + deltaY;

        const limitedX = Math.max(0, Math.min(newX, window.innerWidth - 200));
        const limitedY = Math.max(0, Math.min(newY, window.innerHeight - 50));

        onUpdatePosition(windowState.id, limitedX, limitedY);
      }

      // Handle resizing
      if (isResizing) {
        // Tamaños mínimos responsive
        const isMobile = window.innerWidth < 768;
        const MIN_WIDTH = isMobile ? 280 : 300;
        const MIN_HEIGHT = isMobile ? 200 : 200;

        const deltaX = coords.clientX - resizeStartRef.current.x;
        const deltaY = coords.clientY - resizeStartRef.current.y;

        let newWidth = resizeStartRef.current.width;
        let newHeight = resizeStartRef.current.height;
        let newX = resizeStartRef.current.windowX;
        let newY = resizeStartRef.current.windowY;

        const dir = resizeStartRef.current.direction;

        // Handle horizontal resize
        if (dir.includes("e")) {
          newWidth = Math.max(MIN_WIDTH, resizeStartRef.current.width + deltaX);
        }
        if (dir.includes("w")) {
          const potentialWidth = resizeStartRef.current.width - deltaX;
          if (potentialWidth >= MIN_WIDTH) {
            newWidth = potentialWidth;
            newX = resizeStartRef.current.windowX + deltaX;
          }
        }

        // Handle vertical resize
        if (dir.includes("s")) {
          newHeight = Math.max(
            MIN_HEIGHT,
            resizeStartRef.current.height + deltaY
          );
        }
        if (dir.includes("n")) {
          const potentialHeight = resizeStartRef.current.height - deltaY;
          if (potentialHeight >= MIN_HEIGHT) {
            newHeight = potentialHeight;
            newY = resizeStartRef.current.windowY + deltaY;
          }
        }

        // Update size
        onUpdateSize(windowState.id, newWidth, newHeight);

        // Update position if changed
        if (
          newX !== resizeStartRef.current.windowX ||
          newY !== resizeStartRef.current.windowY
        ) {
          console.log("📍 Updating position:", {
            direction: dir,
            newX,
            newY,
            startX: resizeStartRef.current.windowX,
            startY: resizeStartRef.current.windowY,
          });
          onUpdatePosition(windowState.id, newX, newY);
        }
      }
    };

    const handleEnd = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    if (isDragging || isResizing) {
      // Prevenir scroll en móvil durante drag/resize
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';

      // Event listeners para mouse
      document.addEventListener("mousemove", handleMove);
      document.addEventListener("mouseup", handleEnd);

      // Event listeners para touch
      document.addEventListener("touchmove", handleMove, { passive: false });
      document.addEventListener("touchend", handleEnd);

      return () => {
        // Restaurar scroll
        document.body.style.overflow = '';
        document.body.style.touchAction = '';

        // Limpiar listeners
        document.removeEventListener("mousemove", handleMove);
        document.removeEventListener("mouseup", handleEnd);
        document.removeEventListener("touchmove", handleMove);
        document.removeEventListener("touchend", handleEnd);
      };
    }
  }, [isDragging, isResizing, windowState.id, onUpdatePosition, onUpdateSize]);

  if (windowState.isMinimized) {
    return null;
  }

  return (
    <div
      ref={windowRef}
      className="absolute select-none"
      style={{
        left: windowState.isMaximized ? 0 : windowState.position.x,
        top: windowState.isMaximized ? 0 : windowState.position.y,
        width: windowState.isMaximized ? "100vw" : windowState.size.width,
        height: windowState.isMaximized ? "100vh" : windowState.size.height,
        zIndex: windowState.zIndex,
      }}
      onClick={onBringToFront}
    >
      {/* Resize handles - OUTSIDE the main window container */}
      {!windowState.isMaximized && (
        <>
          {/* Top border - más grande en móvil */}
          <div
            className="absolute left-0 right-0 h-[8px] md:h-[8px] cursor-n-resize touch-none"
            style={{ top: -4, zIndex: 1000 }}
            onMouseDown={(e) => handleResizeStart(e, "n")}
            onTouchStart={(e) => handleResizeStart(e, "n")}
          />

          {/* Bottom border - más grande en móvil */}
          <div
            className="absolute left-0 right-0 h-[8px] md:h-[8px] cursor-s-resize touch-none"
            style={{ bottom: -4, zIndex: 1000 }}
            onMouseDown={(e) => handleResizeStart(e, "s")}
            onTouchStart={(e) => handleResizeStart(e, "s")}
          />

          {/* Left border - más grande en móvil */}
          <div
            className="absolute top-0 bottom-0 w-[8px] md:w-[8px] cursor-w-resize touch-none"
            style={{ left: -4, zIndex: 1000 }}
            onMouseDown={(e) => handleResizeStart(e, "w")}
            onTouchStart={(e) => handleResizeStart(e, "w")}
          />

          {/* Right border - más grande en móvil */}
          <div
            className="absolute top-0 bottom-0 w-[8px] md:w-[8px] cursor-e-resize touch-none"
            style={{ right: -4, zIndex: 1000 }}
            onMouseDown={(e) => handleResizeStart(e, "e")}
            onTouchStart={(e) => handleResizeStart(e, "e")}
          />

          {/* Corner handles - más grandes en móvil */}
          <div
            className="absolute w-[24px] h-[24px] md:w-[16px] md:h-[16px] cursor-nw-resize touch-none"
            style={{ top: -8, left: -8, zIndex: 1001 }}
            onMouseDown={(e) => handleResizeStart(e, "nw")}
            onTouchStart={(e) => handleResizeStart(e, "nw")}
          />
          <div
            className="absolute w-[24px] h-[24px] md:w-[16px] md:h-[16px] cursor-ne-resize touch-none"
            style={{ top: -8, right: -8, zIndex: 1001 }}
            onMouseDown={(e) => handleResizeStart(e, "ne")}
            onTouchStart={(e) => handleResizeStart(e, "ne")}
          />
          <div
            className="absolute w-[24px] h-[24px] md:w-[16px] md:h-[16px] cursor-sw-resize touch-none"
            style={{ bottom: -8, left: -8, zIndex: 1001 }}
            onMouseDown={(e) => handleResizeStart(e, "sw")}
            onTouchStart={(e) => handleResizeStart(e, "sw")}
          />
          <div
            className="absolute w-[24px] h-[24px] md:w-[16px] md:h-[16px] cursor-se-resize touch-none"
            style={{ bottom: -8, right: -8, zIndex: 1001 }}
            onMouseDown={(e) => handleResizeStart(e, "se")}
            onTouchStart={(e) => handleResizeStart(e, "se")}
          />
        </>
      )}

      {/* Main window container */}
      <div
        className={`w-full h-full rounded-lg flex flex-col ${
          isDragging ? "cursor-grabbing" : ""
        }`}
        style={{
          backgroundColor: "#1A1A1A",
          border: "2px solid #F7F7F7",
          boxShadow: "5px 5px 0px 0px #F7F7F7",
        }}
      >
        <WindowHeader
          title={windowState.title}
          onClose={onClose}
          onMinimize={onMinimize}
          onMaximize={onMaximize}
          isMaximized={windowState.isMaximized}
          onDragStart={handleDragStart}
        />

        {/* Content */}
        <div className="flex-1  overflow-y-auto overflow-x-hidden">
          {windowState.type === "about" && <AboutSection />}
          {windowState.type === "projects" && <ProjectsSection />}
          {windowState.type === "skills" && <SkillsSection />}
          {windowState.type === "contact" && <ContactSection />}
        </div>
      </div>
    </div>
  );
}
