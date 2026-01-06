import { useState, useRef, useCallback } from "react";
import Desktop from "../features/desktop/components/Desktop";
import FloatingWindow from "../features/window/components/FloatingWindow";
import type { WindowState, WindowType } from "../core/types/window.types";

export default function PortfolioOS() {
  // Estado de las ventanas
  const [windows, setWindows] = useState<WindowState[]>([]);

  // Contador para z-index (para traer ventanas al frente)
  const zIndexCounter = useRef(1000);

  // Función para abrir una ventana
  const openWindow = (type: WindowType) => {
    // Verificar si la ventana ya está abierta
    const existingWindow = windows.find((w) => w.type === type);

    if (existingWindow) {
      // Si ya está abierta, traerla al frente
      bringToFront(existingWindow.id);
      // Si está minimizada, restaurarla
      if (existingWindow.isMinimized) {
        toggleMinimize(existingWindow.id);
      }
      return;
    }

    // Crear nueva ventana
    const newWindow: WindowState = {
      id: `window-${type}-${Date.now()}`,
      title: getTitleByType(type),
      type,
      isOpen: true,
      isMinimized: false,
      isMaximized: false,
      position: {
        x: 100 + windows.length * 30, // Offset para ventanas nuevas
        y: 100 + windows.length * 30,
      },
      size: {
        width: 600,
        height: 400,
      },
      zIndex: zIndexCounter.current++,
    };

    setWindows([...windows, newWindow]);
  };

  // Función para cerrar una ventana
  const closeWindow = (id: string) => {
    setWindows((prevWindows) => prevWindows.filter((w) => w.id !== id));
  };

  // Función para minimizar/restaurar ventana
  const toggleMinimize = (id: string) => {
    setWindows((prevWindows) =>
      prevWindows.map((w) =>
        w.id === id ? { ...w, isMinimized: !w.isMinimized } : w
      )
    );
  };

  // Función para maximizar/restaurar ventana
  const toggleMaximize = (id: string) => {
    setWindows((prevWindows) =>
      prevWindows.map((w) =>
        w.id === id ? { ...w, isMaximized: !w.isMaximized } : w
      )
    );
  };

  // Función para traer ventana al frente
  const bringToFront = useCallback((id: string) => {
    setWindows((prevWindows) =>
      prevWindows.map((w) =>
        w.id === id ? { ...w, zIndex: zIndexCounter.current++ } : w
      )
    );
  }, []);

  // Función para actualizar posición de ventana
  const updateWindowPosition = useCallback((id: string, x: number, y: number) => {
    setWindows((prevWindows) =>
      prevWindows.map((w) => (w.id === id ? { ...w, position: { x, y } } : w))
    );
  }, []);

  // Función para actualizar tamaño de ventana
  const updateWindowSize = useCallback((id: string, width: number, height: number) => {
    setWindows((prevWindows) =>
      prevWindows.map((w) => (w.id === id ? { ...w, size: { width, height } } : w))
    );
  }, []);

  // Helper para obtener título según tipo
  const getTitleByType = (type: WindowType): string => {
    const titles = {
      about: "Sobre mí",
      projects: "Proyectos",
      skills: "Skills",
      contact: "Contacto",
    };
    return titles[type];
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Desktop con iconos */}
      <Desktop onOpenWindow={openWindow} />

      {/* Ventanas flotantes */}
      {windows.map((window) => (
        <FloatingWindow
          key={window.id}
          window={window}
          onClose={() => closeWindow(window.id)}
          onMinimize={() => toggleMinimize(window.id)}
          onMaximize={() => toggleMaximize(window.id)}
          onBringToFront={() => bringToFront(window.id)}
          onUpdatePosition={updateWindowPosition}
          onUpdateSize={updateWindowSize}
        />
      ))}
    </div>
  );
}
