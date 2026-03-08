import { FinalSunSection } from "./components/sections/FinalSunSection";
import { GardenSection } from "./components/sections/GardenSection";
import { HeroSection } from "./components/sections/HeroSection";
import { MusicSection } from "./components/sections/MusicSection";
import { OpenWhenSection } from "./components/sections/OpenWhenSection";
import { ParticlesBackground } from "./components/sections/ParticlesBackground";
import { ScrollNavDots } from "./components/sections/ScrollNavDots";
import { SpinWheelSection } from "./components/sections/SpinWheelSection";

function SectionDivider({ emoji = "✦" }: { emoji?: string }) {
  return (
    <div
      className="flex items-center justify-center gap-4 py-4 px-8 max-w-xs mx-auto"
      aria-hidden="true"
    >
      <div
        className="h-px flex-1 rounded"
        style={{ background: "oklch(0.916 0.13 89 / 0.5)" }}
      />
      <span className="text-2xl opacity-60">{emoji}</span>
      <div
        className="h-px flex-1 rounded"
        style={{ background: "oklch(0.916 0.13 89 / 0.5)" }}
      />
    </div>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  const utmLink = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`;

  return (
    <footer
      className="relative py-12 px-4 text-center"
      style={{ borderTop: "1px solid oklch(0.916 0.13 89 / 0.4)" }}
    >
      <div className="max-w-md mx-auto space-y-3">
        <p
          className="font-display text-2xl font-bold italic"
          style={{ color: "oklch(0.764 0.148 67)" }}
        >
          With all my love, always 💛
        </p>
        <p
          className="font-body text-sm"
          style={{ color: "oklch(0.6 0.07 72)" }}
        >
          For Nirosha — On International Women's Day, 2026
        </p>
        <div
          className="h-0.5 w-16 rounded-full mx-auto"
          style={{ background: "oklch(0.832 0.162 72 / 0.4)" }}
        />
        <p
          className="font-body text-xs"
          style={{ color: "oklch(0.65 0.06 72)" }}
        >
          © {year}. Built with{" "}
          <span style={{ color: "oklch(0.729 0.15 355)" }}>♥</span> using{" "}
          <a
            href={utmLink}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:opacity-80 transition-opacity"
            style={{ color: "oklch(0.764 0.148 67)" }}
          >
            caffeine.ai
          </a>
        </p>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="relative min-h-screen">
      {/* Floating particles across entire page */}
      <ParticlesBackground />

      {/* Scroll navigation dots */}
      <ScrollNavDots />

      {/* Main content */}
      <main>
        <HeroSection />

        <SectionDivider emoji="🌻" />

        <GardenSection />

        <SectionDivider emoji="💕" />

        <SpinWheelSection />

        <SectionDivider emoji="✉️" />

        <OpenWhenSection />

        <SectionDivider emoji="🎵" />

        <MusicSection />

        <SectionDivider emoji="🌟" />

        <FinalSunSection />
      </main>

      <Footer />
    </div>
  );
}
