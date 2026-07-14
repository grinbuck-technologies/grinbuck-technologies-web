import type { Metadata } from "next";
import { Nav } from "@/components/Nav";

export const metadata: Metadata = {
  title: "About our team — Grinbuck Technologies Inc.",
  description: "Leadership at Grinbuck Technologies Inc.",
};

// TEMPORARY placeholder roster: names are confirmed, but roles are stand-ins
// and there are no bios yet. Replace with real bios/titles/photos tomorrow.
const TEAM = [
  { name: "Sarshad Abubaker", role: "Co-Founder" },
  { name: "Kavita Uttam", role: "Co-Founder" },
];

/** `/about` route — team roster page, linked from the homepage's About teaser and the site nav. */
export default function AboutPage() {
  return (
    <div>
      <Nav homeHref="/" links={[{ label: "Home", href: "/" }]} />
      <main
        style={{
          padding: "clamp(5rem, 12vh, 8rem) clamp(1.5rem, 4vw, 4rem)",
          background: "var(--color-paper)",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.5rem, 5vw, 4rem)",
            fontWeight: 500,
            letterSpacing: "-0.03em",
            color: "var(--color-ink)",
            margin: "0 0 3.5rem",
          }}
        >
          About our team
        </h1>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "3rem",
          }}
        >
          {TEAM.map((person) => (
            <div key={person.name}>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.25rem",
                  fontWeight: 600,
                  letterSpacing: "-0.01em",
                  color: "var(--color-ink)",
                  margin: "0 0 0.25rem",
                }}
              >
                {person.name}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "0.9375rem",
                  fontWeight: 400,
                  color: "var(--color-subhead)",
                  margin: 0,
                }}
              >
                {person.role}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
