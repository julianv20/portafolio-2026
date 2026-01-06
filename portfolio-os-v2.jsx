import React, { useState } from 'react';
import { X, Minus, Square } from 'lucide-react';

export default function PortfolioOS() {
  const [windows, setWindows] = useState({
    about: { open: false, size: { width: 450, height: 380 } },
    projects: { open: false, size: { width: 550, height: 450 } },
    skills: { open: false, size: { width: 500, height: 420 } },
    contact: { open: false, size: { width: 480, height: 400 } },
  });

  const [positions, setPositions] = useState({
    about: { x: 100, y: 100 },
    projects: { x: 250, y: 150 },
    skills: { x: 400, y: 200 },
    contact: { x: 550, y: 250 },
  });

  const [zIndex, setZIndex] = useState({});
  const [maxZ, setMaxZ] = useState(1);

  const toggleWindow = (windowName) => {
    setWindows(prev => ({
      ...prev,
      [windowName]: { ...prev[windowName], open: !prev[windowName].open }
    }));
    setMaxZ(maxZ + 1);
    setZIndex(prev => ({
      ...prev,
      [windowName]: maxZ + 1
    }));
  };

  const closeWindow = (windowName) => {
    setWindows(prev => ({
      ...prev,
      [windowName]: { ...prev[windowName], open: false }
    }));
  };

  const focusWindow = (windowName) => {
    setMaxZ(maxZ + 1);
    setZIndex(prev => ({
      ...prev,
      [windowName]: maxZ + 1
    }));
  };

  const updateWindowSize = (windowName, newSize) => {
    setWindows(prev => ({
      ...prev,
      [windowName]: { ...prev[windowName], size: newSize }
    }));
  };

  const updateWindowPosition = (windowName, newPosition) => {
    setPositions(prev => ({
      ...prev,
      [windowName]: newPosition
    }));
  };

  const desktopIcons = [
    { id: 'about', label: 'Sobre mí', icon: '👤' },
    { id: 'projects', label: 'Proyectos', icon: '💼' },
    { id: 'skills', label: 'Skills', icon: '⚙️' },
    { id: 'contact', label: 'Contacto', icon: '✉️' },
  ];

  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden relative">
      {/* Wallpaper Effect */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 pointer-events-none"></div>

      {/* Desktop Icons */}
      <div className="absolute top-8 left-8 w-28 space-y-8 z-0">
        {desktopIcons.map(icon => (
          <button
            key={icon.id}
            onClick={() => toggleWindow(icon.id)}
            className="flex flex-col items-center gap-3 hover:bg-white/10 p-4 rounded-lg transition-all duration-200 w-full group"
          >
            <div className="text-7xl filter drop-shadow-lg group-hover:scale-110 transition-transform duration-200">
              {icon.icon}
            </div>
            <span className="text-xs text-slate-200 text-center font-medium truncate w-full drop-shadow">
              {icon.label}
            </span>
          </button>
        ))}
      </div>

      {/* Windows */}
      {windows.about.open && (
        <FloatingWindow
          title="Sobre mí"
          isOpen={windows.about.open}
          onClose={() => closeWindow('about')}
          onFocus={() => focusWindow('about')}
          zIndex={zIndex.about || 1}
          position={positions.about}
          size={windows.about.size}
          onPositionChange={(pos) => updateWindowPosition('about', pos)}
          onSizeChange={(size) => updateWindowSize('about', size)}
        >
          <div className="p-6 space-y-5">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-bold text-sm mb-2 text-slate-900">👨‍💻 Hola, soy Julian</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Desarrollador Full Stack especializado en Python, FastAPI y React. 
                Trabajo en Kiire, una fintech colombiana, donde diseño soluciones escalables 
                para sistemas de pago y reconciliación financiera.
              </p>
            </div>
            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="font-bold text-sm mb-2 text-slate-900">🎓 Educación</h3>
              <p className="text-xs text-slate-600">
                Estudiante de Ingeniería de Software en Universidad Iberoamericana, Medellín.
              </p>
            </div>
            <div className="border-l-4 border-cyan-500 pl-4">
              <h3 className="font-bold text-sm mb-2 text-slate-900">💡 Especialidades</h3>
              <p className="text-xs text-slate-600">
                Clean Architecture, API REST, Database Design, AWS Infrastructure, Payment Processing
              </p>
            </div>
          </div>
        </FloatingWindow>
      )}

      {/* Projects Window */}
      {windows.projects.open && (
        <FloatingWindow
          title="Proyectos"
          isOpen={windows.projects.open}
          onClose={() => closeWindow('projects')}
          onFocus={() => focusWindow('projects')}
          zIndex={zIndex.projects || 1}
          position={positions.projects}
          size={windows.projects.size}
          onPositionChange={(pos) => updateWindowPosition('projects', pos)}
          onSizeChange={(size) => updateWindowSize('projects', size)}
        >
          <div className="p-6 space-y-3 max-h-96 overflow-y-auto">
            <ProjectItem
              name="Sistema de Pago Kiire"
              desc="API REST con FastAPI para procesamiento seguro de pagos"
              tech="FastAPI, PostgreSQL, AWS"
              color="blue"
            />
            <ProjectItem
              name="Validación Incocrédito"
              desc="Sistema de validación de datos para onboarding de comercios"
              tech="Python, FastAPI, PostgreSQL"
              color="purple"
            />
            <ProjectItem
              name="Dashboard Admin"
              desc="Interfaz de gestión en tiempo real para reconciliación financiera"
              tech="React 18, Tailwind, Redux"
              color="cyan"
            />
            <ProjectItem
              name="Migración a Clean Architecture"
              desc="Refactorización de arquitectura monolítica a modular"
              tech="Python, Design Patterns, Testing"
              color="pink"
            />
          </div>
        </FloatingWindow>
      )}

      {/* Skills Window */}
      {windows.skills.open && (
        <FloatingWindow
          title="Skills"
          isOpen={windows.skills.open}
          onClose={() => closeWindow('skills')}
          onFocus={() => focusWindow('skills')}
          zIndex={zIndex.skills || 1}
          position={positions.skills}
          size={windows.skills.size}
          onPositionChange={(pos) => updateWindowPosition('skills', pos)}
          onSizeChange={(size) => updateWindowSize('skills', size)}
        >
          <div className="p-6 space-y-3">
            <SkillCategory
              category="Backend"
              skills="Python, FastAPI, PostgreSQL, SQLAlchemy, RESTful APIs"
              color="blue"
            />
            <SkillCategory
              category="Frontend"
              skills="React 18, JavaScript, Tailwind CSS, HTML/CSS"
              color="purple"
            />
            <SkillCategory
              category="DevOps"
              skills="AWS, Docker, Git, GitHub Actions, CloudWatch"
              color="cyan"
            />
            <SkillCategory
              category="Tools"
              skills="Simetrik, Postman, VS Code, pgAdmin, DataGrip"
              color="pink"
            />
            <SkillCategory
              category="Soft Skills"
              skills="Problem Solving, Clean Code, Communication, Teamwork"
              color="amber"
            />
          </div>
        </FloatingWindow>
      )}

      {/* Contact Window */}
      {windows.contact.open && (
        <FloatingWindow
          title="Contacto"
          isOpen={windows.contact.open}
          onClose={() => closeWindow('contact')}
          onFocus={() => focusWindow('contact')}
          zIndex={zIndex.contact || 1}
          position={positions.contact}
          size={windows.contact.size}
          onPositionChange={(pos) => updateWindowPosition('contact', pos)}
          onSizeChange={(size) => updateWindowSize('contact', size)}
        >
          <div className="p-6 space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-900 block mb-2">Email</label>
              <input
                type="email"
                placeholder="tu@email.com"
                className="w-full px-3 py-2 border border-slate-300 bg-white text-xs outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-900 block mb-2">Mensaje</label>
              <textarea
                placeholder="Tu mensaje aquí..."
                rows="3"
                className="w-full px-3 py-2 border border-slate-300 bg-white text-xs outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded"
              />
            </div>
            <div className="flex gap-2">
              <button className="flex-1 px-3 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-xs font-semibold hover:from-blue-700 hover:to-blue-800 transition rounded shadow-md">
                Enviar
              </button>
              <button
                onClick={() => closeWindow('contact')}
                className="flex-1 px-3 py-2 border border-slate-300 text-slate-900 text-xs font-semibold hover:bg-slate-50 transition rounded"
              >
                Cancelar
              </button>
            </div>
            <div className="text-xs text-slate-600 space-y-1 pt-3 border-t border-slate-200">
              <p>📧 <span className="font-semibold">julian@example.com</span></p>
              <p>💼 <span className="font-semibold">linkedin.com/in/juliandeveloper</span></p>
              <p>🐙 <span className="font-semibold">github.com/juliandev</span></p>
            </div>
          </div>
        </FloatingWindow>
      )}

      {/* Dock */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-6">
        <div className="flex gap-4 bg-slate-950/90 backdrop-blur-xl px-8 py-4 rounded-full border border-slate-700/50 shadow-2xl">
          {desktopIcons.map(icon => (
            <button
              key={`dock-${icon.id}`}
              onClick={() => toggleWindow(icon.id)}
              className={`text-4xl p-3 rounded-lg hover:bg-white/20 transition-all duration-200 transform hover:scale-110 ${
                windows[icon.id].open ? 'bg-white/30 scale-110' : 'hover:bg-white/10'
              }`}
              title={icon.label}
            >
              {icon.icon}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Bar (Top) */}
      <div className="absolute top-0 left-0 right-0 h-10 bg-slate-950/60 backdrop-blur-sm border-b border-slate-700/50 flex items-center px-6 text-xs text-slate-300 font-medium">
        <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-bold">Portfolio OS 1.0</span>
        <div className="flex-1"></div>
        <span>Julian Valdez • Desarrollador Full Stack</span>
      </div>
    </div>
  );
}

function FloatingWindow({ title, isOpen, onClose, onFocus, zIndex, position, size, onPositionChange, onSizeChange, children }) {
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
    onFocus();
  };

  const handleResizeMouseDown = (e) => {
    e.preventDefault();
    setIsResizing(true);
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: size.width,
      height: size.height,
    });
    onFocus();
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      onPositionChange({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
    if (isResizing) {
      const newWidth = Math.max(300, resizeStart.width + (e.clientX - resizeStart.x));
      const newHeight = Math.max(250, resizeStart.height + (e.clientY - resizeStart.y));
      onSizeChange({ width: newWidth, height: newHeight });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
  };

  React.useEffect(() => {
    if (isDragging || isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, isResizing, dragStart, resizeStart, size, position]);

  return (
    <div
      style={{
        position: 'fixed',
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
        zIndex: zIndex,
      }}
      onClick={onFocus}
      className="bg-gradient-to-br from-slate-50 to-slate-100 border-2 border-slate-300 shadow-2xl rounded-lg flex flex-col overflow-hidden backdrop-blur-sm"
    >
      {/* Title Bar */}
      <div
        onMouseDown={handleMouseDown}
        className="bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 px-4 py-3 flex items-center justify-between cursor-move border-b border-slate-300 select-none"
      >
        <span className="text-sm font-bold text-slate-900">{title}</span>
        <div className="flex gap-2">
          <button
            onClick={onFocus}
            className="hover:bg-yellow-400 p-1.5 rounded transition duration-150"
          >
            <Minus size={16} className="text-slate-900" strokeWidth={2.5} />
          </button>
          <button
            onClick={onFocus}
            className="hover:bg-green-400 p-1.5 rounded transition duration-150"
          >
            <Square size={16} className="text-slate-900" strokeWidth={2.5} />
          </button>
          <button
            onClick={onClose}
            className="hover:bg-red-500 p-1.5 rounded transition duration-150"
          >
            <X size={16} className="text-slate-900" strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 bg-gradient-to-br from-slate-50 to-slate-100 text-slate-900 overflow-y-auto">
        {children}
      </div>

      {/* Resize Handle */}
      <div
        onMouseDown={handleResizeMouseDown}
        className="absolute bottom-0 right-0 w-6 h-6 bg-gradient-to-tl from-blue-400 to-transparent cursor-se-resize hover:from-blue-500 transition-all"
      ></div>
    </div>
  );
}

function ProjectItem({ name, desc, tech, color }) {
  const colorMap = {
    blue: 'border-l-blue-500',
    purple: 'border-l-purple-500',
    cyan: 'border-l-cyan-500',
    pink: 'border-l-pink-500',
  };

  return (
    <div className={`p-4 bg-gradient-to-br from-slate-50 to-slate-100 border-2 border-slate-200 border-l-4 ${colorMap[color]} rounded-lg hover:shadow-md transition-all cursor-pointer hover:border-slate-300`}>
      <h3 className="text-xs font-bold text-slate-900">{name}</h3>
      <p className="text-xs text-slate-700 mt-2 leading-relaxed">{desc}</p>
      <div className="flex gap-2 mt-3 flex-wrap">
        {tech.split(', ').map((t, i) => (
          <span key={i} className="text-xs bg-slate-300 text-slate-900 px-2.5 py-1 rounded font-medium">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function SkillCategory({ category, skills, color }) {
  const colorMap = {
    blue: 'text-blue-600',
    purple: 'text-purple-600',
    cyan: 'text-cyan-600',
    pink: 'text-pink-600',
    amber: 'text-amber-600',
  };

  return (
    <div className="p-3 bg-slate-100 rounded-lg border border-slate-200">
      <h3 className={`text-xs font-bold mb-1.5 ${colorMap[color]}`}>{category}</h3>
      <p className="text-xs text-slate-700 leading-relaxed">{skills}</p>
    </div>
  );
}