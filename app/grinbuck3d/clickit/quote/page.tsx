import type { Metadata } from "next";
import { FormPageLayout } from "@/components/forms/FormPageLayout";
import { ClickitQuoteForm } from "@/components/forms/ClickitQuoteForm";

export const metadata: Metadata = {
  title: "Get ClickIT for training: Grinbuck3D",
  description:
    "Request ClickIT for dog training: personal purchase, bulk order, or a retail and wholesale enquiry.",
};

/** `/grinbuck3d/clickit/quote` route — quote request form for the training and bulk-order audience. */
export default function ClickitQuotePage() {
  return (
    <FormPageLayout
      navLinks={[
        { label: "ClickIT", href: "/grinbuck3d/clickit" },
        { label: "Home", href: "/" },
      ]}
      eyebrow="ClickIT / Quote Request"
      heading="Get ClickIT for training."
      intro={[
        "Whether it's one clicker or a bulk order for a club or shop, tell us what you need.",
        "We'll follow up directly.",
      ]}
    >
      <ClickitQuoteForm />
    </FormPageLayout>
  );
}
