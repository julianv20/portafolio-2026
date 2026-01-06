import { FaBriefcase, FaEnvelope, FaTools, FaUser } from "react-icons/fa";
import type {
  ContactInfo,
  DesktopIcon,
  Project,
  Skill,
} from "../types/portfolio.types";

export const DESKTOP_ICONS: DesktopIcon[] = [
  {
    id: "about",
    title: "Sobre mí",
    icon: <FaUser />,
    type: "about",
  },
  {
    id: "projects",
    title: "Proyectos",
    icon: <FaBriefcase />,
    type: "projects",
  },
  {
    id: "skills",
    title: "Skills",
    icon: <FaTools />,
    type: "skills",
  },
  {
    id: "contact",
    title: "Contacto",
    icon: <FaEnvelope />,
    type: "contact",
  },
];

export const PERSONAL_INFO = {
  name: "Julán Vanegas Muñoz",
  title: "Desarrollador Full Stack",
  bio: `Desarrollador apasionado por crear soluciones tecnológicas completas, con experiencia sólida en desarrollo frontend utilizando React y Next.js, y en el backend construyendo APIs robustas con Python y FastAPI. Me caracterizo por ser una persona con mentalidad de crecimiento continuo, siempre dispuesto a enfrentar nuevos desafíos tecnológicos y aprender las herramientas que cada proyecto requiera. Busco contribuir en equipos donde pueda aplicar mis conocimientos actuales mientras expando mis habilidades.`,
  certificationsFolder:
    "https://drive.google.com/drive/folders/1lVsXG0J7Q-I-LxuvF_hH1fXmt7h5Bblu",
};

export const PROJECTS: Project[] = [
  {
    id: "1",
    title: "Nimbutech",
    description:
      "Plataforma web completamente administrable con gestión dinámica de contenido, páginas y distribución. Sistema escalable para la gestión de múltiples secciones y componentes.",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    link: "https://nimbutech.com",
  },
  {
    id: "2",
    title: "KiireOffice",
    description:
      "Back office privado para Kiire que gestiona la generación de reportes especializados, actualización y consulta de datos de comercios, con integración a múltiples servicios de terceros.",
    tags: ["Angular", "FastAPI", "Python", "PostgreSQL", "Reportes"],
  },
  {
    id: "3",
    title: "Vinculate",
    description:
      "Plataforma web de Kiire dedicada a la vinculación y gestión de comercios. Responsable del mantenimiento y desarrollo de nuevas funcionalidades.",
    tags: ["Angular", "Node.js", "TypeScript", "PostgreSQL"],
    link: "https://vinculate.kiire.com",
  },
  {
    id: "4",
    title: "Proyectos Jeduca/Nimbutech",
    description:
      "Desarrollo de múltiples soluciones para clientes incluyendo landings interactivas, plataformas administrativas personalizadas y estimaciones de proyectos.",
    tags: ["React", "Next.js", "Node.js", "Diseño Responsivo", "Full Stack"],
  },
];

// Lista de skills
export const SKILLS: Skill[] = [
  { id: "1", name: "JavaScript  ", category: "frontend" },
  { id: "2", name: "React", category: "frontend" },
  { id: "3", name: "Next.js", category: "frontend" },
  { id: "4", name: "TypeScript", category: "frontend" },
  { id: "5", name: "Tailwind CSS", category: "frontend" },
  { id: "6", name: "Python", category: "backend" },
  { id: "7", name: "FastAPI", category: "backend" },
  { id: "8", name: "PostgreSQL", category: "backend" },
  { id: "9", name: "Git", category: "tools" },
];

// Información de contacto
export const CONTACT_INFO: ContactInfo = {
  email: "jullianvanegas19@gmail.com",
  github: "https://github.com/julianv20",
  linkedin: "https://www.linkedin.com/in/julian-vanegas-2a2300292/",
};
