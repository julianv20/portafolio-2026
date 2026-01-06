import { useState, useRef, useCallback } from "react";
import Desktop from "../features/desktop/components/Desktop";
import FloatingWindow from "../features/window/components/FloatingWindow";
import type { WindowState, WindowType } from "../core/types/window.types";
import { useWindowSize } from "../core/hooks/useWindowSize";

export default function PortfolioOS() {
  // Detectar tamaño de pantalla
  const screenSize = useWindowSize();

  // Estado de las ventanas
  const [windows, setWindows] = useState<WindowState[]>([]);

  // Contador para z-index (para traer ventanas al frente)
  const zIndexCounter = useRef(1000);

  // Función para calcular tamaño de ventana según pantalla
  const getResponsiveWindowSize = () => {
    const isMobile = screenSize.width < 768; // Breakpoint md de Tailwind
    const isTablet = screenSize.width >= 768 && screenSize.width < 1024;

    if (isMobile) {
      // En móvil: ocupar casi toda la pantalla dejando margen
      return {
        width: Math.min(screenSize.width - 40, screenSize.width * 0.95),
        height: Math.min(screenSize.height - 100, screenSize.height * 0.85),
      };
    } else if (isTablet) {
      // En tablet: 80% del tamaño
      return {
        width: Math.min(600, screenSize.width * 0.8),
        height: Math.min(500, screenSize.height * 0.7),
      };
    } else {
      // En desktop: tamaño fijo estándar
      return {
        width: 600,
        height: 400,
      };
    }
  };

  // Función para calcular posición inicial según pantalla
  const getResponsiveWindowPosition = (windowIndex: number) => {
    const isMobile = screenSize.width < 768;

    if (isMobile) {
      // En móvil: centrar la ventana
      const size = getResponsiveWindowSize();
      return {
        x: Math.max(20, (screenSize.width - size.width) / 2),
        y: Math.max(20, (screenSize.height - size.height) / 2),
      };
    } else {
      // En desktop/tablet: offset progresivo
      return {
        x: 100 + windowIndex * 30,
        y: 100 + windowIndex * 30,
      };
    }
  };

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

    // Crear nueva ventana con tamaño y posición responsive
    const newWindow: WindowState = {
      id: `window-${type}-${Date.now()}`,
      title: getTitleByType(type),
      type,
      isOpen: true,
      isMinimized: false,
      isMaximized: false,
      position: getResponsiveWindowPosition(windows.length),
      size: getResponsiveWindowSize(),
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
