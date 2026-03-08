import { Disc3, Music, Music2 } from "lucide-react";
import { useEffect, useRef } from "react";

interface Song {
  id: number;
  title: string;
  artist: string;
  note: string;
  color: string;
  ringColor: string;
  labelColor: string;
  icon: React.ReactNode;
}

const SONGS: Song[] = [
  {
    id: 1,
    title: "You Are the Sunshine of My Life",
    artist: "Stevie Wonder",
    note: "This song plays in my heart every time I think of you.",
    color: "#ffda7a",
    ringColor: "#fbb13c",
    labelColor: "#e6a017",
    icon: <Music className="w-6 h-6" />,
  },
  {
    id: 2,
    title: "Can't Help Falling in Love",
    artist: "Elvis Presley",
    note: "Some things are just meant to be. You are one of them.",
    color: "#ffd6e0",
    ringColor: "#ff9eb5",
    labelColor: "#e86090",
    icon: <Music2 className="w-6 h-6" />,
  },
  {
    id: 3,
    title: "Better Together",
    artist: "Jack Johnson",
    note: "Because everything, absolutely everything, is better with you.",
    color: "#d4f5e9",
    ringColor: "#7bc6a0",
    labelColor: "#3a9a6f",
    icon: <Disc3 className="w-6 h-6" />,
  },
];

function VinylRecord({ song }: { song: Song }) {
  return (
    <div
      data-ocid={`music.item.${song.id}`}
      className="glass-card rounded-3xl p-6 shadow-warm-lg transition-all duration-300 hover:shadow-glow hover:-translate-y-1"
    >
      {/* Vinyl visual */}
      <div className="flex items-center gap-6 mb-5">
        {/* Record */}
        <div className="relative flex-shrink-0">
          {/* Vinyl disc */}
          <div
            className="w-20 h-20 rounded-full vinyl-spin flex items-center justify-center relative"
            style={{
              background:
                "conic-gradient(from 0deg, #1a1a1a, #2d2d2d, #1a1a1a, #333, #1a1a1a, #2d2d2d, #1a1a1a)",
              boxShadow: `0 4px 16px rgba(0,0,0,0.3), 0 0 0 3px ${song.ringColor}`,
            }}
          >
            {/* Rings */}
            {[24, 32, 38].map((r) => (
              <div
                key={r}
                className="absolute rounded-full border"
                style={{
                  width: r * 2,
                  height: r * 2,
                  borderColor: "rgba(255,255,255,0.08)",
                }}
              />
            ))}
            {/* Label */}
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center shadow-inner z-10 relative"
              style={{ background: song.color }}
            >
              <span style={{ color: song.labelColor }}>{song.icon}</span>
            </div>
          </div>

          {/* Tonearm */}
          <div
            className="absolute -right-2 -top-1 w-8 h-1 rounded-full origin-right"
            style={{
              background: song.ringColor,
              transform: "rotate(-15deg)",
            }}
            aria-hidden="true"
          />
        </div>

        {/* Song info */}
        <div className="flex-1 min-w-0">
          <p
            className="font-body text-xs font-semibold uppercase tracking-widest mb-1"
            style={{ color: "oklch(0.6 0.08 72)" }}
          >
            {song.artist}
          </p>
          <h3
            className="font-display font-bold text-base sm:text-lg leading-tight"
            style={{ color: "oklch(0.38 0.1 67)" }}
          >
            {song.title}
          </h3>
          {/* Progress bar decoration */}
          <div
            className="mt-2 h-1 rounded-full overflow-hidden"
            style={{ background: "oklch(0.916 0.13 89 / 0.3)" }}
          >
            <div
              className="h-full rounded-full"
              style={{
                width: `${40 + song.id * 15}%`,
                background: `linear-gradient(90deg, ${song.color}, ${song.ringColor})`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Personal note */}
      <div
        className="border-t pt-4 mt-2"
        style={{ borderColor: `${song.color}80` }}
      >
        <p
          className="font-body text-sm leading-relaxed italic font-medium"
          style={{ color: "oklch(0.5 0.08 72)" }}
        >
          💛 {song.note}
        </p>
      </div>

      {/* Floating music notes */}
      <div className="flex gap-3 mt-3 justify-end" aria-hidden="true">
        {(["♩", "♫", "♬"] as const).map((note) => (
          <span
            key={note}
            className="music-note text-lg"
            style={{
              color: song.ringColor,
              animationDelay:
                note === "♩" ? "0s" : note === "♫" ? "0.5s" : "1s",
              animationDuration:
                note === "♩" ? "2s" : note === "♫" ? "2.3s" : "2.6s",
            }}
          >
            {note}
          </span>
        ))}
      </div>
    </div>
  );
}

export function MusicSection() {
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
      id="music"
      data-ocid="music.section"
      ref={sectionRef}
      className="section-fade-in relative py-20 px-4"
    >
      {/* Background decoration */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-10"
          style={{ background: "oklch(0.832 0.162 72)", filter: "blur(80px)" }}
        />
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 mb-4">
            <div
              className="h-px w-12"
              style={{ background: "oklch(0.832 0.162 72 / 0.5)" }}
            />
            <span className="text-2xl">🎵</span>
            <div
              className="h-px w-12"
              style={{ background: "oklch(0.832 0.162 72 / 0.5)" }}
            />
          </div>
          <h2
            className="font-display text-4xl sm:text-5xl md:text-6xl font-bold mb-4"
            style={{ color: "oklch(0.42 0.1 67)" }}
          >
            Our Melody
          </h2>
          <p
            className="font-body text-lg"
            style={{ color: "oklch(0.55 0.08 72)" }}
          >
            Songs that carry my feelings when words fall short.
          </p>
        </div>

        {/* Song cards */}
        <div className="space-y-5">
          {SONGS.map((song) => (
            <VinylRecord key={song.id} song={song} />
          ))}
        </div>

        {/* Decorative note scatter */}
        <div
          className="text-center mt-10 text-3xl space-x-4"
          aria-hidden="true"
        >
          {(["♩", "♪", "♫", "♬", "♭"] as const).map((n) => (
            <span
              key={n}
              className="music-note inline-block"
              style={{
                color: "oklch(0.832 0.162 72 / 0.5)",
                animationDelay:
                  n === "♩"
                    ? "0s"
                    : n === "♪"
                      ? "0.3s"
                      : n === "♫"
                        ? "0.6s"
                        : n === "♬"
                          ? "0.9s"
                          : "1.2s",
                animationDuration:
                  n === "♩"
                    ? "2.5s"
                    : n === "♪"
                      ? "2.7s"
                      : n === "♫"
                        ? "2.9s"
                        : n === "♬"
                          ? "3.1s"
                          : "3.3s",
              }}
            >
              {n}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
