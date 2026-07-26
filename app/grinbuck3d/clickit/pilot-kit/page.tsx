import type { Metadata } from "next";
import { FormPageLayout } from "@/components/forms/FormPageLayout";
import { PilotKitForm } from "@/components/forms/PilotKitForm";

export const metadata: Metadata = {
  title: "Request a ClickIT pilot kit: Grinbuck3D",
  description:
    "Request a custom ClickIT pilot kit quote for your school, daycare, or institution.",
};

/** `/grinbuck3d/clickit/pilot-kit` route — institution pilot-kit quote request form. */
export default function PilotKitPage() {
  return (
    <FormPageLayout
      navLinks={[
        { label: "ClickIT", href: "/grinbuck3d/clickit" },
        { label: "Home", href: "/" },
      ]}
      eyebrow="ClickIT / Pilot Kit Request"
      heading="Bring ClickIT to your space."
      intro={[
        "Tell us about your institution and how many units you'd need.",
        "We'll follow up with a custom quote based on your unit count and institution. This is a quote request, not a free program.",
      ]}
    >
      <PilotKitForm />
    </FormPageLayout>
  );
}
