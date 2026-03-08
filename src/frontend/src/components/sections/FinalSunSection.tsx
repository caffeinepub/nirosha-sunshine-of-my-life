import { X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

interface ConfettiPiece {
  id: number;
  x: number;
  color: string;
  size: number;
  duration: number;
  delay: number;
  shape: "circle" | "star" | "heart";
}

const CONFETTI_COLORS = [
  "#ffda7a",
  "#fbb13c",
  "#ffd6e0",
  "#d4f5e9",
  "#bfe3f5",
  "#ffe4b5",
  "#ff9eb5",
  "#7bc6a0",
];

function generateConfetti(count: number): ConfettiPiece[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
    size: Math.random() * 12 + 6,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 2,
    shape: (["circle", "star", "heart"] as const)[
      Math.floor(Math.random() * 3)
    ],
  }));
}

function ConfettiDisplay({ active }: { active: boolean }) {
  const pieces = useRef(generateConfetti(60));

  if (!active) return null;

  return (
    <>
      {pieces.current.map((p) => (
        <div
          key={p.id}
          className="confetti-piece"
          style={{
            left: `${p.x}%`,
            top: "-20px",
            color: p.color,
            fontSize: p.size,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        >
          {p.shape === "circle" && (
            <div
              style={{
                width: p.size,
                height: p.size,
                borderRadius: "50%",
                background: p.color,
              }}
            />
          )}
          {p.shape === "star" && "✦"}
          {p.shape === "heart" && "💛"}
        </div>
      ))}
    </>
  );
}

function SunSVG({
  size = 280,
  className = "",
}: { size?: number; className?: string }) {
  const rays = 16;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Glowing sun"
    >
      <title>Glowing sun</title>
      <defs>
        <radialGradient id="sunGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff9e0" />
          <stop offset="30%" stopColor="#ffda7a" />
          <stop offset="70%" stopColor="#fbb13c" />
          <stop offset="100%" stopColor="#e6a017" />
        </radialGradient>
        <radialGradient id="glowGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffda7a" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#ffda7a" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Outer glow */}
      <circle cx="100" cy="100" r="95" fill="url(#glowGrad)" />

      {/* Rays */}
      {Array.from({ length: rays }).map((_, i) => {
        const angle = (i * 360) / rays;
        const rad = (angle * Math.PI) / 180;
        const inner = 52;
        const outer = 85;
        const halfWidth = 3;
        const perpRad = rad + Math.PI / 2;
        const px = 100 + inner * Math.cos(rad);
        const py = 100 + inner * Math.sin(rad);
        const qx = 100 + outer * Math.cos(rad);
        const qy = 100 + outer * Math.sin(rad);
        return (
          <polygon
            key={`ray-${angle}`}
            points={`${px + halfWidth * Math.cos(perpRad)},${py + halfWidth * Math.sin(perpRad)} ${qx},${qy} ${px - halfWidth * Math.cos(perpRad)},${py - halfWidth * Math.sin(perpRad)}`}
            fill="#fbb13c"
            opacity="0.8"
          />
        );
      })}

      {/* Inner disc */}
      <circle cx="100" cy="100" r="50" fill="url(#sunGrad)" />

      {/* Face */}
      {/* Eyes */}
      <circle cx="87" cy="93" r="4" fill="#e6a017" />
      <circle cx="113" cy="93" r="4" fill="#e6a017" />
      {/* Smile */}
      <path
        d="M 84 110 Q 100 124 116 110"
        stroke="#e6a017"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      {/* Cheeks */}
      <circle cx="79" cy="107" r="5" fill="#ffd6e0" opacity="0.7" />
      <circle cx="121" cy="107" r="5" fill="#ffd6e0" opacity="0.7" />
    </svg>
  );
}

export function FinalSunSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

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

  const handleSunClick = useCallback(() => {
    setOpen(true);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  // Prevent body scroll when modal open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <section
      id="finalsun"
      data-ocid="finalsun.section"
      ref={sectionRef}
      className="section-fade-in relative min-h-screen flex flex-col items-center justify-center px-4 py-20"
    >
      {/* Decorative background */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, oklch(0.97 0.06 87 / 0.6) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="max-w-3xl mx-auto text-center relative z-10">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <div
              className="h-px w-12"
              style={{ background: "oklch(0.832 0.162 72 / 0.5)" }}
            />
            <span className="text-2xl">🌟</span>
            <div
              className="h-px w-12"
              style={{ background: "oklch(0.832 0.162 72 / 0.5)" }}
            />
          </div>
          <h2
            className="font-display text-4xl sm:text-5xl md:text-6xl font-bold mb-5"
            style={{ color: "oklch(0.42 0.1 67)" }}
          >
            And Finally...
          </h2>
          <p
            className="font-display text-xl sm:text-2xl italic font-medium"
            style={{ color: "oklch(0.55 0.1 72)" }}
          >
            Click on the sun to receive my message.
          </p>
        </div>

        {/* The big sun */}
        <div className="flex justify-center mb-12">
          <button
            type="button"
            data-ocid="finalsun.canvas_target"
            onClick={handleSunClick}
            className="relative group cursor-pointer rounded-full final-sun-glow transition-transform duration-200 hover:scale-105 active:scale-95"
            style={{
              background: "transparent",
              border: "none",
              padding: "20px",
            }}
            aria-label="Click the sun to reveal the final message"
          >
            <SunSVG size={280} />
            <div
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
              style={{ background: "oklch(0.916 0.13 89 / 0.2)" }}
            >
              <span
                className="font-body text-sm font-bold"
                style={{ color: "oklch(0.42 0.1 67)" }}
              >
                Touch me 💛
              </span>
            </div>
          </button>
        </div>

        {/* Decorative bottom */}
        <p
          className="font-body text-base"
          style={{ color: "oklch(0.6 0.08 72)" }}
        >
          ✦ One last thing to discover ✦
        </p>
      </div>

      {/* Confetti */}
      <ConfettiDisplay active={showConfetti} />

      {/* Modal */}
      {open && (
        <dialog
          open
          className="fixed inset-0 z-50 flex items-center justify-center p-4 m-0 max-w-none w-full h-full"
          style={{
            background: "oklch(0.3 0.05 72 / 0.6)",
            backdropFilter: "blur(12px)",
          }}
          aria-label="Final message for Nirosha"
          data-ocid="finalsun.modal"
        >
          {/* Confetti inside modal too */}
          <ConfettiDisplay active={showConfetti} />

          <div
            className="relative max-w-lg w-full rounded-3xl p-8 sm:p-12 text-center overflow-hidden"
            style={{
              animation:
                "message-appear 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
              background: "linear-gradient(135deg, #fffbee, #fff9e0, #fef7d2)",
              border: "3px solid oklch(0.832 0.162 72 / 0.6)",
              boxShadow:
                "0 20px 80px oklch(0.832 0.162 72 / 0.3), 0 0 0 1px white",
            }}
          >
            {/* Close button */}
            <button
              type="button"
              data-ocid="finalsun.modal.close_button"
              onClick={handleClose}
              className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110 z-10"
              style={{
                background: "oklch(0.916 0.13 89 / 0.4)",
                border: "1px solid oklch(0.832 0.162 72 / 0.4)",
              }}
              aria-label="Close message"
            >
              <X className="w-4 h-4" style={{ color: "oklch(0.5 0.1 67)" }} />
            </button>

            {/* Decorative top */}
            <div className="mb-6">
              <SunSVG size={80} />
            </div>

            {/* The final message */}
            <div
              className="mb-6 p-6 rounded-2xl"
              style={{
                background: "oklch(0.916 0.13 89 / 0.3)",
                border: "1px solid oklch(0.832 0.162 72 / 0.3)",
              }}
            >
              <p
                className="font-display text-xl sm:text-2xl font-bold italic leading-relaxed"
                style={{ color: "oklch(0.38 0.12 67)" }}
              >
                "They say behind every successful man there is a woman, and that
                is you Niru
                <span style={{ color: "oklch(0.729 0.15 355)" }}>💕</span>.
                <br className="hidden sm:block" /> Thank you for coming to my
                life."
              </p>
            </div>

            {/* Women's Day message */}
            <div className="space-y-3">
              <div className="flex justify-center gap-1" aria-hidden="true">
                <span className="text-xl">💛</span>
                <span className="text-xl">🌸</span>
                <span className="text-xl">💛</span>
                <span className="text-xl">🌸</span>
                <span className="text-xl">💛</span>
              </div>
              <p
                className="font-display text-2xl sm:text-3xl font-bold"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.764 0.148 67), oklch(0.832 0.162 72), oklch(0.916 0.13 89))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Happy Women's Day 2026 🌸
              </p>
              <p
                className="font-body text-base font-medium"
                style={{ color: "oklch(0.55 0.08 72)" }}
              >
                You are my sunshine, always and forever. 🌞
              </p>
            </div>
          </div>
        </dialog>
      )}
    </section>
  );
}
