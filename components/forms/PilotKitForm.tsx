"use client";
import { useActionState, useState } from "react";
import { submitPilotKitRequest } from "@/lib/actions/inquiries";
import { IDLE_FORM_STATE } from "@/lib/actions/formState";
import { CLICKER_VARIANTS } from "@/lib/clickitProducts";
import {
  TextField,
  TextareaField,
  SelectField,
  SubmitButton,
  FormStatusMessage,
} from "@/components/forms/fields";

const INSTITUTION_TYPES = [
  { value: "School", label: "School" },
  { value: "Daycare", label: "Daycare" },
  { value: "Kindergarten", label: "Kindergarten" },
  { value: "Pediatric dental office", label: "Pediatric dental office" },
  { value: "Children's hospital", label: "Children's hospital" },
  { value: "other", label: "Other" },
];

/** ClickIT pilot-kit request form: institution details, contact info, and unit count. */
export function PilotKitForm() {
  const [state, formAction, pending] = useActionState(submitPilotKitRequest, IDLE_FORM_STATE);
  const [institutionType, setInstitutionType] = useState("");

  return (
    <form
      action={formAction}
      style={{ display: "flex", flexDirection: "column", gap: "1.25rem", maxWidth: "560px" }}
    >
      <TextField label="Institution name" name="institutionName" required />
      <SelectField
        label="Institution type"
        name="institutionType"
        required
        options={INSTITUTION_TYPES}
        value={institutionType}
        onChange={setInstitutionType}
      />
      {institutionType === "other" && (
        <TextField label="Tell us what kind of institution" name="institutionTypeOther" />
      )}
      <TextField label="Contact name" name="contactName" required />
      <TextField label="Contact email" name="contactEmail" type="email" required />
      <TextField
        label="Estimated unit count / class or group size"
        name="unitCount"
        required
        placeholder="e.g. 25 students across two classrooms"
      />
      <SelectField
        label="Silent or audible?"
        name="variant"
        required
        options={CLICKER_VARIANTS}
      />
      <TextareaField label="Anything else we should know?" name="message" />
      <div>
        <SubmitButton pending={pending} label="Request a quote" />
      </div>
      <FormStatusMessage state={state} />
    </form>
  );
}
