import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import AOS from "aos";
import "aos/dist/aos.css";
import { Image } from "astro:assets";
import firstDate from "../assets/first-date.jpg";
import { getDayDifference } from "../utils";

interface BirthdayCardProps {
  isMuted: boolean;
}

interface Memory {
  id: number;
  type: "image" | "stat" | "quote";
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
    type: "image",
    title: "Nuestra Primera Cita (esta es la foto nuestra más antigua que tengo)",
    description:
      "La otra vez me preguntaste cómo me sentía ese día, y aunque no recuerde con claridad, reconozco que estaba muy nervioso al igual que emocionado, lo cual normalmente lleva a que me den muchas ganas de ir al baño 😍​",
    image: "/src/assets/first-date.jpg",
  },
  {
    id: 2,
    type: "stat",
    stat: getDayDifference(new Date("2024-02-07"), new Date()).toString(),
    statLabel: "Días Juntos",
    quote:
      'Viajar a tu lado en el tren, Un sueño difícil de creer',
    author: "Ricardo Montaner - Tan Enamorados (gran tema)",
  },
  {
    id: 3,
    type: "image",
    title: "Tour De Iglesias 2024 (hay que repetirlo!)",
    description:
      "Me estaba acordando de esto, y DIOS, realmente me acuerdo como deseaba que esa tarde no terminase jamás ⛪​",
    image: "/src/assets/tour.jpg",
  },
  {
    id: 4,
    type: "image",
    title: "Esa Sonrisa",
    description: "Sigue siendo top 1 vistas del mundo :3",
    image: "/src/assets/smile.jpg",
  },
  {
    id: 5,
    type: "quote",
    quote:
      '...es más de lo que jamás pensé que tendría con alguien. LLevo una partecita tuya a todos lados, y así va a ser por mucho tiempo. Allá a donde vaya visitas por un momento mi mente cuando veo algún dato interesante de alguno de los países a los que viajaste, cuando pido helado de Tramontana, cuando me echo en un puff bonito, cuando pruebo una pizza riquisisisima, cuando veo una casa por zona oeste que me hace decir “wow”, cuando leo algo que me hace sentir pena por los pobres espermatozoides, cuando veo una pareja en una plaza siendo perturbada por un completo extraño, cuando a Jelly se le ocurre poner re alto una canción de la serie Berlín en casa, cuando veo algo “Croquette”, cuando escucho una hermosa melodía, cuando veo una de las tantas paneras rosas que hay en la ciudad, cuando siento un aroma familiar al de tu cabello, cuando un amable conductor me cede el paso y le digo en mi mente “GRACIAS, SEÑOR”, cuando me pongo un par de medias graciosas para una ocasión especial (o lo que pinte), cuando veo cualquier cosa relacionada con Miraculous Ladybug (la más genial), cuando paso por una escuela de música, cuando leo cosas de espiritualidad, cuando cocino unas ricas galletotas para la merienda, y tantas otras cosas para las que necesitaría un par de páginas más.​',
    title: "Todo lo que me das...",
  },
];

export default function BirthdayCard({ isMuted }: BirthdayCardProps) {
  const [showGift, setShowGift] = useState(false);

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: true,
      offset: 100,
    });

    // Fire confetti on load
    const fireConfetti = () => {
      const duration = 3000;
      const animationEnd = Date.now() + duration;
      const colors = ["#e91e63", "#f48fb1", "#ff4081", "#ffffff", "#ffd700"];

      const randomInRange = (min: number, max: number) =>
        Math.random() * (max - min) + min;

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
            y: Math.random() - 0.2,
          },
          colors,
          shapes: ["🎵", "🍦", "💝"],
          gravity: 1,
          scalar: randomInRange(0.8, 1.4),
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
      shapes: ["🎵", "🍦", "💝"],
      origin: { y: 0.6 },
      colors: ["#e91e63", "#f48fb1", "#ff4081", "#ffd700"],
    });
  };

  return (
    <div className="min-h-dvh birthday-card">
      {/* Hero Section */}
      <section className="min-h-dvh flex flex-col items-center justify-center text-center px-4 sm:px-6 py-12 sm:py-16">
        <div
          data-aos="fade-down"
          data-aos-delay="200"
          className="w-full max-w-4xl mx-auto"
        >
          <h1
            className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-2 sm:mb-4 leading-tight"
            style={{
              fontFamily: "'Playfair Display', serif",
              background: "linear-gradient(135deg, #e91e63 0%, #f48fb1 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            MAAAAAAAAR,
          </h1>
          <h2
            className="text-xl sm:text-3xl md:text-5xl lg:text-7xl font-bold italic leading-tight"
            style={{
              fontFamily: "'Playfair Display', serif",
              background: "linear-gradient(135deg, #f48fb1 0%, #e91e63 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            FELIZ CUMPLEEE MIAMOOOR
          </h2>
        </div>

        <p
          data-aos="fade-up"
          data-aos-delay="400"
          className="text-gray-400 text-sm sm:text-base md:text-lg lg:text-xl max-w-xs sm:max-w-md md:max-w-lg mt-6 sm:mt-8 leading-relaxed px-2"
        >
          (y feliz San Valentín, aunque no es exactamente la razón por lo que
          hice esto, pero bueno coso, es un plus)
        </p>

        <div
          data-aos="fade-up"
          data-aos-delay="600"
          className="mt-8 sm:mt-12 animate-bounce"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 sm:h-8 sm:w-8 text-[#e91e63]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </section>

      {/* Personal Letter Section */}
      <section className="py-6 sm:py-8 md:py-10 px-4 sm:px-6">
        <div 
          data-aos="fade-up"
          className="max-w-3xl mx-auto"
        >
          <div className="bg-[#1a1a1a]/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 border border-[#e91e63]/20 shadow-lg shadow-[#e91e63]/5">
            {/* Letter Header */}
            <div className="text-center mb-6 sm:mb-8">
              <span className="text-3xl sm:text-4xl mb-3 block">💌</span>
              <h2 
                className="text-xl sm:text-2xl md:text-3xl font-bold text-[#e91e63]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Una cartita para vos
              </h2>
              <div className="w-16 sm:w-24 h-0.5 bg-gradient-to-r from-transparent via-[#e91e63] to-transparent mx-auto mt-3 sm:mt-4"></div>
            </div>

            {/* Letter Content */}
            <div className="space-y-4 sm:space-y-5 text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed">
              <p className="text-[#f48fb1] font-medium">
                Para Marsita,
              </p>
              
              <p>
                HOYYY ES ESE BENDITO DIA EN EL QUE LLEGASTE AL MUNDO, y sigo pensando en las cantidades enormes de suerte que tuve para encontrarte :3
              </p>
              
              <p>
                Ya te había dicho que tu voz es mi canción favorita, no? Creo que sí, pero sino, te lo digo ahora: tu voz es mi canción favorita, y no solo eso, sino que sos mi canción favorita en general, la melodía que alegra mis días, el ritmo que acompaña mis pensamientos, y la letra que me inspira a superarme todos los días (aunque haya días que no me salga).
              </p>
              
              <p>
                Gracias por ser todo lo que sos, por tu paciencia, por tu amor incondicional, y por elegirme cada día. Gracias por compartirme un poquito de tu luz y hacerme parte de tu vida, realmente es un honor en todo sentido 🌹.
              </p>
              
              <p>
                Ahora que llegas tus 20s, quiero que sepas que voy a estar con vos en cada paso, celebrando tus logros, apoyándote en todo lo que te propongas y tengas que enfrentar, y amándote más de lo que las palabras pueden expresar.
              </p>
              
              <p className="text-[#f48fb1] font-medium pt-2">
                Te amo ❤️
              </p>
              
              <p className="text-right text-[#e91e63] italic pt-2">
                — Fran
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Memories Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Memory Card 1 - First Date */}
          <div
            data-aos="fade-up"
            data-aos-delay="100"
            className="memory-card sm:row-span-2"
          >
            <div className="bg-[#2a2a2a] relative overflow-hidden">
              <div className="w-full bg-linear-to-br from-[#2a2a2a] to-[#1a1a1a] flex items-center justify-center">
                {/*                 
                <span className="text-4xl sm:text-6xl">📷</span>
 */}
                <img
                  src={memories[0].image}
                  alt={memories[0].title || "Memory image"}
                />
              </div>
            </div> 
            <div className="p-4 sm:p-5">
              <h3 className="font-semibold text-base sm:text-lg mb-1.5 sm:mb-2">
                {memories[0].title}
              </h3>
              <p className="text-gray-400 text-base sm:text-sm leading-relaxed">
                {memories[0].description}
              </p>
            </div>
          </div>

          {/* Memory Card 2 - Stats */}
          <div
            data-aos="fade-up"
            data-aos-delay="200"
            className="memory-card p-4 sm:p-6 flex flex-col items-center justify-center text-center"
            style={{
              background: "linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)",
            }}
          >
            <span className="text-3xl sm:text-4xl text-[#e91e63] mb-1.5 sm:mb-2">
              ∞
            </span>
            <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#e91e63] mb-1">
              {memories[1].stat}
            </div>
            <div className="text-base sm:text-lg text-gray-300 mb-3 sm:mb-4">
              {memories[1].statLabel}
            </div>
            <p className="text-gray-400 text-base sm:text-sm italic leading-relaxed">
              "{memories[1].quote}"
            </p>
            <p className="text-[#e91e63] text-base sm:text-sm mt-2 sm:mt-3">
              — {memories[1].author}
            </p>
          </div>

          {/* Memory Card 3 - Church tour! */}
          <div data-aos="fade-up" data-aos-delay="300" className="memory-card">
            <div className="aspect-video bg-[#2a2a2a] relative overflow-hidden">
              <div className="w-full h-full bg-linear-to-br from-orange-900/30 to-[#1a1a1a] flex items-center justify-center">
                <img
                  src={memories[2].image}
                  alt={memories[2].title || "Memory image"}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            <div className="p-4 sm:p-5">
              <h3 className="font-semibold text-base sm:text-lg mb-1.5 sm:mb-2">
                {memories[2].title}
              </h3>
              <p className="text-gray-400 text-base sm:text-sm">
                {memories[2].description}
              </p>
            </div>
          </div>

          {/* Memory Card 4 - That smile uwu */}
          <div
            data-aos="fade-up"
            data-aos-delay="400"
            className="memory-card sm:row-span-2"
          >
            <div className="aspect-video sm:aspect-3/4 bg-[#2a2a2a] relative overflow-hidden">
              <div className="w-full h-full bg-linear-to-br from-[#2a2a2a] to-[#1a1a1a] flex items-center justify-center">
                <img
                  src={memories[3].image}
                  alt={memories[3].title || "Memory image"}
                  className="object-cover object-bottom-right w-full h-full"
                />
              </div>
            </div>
            <div className="p-4 sm:p-5">
              <h3 className="font-semibold text-base sm:text-lg mb-1.5 sm:mb-2">
                {memories[3].title}
              </h3>
              <p className="text-gray-400 text-base sm:text-sm">
                {memories[3].description}
              </p>
            </div>
          </div>

          {/* Memory Card 5 - Quote */}
          <div
            data-aos="fade-up"
            data-aos-delay="500"
            className="memory-card quote-card p-4 sm:p-6"
          >
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="flex-1">
                <h4 className="font-semibold text-sm sm:text-md mb-2 sm:mb-3">
                  {memories[4].title}
                </h4>
                <p className="text-gray-400 text-base sm:text-sm italic leading-relaxed">
                  {memories[4].quote}
                </p>
              </div>
              <span className="text-2xl sm:text-3xl text-[#e91e63] opacity-50">
                ❝
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Gift Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4">
        <div className="max-w-xl sm:max-w-2xl mx-auto text-center">
          <h2
            data-aos="fade-up"
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Eh mirá, esto es para vos...!!
          </h2>
          <p
            data-aos="fade-up"
            data-aos-delay="100"
            className="text-gray-400 text-sm sm:text-base mb-6 sm:mb-8 px-2"
          >
            Un pequeño detalle de mi aprecio por todo lo que haces y todo lo que
            eres.
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
            <div className="fade-in-up bg-[#1a1a1a] rounded-xl sm:rounded-2xl p-5 sm:p-8 border border-[#e91e63]/30 mx-2 sm:mx-0">
              <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">🎉</div>
              <h3 className="text-xl sm:text-2xl font-semibold text-[#e91e63] mb-3 sm:mb-4">
                BIRTHDAY + VALENTINES DAY GIFT ULTIMATE DELUXE EDITION
              </h3>
              <ul className="text-gray-300 text-base sm:text-lg leading-relaxed mb-4 sm:mb-6">
                <li>
                  Volcán de dulce de leche (sisi, el fokin comeback a la Panera
                  Rosa)
                </li>
                <li>Lo que hay en la bolsita de elefante 😋</li>
                <li>Un abrazo virtual para cada vez que quieras revisitar esta cartita je 🫂💖</li>
                <li>Y la verdad es que sí tenía ganas de ver con vos la última sesión de Freud, pero bueno veremos cuando se normaliza esto de los trenes 🤔</li>
              </ul>
              <p className="text-gray-400 text-xs sm:text-sm italic">
                (Válido cuando quieras redimirlo)
                <br />
                La verdad es que tenia ganas de planear algo especial para uno
                de estos findes, pero como ya venimos 2 findes consecutivos sin
                trenes, se me complicó para planear algo a corto-mediano plazo
                😭
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="mx-auto py-6 sm:py-8 text-center px-4">
        <p className="text-gray-500 text-xs sm:text-sm">Hecho con ❤️ para ti</p>
        <p className="text-gray-600 text-[10px] sm:text-xs mt-1.5 sm:mt-2">
          {new Date().getFullYear()} — Nuestro viaje continúa...
        </p>
      </footer>
    </div>
  );
}
