import type { Metadata } from "next";
import { Grinbuck3dClient } from "@/components/Grinbuck3dClient";

export const metadata: Metadata = {
  title: "Grinbuck3D: Additive manufacturing, Victoria BC",
  description:
    "Additive manufacturing and 3D-print production for clients who need parts fast, precise, and built to spec. From prototype to production run.",
};

/** `/grinbuck3d` route — the Grinbuck3D manufacturing venture's landing page. */
export default function Grinbuck3dPage() {
  return <Grinbuck3dClient />;
}
