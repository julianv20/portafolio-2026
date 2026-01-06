// Posición de la ventana en el escritorio
export interface WindowPosition {
  x: number;
  y: number;
}

// Tamaño de la ventana
export interface WindowSize {
  width: number;
  height: number;
}

// Estado completo de una ventana
export interface WindowState {
  id: string;                    // Identificador único de la ventana
  title: string;                 // Título que aparece en el header
  type: WindowType;              // Tipo de contenido que muestra
  isOpen: boolean;               // Si la ventana está abierta o cerrada
  isMinimized: boolean;          // Si está minimizada
  isMaximized: boolean;          // Si está maximizada a pantalla completa
  position: WindowPosition;      // Posición (x, y) en el escritorio
  size: WindowSize;              // Tamaño (width, height)
  zIndex: number;                // Z-index para saber cuál está al frente
}

// Tipos de ventanas disponibles (una por cada sección)
export type WindowType = 'about' | 'projects' | 'skills' | 'contact';
