"use client";
import { useActionState } from "react";
import { submitContactRequest } from "@/lib/actions/inquiries";
import { IDLE_FORM_STATE } from "@/lib/actions/formState";
import {
  TextField,
  TextareaField,
  SubmitButton,
  FormStatusMessage,
} from "@/components/forms/fields";

/** General contact form: name, email, and a free-text message. */
export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContactRequest, IDLE_FORM_STATE);

  return (
    <form
      action={formAction}
      style={{ display: "flex", flexDirection: "column", gap: "1.25rem", maxWidth: "560px" }}
    >
      <TextField label="Name" name="name" required />
      <TextField label="Email" name="email" type="email" required />
      <TextareaField label="Message" name="message" required />
      <div>
        <SubmitButton pending={pending} label="Send message" />
      </div>
      <FormStatusMessage state={state} />
    </form>
  );
}
