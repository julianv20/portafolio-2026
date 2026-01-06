import { useState, useCallback, type MouseEvent } from 'react';

interface UseWindowDragProps {
  windowId: string;
  currentPosition: { x: number; y: number };
  onUpdatePosition: (id: string, x: number, y: number) => void;
  isMaximized: boolean;
}

export function useWindowDrag({
  windowId,
  currentPosition,
  onUpdatePosition,
  isMaximized,
}: UseWindowDragProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      // No permitir drag si est� maximizada
      if (isMaximized) return;

      // Solo permitir drag si se clickea en el header (target con cursor-move)
      const target = e.target as HTMLElement;
      if (!target.classList.contains('cursor-move') && !target.closest('.cursor-move')) {
        return;
      }

      setIsDragging(true);
      setDragOffset({
        x: e.clientX - currentPosition.x,
        y: e.clientY - currentPosition.y,
      });
    },
    [currentPosition, isMaximized]
  );

  const handleMouseMove = useCallback(
    (e: globalThis.MouseEvent) => {
      if (!isDragging) return;

      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;

      // Limitar para que no se salga de la pantalla (opcional)
      const limitedX = Math.max(0, Math.min(newX, window.innerWidth - 200));
      const limitedY = Math.max(0, Math.min(newY, window.innerHeight - 50));

      onUpdatePosition(windowId, limitedX, limitedY);
    },
    [isDragging, dragOffset, windowId, onUpdatePosition]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Event listeners globales
  const startDragging = useCallback(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return {
    isDragging,
    handleMouseDown,
    startDragging,
  };
}
