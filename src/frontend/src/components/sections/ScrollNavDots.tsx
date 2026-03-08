import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "hero", label: "Arrival" },
  { id: "garden", label: "Garden" },
  { id: "spinwheel", label: "Why I Love You" },
  { id: "letters", label: "Letters" },
  { id: "music", label: "Music" },
  { id: "finalsun", label: "The Sun" },
];

export function ScrollNavDots() {
  const [activeSection, setActiveSection] = useState("hero");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 100);

      // Find current section
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight / 2) {
          setActiveSection(SECTIONS[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className="fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-2.5 items-center transition-opacity duration-500"
      style={{
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "all" : "none",
      }}
      aria-label="Section navigation"
    >
      {SECTIONS.map((section) => (
        <button
          type="button"
          key={section.id}
          data-ocid={`nav.${section.id}.button`}
          onClick={() => scrollTo(section.id)}
          aria-label={`Navigate to ${section.label}`}
          title={section.label}
          className={`nav-dot transition-all duration-300 ${activeSection === section.id ? "active" : ""}`}
          style={{
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer",
          }}
        />
      ))}
    </nav>
  );
}
