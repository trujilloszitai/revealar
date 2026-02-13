import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { getDayDifference } from '../utils';

interface BirthdayCardProps {
  isMuted: boolean;
}

interface Memory {
  id: number;
  type: 'image' | 'stat' | 'quote';
  title?: string;
  description?: string;
  image?: string;
  stat?: string;
  statLabel?: string;
  quote?: string;
  author?: string;
}

const memories: Memory[] = [
  {
    id: 1,
    type: 'image',
    title: 'Nuestra Primera Cita',
    description: 'La otra vez me preguntaste cómo me sentía ese día, y aunque no recuerde con claridad, reconozco que estaba muy nervioso al igual que emocionado, lo cual normalmente lleva a que me den muchas ganas de ir al baño 😍​',
    image: '/images/first-date.jpg'
  },
  {
    id: 2,
    type: 'stat',
    stat: getDayDifference(new Date('2024-02-07'), new Date()).toString(),
    statLabel: 'Días Juntos',
    quote: '"En todo el mundo, no hay corazón para mí como el tuyo. En todo el mundo, no hay amor para ti como el mío."',
    author: 'Maya Angelou'
  },
  {
    id: 3,
    type: 'image',
    title: 'Tour De Iglesias 2024',
    description: 'Me estaba acordando de esto, y DIOS, realmente me acuerdo como deseaba que esa tarde no terminase jamás ⛪​',
    image: '/images/road-trip.jpg'
  },
  {
    id: 4,
    type: 'image',
    title: 'Esa Sonrisa',
    description: 'Sigue siendo top 1 vistas del mundo :3',
    image: '/images/smile.jpg'
  },
  {
    id: 5,
    type: 'quote',
    quote: '...nuestro primer viaje juntos en tren? Aquella vez me llevé una re sorpresa de lo tanto que podía disfrutar algo tan simple, así como la canción de Montaner: \n "Viajar a tu lado en el tren, Un sueño difícil de creer".',
    title: 'Te acordás de...'
  }
];

export default function BirthdayCard({ isMuted }: BirthdayCardProps) {
  const [showGift, setShowGift] = useState(false);

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 100
    });

    // Fire confetti on load
    const fireConfetti = () => {
      const duration = 3000;
      const animationEnd = Date.now() + duration;
      const colors = ['#e91e63', '#f48fb1', '#ff4081', '#ffffff', '#ffd700'];

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          clearInterval(interval);
          return;
        }

        const particleCount = 50 * (timeLeft / duration);

        confetti({
          particleCount,
          startVelocity: 30,
          spread: 360,
          origin: {
            x: randomInRange(0.1, 0.9),
            y: Math.random() - 0.2
          },
          colors,
          gravity: 1,
          scalar: randomInRange(0.8, 1.4)
        });
      }, 250);
    };

    // Delay confetti for dramatic effect
    setTimeout(fireConfetti, 500);
  }, []);

  const handleGiftClick = () => {
    setShowGift(true);
    
    // Extra confetti burst
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#e91e63', '#f48fb1', '#ff4081', '#ffd700']
    });
  };

  return (
    <div className="min-h-screen birthday-card">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 py-16">
        <div data-aos="fade-down" data-aos-delay="200">
          <h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4"
            style={{ 
              fontFamily: "'Playfair Display', serif",
              background: 'linear-gradient(135deg, #e91e63 0%, #f48fb1 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            MAAAAAAAAR,
          </h1>
          <h2 
            className="text-4xl md:text-6xl lg:text-7xl font-bold italic"
            style={{ 
              fontFamily: "'Playfair Display', serif",
              background: 'linear-gradient(135deg, #f48fb1 0%, #e91e63 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            FELIZ CUMPLEEE MIAMOOOR
          </h2>
        </div>

        <p 
          data-aos="fade-up" 
          data-aos-delay="400"
          className="text-gray-400 text-lg md:text-xl max-w-lg mt-8 leading-relaxed"
        >
          (y feliz San Valentín, aunque no es exactamente la razón por lo que hice esto, pero bueno coso, es un plus)
        </p>

        <div 
          data-aos="fade-up" 
          data-aos-delay="600"
          className="mt-12 animate-bounce"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-8 w-8 text-[#e91e63]" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Memories Grid */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Memory Card 1 - First Date */}
          <div 
            data-aos="fade-up" 
            data-aos-delay="100"
            className="memory-card row-span-2"
          >
            <div className="aspect-[4/5] bg-[#2a2a2a] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
              <div className="w-full h-full bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] flex items-center justify-center">
                <span className="text-6xl">📷</span>
              </div>
            </div>
            <div className="p-5">
              <h3 className="font-semibold text-lg mb-2">{memories[0].title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{memories[0].description}</p>
            </div>
          </div>

          {/* Memory Card 2 - Stats */}
          <div 
            data-aos="fade-up" 
            data-aos-delay="200"
            className="memory-card p-6 flex flex-col items-center justify-center text-center"
            style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)' }}
          >
            <span className="text-4xl text-[#e91e63] mb-2">∞</span>
            <div className="text-4xl md:text-5xl font-bold text-[#e91e63] mb-1">{memories[1].stat}</div>
            <div className="text-lg text-gray-300 mb-4">{memories[1].statLabel}</div>
            <p className="text-gray-400 text-sm italic leading-relaxed">"{memories[1].quote}"</p>
            <p className="text-[#e91e63] text-sm mt-3">— {memories[1].author}</p>
          </div>

          {/* Memory Card 3 - Road Trip */}
          <div 
            data-aos="fade-up" 
            data-aos-delay="300"
            className="memory-card"
          >
            <div className="aspect-video bg-[#2a2a2a] relative overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-orange-900/30 to-[#1a1a1a] flex items-center justify-center">
                <span className="text-5xl">🚗</span>
              </div>
            </div>
            <div className="p-5">
              <h3 className="font-semibold text-lg mb-2">{memories[2].title}</h3>
              <p className="text-gray-400 text-sm">{memories[2].description}</p>
            </div>
          </div>

          {/* Memory Card 4 - That Smile */}
          <div 
            data-aos="fade-up" 
            data-aos-delay="400"
            className="memory-card row-span-2"
          >
            <div className="aspect-[3/4] bg-[#2a2a2a] relative overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] flex items-center justify-center">
                <span className="text-6xl">😊</span>
              </div>
            </div>
            <div className="p-5">
              <h3 className="font-semibold text-lg mb-2">{memories[3].title}</h3>
              <p className="text-gray-400 text-sm">{memories[3].description}</p>
            </div>
          </div>

          {/* Memory Card 5 - Quote */}
          <div 
            data-aos="fade-up" 
            data-aos-delay="500"
            className="memory-card quote-card p-6"
          >
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <h4 className="font-semibold text-md mb-3">{memories[4].title}</h4>
                <p className="text-gray-400 text-sm italic leading-relaxed">{memories[4].quote}</p>
              </div>
              <span className="text-3xl text-[#e91e63] opacity-50">❝</span>
            </div>
          </div>
        </div>
      </section>

      {/* Gift Section */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 
            data-aos="fade-up"
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Encontré algo especial para nosotros...
          </h2>
          <p 
            data-aos="fade-up" 
            data-aos-delay="100"
            className="text-gray-400 mb-8"
          >
            Un pequeño detalle de mi aprecio por todo lo que haces y todo lo que eres.
          </p>
          
          {!showGift ? (
            <button
              data-aos="fade-up"
              data-aos-delay="200"
              onClick={handleGiftClick}
              className="gift-button mx-auto"
            >
              <span>🎁</span>
              Abre Tu Regalo
            </button>
          ) : (
            <div 
              className="fade-in-up bg-[#1a1a1a] rounded-2xl p-8 border border-[#e91e63]/30"
            >
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-2xl font-semibold text-[#e91e63] mb-4">¡Tu Regalo Especial!</h3>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                YO Y MI AMOR ETERNO + 2 MEDIALUNAS. ❤️
              </p>
              <p className="text-gray-400 text-sm italic">
                (Válido cuando quieras redimirlo)
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center">
        <p className="text-gray-500 text-sm">
          Hecho con ❤️ para ti
        </p>
        <p className="text-gray-600 text-xs mt-2">
          {new Date().getFullYear()} — Nuestro viaje continúa...
        </p>
      </footer>
    </div>
  );
}
