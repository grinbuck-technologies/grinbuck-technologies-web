import { CONTACT_EMAIL, SECTION_MAX_WIDTH, SECTION_PADDING_X } from "@/lib/constants";
import { Nav } from "@/components/Nav";

type FormPageLayoutProps = {
  navLinks: { label: string; href: string }[];
  eyebrow: string;
  heading: string;
  intro: string[];
  children: React.ReactNode;
};

/**
 * Shared shell for the site's in-house form pages (pilot-kit and quote
 * requests): Nav, a compact hero (eyebrow, heading, short intro beats),
 * the form itself, and the standard footer. Keeps the three form pages
 * visually and structurally consistent without tripling the boilerplate.
 */
export function FormPageLayout({ navLinks, eyebrow, heading, intro, children }: FormPageLayoutProps) {
  return (
    <div>
      <Nav homeHref="/" links={navLinks} />

      <main>
        <section
          style={{
            background: "var(--color-paper)",
            padding: `clamp(2.5rem, 6vh, 4rem) ${SECTION_PADDING_X} clamp(3rem, 8vh, 5rem)`,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div style={{ maxWidth: SECTION_MAX_WIDTH, width: "100%" }}>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--color-subhead)",
                marginBottom: "0.75rem",
              }}
            >
              {eyebrow}
            </div>
            <h1
              style={{
                fontFamily: "var(--font-noto-sans)",
                fontSize: "clamp(2rem, 4.5vw, 3rem)",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
                color: "var(--color-ink)",
                margin: "0 0 1rem",
                maxWidth: "680px",
              }}
            >
              {heading}
            </h1>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                maxWidth: "600px",
                marginBottom: "2.5rem",
              }}
            >
              {intro.map((line) => (
                <p
                  key={line}
                  style={{
                    fontFamily: "var(--font-noto-sans)",
                    fontWeight: 400,
                    fontSize: "1.0625rem",
                    lineHeight: 1.55,
                    color: "var(--color-subhead)",
                    margin: 0,
                  }}
                >
                  {line}
                </p>
              ))}
            </div>

            {children}
          </div>
        </section>
      </main>

      <footer
        style={{
          borderTop: "1px solid var(--color-hairline)",
          padding: "2rem clamp(1.5rem, 4vw, 4rem)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "var(--color-paper)",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "0.8125rem",
            color: "var(--color-ink)",
            opacity: 0.65,
          }}
        >
          © {new Date().getFullYear()} Grinbuck Technologies Inc.
        </span>
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="footer-link"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "0.8125rem",
            color: "var(--color-ink)",
            textDecoration: "none",
            opacity: 0.65,
          }}
        >
          {CONTACT_EMAIL}
        </a>
      </footer>
    </div>
  );
}
