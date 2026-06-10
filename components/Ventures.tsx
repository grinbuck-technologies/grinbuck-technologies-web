"use client";
import { ventures } from "@/lib/ventures";
import VentureRow from "@/components/VentureRow";

// Scene 2 content. Fills the viewport with top clearance for the docked
// wordmark header. Row reveal + hover live elsewhere (stage / VentureRow).
export default function Ventures() {
  return (
    <section
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "20vh clamp(2rem, 8vw, 8rem) 6vh",
        background: "var(--color-paper)",
      }}
    >
      {ventures.map((venture, index) => (
        <VentureRow
          key={venture.name}
          venture={venture}
          index={index}
          isLast={index === ventures.length - 1}
        />
      ))}
    </section>
  );
}
