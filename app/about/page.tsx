import type { Metadata } from "next";
import Image from "next/image";
import { Nav } from "@/components/Nav";
import { SECTION_MAX_WIDTH, SECTION_PADDING_X } from "@/lib/constants";
import sarshadPortrait from "./images/sarshad-portrait.jpeg";
import kavitaPortrait from "./images/kavita-portrait.jpeg";

export const metadata: Metadata = {
  title: "About our team — Grinbuck Technologies Inc.",
  description:
    "Meet the founders of Grinbuck Technologies — Sarshad Abubaker and Kavita Uttam.",
};

type TeamMember = {
  name: string;
  title: string;
  bio: string;
  credentials: string;
  portrait: typeof sarshadPortrait;
  portraitAlt: string;
};

const TEAM: TeamMember[] = [
  {
    name: "Sarshad Abubaker",
    title: "Founder & CEO",
    bio: "Sarshad is a software developer and entrepreneur with over a decade of experience across enterprise engineering, academic research, and building companies of his own. He spent nearly a decade at Latitude Geographics (later VertiGis North America) as a software developer, designing and shipping features for the company's flagship HTML5 web mapping application and API, solving complex architectural problems and keeping the platform stable across browsers, operating systems, and hardware. Before that, he was a research assistant and teaching assistant at the University of Victoria, researching finite-automata cryptography, social networks, and smart grid security, and co-authoring two peer-reviewed academic papers. He also contributed security architecture to a Nokia University Relations project on privacy-preserving smartphone applications. He holds a Master's in Computer Science from the University of Victoria and a Master's in Information Technology from De Montfort University (UK), where he was named Best IT Master's Student. His interest in emerging technology runs deeper than software alone — between 2017 and 2018 he ran his own cryptocurrency mining operation, and he's remained a keen follower of the space since.",
    credentials:
      "Victoria, BC · MSc Computer Science, University of Victoria · MSc IT, De Montfort University",
    portrait: sarshadPortrait,
    portraitAlt: "Portrait of Sarshad Abubaker",
  },
  {
    name: "Kavita Uttam",
    title: "Co-Founder & Director",
    bio: "Kavita built her career in healthcare operations across 17 years in clinical leadership and nuclear medicine safety, work that leaves no room for error. She has served as Assistant Supervisor and Radiation Safety Officer in nuclear medicine, roles built on rigorous clinical operations, team leadership, and stakeholder management. Her professional path has also included customer service experience at JPMorgan Chase. She holds a BSc in Biology from UBC, honours training in Nuclear Medicine from BCIT, and advanced technical certifications in CT, PET, and RSO from CAMRT. Having lived in multiple countries and attended schools around the world, she brings deep cultural fluency and a naturally social, inclusive mindset. This global perspective, combined with a compassionate, intuitive approach built through years in patient care, shapes how she builds inclusive environments and connects with diverse teams and clients.",
    credentials: "Victoria, BC · BSc Biology, UBC · Honours, Nuclear Medicine, BCIT",
    portrait: kavitaPortrait,
    portraitAlt: "Portrait of Kavita Uttam",
  },
];

/** `/about` route — team roster page, linked from the homepage's About teaser and the site nav. */
export default function AboutPage() {
  return (
    <div>
      <Nav homeHref="/" links={[{ label: "Home", href: "/" }]} />
      <main
        style={{
          padding: `clamp(5rem, 12vh, 8rem) ${SECTION_PADDING_X}`,
          background: "var(--color-paper)",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div style={{ maxWidth: SECTION_MAX_WIDTH, width: "100%" }}>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              fontWeight: 500,
              letterSpacing: "-0.03em",
              color: "var(--color-ink)",
              textAlign: "center",
              margin: "0 0 4.5rem",
            }}
          >
            About our team
          </h1>

          <div style={{ display: "flex", flexDirection: "column", gap: "4.5rem" }}>
            {TEAM.map((person, i) => {
              const isRight = i % 2 === 1;

              const portrait = (
                <div key="portrait">
                  <Image
                    src={person.portrait}
                    alt={person.portraitAlt}
                    placeholder="blur"
                    sizes="(max-width: 768px) 100vw, 240px"
                    style={{
                      width: "100%",
                      height: "auto",
                      aspectRatio: "4 / 5",
                      objectFit: "cover",
                      borderRadius: "16px",
                    }}
                  />
                </div>
              );

              const details = (
                <div
                  key="details"
                  style={{
                    textAlign: isRight ? "right" : "left",
                    borderLeft: isRight ? "none" : "3px solid var(--color-brand)",
                    borderRight: isRight ? "3px solid var(--color-brand)" : "none",
                    paddingLeft: isRight ? 0 : "1.75rem",
                    paddingRight: isRight ? "1.75rem" : 0,
                  }}
                >
                  <span
                    style={{
                      display: "block",
                      fontFamily: "var(--font-display)",
                      fontSize: "0.6875rem",
                      fontWeight: 600,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "var(--color-brand)",
                      marginBottom: "0.75rem",
                    }}
                  >
                    {person.title}
                  </span>
                  <h2
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
                      fontWeight: 600,
                      letterSpacing: "-0.02em",
                      color: "var(--color-ink)",
                      margin: "0 0 1.25rem",
                    }}
                  >
                    {person.name}
                  </h2>
                  {/* Bio copy stays left-aligned regardless of which side this
                      entry sits on — right-aligned paragraph text of this
                      length would hurt readability, so only the short
                      title/name/credentials lines alternate. */}
                  <p
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.0625rem",
                      fontWeight: 400,
                      lineHeight: 1.7,
                      color: "var(--color-subhead)",
                      textAlign: "left",
                      margin: "0 0 1.25rem",
                    }}
                  >
                    {person.bio}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "0.875rem",
                      fontWeight: 500,
                      fontVariant: "small-caps",
                      letterSpacing: "0.03em",
                      color: "var(--color-subhead)",
                      margin: 0,
                    }}
                  >
                    {person.credentials}
                  </p>
                </div>
              );

              return (
                <div
                  key={person.name}
                  className="two-col-grid"
                  style={{
                    display: "grid",
                    gridTemplateColumns: isRight ? "1fr 240px" : "240px 1fr",
                    gap: "2.5rem",
                    alignItems: "start",
                    maxWidth: "960px",
                    width: "100%",
                    marginLeft: isRight ? "auto" : 0,
                    marginRight: isRight ? 0 : "auto",
                  }}
                >
                  {/* DOM order (not CSS `order`/`gridColumn`) drives which
                      240px/1fr track each side lands in, so the mobile
                      `.two-col-grid` override (single explicit column) still
                      stacks both cleanly instead of leaving an item pinned
                      to a now-nonexistent second column. */}
                  {isRight ? (
                    <>
                      {details}
                      {portrait}
                    </>
                  ) : (
                    <>
                      {portrait}
                      {details}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
