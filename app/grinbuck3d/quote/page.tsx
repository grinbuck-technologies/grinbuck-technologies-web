import type { Metadata } from "next";
import { FormPageLayout } from "@/components/forms/FormPageLayout";
import { Grinbuck3dQuoteForm } from "@/components/forms/Grinbuck3dQuoteForm";

export const metadata: Metadata = {
  title: "Get a manufacturing quote: Grinbuck3D",
  description:
    "Request a quote from Grinbuck3D for prototyping or a production run.",
};

/** `/grinbuck3d/quote` route — manufacturing enquiry form for prototyping and production-run requests. */
export default function Grinbuck3dQuotePage() {
  return (
    <FormPageLayout
      navLinks={[
        { label: "ClickIT", href: "/grinbuck3d/clickit" },
        { label: "Home", href: "/" },
      ]}
      eyebrow="Grinbuck3D / Production Enquiry"
      heading="Get a quote."
      intro={[
        "Tell us about the part and how many you need, whether it's a single prototype or a full production run.",
        "We'll follow up with a quote.",
      ]}
    >
      <Grinbuck3dQuoteForm />
    </FormPageLayout>
  );
}
