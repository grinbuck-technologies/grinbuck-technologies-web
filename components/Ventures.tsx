"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap";
import { ventures } from "@/lib/ventures";
import VentureRow from "@/components/VentureRow";

export default function Ventures() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const rows = gsap.utils.toArray<HTMLElement>("[data-venture-row]", containerRef.current!);

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(rows, { opacity: 1, yPercent: 0 });
        return;
      }

      rows.forEach((row, i) => {
        const idxEl = row.querySelector<HTMLElement>("[data-venture-index]");

        // One timeline per row → one ScrollTrigger; index x-slide leads by 0.08s.
        const tl = gsap.timeline({
          delay: i * 0.06,
          scrollTrigger: { trigger: row, start: "top 85%", once: true },
        });

        if (idxEl) {
          tl.fromTo(idxEl, { x: -10 }, { x: 0, duration: 0.7, ease: "weight" }, 0);
        }

        tl.fromTo(
          row,
          { yPercent: 40, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.9, ease: "weight" },
          0.08
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      style={{
        width: "100%",
        padding: "0 clamp(2rem, 8vw, 8rem)",
        background: "var(--color-paper)",
      }}
    >
      {ventures.map((venture, i) => (
        <VentureRow
          key={venture.name}
          venture={venture}
          index={i}
          isLast={i === ventures.length - 1}
        />
      ))}
    </section>
  );
}
