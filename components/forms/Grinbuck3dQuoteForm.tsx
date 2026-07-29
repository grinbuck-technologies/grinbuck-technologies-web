"use client";
import { useActionState } from "react";
import { submitGrinbuck3dQuoteRequest } from "@/lib/actions/inquiries";
import { IDLE_FORM_STATE } from "@/lib/actions/formState";
import {
  TextField,
  TextareaField,
  SelectField,
  SubmitButton,
  FormStatusMessage,
} from "@/components/forms/fields";

const PROJECT_TYPES = [
  { value: "Prototype", label: "Prototype" },
  { value: "Production run", label: "Production run" },
  { value: "Not sure yet", label: "Not sure yet" },
];

/** Grinbuck3D manufacturing enquiry form: prototyping and production-run requests. */
export function Grinbuck3dQuoteForm() {
  const [state, formAction, pending] = useActionState(
    submitGrinbuck3dQuoteRequest,
    IDLE_FORM_STATE
  );

  return (
    <form
      action={formAction}
      style={{ display: "flex", flexDirection: "column", gap: "1.25rem", maxWidth: "560px" }}
    >
      <TextField label="Company or name" name="companyOrName" required />
      <TextField label="Email" name="email" type="email" required />
      <SelectField
        label="Project type"
        name="projectType"
        required
        options={PROJECT_TYPES}
      />
      <TextareaField
        label="Part description"
        name="partDescription"
        required
        placeholder="What are you trying to build?"
      />
      <TextField label="Estimated quantity" name="quantity" />
      <TextField label="Target deadline" name="deadline" placeholder="Optional" />
      <TextareaField label="Anything else we should know?" name="message" />
      <div>
        <SubmitButton pending={pending} label="Get a quote" />
      </div>
      <FormStatusMessage state={state} />
    </form>
  );
}
