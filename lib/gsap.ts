import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase, DrawSVGPlugin, InertiaPlugin, Draggable);

// Brand easing curves — import these string constants instead of hardcoding the names
export const EASE_ENTER = "weight" as const;
export const EASE_EXIT = "weightOut" as const;

CustomEase.create(EASE_ENTER, "0.16,1,0.3,1");
CustomEase.create(EASE_EXIT, "0.7,0,0.84,0");

export default gsap;
export { ScrollTrigger, SplitText, CustomEase, DrawSVGPlugin, InertiaPlugin, Draggable };
