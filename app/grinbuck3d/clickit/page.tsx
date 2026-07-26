import type { Metadata } from "next";
import { ClickitClient } from "@/components/ClickitClient";

export const metadata: Metadata = {
  title: "ClickIT: Built to help you focus, wherever you need it",
  description:
    "A tactile, pocket-sized clicker for focus. It works by touch, not by sight, so there's nothing to watch and nothing to distract anyone nearby.",
};

/** `/grinbuck3d/clickit` route — the ClickIT product's marketing page. */
export default function ClickitPage() {
  return <ClickitClient />;
}
