import type { Metadata } from "next";
import { Grinbuck3dClient } from "@/components/Grinbuck3dClient";

export const metadata: Metadata = {
  title: "Grinbuck3D: 3D-print production, Victoria BC",
  description:
    "3D-print production for clients who need parts made to spec and delivered on time. From prototype to production run, in-house in Victoria, BC.",
};

/** `/grinbuck3d` route — the Grinbuck3D manufacturing venture's landing page. */
export default function Grinbuck3dPage() {
  return <Grinbuck3dClient />;
}
