import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase, DrawSVGPlugin, InertiaPlugin, Draggable);

// Brand easing curves
CustomEase.create("weight", "0.16,1,0.3,1");     // snappy deceleration — enter/reveal
CustomEase.create("weightOut", "0.7,0,0.84,0");  // strong acceleration — exit/conceal

export default gsap;
export { ScrollTrigger, SplitText, CustomEase, DrawSVGPlugin, InertiaPlugin, Draggable };
