import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Flower {
  id: number;
  label: string;
  note: string;
  petalColor: string;
  centerColor: string;
  stemColor: string;
  leafColor: string;
  emoji: string;
}

const FLOWERS: Flower[] = [
  {
    id: 1,
    label: "The Day We Met",
    note: "Every great story has a beginning, and ours is one I cherish every single day.",
    petalColor: "#ffda7a",
    centerColor: "#fbb13c",
    stemColor: "#7bc67a",
    leafColor: "#5aad5a",
    emoji: "🌟",
  },
  {
    id: 2,
    label: "Your Laugh",
    note: "The sound that instantly makes everything better. The world is brighter when you smile.",
    petalColor: "#ffd6e0",
    centerColor: "#ff9eb5",
    stemColor: "#7bc67a",
    leafColor: "#5aad5a",
    emoji: "😊",
  },
  {
    id: 3,
    label: "Your Strength",
    note: "You face every challenge with grace and courage. You inspire me more than you know.",
    petalColor: "#fbb13c",
    centerColor: "#e6a017",
    stemColor: "#7bc67a",
    leafColor: "#5aad5a",
    emoji: "💪",
  },
  {
    id: 4,
    label: "Your Kindness",
    note: "The way you care for others—it's one of the most beautiful things about you.",
    petalColor: "#d4f5e9",
    centerColor: "#7bc67a",
    stemColor: "#7bc67a",
    leafColor: "#5aad5a",
    emoji: "💚",
  },
  {
    id: 5,
    label: "Our Adventures",
    note: "Every moment with you feels like the best adventure I could ask for.",
    petalColor: "#bfe3f5",
    centerColor: "#7bb8d4",
    stemColor: "#7bc67a",
    leafColor: "#5aad5a",
    emoji: "🌊",
  },
  {
    id: 6,
    label: "My Future",
    note: "When I imagine my future, you are in every single frame of it.",
    petalColor: "#ffda7a",
    centerColor: "#ffd6e0",
    stemColor: "#7bc67a",
    leafColor: "#5aad5a",
    emoji: "✨",
  },
];

const PETAL_POSITIONS = Array.from({ length: 8 }).map((_, i) => {
  const angle = (i * 45 * Math.PI) / 180;
  const px = 50 + 22 * Math.cos(angle);
  const py = 40 + 22 * Math.sin(angle);
  return { px, py, angle: i * 45 + 90 };
});

const CENTER_DOTS = [
  [46, 37],
  [50, 35],
  [54, 37],
  [44, 41],
  [50, 44],
  [56, 41],
];

function FlowerSVG({
  flower,
  bloomed,
  onClick,
}: {
  flower: Flower;
  bloomed: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      data-ocid={`garden.flower.${flower.id}`}
      className="flower-hover flex flex-col items-center gap-3 group bg-transparent border-0 p-0 cursor-pointer"
      onClick={onClick}
      aria-label={`Open memory: ${flower.label}`}
    >
      <svg
        width="100"
        height="130"
        viewBox="0 0 100 130"
        xmlns="http://www.w3.org/2000/svg"
        className={bloomed ? "petal-bloom" : ""}
        style={{ filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.1))" }}
        role="img"
        aria-label={flower.label}
      >
        <title>{flower.label}</title>
        {/* Stem */}
        <path
          d="M50 130 Q48 90 50 70"
          stroke={flower.stemColor}
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
        {/* Left leaf */}
        <path d="M49 100 Q35 88 38 78 Q48 90 49 100Z" fill={flower.leafColor} />
        {/* Right leaf */}
        <path d="M51 90 Q65 78 62 68 Q52 80 51 90Z" fill={flower.leafColor} />

        {/* Petals */}
        {PETAL_POSITIONS.map(({ px, py, angle }) => (
          <ellipse
            key={`petal-${px.toFixed(1)}-${py.toFixed(1)}`}
            cx={px}
            cy={py}
            rx="11"
            ry="7"
            fill={flower.petalColor}
            stroke="white"
            strokeWidth="0.5"
            transform={`rotate(${angle}, ${px}, ${py})`}
            style={{
              transition: "transform 0.3s ease",
              transformOrigin: `${px}px ${py}px`,
            }}
          />
        ))}

        {/* Center circle */}
        <circle
          cx="50"
          cy="40"
          r="14"
          fill={flower.centerColor}
          stroke="white"
          strokeWidth="1.5"
        />

        {/* Center texture dots */}
        {CENTER_DOTS.map(([cx, cy]) => (
          <circle
            key={`dot-${cx}-${cy}`}
            cx={cx}
            cy={cy}
            r="1.5"
            fill={flower.petalColor}
            opacity="0.6"
          />
        ))}
      </svg>

      <div className="text-center">
        <p
          className="font-body text-sm font-semibold group-hover:scale-105 transition-transform duration-200"
          style={{ color: "oklch(0.42 0.1 67)" }}
        >
          {flower.label}
        </p>
        <p
          className="font-body text-xs mt-0.5"
          style={{ color: "oklch(0.6 0.08 72)" }}
        >
          Click to bloom 🌸
        </p>
      </div>
    </button>
  );
}

export function GardenSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openFlower, setOpenFlower] = useState<Flower | null>(null);
  const [bloomedFlowers, setBloomedFlowers] = useState<Set<number>>(new Set());

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

  const handleFlowerClick = (flower: Flower) => {
    setBloomedFlowers((prev) => new Set([...prev, flower.id]));
    setOpenFlower(flower);
  };

  const closeModal = () => setOpenFlower(null);

  return (
    <section
      id="garden"
      data-ocid="garden.section"
      ref={sectionRef}
      className="section-fade-in relative py-20 px-4"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <div
              className="h-px w-12"
              style={{ background: "oklch(0.832 0.162 72 / 0.5)" }}
            />
            <span className="text-2xl">🌻</span>
            <div
              className="h-px w-12"
              style={{ background: "oklch(0.832 0.162 72 / 0.5)" }}
            />
          </div>
          <h2
            className="font-display text-4xl sm:text-5xl md:text-6xl font-bold mb-4"
            style={{ color: "oklch(0.42 0.1 67)" }}
          >
            A Garden of Memories
          </h2>
          <p
            className="font-body text-lg"
            style={{ color: "oklch(0.55 0.08 72)" }}
          >
            Each flower holds a piece of my heart. Click them to see what
            blooms.
          </p>
        </div>

        {/* Flowers grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-12 justify-items-center">
          {FLOWERS.map((flower) => (
            <FlowerSVG
              key={flower.id}
              flower={flower}
              bloomed={bloomedFlowers.has(flower.id)}
              onClick={() => handleFlowerClick(flower)}
            />
          ))}
        </div>

        {/* Decorative ground */}
        <div
          className="mt-12 h-3 rounded-full mx-auto max-w-md"
          style={{
            background:
              "linear-gradient(90deg, oklch(0.7 0.15 145 / 0.3), oklch(0.6 0.18 145 / 0.4), oklch(0.7 0.15 145 / 0.3))",
          }}
          aria-hidden="true"
        />
      </div>

      {/* Flower modal */}
      {openFlower && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{
            background: "oklch(0.3 0.05 72 / 0.5)",
            backdropFilter: "blur(8px)",
          }}
          data-ocid="garden.modal"
          aria-modal="true"
          aria-label={`Memory: ${openFlower.label}`}
        >
          <button
            type="button"
            className="absolute inset-0 w-full h-full cursor-default bg-transparent border-0"
            onClick={closeModal}
            aria-label="Close overlay"
            tabIndex={-1}
          />
          <div
            className="glass-modal rounded-3xl p-8 max-w-md w-full shadow-warm-lg relative z-10"
            style={{
              animation:
                "message-appear 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
              border: `2px solid ${openFlower.petalColor}`,
            }}
          >
            <button
              type="button"
              data-ocid="garden.modal.close_button"
              onClick={closeModal}
              className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110"
              style={{
                background: "oklch(0.916 0.13 89 / 0.3)",
                border: "1px solid oklch(0.832 0.162 72 / 0.3)",
              }}
              aria-label="Close memory"
            >
              <X className="w-4 h-4" style={{ color: "oklch(0.5 0.1 67)" }} />
            </button>

            <div className="text-center">
              <div className="text-5xl mb-4">{openFlower.emoji}</div>
              <h3
                className="font-display text-2xl font-bold mb-4 italic"
                style={{ color: "oklch(0.42 0.1 67)" }}
              >
                {openFlower.label}
              </h3>
              <div
                className="h-0.5 mx-auto mb-6 rounded-full w-20"
                style={{ background: openFlower.petalColor }}
              />
              <p
                className="font-body text-lg leading-relaxed"
                style={{ color: "oklch(0.45 0.08 72)" }}
              >
                {openFlower.note}
              </p>
              <div className="mt-6 text-2xl">💛</div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
