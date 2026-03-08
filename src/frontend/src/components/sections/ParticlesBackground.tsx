import { useEffect, useRef } from "react";

interface Particle {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  type: "sparkle" | "sun" | "heart" | "dot";
  color: string;
}

const PARTICLE_COLORS = [
  "oklch(0.916 0.13 89 / 0.6)",
  "oklch(0.832 0.162 72 / 0.5)",
  "oklch(0.929 0.06 355 / 0.5)",
  "oklch(0.952 0.065 156 / 0.4)",
  "oklch(0.977 0.05 95 / 0.7)",
];

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    size: Math.random() * 10 + 4,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 20,
    type: (["sparkle", "sun", "heart", "dot"] as const)[
      Math.floor(Math.random() * 4)
    ],
    color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
  }));
}

function SparkleIcon({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      role="img"
      aria-label="sparkle"
    >
      <title>sparkle</title>
      <path d="M12 0 L13.5 10.5 L24 12 L13.5 13.5 L12 24 L10.5 13.5 L0 12 L10.5 10.5 Z" />
    </svg>
  );
}

function SunIcon({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      role="img"
      aria-label="sun"
    >
      <title>sun</title>
      <circle cx="12" cy="12" r="5" />
      <line
        x1="12"
        y1="1"
        x2="12"
        y2="4"
        stroke="currentColor"
        strokeWidth="2"
      />
      <line
        x1="12"
        y1="20"
        x2="12"
        y2="23"
        stroke="currentColor"
        strokeWidth="2"
      />
      <line
        x1="1"
        y1="12"
        x2="4"
        y2="12"
        stroke="currentColor"
        strokeWidth="2"
      />
      <line
        x1="20"
        y1="12"
        x2="23"
        y2="12"
        stroke="currentColor"
        strokeWidth="2"
      />
      <line
        x1="4.22"
        y1="4.22"
        x2="6.34"
        y2="6.34"
        stroke="currentColor"
        strokeWidth="2"
      />
      <line
        x1="17.66"
        y1="17.66"
        x2="19.78"
        y2="19.78"
        stroke="currentColor"
        strokeWidth="2"
      />
      <line
        x1="19.78"
        y1="4.22"
        x2="17.66"
        y2="6.34"
        stroke="currentColor"
        strokeWidth="2"
      />
      <line
        x1="6.34"
        y1="17.66"
        x2="4.22"
        y2="19.78"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

export function ParticlesBackground() {
  const particlesRef = useRef<Particle[]>(generateParticles(25));
  const particles = particlesRef.current;

  useEffect(() => {}, []);

  return (
    <div className="particles-container" aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: `${p.left}%`,
            bottom: "-20px",
            color: p.color,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        >
          {p.type === "sparkle" && <SparkleIcon size={p.size} />}
          {p.type === "sun" && <SunIcon size={p.size} />}
          {p.type === "dot" && (
            <div
              style={{
                width: p.size / 2,
                height: p.size / 2,
                borderRadius: "50%",
                background: p.color,
              }}
            />
          )}
          {p.type === "heart" && (
            <span style={{ fontSize: p.size, lineHeight: 1 }}>💛</span>
          )}
        </div>
      ))}
    </div>
  );
}
