"use client";
import { useEffect, useRef } from "react";
import gsap, { ScrollTrigger } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";

const FORMSPREE_ACTION = "https://formspree.io/f/xoqybdzw";

const CARDS = [
  { label: "The Company", body: "Grinbuck Technologies is the holding company behind the ventures — the quiet operator, not the headline." },
  { label: "The People", body: "A small, sharp team that builds, ships, and runs things end to end. No layers. No theatre. Just operators." },
  { label: "The Method", body: "Validate cheap, build lean, scale what earns it. Every venture is an experiment with a real P&L." },
];

type Props = { active: boolean };

export default function AboutContactScene({ active }: Props) {
  const root = useRef<HTMLElement>(null);
  const scroller = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const head = root.current?.querySelector("[data-head]");
      const cards = gsap.utils.toArray<HTMLElement>("[data-card]", root.current);
      const contact = root.current?.querySelector("[data-contact]");

      if (head) gsap.set(head, { opacity: 0, z: -600, rotateX: 12, force3D: true });
      if (cards.length) gsap.set(cards, { opacity: 0, z: -900, rotateY: -18, yPercent: 8, force3D: true });
      if (contact) gsap.set(contact, { opacity: 0, yPercent: 14 });

      if (!active || !root.current || !scroller.current) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        if (!head || !contact || !cards.length) return;

        gsap.set(head, { opacity: 0, z: -600, rotateX: 12, force3D: true });
        gsap.set(cards, { opacity: 0, z: -900, rotateY: -18, yPercent: 8, force3D: true });
        gsap.set(contact, { opacity: 0, yPercent: 14 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            scroller: scroller.current,
            start: "top top",
            end: "+=320%",
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          },
        });

        tl.to(head, { opacity: 1, z: 0, rotateX: 0, duration: 1.2, ease: "power3.out" })
          .to(head, { opacity: 0, z: 300, duration: 0.8, ease: "power2.in" }, "+=0.4")
          .to(cards, { opacity: 1, z: 0, rotateY: 0, yPercent: 0, stagger: 0.5, duration: 1.4, ease: "power3.out" }, "-=0.2")
          .to(cards, { opacity: 0, z: 200, stagger: 0.15, duration: 0.8, ease: "power2.in" }, "+=0.2")
          .to(contact, { opacity: 1, yPercent: 0, duration: 1.2, ease: "power3.out" }, "-=0.3");

        return () => tl.kill();
      });

      mm.add("(max-width: 767px), (prefers-reduced-motion: reduce)", () => {
        const items = gsap.utils.toArray<HTMLElement>("[data-head],[data-card],[data-contact]", root.current);
        items.forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: { trigger: el, scroller: scroller.current, start: "top 85%" },
            }
          );
        });
      });

      ScrollTrigger.refresh();

      return () => mm.revert();
    },
    { scope: root, dependencies: [active] }
  );

  useEffect(() => {
    if (!active || !scroller.current) return;

    const el = scroller.current;
    const onWheel = (event: WheelEvent) => {
      const max = el.scrollHeight - el.clientHeight;
      const atTop = el.scrollTop <= 0;
      const atBottom = el.scrollTop >= max - 1;

      if (event.deltaY < 0 && atTop) return;
      if (event.deltaY > 0 && atBottom) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      el.scrollTop += event.deltaY;
      ScrollTrigger.update();
    };

    window.addEventListener("wheel", onWheel, { capture: true, passive: false });
    return () => window.removeEventListener("wheel", onWheel, { capture: true });
  }, [active]);

  useEffect(() => {
    if (active || !scroller.current) return;
    scroller.current.scrollTop = 0;
  }, [active]);

  return (
    <div ref={scroller} className="h-full w-full overflow-y-auto overscroll-contain">
      <section
        ref={root}
        style={{ perspective: "1400px", background: "var(--color-gate)" }}
        className="relative w-full min-h-svh overflow-hidden"
      >
        <div className="pointer-events-none absolute inset-0" style={{ background: "var(--color-gate)" }} />
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(60% 50% at 50% 30%, color-mix(in srgb, var(--color-olive) 18%, transparent), transparent 70%)" }}
        />
        <div
          data-stage
          className="relative mx-auto flex min-h-svh max-w-5xl flex-col items-center justify-center gap-10 px-6 py-24"
          style={{ transformStyle: "preserve-3d" }}
        >
          <h2
            data-head
            className="text-center text-4xl font-semibold leading-tight tracking-tight md:text-6xl"
            style={{ color: "var(--color-paper)", transformStyle: "preserve-3d" }}
          >
            Behind the ventures,
            <br />
            <span style={{ color: "var(--color-olive)" }}>one company.</span>
          </h2>

          <div className="grid w-full gap-6 md:grid-cols-3" style={{ transformStyle: "preserve-3d" }}>
            {CARDS.map((c) => (
              <article
                key={c.label}
                data-card
                className="rounded-2xl p-6 backdrop-blur-sm"
                style={{
                  border: "1px solid color-mix(in srgb, var(--color-olive) 30%, transparent)",
                  background: "color-mix(in srgb, var(--color-paper) 4%, transparent)",
                  transformStyle: "preserve-3d",
                }}
              >
                <div
                  className="mb-3 text-sm font-medium uppercase tracking-widest"
                  style={{ color: "var(--color-olive)", fontFamily: "var(--font-mono)" }}
                >
                  {c.label}
                </div>
                <p className="text-base leading-relaxed" style={{ color: "var(--color-paper)", opacity: 0.75 }}>
                  {c.body}
                </p>
              </article>
            ))}
          </div>

          <div
            data-contact
            className="mt-4 w-full max-w-xl rounded-2xl p-8 text-center backdrop-blur-md"
            style={{
              border: "1px solid color-mix(in srgb, var(--color-olive) 30%, transparent)",
              background: "color-mix(in srgb, var(--color-paper) 5%, transparent)",
            }}
          >
            <h3 className="text-2xl font-semibold md:text-3xl" style={{ color: "var(--color-paper)" }}>
              Let&apos;s build something.
            </h3>
            <p className="mt-2" style={{ color: "var(--color-paper)", opacity: 0.5 }}>
              Partnerships, ventures, or just to talk.
            </p>
            <form action={FORMSPREE_ACTION} method="POST" className="mt-6 flex flex-col gap-3 text-left">
              <input
                name="email"
                type="email"
                required
                aria-label="Your email address"
                placeholder="Your email"
                className="rounded-lg px-4 py-3 outline-none"
                style={{
                  background: "color-mix(in srgb, var(--color-ink) 30%, transparent)",
                  border: "1px solid color-mix(in srgb, var(--color-paper) 10%, transparent)",
                  color: "var(--color-paper)",
                }}
              />
              <textarea
                name="message"
                required
                rows={3}
                aria-label="Your message"
                placeholder="Your message"
                className="resize-none rounded-lg px-4 py-3 outline-none"
                style={{
                  background: "color-mix(in srgb, var(--color-ink) 30%, transparent)",
                  border: "1px solid color-mix(in srgb, var(--color-paper) 10%, transparent)",
                  color: "var(--color-paper)",
                }}
              />
              <button
                type="submit"
                className="mt-1 rounded-lg px-5 py-3 font-medium transition-opacity hover:opacity-80"
                style={{ background: "var(--color-olive)", color: "var(--color-paper)" }}
              >
                Send Message
              </button>
            </form>
            <div
              className="mt-6 text-sm"
              style={{ color: "var(--color-paper)", opacity: 0.4, fontFamily: "var(--font-mono)" }}
            >
              hello@grinbuck.com · Victoria, BC
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
