import type { ReactNode } from "react";
import type { WindowType } from "./window.types";

// Icono del escritorio
export interface DesktopIcon {
  id: string;                    // Identificador �nico
  title: string;                 // T�tulo del icono (ej: "Sobre m�")
  icon: ReactNode;               // Icono visual (emoji o componente)
  type: WindowType;              // Tipo de ventana que abre al hacer clic
}

// Proyecto individual
export interface Project {
  id: string;                    // Identificador �nico
  title: string;                 // Nombre del proyecto
  description: string;           // Descripci�n del proyecto
  image?: string;                // URL de imagen (opcional)
  tags: string[];                // Tecnolog�as usadas (ej: ["React", "TypeScript"])
  link?: string;                 // Link al proyecto en vivo (opcional)
  github?: string;               // Link al repositorio (opcional)
}

// Skill individual
export interface Skill {
  id: string;                    // Identificador �nico
  name: string;                  // Nombre de la skill (ej: "React")
  category: 'frontend' | 'backend' | 'tools' | 'other';  // Categor�a
  icon?: ReactNode;              // Icono visual (opcional)
}

// Informaci�n de contacto
export interface ContactInfo {
  email: string;                 // Email principal
  github?: string;               // URL de GitHub (opcional)
  linkedin?: string;             // URL de LinkedIn (opcional)
  twitter?: string;              // URL de Twitter (opcional)
  website?: string;              // Sitio web personal (opcional)
}
