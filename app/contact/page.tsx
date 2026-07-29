import type { Metadata } from "next";
import { FormPageLayout } from "@/components/forms/FormPageLayout";
import { ContactForm } from "@/components/forms/ContactForm";

export const metadata: Metadata = {
  title: "Contact: Grinbuck Technologies",
  description: "Get in touch with Grinbuck Technologies.",
};

/** `/contact` route: general contact form, replacing the sitewide mailto Contact link. */
export default function ContactPage() {
  return (
    <FormPageLayout
      navLinks={[{ label: "Home", href: "/" }]}
      eyebrow="Contact"
      heading="Get in touch."
      intro={["Tell us what's on your mind and we'll get back to you."]}
    >
      <ContactForm />
    </FormPageLayout>
  );
}
