import type { FormState } from "@/lib/actions/formState";

const labelStyle: React.CSSProperties = {
  display: "block",
  fontFamily: "var(--font-noto-sans)",
  fontWeight: 700,
  fontSize: "0.875rem",
  color: "var(--color-ink)",
  marginBottom: "0.375rem",
};

const controlStyle: React.CSSProperties = {
  width: "100%",
  fontFamily: "var(--font-noto-sans)",
  fontWeight: 400,
  fontSize: "0.9375rem",
  color: "var(--color-ink)",
  background: "var(--color-paper)",
  border: "1px solid var(--color-hairline)",
  borderRadius: "8px",
  padding: "0.75rem 0.875rem",
  boxSizing: "border-box",
};

type FieldProps = {
  label: string;
  name: string;
  required?: boolean;
  placeholder?: string;
  type?: "text" | "email";
};

/** Labeled single-line text/email input, styled to match the site's form system. */
export function TextField({ label, name, required, placeholder, type = "text" }: FieldProps) {
  return (
    <div>
      <label htmlFor={name} style={labelStyle}>
        {label}
        {required ? " *" : ""}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        style={controlStyle}
        className="form-control"
      />
    </div>
  );
}

/** Labeled multi-line text input. */
export function TextareaField({
  label,
  name,
  placeholder,
  required,
}: Omit<FieldProps, "type">) {
  return (
    <div>
      <label htmlFor={name} style={labelStyle}>
        {label}
        {required ? " *" : ""}
      </label>
      <textarea
        id={name}
        name={name}
        required={required}
        placeholder={placeholder}
        rows={4}
        style={{ ...controlStyle, resize: "vertical" }}
        className="form-control"
      />
    </div>
  );
}

type SelectFieldProps = {
  label: string;
  name: string;
  required?: boolean;
  options: { value: string; label: string }[];
  value?: string;
  onChange?: (value: string) => void;
};

/** Labeled select dropdown. Pass `value`/`onChange` to make it controlled (e.g. to conditionally reveal a follow-up field). */
export function SelectField({ label, name, required, options, value, onChange }: SelectFieldProps) {
  return (
    <div>
      <label htmlFor={name} style={labelStyle}>
        {label}
        {required ? " *" : ""}
      </label>
      <select
        id={name}
        name={name}
        required={required}
        style={controlStyle}
        className="form-control"
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
      >
        <option value="" disabled>
          Choose one
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

/** Submit button that reflects `useActionState`'s pending status. */
export function SubmitButton({ pending, label }: { pending: boolean; label: string }) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="btn-cta"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
        padding: "0.875rem 1.75rem",
        background: "var(--color-brand)",
        color: "var(--color-paper)",
        fontFamily: "var(--font-noto-sans)",
        fontSize: "0.9375rem",
        fontWeight: 700,
        letterSpacing: "-0.01em",
        border: "none",
        borderRadius: "6px",
        cursor: pending ? "default" : "pointer",
        opacity: pending ? 0.65 : 1,
      }}
    >
      {pending ? "Sending..." : label}
    </button>
  );
}

/** Success/error banner rendered from a form's `useActionState` result. */
export function FormStatusMessage({ state }: { state: FormState }) {
  if (state.status === "idle") return null;

  const isSuccess = state.status === "success";
  return (
    <div
      role="status"
      style={{
        borderRadius: "12px",
        padding: "1rem 1.25rem",
        background: isSuccess ? "var(--color-brand-tint)" : "#FBEAEA",
        color: "var(--color-ink)",
        fontFamily: "var(--font-noto-sans)",
        fontSize: "0.9375rem",
        lineHeight: 1.5,
      }}
    >
      {state.message}
    </div>
  );
}
