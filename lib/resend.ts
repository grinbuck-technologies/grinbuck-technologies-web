import { Resend } from "resend";
import { CONTACT_EMAIL } from "@/lib/constants";

// RESEND_API_KEY must be set in the deployment environment. Resend's own
// client only throws when a send is actually attempted without a key, not
// at import time, so this doesn't break the build in environments where
// the key isn't configured yet.
const resend = new Resend(process.env.RESEND_API_KEY);

export type InquiryResult = { success: true } | { success: false; error: string };

/**
 * Sends a plain-text transactional email to the Grinbuck inbox with the
 * given field labels and values. Shared by every form's server action so
 * the Resend call and error handling live in one place.
 *
 * @param subject - Email subject line.
 * @param fields - Ordered label/value pairs to render as the email body.
 * @param replyTo - Submitter's email address, if collected, so replies go straight to them.
 */
export async function sendInquiryEmail(
  subject: string,
  fields: [string, string][],
  replyTo?: string
): Promise<InquiryResult> {
  const text = fields
    .filter(([, value]) => value.trim().length > 0)
    .map(([label, value]) => `${label}: ${value}`)
    .join("\n");

  try {
    const { error } = await resend.emails.send({
      from: "Grinbuck Technologies <grinbuck.web@tabmonk.com>",
      to: CONTACT_EMAIL,
      replyTo,
      subject,
      text,
    });

    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch {
    return {
      success: false,
      error: "Something went wrong sending your request. Please try again or email us directly.",
    };
  }
}
