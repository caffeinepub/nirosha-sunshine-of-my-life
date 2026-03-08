import { useEffect, useRef, useState } from "react";

interface Letter {
  id: number;
  label: string;
  message: string;
  color: string;
  flap: string;
  icon: string;
}

const LETTERS: Letter[] = [
  {
    id: 1,
    label: "Open When you need a smile",
    message:
      "Remember that somewhere, someone thinks you are absolutely extraordinary. That someone is me. 💛",
    color: "#ffda7a",
    flap: "#fbb13c",
    icon: "😊",
  },
  {
    id: 2,
    label: "Open When you feel tired",
    message:
      "Rest, my love. You give so much of yourself to everyone around you. It's okay to breathe. You deserve all the rest in the world.",
    color: "#ffd6e0",
    flap: "#ff9eb5",
    icon: "🌙",
  },
  {
    id: 3,
    label: "Open When you feel lonely",
    message:
      "You are never truly alone. My thoughts find you wherever you are. Distance is just a number when the heart is full.",
    color: "#d4f5e9",
    flap: "#7bc6a0",
    icon: "🤗",
  },
  {
    id: 4,
    label: "Open When you doubt yourself",
    message:
      "You are capable of more than you realize. I have watched you conquer things that would stop others. Never forget that.",
    color: "#bfe3f5",
    flap: "#7bb8d4",
    icon: "⭐",
  },
  {
    id: 5,
    label: "Open When you miss me",
    message:
      "Look at the sun. That warmth you feel? That's me, sending you all my love across every mile. 🌞",
    color: "#ffe4b5",
    flap: "#fbb13c",
    icon: "☀️",
  },
];

function EnvelopeCard({ letter, index }: { letter: Letter; index: number }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <button
      type="button"
      data-ocid={`letters.item.${letter.id}`}
      className={`card-flip-container text-left ${flipped ? "flipped" : ""}`}
      style={{
        height: "260px",
        background: "transparent",
        border: "none",
        padding: 0,
        width: "100%",
        cursor: "pointer",
      }}
      onClick={() => setFlipped(!flipped)}
      aria-label={`${letter.label} - click to open`}
    >
      <div
        className="card-flip-inner"
        style={{
          animationDelay: `${index * 0.1}s`,
        }}
      >
        {/* Front - Envelope */}
        <div
          className="card-flip-front shadow-warm flex flex-col"
          style={{
            background: letter.color,
            border: `2px solid ${letter.flap}`,
          }}
        >
          {/* Envelope flap */}
          <div
            className="relative flex-shrink-0"
            style={{
              height: "60px",
              background: letter.flap,
              clipPath: "polygon(0 0, 50% 70%, 100% 0)",
            }}
            aria-hidden="true"
          />

          {/* Envelope body */}
          <div className="flex-1 flex flex-col items-center justify-center px-4 pb-6 pt-2 relative">
            {/* Side folds */}
            <div
              className="absolute inset-x-0 bottom-0"
              style={{ height: "50%", background: `${letter.flap}50` }}
              aria-hidden="true"
            >
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(135deg, ${letter.flap}60 0%, transparent 50%, ${letter.flap}60 100%)`,
                  clipPath: "polygon(0 100%, 50% 0, 100% 100%)",
                }}
              />
            </div>

            <div className="relative z-10 text-center">
              <div className="text-4xl mb-3" aria-hidden="true">
                {letter.icon}
              </div>
              <p
                className="font-display text-sm font-semibold italic leading-snug px-2"
                style={{ color: "oklch(0.38 0.1 67)" }}
              >
                {letter.label}
              </p>
              <p
                className="font-body text-xs mt-2 font-medium"
                style={{ color: "oklch(0.5 0.08 67)" }}
              >
                Click to open ✉️
              </p>
            </div>
          </div>
        </div>

        {/* Back - Message */}
        <div
          className="card-flip-back flex flex-col items-center justify-center px-5 py-6 shadow-warm"
          style={{
            background: `linear-gradient(135deg, ${letter.color}, white)`,
            border: `2px solid ${letter.flap}`,
          }}
        >
          <div className="text-3xl mb-4" aria-hidden="true">
            {letter.icon}
          </div>
          <p
            className="font-body text-sm leading-relaxed text-center font-medium"
            style={{ color: "oklch(0.4 0.08 67)" }}
          >
            {letter.message}
          </p>
          <div className="mt-4 flex gap-1" aria-hidden="true">
            <span className="text-lg">💛</span>
            <span className="text-lg">💛</span>
            <span className="text-lg">💛</span>
          </div>
        </div>
      </div>
    </button>
  );
}

export function OpenWhenSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          sectionRef.current?.classList.add("visible");
        }
      },
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="letters"
      data-ocid="letters.section"
      ref={sectionRef}
      className="section-fade-in relative py-20 px-4"
    >
      {/* Decorative pattern background */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none opacity-30"
        aria-hidden="true"
      >
        {Array.from({ length: 12 }, (_, i) => i).map((i) => (
          <div
            key={`bg-env-${i}`}
            className="absolute text-4xl"
            style={{
              left: `${(i % 4) * 25 + Math.random() * 10}%`,
              top: `${Math.floor(i / 4) * 33 + Math.random() * 15}%`,
              transform: `rotate(${Math.random() * 30 - 15}deg)`,
              fontSize: `${Math.random() * 20 + 20}px`,
            }}
          >
            ✉️
          </div>
        ))}
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 mb-4">
            <div
              className="h-px w-12"
              style={{ background: "oklch(0.832 0.162 72 / 0.5)" }}
            />
            <span className="text-2xl">✉️</span>
            <div
              className="h-px w-12"
              style={{ background: "oklch(0.832 0.162 72 / 0.5)" }}
            />
          </div>
          <h2
            className="font-display text-4xl sm:text-5xl md:text-6xl font-bold mb-4"
            style={{ color: "oklch(0.42 0.1 67)" }}
          >
            Open When...
          </h2>
          <p
            className="font-body text-lg"
            style={{ color: "oklch(0.55 0.08 72)" }}
          >
            Five letters. Each one written just for you.
            <br />
            <span
              className="italic font-medium"
              style={{ color: "oklch(0.6 0.1 72)" }}
            >
              Click an envelope to read your message.
            </span>
          </p>
        </div>

        {/* Letters grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {LETTERS.slice(0, 3).map((letter, i) => (
            <EnvelopeCard key={letter.id} letter={letter} index={i} />
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6 max-w-2xl mx-auto">
          {LETTERS.slice(3).map((letter, i) => (
            <EnvelopeCard key={letter.id} letter={letter} index={i + 3} />
          ))}
        </div>
      </div>
    </section>
  );
}
