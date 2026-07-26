"use client";
import { useActionState, useState } from "react";
import { submitClickitQuoteRequest } from "@/lib/actions/inquiries";
import { IDLE_FORM_STATE } from "@/lib/actions/formState";
import { CLICKER_VARIANTS } from "@/lib/clickitProducts";
import {
  TextField,
  TextareaField,
  SelectField,
  SubmitButton,
  FormStatusMessage,
} from "@/components/forms/fields";

const LOOKING_FOR_OPTIONS = [
  { value: "Personal purchase", label: "Personal purchase" },
  { value: "Bulk order", label: "Bulk order" },
  { value: "Retail or wholesale inquiry", label: "Retail or wholesale inquiry" },
  { value: "other", label: "Other" },
];

/** ClickIT quote form for the training and bulk-order audience: trainers, owners, clubs, retailers. */
export function ClickitQuoteForm() {
  const [state, formAction, pending] = useActionState(submitClickitQuoteRequest, IDLE_FORM_STATE);
  const [lookingFor, setLookingFor] = useState("");

  return (
    <form
      action={formAction}
      style={{ display: "flex", flexDirection: "column", gap: "1.25rem", maxWidth: "560px" }}
    >
      <TextField label="Name" name="name" required />
      <TextField label="Email" name="email" type="email" required />
      <SelectField
        label="What are you looking for?"
        name="lookingFor"
        required
        options={LOOKING_FOR_OPTIONS}
        value={lookingFor}
        onChange={setLookingFor}
      />
      {lookingFor === "other" && (
        <TextField label="Tell us more" name="lookingForOther" />
      )}
      <TextField label="Quantity, if applicable" name="quantity" />
      <SelectField
        label="Silent or audible?"
        name="variant"
        required
        options={CLICKER_VARIANTS}
      />
      <TextareaField label="Anything else we should know?" name="message" />
      <div>
        <SubmitButton pending={pending} label="Send request" />
      </div>
      <FormStatusMessage state={state} />
    </form>
  );
}
