import { useEffect, useState, useRef } from "react";
import type { WindowState } from "../../../core/types/window.types";
import WindowHeader from "./WindowHeader";
import AboutSection from "../../sections/about/components/AboutSection";
import ProjectsSection from "../../sections/projects/components/ProjectsSection";
import SkillsSection from "../../sections/skills/components/SkillsSection";
import ContactSection from "../../sections/contact/components/ContactSection";

type ResizeDirection = "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw";

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

  // Drag Handler
  const handleDragStart = (e: React.MouseEvent<HTMLDivElement>) => {
    if (windowState.isMaximized) return;

    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      windowX: windowState.position.x,
      windowY: windowState.position.y,
    };
  };

  // Resize Handler
  const handleResizeStart = (
    e: React.MouseEvent<HTMLDivElement>,
    direction: ResizeDirection
  ) => {
    if (windowState.isMaximized) return;

    e.stopPropagation();
    e.preventDefault();

    console.log("🔧 Resize Start:", {
      direction,
      startX: e.clientX,
      startY: e.clientY,
      currentSize: windowState.size,
      currentPosition: windowState.position,
    });

    setIsResizing(true);
    resizeStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      width: windowState.size.width,
      height: windowState.size.height,
      windowX: windowState.position.x,
      windowY: windowState.position.y,
      direction,
    };
  };

  // Global mouse move handler
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Handle dragging
      if (isDragging) {
        const deltaX = e.clientX - dragStartRef.current.x;
        const deltaY = e.clientY - dragStartRef.current.y;

        const newX = dragStartRef.current.windowX + deltaX;
        const newY = dragStartRef.current.windowY + deltaY;

        const limitedX = Math.max(0, Math.min(newX, window.innerWidth - 200));
        const limitedY = Math.max(0, Math.min(newY, window.innerHeight - 50));

        onUpdatePosition(windowState.id, limitedX, limitedY);
      }

      // Handle resizing
      if (isResizing) {
        const MIN_WIDTH = 300;
        const MIN_HEIGHT = 200;

        const deltaX = e.clientX - resizeStartRef.current.x;
        const deltaY = e.clientY - resizeStartRef.current.y;

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

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    if (isDragging || isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
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
          {/* Top border */}
          <div
            className="absolute left-0 right-0 h-[8px] cursor-n-resize"
            style={{ top: -4, zIndex: 1000 }}
            onMouseDown={(e) => handleResizeStart(e, "n")}
          />

          {/* Bottom border */}
          <div
            className="absolute left-0 right-0 h-[8px] cursor-s-resize"
            style={{ bottom: -4, zIndex: 1000 }}
            onMouseDown={(e) => handleResizeStart(e, "s")}
          />

          {/* Left border */}
          <div
            className="absolute top-0 bottom-0 w-[8px] cursor-w-resize"
            style={{ left: -4, zIndex: 1000 }}
            onMouseDown={(e) => handleResizeStart(e, "w")}
          />

          {/* Right border */}
          <div
            className="absolute top-0 bottom-0 w-[8px] cursor-e-resize"
            style={{ right: -4, zIndex: 1000 }}
            onMouseDown={(e) => handleResizeStart(e, "e")}
          />

          {/* Corner handles */}
          <div
            className="absolute w-[16px] h-[16px] cursor-nw-resize"
            style={{ top: -4, left: -4, zIndex: 1001 }}
            onMouseDown={(e) => handleResizeStart(e, "nw")}
          />
          <div
            className="absolute w-[16px] h-[16px] cursor-ne-resize"
            style={{ top: -4, right: -4, zIndex: 1001 }}
            onMouseDown={(e) => handleResizeStart(e, "ne")}
          />
          <div
            className="absolute w-[16px] h-[16px] cursor-sw-resize"
            style={{ bottom: -4, left: -4, zIndex: 1001 }}
            onMouseDown={(e) => handleResizeStart(e, "sw")}
          />
          <div
            className="absolute w-[16px] h-[16px] cursor-se-resize"
            style={{ bottom: -4, right: -4, zIndex: 1001 }}
            onMouseDown={(e) => handleResizeStart(e, "se")}
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
