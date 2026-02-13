import { useState, useCallback } from 'react';
import BootSequence from './BootSequence';
import Trivia from './Trivia';
import BirthdayCard from './BirthdayCard';

type Phase = 'boot' | 'trivia' | 'reveal';

export default function SurpriseCardApp() {
  const [currentPhase, setCurrentPhase] = useState<Phase>('boot');
  const [isMuted, setIsMuted] = useState(false);

  const handleBootComplete = useCallback(() => {
    setCurrentPhase('trivia');
  }, []);

  const handleTriviaComplete = useCallback(() => {
    setCurrentPhase('reveal');
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev);
  }, []);

  return (
    <div className="relative">
      {/* Global mute button for terminal phases */}
      {currentPhase !== 'reveal' && (
        <button 
          onClick={toggleMute}
          className="fixed top-4 right-4 terminal-font terminal-text text-sm border border-[#0f0] px-3 py-1 hover:bg-[#0f0] hover:text-black transition-colors z-50"
        >
          [ {isMuted ? 'UNMUTE' : 'MUTE'} ]
        </button>
      )}

      {/* Phase 1: Boot Sequence */}
      {currentPhase === 'boot' && (
        <BootSequence 
          onComplete={handleBootComplete} 
          isMuted={isMuted}
        />
      )}

      {/* Phase 2: Trivia */}
      {currentPhase === 'trivia' && (
        <Trivia 
          onComplete={handleTriviaComplete} 
          isMuted={isMuted}
        />
      )}

      {/* Phase 3: Birthday Card Reveal */}
      {currentPhase === 'reveal' && (
        <BirthdayCard isMuted={isMuted} />
      )}
    </div>
  );
}
