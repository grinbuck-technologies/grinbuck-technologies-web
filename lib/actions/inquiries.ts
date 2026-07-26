"use server";

import { sendInquiryEmail } from "@/lib/resend";
import type { FormState } from "@/lib/actions/formState";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getField(formData: FormData, name: string): string {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

const GENERIC_ERROR: FormState = {
  status: "error",
  message:
    "Something went wrong sending your request. Please try again, or email us directly at hello@grinbuck.com.",
};

/**
 * Server action for the ClickIT pilot-kit request form
 * (`/grinbuck3d/clickit/pilot-kit`). Validates the required institution and
 * contact fields, then emails the submission to the Grinbuck inbox via
 * Resend. This is a request for a custom quote, not a free program, so the
 * confirmation copy must not imply otherwise.
 */
export async function submitPilotKitRequest(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const institutionName = getField(formData, "institutionName");
  const institutionType = getField(formData, "institutionType");
  const institutionTypeOther = getField(formData, "institutionTypeOther");
  const contactName = getField(formData, "contactName");
  const contactEmail = getField(formData, "contactEmail");
  const unitCount = getField(formData, "unitCount");
  const message = getField(formData, "message");

  if (
    !institutionName ||
    !institutionType ||
    !contactName ||
    !contactEmail ||
    !unitCount ||
    !EMAIL_PATTERN.test(contactEmail)
  ) {
    return {
      status: "error",
      message: "Please fill in every required field with a valid email address.",
    };
  }

  const resolvedInstitutionType =
    institutionType === "other" && institutionTypeOther
      ? institutionTypeOther
      : institutionType;

  const result = await sendInquiryEmail(
    `ClickIT pilot kit quote request: ${institutionName}`,
    [
      ["Institution name", institutionName],
      ["Institution type", resolvedInstitutionType],
      ["Contact name", contactName],
      ["Contact email", contactEmail],
      ["Estimated unit count / group size", unitCount],
      ["Message", message],
    ],
    contactEmail
  );

  if (!result.success) return GENERIC_ERROR;

  return {
    status: "success",
    message:
      "Thanks. We've received your request and will follow up with a custom quote based on your unit count and institution.",
  };
}

/**
 * Server action for the ClickIT quote/bulk-order form
 * (`/grinbuck3d/clickit/quote`), for dog trainers, owners, clubs, and
 * retail or wholesale enquiries.
 */
export async function submitClickitQuoteRequest(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const name = getField(formData, "name");
  const email = getField(formData, "email");
  const lookingFor = getField(formData, "lookingFor");
  const lookingForOther = getField(formData, "lookingForOther");
  const quantity = getField(formData, "quantity");
  const message = getField(formData, "message");

  if (!name || !email || !lookingFor || !EMAIL_PATTERN.test(email)) {
    return {
      status: "error",
      message: "Please fill in every required field with a valid email address.",
    };
  }

  const resolvedLookingFor =
    lookingFor === "other" && lookingForOther ? lookingForOther : lookingFor;

  const result = await sendInquiryEmail(
    `ClickIT quote request: ${name}`,
    [
      ["Name", name],
      ["Email", email],
      ["What they're looking for", resolvedLookingFor],
      ["Quantity", quantity],
      ["Message", message],
    ],
    email
  );

  if (!result.success) return GENERIC_ERROR;

  return {
    status: "success",
    message: "Thanks. We've received your request and will get back to you shortly.",
  };
}

/**
 * Server action for the Grinbuck3D manufacturing enquiry form
 * (`/grinbuck3d/quote`), for prototyping and production-run requests.
 */
export async function submitGrinbuck3dQuoteRequest(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const companyOrName = getField(formData, "companyOrName");
  const email = getField(formData, "email");
  const projectType = getField(formData, "projectType");
  const partDescription = getField(formData, "partDescription");
  const quantity = getField(formData, "quantity");
  const deadline = getField(formData, "deadline");
  const message = getField(formData, "message");

  if (
    !companyOrName ||
    !email ||
    !projectType ||
    !partDescription ||
    !EMAIL_PATTERN.test(email)
  ) {
    return {
      status: "error",
      message: "Please fill in every required field with a valid email address.",
    };
  }

  const result = await sendInquiryEmail(
    `Grinbuck3D production enquiry: ${companyOrName}`,
    [
      ["Company or name", companyOrName],
      ["Email", email],
      ["Project type", projectType],
      ["Part description", partDescription],
      ["Quantity", quantity],
      ["Target deadline", deadline],
      ["Message", message],
    ],
    email
  );

  if (!result.success) return GENERIC_ERROR;

  return {
    status: "success",
    message: "Thanks. We've received your request and will follow up with a quote.",
  };
}
