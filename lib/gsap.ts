import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(ScrollTrigger, CustomEase);

export const EASE_ENTER = "weight" as const;
CustomEase.create(EASE_ENTER, "0.16,1,0.3,1");

export default gsap;
export { ScrollTrigger, CustomEase };
