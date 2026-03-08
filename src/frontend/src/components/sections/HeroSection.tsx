import { ChevronDown } from "lucide-react";
import { useEffect, useRef } from "react";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const timer = setTimeout(() => {
      el.classList.add("visible");
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollToNext = () => {
    const gardenSection = document.getElementById("garden");
    gardenSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      data-ocid="hero.section"
      ref={sectionRef}
      className="section-fade-in relative min-h-screen flex flex-col items-center justify-center text-center px-4 py-16 overflow-hidden"
    >
      {/* Decorative background rings */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        aria-hidden="true"
      >
        {[300, 450, 600, 750].map((size, i) => (
          <div
            key={size}
            className="absolute rounded-full border"
            style={{
              width: size,
              height: size,
              borderColor: `oklch(0.916 0.13 89 / ${0.15 - i * 0.03})`,
              animation: `sun-rays ${4 + i * 0.5}s ease-in-out ${i * 0.3}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Sun image */}
      <div className="relative z-10 mb-8">
        <div className="sun-hero inline-block">
          <img
            src="/assets/generated/hero-sun-transparent.dim_600x600.png"
            alt="Glowing sun representing Nirosha's warmth"
            className="w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 object-contain select-none"
            draggable={false}
          />
        </div>
      </div>

      {/* Title */}
      <div className="relative z-10 space-y-4 max-w-3xl mx-auto">
        <div className="inline-block mb-3">
          <span
            className="text-sm font-body font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full"
            style={{
              background: "oklch(0.916 0.13 89 / 0.4)",
              color: "oklch(0.5 0.1 67)",
              border: "1px solid oklch(0.832 0.162 72 / 0.4)",
            }}
          >
            ✦ Women's Day 2026 ✦
          </span>
        </div>

        <h1
          className="title-animate font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight"
          style={{ color: "oklch(0.42 0.1 67)" }}
        >
          Happy Women's Day,{" "}
          <span
            className="italic"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.764 0.148 67), oklch(0.832 0.162 72), oklch(0.916 0.13 89))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Niru
          </span>{" "}
          💛
        </h1>

        <p
          className="title-animate-delay font-display text-xl sm:text-2xl md:text-3xl italic font-medium mt-4"
          style={{ color: "oklch(0.55 0.1 72)" }}
        >
          "You are the sunshine of my life"
        </p>

        <p
          className="title-animate-delay-2 font-body text-base sm:text-lg max-w-xl mx-auto mt-6 leading-relaxed"
          style={{ color: "oklch(0.5 0.07 75)" }}
        >
          This little corner of the internet was built with you in mind,
          pixel&nbsp;by&nbsp;pixel.{" "}
          <span style={{ color: "oklch(0.764 0.148 67)" }}>
            Scroll down to begin your journey.
          </span>
        </p>
      </div>

      {/* Scroll prompt */}
      <button
        type="button"
        onClick={scrollToNext}
        className="relative z-10 mt-12 flex flex-col items-center gap-2 bounce-arrow group cursor-pointer"
        aria-label="Scroll down to explore"
        style={{ background: "none", border: "none" }}
      >
        <span
          className="font-body text-sm font-medium tracking-wider uppercase"
          style={{ color: "oklch(0.6 0.1 72)" }}
        >
          Begin the journey
        </span>
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{
            background: "oklch(0.916 0.13 89 / 0.3)",
            border: "2px solid oklch(0.832 0.162 72 / 0.4)",
          }}
        >
          <ChevronDown
            className="w-5 h-5"
            style={{ color: "oklch(0.764 0.148 67)" }}
          />
        </div>
      </button>

      {/* Floating decorative elements */}
      <div
        className="absolute top-16 left-8 text-4xl animate-float opacity-50"
        aria-hidden="true"
      >
        ✨
      </div>
      <div
        className="absolute top-24 right-12 text-3xl opacity-40"
        style={{ animation: "float 4s ease-in-out 1s infinite" }}
        aria-hidden="true"
      >
        🌸
      </div>
      <div
        className="absolute bottom-32 left-16 text-3xl opacity-40"
        style={{ animation: "float 3.5s ease-in-out 0.5s infinite" }}
        aria-hidden="true"
      >
        💫
      </div>
      <div
        className="absolute bottom-24 right-20 text-4xl opacity-50 animate-float"
        aria-hidden="true"
      >
        ⭐
      </div>
    </section>
  );
}
