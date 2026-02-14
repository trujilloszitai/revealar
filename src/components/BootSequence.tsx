import { useEffect, useRef, useState } from 'react';
import { animate } from 'animejs';
import Typed from 'typed.js';

interface BootSequenceProps {
  onComplete: () => void;
  isMuted: boolean;
}

const bootMessages = [
  { text: '> Verificando integridad de la memoria...', delay: 500, status: 'OK' },
  { text: '> Accediendo a memorias del sistema...', delay: 800, status: 'OK' },
  { text: '> Desencriptando datos emocionales...', delay: 1200, status: 'PROCESANDO' },
  { text: '> Localizando shared_photos.zip...', delay: 600, status: '' },
  { text: '> Montando sentimental_drive_01...', delay: 900, status: '' },
];

export default function BootSequence({ onComplete, isMuted }: BootSequenceProps) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [displayedMessages, setDisplayedMessages] = useState<Array<{ text: string; status: string }>>([]);
  const [progress, setProgress] = useState(0);
  const [showAwaitingInput, setShowAwaitingInput] = useState(false);
  const typedRef = useRef<HTMLSpanElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Boot messages sequence
  useEffect(() => {
    if (currentMessageIndex >= bootMessages.length) {
      // Start progress bar animation after messages
      setTimeout(() => {
        animateProgressBar();
      }, 500);
      return;
    }

    const message = bootMessages[currentMessageIndex];
    
    const timer = setTimeout(() => {
      setDisplayedMessages(prev => [...prev, { text: message.text, status: message.status }]);
      setCurrentMessageIndex(prev => prev + 1);
    }, message.delay);

    return () => clearTimeout(timer);
  }, [currentMessageIndex]);

  // Progress bar animation
  const animateProgressBar = () => {
    if (!progressBarRef.current) return;

    let currentProgress = 0;
    const duration = 4000;
    const startTime = Date.now();
    
    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(100, (elapsed / duration) * 100);
      currentProgress = Math.round(progress);
      setProgress(currentProgress);
      
      if (elapsed < duration) {
        requestAnimationFrame(updateProgress);
      } else {
        setTimeout(() => {
          setShowAwaitingInput(true);
        }, 500);
      }
    };
    
    requestAnimationFrame(updateProgress);
  };

  // Awaiting input typed effect
  useEffect(() => {
    if (showAwaitingInput && typedRef.current) {
      const typed = new Typed(typedRef.current, {
        strings: ['ESPERANDO ENTRADA...'],
        typeSpeed: 50,
        showCursor: true,
        cursorChar: '█',
        onComplete: () => {
          setTimeout(() => {
            onComplete();
          }, 1500);
        }
      });

      return () => typed.destroy();
    }
  }, [showAwaitingInput, onComplete]);

  // Glowing animation for container
  useEffect(() => {
    if (containerRef.current) {
      animate(containerRef.current, {
        boxShadow: [
          '0 0 20px rgba(0, 255, 0, 0.1)',
          '0 0 40px rgba(0, 255, 0, 0.2)',
          '0 0 20px rgba(0, 255, 0, 0.1)'
        ],
        duration: 2000,
        loop: true,
        ease: 'inOutSine'
      });
    }
  }, []);

  const getBlocksCount = () => Math.floor(progress / 5);
  const currentDate = new Date().toLocaleDateString('es-ES', { 
    day: '2-digit', 
    month: '2-digit', 
    year: 'numeric' 
  }).replace(/\//g, '-');

  return (
    <div className="min-h-dvh bg-[#0a0a0a] flex flex-col items-center justify-center px-4 py-8 sm:p-6 crt-effect">
      <div className="scanline"></div>

      {/* Main title */}
      <div className="text-center mb-6 sm:mb-10 md:mb-12 px-2">
        <h1 className="terminal-font terminal-text text-2xl sm:text-4xl md:text-5xl lg:text-6xl mb-2 terminal-glow leading-tight">
          *** RETRO-OS V1.02 ***
        </h1>
        <p className="terminal-font terminal-text-dim text-sm sm:text-base md:text-lg tracking-[0.15em] sm:tracking-[0.3em]">
          SECUENCIA DE ARRANQUE INICIADA
        </p>
      </div>

      {/* Terminal window */}
      <div 
        ref={containerRef}
        className="terminal-container w-full max-w-2xl p-4 sm:p-6 mb-6 sm:mb-8 mx-auto"
      >
        <div className="space-y-1.5 sm:space-y-2">
          {displayedMessages.map((msg, index) => (
            <div key={index} className="flex flex-wrap items-center gap-1 sm:gap-2 terminal-font text-sm sm:text-lg md:text-xl">
              <span className="terminal-text break-all sm:break-normal">{msg.text}</span>
              {msg.status && (
                <span className={`${msg.status === 'PROCESANDO' ? 'text-yellow-400' : 'terminal-text'}`}>
                  {msg.status}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Progress bar section */}
      {currentMessageIndex >= bootMessages.length && (
        <div className="w-full max-w-2xl mb-6 sm:mb-8 px-1">
          <div className="flex justify-between terminal-font terminal-text text-xs sm:text-sm mb-2">
            <span>CARGANDO ASSETS</span>
            <span>{progress}%</span>
          </div>
          
          <div className="border-2 border-[#0f0] p-0.5 sm:p-1 bg-black">
            <div className="flex gap-0.5 sm:gap-1 h-6 sm:h-8">
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  ref={i === 0 ? progressBarRef : null}
                  className={`flex-1 transition-colors duration-100 ${
                    i < getBlocksCount() ? 'bg-[#0f0] progress-bar-glow' : 'bg-transparent'
                  }`}
                />
              ))}
            </div>
          </div>
          
          <div className="flex justify-between terminal-font terminal-text-dim text-[10px] sm:text-xs mt-1.5 sm:mt-2">
            <span>BLOQUE: {Math.floor(progress * 10.24)}KB</span>
            <span>EST: {Math.max(0, Math.ceil((100 - progress) / 25))}s</span>
          </div>
        </div>
      )}

      {/* Awaiting input */}
      {showAwaitingInput && (
        <div className="terminal-font terminal-text text-lg sm:text-2xl md:text-3xl terminal-glow text-center px-4">
          <span ref={typedRef}></span>
        </div>
      )}

      {/* Footer info */}
      <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 terminal-font terminal-text-dim text-[10px] sm:text-xs">
        <div>MEM: 640K OK</div>
        <div>FECHA: {currentDate}</div>
      </div>

      <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 terminal-font terminal-text-dim text-[10px] sm:text-xs text-right">
        <div>CONEXIÓN SEGURA</div>
        <div>🔒 ENCRIPTADO</div>
      </div>
    </div>
  );
}
