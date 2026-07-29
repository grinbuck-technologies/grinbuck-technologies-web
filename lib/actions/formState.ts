/** Shared shape for every form's `useActionState` result. */
export type FormState = { status: "idle" | "success" | "error"; message?: string };

export const IDLE_FORM_STATE: FormState = { status: "idle" };
