// Shared GSAP instance with ScrollTrigger and CustomEase pre-registered —
// import from here instead of "gsap" directly so every consumer shares the
// same registered plugins and eased curve.
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(ScrollTrigger, CustomEase);

/** Custom eased curve ("weight") registered with GSAP for enter/reveal animations. */
export const EASE_ENTER = "weight" as const;
CustomEase.create(EASE_ENTER, "0.16,1,0.3,1");

export { gsap, ScrollTrigger, CustomEase };
