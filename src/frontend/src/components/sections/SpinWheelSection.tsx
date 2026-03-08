import { useEffect, useRef, useState } from "react";

const REASONS = [
  "Your warm heart",
  "Your beautiful smile",
  "The way you care",
  "Your strength always",
  "Your golden laugh",
  "How you light up rooms",
  "Your endless kindness",
  "Simply being you",
];

const SEGMENT_COLORS = [
  "#ffda7a", // sunflower
  "#ffd6e0", // pastel pink
  "#fbb13c", // marigold
  "#d4f5e9", // mint
  "#ffe4b5", // moccasin
  "#bfe3f5", // sky blue
  "#fbb13c", // marigold
  "#ffd6e0", // pastel pink
];

const WHEEL_SIZE = 320;
const NUM_SEGMENTS = REASONS.length;
const ANGLE_PER_SEGMENT = (2 * Math.PI) / NUM_SEGMENTS;

function buildWheelPath(index: number, radius: number): string {
  const startAngle = index * ANGLE_PER_SEGMENT - Math.PI / 2;
  const endAngle = (index + 1) * ANGLE_PER_SEGMENT - Math.PI / 2;
  const cx = WHEEL_SIZE / 2;
  const cy = WHEEL_SIZE / 2;

  const x1 = cx + radius * Math.cos(startAngle);
  const y1 = cy + radius * Math.sin(startAngle);
  const x2 = cx + radius * Math.cos(endAngle);
  const y2 = cy + radius * Math.sin(endAngle);

  return `M${cx},${cy} L${x1},${y1} A${radius},${radius} 0 0,1 ${x2},${y2} Z`;
}

function getTextPosition(index: number) {
  const midAngle = (index + 0.5) * ANGLE_PER_SEGMENT - Math.PI / 2;
  const r = (WHEEL_SIZE / 2) * 0.65;
  return {
    x: WHEEL_SIZE / 2 + r * Math.cos(midAngle),
    y: WHEEL_SIZE / 2 + r * Math.sin(midAngle),
    rotation: (index + 0.5) * (360 / NUM_SEGMENTS) - 90 + 90,
  };
}

export function SpinWheelSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [heartBeat, setHeartBeat] = useState(false);
  const spinRef = useRef<number>(0);

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

  const handleSpin = () => {
    if (spinning) return;
    setShowResult(false);
    setResult(null);
    setSpinning(true);

    const extraSpins = 5 + Math.floor(Math.random() * 3);
    const targetSegment = Math.floor(Math.random() * NUM_SEGMENTS);
    const segmentAngle = 360 / NUM_SEGMENTS;
    const targetAngle = 360 - targetSegment * segmentAngle - segmentAngle / 2;
    const totalRotation = extraSpins * 360 + targetAngle;

    spinRef.current = rotation + totalRotation;
    setRotation(spinRef.current);

    const duration = 3000 + Math.random() * 1000;

    setTimeout(() => {
      setSpinning(false);
      setResult(REASONS[targetSegment]);
      setShowResult(true);
      setHeartBeat(true);
      setTimeout(() => setHeartBeat(false), 1000);
    }, duration);
  };

  const radius = WHEEL_SIZE / 2 - 4;

  return (
    <section
      id="spinwheel"
      data-ocid="spinwheel.section"
      ref={sectionRef}
      className="section-fade-in relative py-20 px-4"
    >
      {/* Background decoration */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="absolute top-10 left-0 w-64 h-64 rounded-full opacity-20"
          style={{
            background: "oklch(0.916 0.13 89)",
            filter: "blur(60px)",
            transform: "translate(-30%, -20%)",
          }}
        />
        <div
          className="absolute bottom-10 right-0 w-64 h-64 rounded-full opacity-20"
          style={{
            background: "oklch(0.929 0.06 355)",
            filter: "blur(60px)",
            transform: "translate(30%, 20%)",
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <div
              className="h-px w-12"
              style={{ background: "oklch(0.832 0.162 72 / 0.5)" }}
            />
            <span className="text-2xl">💕</span>
            <div
              className="h-px w-12"
              style={{ background: "oklch(0.832 0.162 72 / 0.5)" }}
            />
          </div>
          <h2
            className="font-display text-4xl sm:text-5xl md:text-6xl font-bold mb-4"
            style={{ color: "oklch(0.42 0.1 67)" }}
          >
            Why I Love You
          </h2>
          <p
            className="font-body text-lg"
            style={{ color: "oklch(0.55 0.08 72)" }}
          >
            Spin the wheel to discover a reason. There are infinite more.
          </p>
        </div>

        {/* Wheel + button layout */}
        <div className="flex flex-col items-center gap-8">
          {/* Wheel container */}
          <div
            className="relative"
            style={{ width: WHEEL_SIZE + 40, maxWidth: "100%" }}
          >
            {/* Pointer */}
            <div
              className="absolute z-10"
              style={{
                top: "-8px",
                left: "50%",
                transform: "translateX(-50%)",
                width: 0,
                height: 0,
                borderLeft: "12px solid transparent",
                borderRight: "12px solid transparent",
                borderTop: "24px solid oklch(0.764 0.148 67)",
                filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
              }}
              aria-hidden="true"
            />

            {/* Wheel */}
            <div
              className="relative mx-auto rounded-full"
              style={{
                width: WHEEL_SIZE,
                height: WHEEL_SIZE,
                maxWidth: "100%",
              }}
            >
              <svg
                width={WHEEL_SIZE}
                height={WHEEL_SIZE}
                viewBox={`0 0 ${WHEEL_SIZE} ${WHEEL_SIZE}`}
                role="img"
                aria-label="Spinning wheel of reasons"
                style={{
                  transform: `rotate(${rotation}deg)`,
                  transition: spinning
                    ? `transform ${3 + 1}s cubic-bezier(0.17, 0.67, 0.12, 1)`
                    : "none",
                  borderRadius: "50%",
                  boxShadow:
                    "0 8px 32px oklch(0.832 0.162 72 / 0.3), 0 0 0 4px white, 0 0 0 6px oklch(0.832 0.162 72 / 0.3)",
                }}
              >
                <title>Spinning wheel of reasons</title>
                {/* Segments */}
                {REASONS.map((reason, i) => {
                  const { x, y, rotation: textRot } = getTextPosition(i);
                  const words = reason.split(" ");
                  const lineHeight = 13;

                  return (
                    <g key={reason}>
                      <path
                        d={buildWheelPath(i, radius)}
                        fill={SEGMENT_COLORS[i]}
                        stroke="white"
                        strokeWidth="1.5"
                      />
                      <text
                        x={x}
                        y={y}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        transform={`rotate(${textRot}, ${x}, ${y})`}
                        style={{ pointerEvents: "none" }}
                      >
                        {words.map((word, wi) => (
                          <tspan
                            key={`${reason}-${word}`}
                            x={x}
                            dy={
                              wi === 0
                                ? -(((words.length - 1) * lineHeight) / 2)
                                : lineHeight
                            }
                            fontSize="9"
                            fontWeight="600"
                            fill="oklch(0.35 0.08 67)"
                            fontFamily="Figtree, sans-serif"
                          >
                            {word}
                          </tspan>
                        ))}
                      </text>
                    </g>
                  );
                })}

                {/* Center circle */}
                <circle
                  cx={WHEEL_SIZE / 2}
                  cy={WHEEL_SIZE / 2}
                  r="22"
                  fill="white"
                  stroke="oklch(0.832 0.162 72)"
                  strokeWidth="3"
                />
                <text
                  x={WHEEL_SIZE / 2}
                  y={WHEEL_SIZE / 2}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="18"
                >
                  💛
                </text>
              </svg>
            </div>
          </div>

          {/* Spin button */}
          <button
            type="button"
            data-ocid="spinwheel.button"
            onClick={handleSpin}
            disabled={spinning}
            className="relative px-10 py-4 rounded-full font-body font-bold text-lg shadow-warm-lg transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
            style={{
              background: spinning
                ? "oklch(0.916 0.13 89)"
                : "linear-gradient(135deg, oklch(0.832 0.162 72), oklch(0.764 0.148 67))",
              color: "white",
              border: "none",
              transform: spinning ? "scale(0.97)" : "scale(1)",
              boxShadow: "0 4px 20px oklch(0.832 0.162 72 / 0.4)",
            }}
          >
            {spinning ? (
              <span className="flex items-center gap-2">
                <span className="inline-block animate-spin">✨</span>
                Spinning...
              </span>
            ) : (
              "✨ Spin to Discover ✨"
            )}
          </button>

          {/* Result display */}
          {showResult && result && (
            <div
              data-ocid="spinwheel.result"
              className="text-center px-8 py-6 rounded-3xl max-w-sm glass-card shadow-warm-lg"
              style={{
                animation:
                  "result-appear 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
                border: "2px solid oklch(0.916 0.13 89 / 0.5)",
              }}
            >
              <div
                className={`text-4xl mb-3 ${heartBeat ? "heart-beat" : ""}`}
                aria-hidden="true"
              >
                💛
              </div>
              <p
                className="font-body text-sm font-semibold uppercase tracking-widest mb-2"
                style={{ color: "oklch(0.6 0.1 72)" }}
              >
                I love you because of...
              </p>
              <p
                className="font-display text-2xl font-bold italic"
                style={{ color: "oklch(0.42 0.1 67)" }}
              >
                {result}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
