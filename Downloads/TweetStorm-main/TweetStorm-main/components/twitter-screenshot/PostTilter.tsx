'use client';

import { useCallback, useEffect } from 'react';

interface PostTilterProps {
  setHandlePos: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>;
  setTilt: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>;
  isDragging: React.MutableRefObject<boolean>;
  handlePos: { x: number; y: number };
}

function PostTilter({
  setHandlePos,
  setTilt,
  isDragging,
  handlePos,
}: PostTilterProps) {
  const maxHandleDistance = 14;

  function clampCircular(x: number, y: number, maxDistance: number) {
    const distance = Math.sqrt(x * x + y * y);
    if (distance <= maxDistance) return { x, y };

    const scale = maxDistance / distance;
    return {
      x: x * scale,
      y: y * scale,
    };
  }

  const updateTilt = useCallback(
    (deltaX: number, deltaY: number) => {
      setHandlePos((prevHandle: any) => {
        const newHandleX = prevHandle.x + deltaX * 0.3;
        const newHandleY = prevHandle.y + deltaY * 0.3; // No inversion here

        // Clamp so the dragger stays inside the parent's circular boundary (edge-safe)
        const { x: clampedX, y: clampedY } = clampCircular(
          newHandleX,
          newHandleY,
          maxHandleDistance
        );

        setTilt({
          x: -clampedY / 0.8, // Front/back tilt
          y: clampedX / 0.8, // Left/right tilt
        });
        return {
          x: clampedX,
          y: clampedY,
        };
      });
    },
    [setHandlePos, setTilt]
  );

  function resetTilt() {
    // Smooth reset animation
    setTilt({ x: 0, y: 0 });
    setHandlePos({ x: 0, y: 0 });
  }

  const handleMouseDown = useCallback(() => {
    isDragging.current = true;
  }, [isDragging]);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging.current) {
        return;
      }
      updateTilt(-e.movementX, -e.movementY);
    },
    [isDragging, updateTilt]
  );

  const handleMouseUp = useCallback(() => {
    if (!isDragging.current) {
      return;
    }
    isDragging.current = false;
    // Only reset the handle position, keep the tilt as is
    setHandlePos({ x: 0, y: 0 });
  }, [isDragging, setHandlePos]);

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => handleMouseMove(e);
    const handleGlobalMouseUp = () => handleMouseUp();

    window.addEventListener('mousemove', handleGlobalMouseMove);
    window.addEventListener('mouseup', handleGlobalMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  return (
    <div className='flex items-center gap-2'>
      <div
        onMouseDown={handleMouseDown}
        className='w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center shadow-md cursor-grab active:cursor-grabbing relative'
      >
        <div
          className='w-5 h-5 bg-gray-500 rounded-full absolute'
          style={{
            transform: `translate(${-handlePos.x}px, ${-handlePos.y}px)`,
            transition: isDragging.current
              ? 'none'
              : 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        ></div>
      </div>

      <button
        onClick={resetTilt}
        className='bg-gray-300 cursor-pointer p-1 text-sm dark:bg-gray-700 text-white rounded-lg hover:bg-blue-600 transition-colors'
      >
        Reset
      </button>
    </div>
  );
}

export default PostTilter;
