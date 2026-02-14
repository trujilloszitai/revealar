import { useEffect, useRef, useState, useCallback } from 'react';
import { animate } from 'animejs';
import Typed from 'typed.js';
import { Howl } from 'howler';

interface TriviaProps {
  onComplete: () => void;
  isMuted: boolean;
}

interface Question {
  id: number;
  question: string;
  hint: string;
  answer: string;
  placeholder: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: '¿DÓNDE FUE NUESTRA PRIMERA CITA?',
    hint: 'Pista: Creo que no hace falta decir mucho más je.',
    answer: 'desire',
    placeholder: 'ESCRIBE LA UBICACIÓN...'
  },
  {
    id: 2,
    question: '¿CUÁL ES EL PLATO QUE MÁS VECES COMIMOS JUNTOS?',
    hint: 'Pista: La pedimos en nuestra primera cita.',
    answer: 'pizza',
    placeholder: 'ESCRIBE LA COMIDA...'
  },
  {
    id: 3,
    question: '¿CUÁL FUE LA PRIMERA CANCIÓN DE EL CUARTETO DE NOS QUE ESCUCHASTE?',
    hint: 'Pista: Es para autodedicarse...',
    answer: 'habla tu espejo',
    placeholder: 'ESCRIBE LA CANCIÓN...'
  }
];

export default function Trivia({ onComplete, isMuted }: TriviaProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [status, setStatus] = useState<'waiting' | 'correct' | 'incorrect'>('waiting');
  const [isTyping, setIsTyping] = useState(false);
  const [showAccessGranted, setShowAccessGranted] = useState(false);
  const [isDestroying, setIsDestroying] = useState(false);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const questionRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const typedInstanceRef = useRef<Typed | null>(null);

  // Sound effects
  const keySound = useRef<Howl | null>(null);
  const accessDeniedSound = useRef<Howl | null>(null);
  const accessGrantedSound = useRef<Howl | null>(null);

  useEffect(() => {
    // Initialize sounds with fallback (using Web Audio API beeps if files don't exist)
    keySound.current = new Howl({
      src: ['/src/assets/sounds/key.mp3', '/src/assets/sounds/key.wav'],
      volume: 0.3,
      onloaderror: () => {
        // Fallback: create a simple beep
        keySound.current = null;
      }
    });

    accessDeniedSound.current = new Howl({
      src: ['/src/assets/sounds/denied.mp3', '/src/assets/sounds/denied.wav'],
      volume: 0.5,
      onloaderror: () => {
        accessDeniedSound.current = null;
      }
    });

    accessGrantedSound.current = new Howl({
      src: ['/src/assets/sounds/granted.mp3', '/src/assets/sounds/granted.wav'],
      volume: 0.5,
      onloaderror: () => {
        accessGrantedSound.current = null;
      }
    });

    return () => {
      keySound.current?.unload();
      accessDeniedSound.current?.unload();
      accessGrantedSound.current?.unload();
    };
  }, []);

  // Type question effect
  useEffect(() => {
    if (questionRef.current && !showAccessGranted) {
      if (typedInstanceRef.current) {
        typedInstanceRef.current.destroy();
      }

      typedInstanceRef.current = new Typed(questionRef.current, {
        strings: [questions[currentQuestion].question],
        typeSpeed: 30,
        showCursor: false,
        onComplete: () => {
          setIsTyping(false);
          inputRef.current?.focus();
        }
      });

      setIsTyping(true);
    }

    return () => {
      if (typedInstanceRef.current) {
        typedInstanceRef.current.destroy();
      }
    };
  }, [currentQuestion, showAccessGranted]);

  // Glowing border animation
  useEffect(() => {
    if (containerRef.current) {
      animate(containerRef.current, {
        boxShadow: [
          '0 0 30px rgba(0, 255, 0, 0.2)',
          '0 0 60px rgba(0, 255, 0, 0.3)',
          '0 0 30px rgba(0, 255, 0, 0.2)'
        ],
        duration: 2000,
        loop: true,
        ease: 'inOutSine'
      });
    }
  }, []);

  const playKeySound = useCallback(() => {
    if (!isMuted && keySound.current) {
      keySound.current.play();
    }
  }, [isMuted]);

  const playDeniedSound = useCallback(() => {
    if (!isMuted && accessDeniedSound.current) {
      accessDeniedSound.current.play();
    }
  }, [isMuted]);

  const playGrantedSound = useCallback(() => {
    if (!isMuted && accessGrantedSound.current) {
      accessGrantedSound.current.play();
    }
  }, [isMuted]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
    playKeySound();
  };

  const normalizeAnswer = (text: string) => {
    return text.toLowerCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  };

  const checkAnswer = () => {
    const userAnswer = normalizeAnswer(userInput);
    const correctAnswer = normalizeAnswer(questions[currentQuestion].answer);

    if (userAnswer.includes(correctAnswer)) {
      setStatus('correct');
      
      // Shake animation for correct
      if (containerRef.current) {
        animate(containerRef.current, {
          scale: [1, 1.02, 1],
          duration: 300,
          ease: 'inOutQuad'
        });
      }

      setTimeout(() => {
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(prev => prev + 1);
          setUserInput('');
          setShowHint(false);
          setStatus('waiting');
        } else {
          // All questions answered correctly
          playGrantedSound();
          setShowAccessGranted(true);
          
          setTimeout(() => {
            setIsDestroying(true);
            setTimeout(() => {
              onComplete();
            }, 1000);
          }, 2000);
        }
      }, 800);
    } else {
      setStatus('incorrect');
      playDeniedSound();
      
      // Shake animation for incorrect
      if (containerRef.current) {
        animate(containerRef.current, {
          translateX: [-10, 10, -10, 10, 0],
          duration: 400,
          ease: 'inOutQuad'
        });
      }

      setTimeout(() => {
        setStatus('waiting');
        setUserInput('');
      }, 1500);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && userInput.trim()) {
      checkAnswer();
    }
  };

  if (showAccessGranted) {
    return (
      <div className={`min-h-dvh bg-[#0a0a0a] flex items-center justify-center px-4 crt-effect ${isDestroying ? 'terminal-destroy' : ''}`}>
        <div className="scanline"></div>
        
        {/* Heart decorations */}
        <div className="hidden sm:block absolute top-4 sm:top-8 left-4 sm:left-8 heart-decoration text-xl sm:text-3xl">♥</div>
        <div className="hidden sm:block absolute top-4 sm:top-8 right-4 sm:right-8 heart-decoration text-xl sm:text-3xl">♥</div>
        <div className="hidden sm:block absolute bottom-4 sm:bottom-8 left-4 sm:left-8 heart-decoration text-xl sm:text-3xl">♥</div>
        <div className="hidden sm:block absolute bottom-4 sm:bottom-8 right-4 sm:right-8 heart-decoration text-xl sm:text-3xl">♥</div>

        <div className="text-center px-4">
          <h1 className="terminal-font text-2xl sm:text-4xl md:text-5xl lg:text-7xl terminal-text terminal-glow glitch-effect mb-3 sm:mb-4 leading-tight">
            *** ACCESO CONCEDIDO ***
          </h1>
          <p className="terminal-font terminal-text text-base sm:text-xl md:text-2xl">
            CARGANDO CONTENIDO ESPECIAL...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-[#0a0a0a] flex flex-col items-center justify-center px-3 py-6 sm:p-4 md:p-6 crt-effect">
      <div className="scanline"></div>
      
      {/* Heart decorations - hidden on very small screens */}
      <div className="hidden sm:block absolute top-4 sm:top-8 left-4 sm:left-8 heart-decoration text-xl sm:text-3xl">♥</div>
      <div className="hidden sm:block absolute top-4 sm:top-8 right-4 sm:right-8 heart-decoration text-xl sm:text-3xl">♥</div>
      <div className="hidden sm:block absolute bottom-12 sm:bottom-8 left-4 sm:left-8 heart-decoration text-xl sm:text-3xl">♥</div>
      <div className="hidden sm:block absolute bottom-12 sm:bottom-8 right-4 sm:right-8 heart-decoration text-xl sm:text-3xl">♥</div>

      {/* Main terminal container */}
      <div 
        ref={containerRef}
        className="terminal-container w-full max-w-3xl sm:p-6 md:p-8 p-4 relative mx-auto"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1 sm:gap-0 mb-4 sm:mb-6 md:mb-8 terminal-font text-xs sm:text-sm">
          <span className="terminal-text-dim">TERMINAL_ID: 1402-X</span>
          <span className="terminal-text">CONEXIÓN SEGURA: ESTABLECIDA</span>
        </div>

        {/* System locked message */}
        <div className="mb-4 sm:mb-6 md:mb-8">
          <h1 className="terminal-font terminal-text text-lg sm:text-2xl md:text-3xl lg:text-4xl mb-1 sm:mb-2 terminal-glow leading-tight">
            {'>'} SISTEMA BLOQUEADO.
          </h1>
          <h1 className="terminal-font terminal-text text-lg sm:text-2xl md:text-3xl lg:text-4xl terminal-glow leading-tight">
            VERIFICACIÓN DE SEGURIDAD REQUERIDA.
          </h1>
          <p className="terminal-font terminal-text-dim text-sm sm:text-base md:text-lg mt-2 sm:mt-4">
            INICIANDO PROTOCOLO DE RECUPERACIÓN DE MEMORIA...
          </p>
        </div>

        {/* Question section */}
        <div className="mb-4 sm:mb-6 md:mb-8">
          <div className="flex flex-col gap-2 mb-3 sm:mb-4">
            <span className="terminal-font text-yellow-400 text-sm sm:text-base md:text-lg">[?] PREGUNTA {currentQuestion + 1}/3</span>
            <span className="terminal-font terminal-text text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed">
              <span ref={questionRef}></span>
            </span>
          </div>

          {/* Hint */}
          <button 
            onClick={() => setShowHint(!showHint)}
            className="terminal-font terminal-text-dim text-xs sm:text-sm hover:terminal-text transition-colors mb-2 sm:mb-4 text-left"
          >
            {'>'} {showHint ? questions[currentQuestion].hint : 'Mostrar pista...'}
          </button>
        </div>

        {/* Input section */}
        <div className="mb-4 sm:mb-6">
          <div className="flex items-center gap-2">
            <span className="terminal-font terminal-text text-base sm:text-xl">{'>'}</span>
            <input
              ref={inputRef}
              type="text"
              value={userInput}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              disabled={isTyping || status !== 'waiting'}
              placeholder={questions[currentQuestion].placeholder}
              className="terminal-input flex-1"
              autoComplete="off"
            />
            <span className="terminal-text text-lg sm:text-2xl cursor-blink">█</span>
          </div>
        </div>

        {/* Status */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
          <span className={`terminal-font text-xs sm:text-sm ${
            status === 'correct' ? 'text-green-400' : 
            status === 'incorrect' ? 'text-red-400' : 
            'terminal-text-dim'
          }`}>
            [ ESTADO: {
              status === 'correct' ? '✓ CORRECTO' : 
              status === 'incorrect' ? '✗ ACCESO DENEGADO' : 
              'ESPERANDO ENTRADA'
            } ]
          </span>
          
          <button
            onClick={checkAnswer}
            disabled={!userInput.trim() || isTyping || status !== 'waiting'}
            className="terminal-button flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            VERIFICAR
            <span>⏎</span>
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-2 sm:bottom-4 w-full text-center terminal-font terminal-text-dim text-[10px] sm:text-xs px-4">
        SISTEMA V1.0 // REVEALAR.OS // ♥ CONEXIÓN SEGURA
      </div>
    </div>
  );
}
