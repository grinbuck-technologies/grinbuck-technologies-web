import type { Metadata } from "next";
import { FormPageLayout } from "@/components/forms/FormPageLayout";
import { ClickitQuoteForm } from "@/components/forms/ClickitQuoteForm";

export const metadata: Metadata = {
  title: "Shop ClickIT: Grinbuck3D",
  description:
    "Order ClickIT: personal purchase, dog training, bulk order, or a retail and wholesale enquiry.",
};

/** `/grinbuck3d/clickit/quote` route — general quote/shop request form: personal purchase, training, or bulk order. */
export default function ClickitQuotePage() {
  return (
    <FormPageLayout
      navLinks={[
        { label: "ClickIT", href: "/grinbuck3d/clickit" },
        { label: "Home", href: "/" },
      ]}
      eyebrow="ClickIT / Shop"
      heading="Shop the clicker."
      intro={[
        "Whatever you're looking for, personal use, dog training, or a bulk order, tell us what you need.",
        "We'll follow up directly.",
      ]}
    >
      <ClickitQuoteForm />
    </FormPageLayout>
  );
}
