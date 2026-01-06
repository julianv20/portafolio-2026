import { VscChromeMinimize, VscChromeMaximize, VscChromeRestore, VscClose } from 'react-icons/vsc';
import { type MouseEvent as ReactMouseEvent } from 'react';

interface WindowHeaderProps {
  title: string;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  isMaximized: boolean;
  onDragStart?: (e: ReactMouseEvent<HTMLDivElement>) => void;
}

export default function WindowHeader({
  title,
  onClose,
  onMinimize,
  onMaximize,
  isMaximized,
  onDragStart,
}: WindowHeaderProps) {
  return (
    <div
      className="flex items-center justify-between px-4 py-3 select-none"
      style={{
        backgroundColor: '#252525',
        borderBottom: '1px solid #F7F7F7',
      }}
    >
      {/* Título - SOLO aquí se puede arrastrar */}
      <h3
        className="text-sm font-semibold cursor-move flex-1"
        style={{ color: '#F7F7F7' }}
        onMouseDown={onDragStart}
      >
        {title}
      </h3>

      {/* Botones */}
      <div className="flex items-center gap-2 pointer-events-auto">
        {/* Minimizar */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onMinimize();
          }}
          className="p-1.5 rounded transition-colors hover:bg-white/10"
          title="Minimizar"
          style={{ color: '#F7F7F7' }}
        >
          <VscChromeMinimize size={14} />
        </button>

        {/* Maximizar/Restaurar */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onMaximize();
          }}
          className="p-1.5 rounded transition-colors hover:bg-white/10"
          title={isMaximized ? 'Restaurar' : 'Maximizar'}
          style={{ color: '#F7F7F7' }}
        >
          {isMaximized ? (
            <VscChromeRestore size={14} />
          ) : (
            <VscChromeMaximize size={14} />
          )}
        </button>

        {/* Cerrar */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="p-1.5 rounded transition-colors hover:bg-red-500/20"
          title="Cerrar"
          style={{ color: '#FF5555' }}
        >
          <VscClose size={14} />
        </button>
      </div>
    </div>
  );
}
