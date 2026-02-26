import { Component, JSX, splitProps } from "solid-js";
import "./FormInput.css";

export interface IFormInput
  extends Omit<
    JSX.InputHTMLAttributes<HTMLInputElement>,
    "value" | "onInput" | "onChange" | "placeholder"
  > {
  value: string;
  onChange: (value: string) => void;
  placeHolder?: string;
  preset?: Preset;
  error?: boolean;
}

export type Preset =
  | "text"
  | "email"
  | "tel"
  | "postalCode"
  | "city"
  | "street"
  | "company"
  | "nip";

type Attrs = Partial<JSX.InputHTMLAttributes<HTMLInputElement>>;

const presetAttrs: Record<Preset, Attrs> = {
  text: {},
  email: { type: "email", autocomplete: "email" },
  tel: { type: "tel", inputmode: "tel", autocomplete: "tel" },
  postalCode: {
    inputmode: "numeric",
    pattern: "^\\d{2}-\\d{3}$",
    autocomplete: "postal-code",
    maxlength: 6,
  },
  city: { autocomplete: "address-level2" },
  street: { autocomplete: "street-address" },
  company: { autocomplete: "organization" },
  nip: { inputmode: "numeric", maxlength: 13 },
};

function formatZip(raw: string, inputType?: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 5);
  const isDeleting =
    inputType === "deleteContentBackward" ||
    inputType === "deleteContentForward";
  // gdy user kasuje myślnik z "32-" → zostaw "32" bez dodawania myślnika z powrotem
  if (isDeleting && digits.length === 2 && !raw.includes("-")) {
    return digits;
  }
  if (digits.length >= 2) {
    return `${digits.slice(0, 2)}-${digits.slice(2)}`;
  }
  return digits;
}

export const FormInput: Component<IFormInput> = (props) => {
  const [local, rest] = splitProps(props, [
    "value",
    "onChange",
    "placeHolder",
    "preset",
    "error",
  ]);

  const attrsFromPreset = local.preset ? presetAttrs[local.preset] ?? {} : {};

  const handleInput = (e: InputEvent) => {
    const el = e.currentTarget as HTMLInputElement;
    if (local.preset === "postalCode") {
      const formatted = formatZip(el.value, (e as InputEvent).inputType);
      if (el.value !== formatted) el.value = formatted;
      local.onChange(formatted);
    } else {
      local.onChange(el.value);
    }
  };

  const handleChange = (e: Event) => {
    const el = e.currentTarget as HTMLInputElement;
    if (local.preset === "postalCode") {
      const formatted = formatZip(el.value);
      if (el.value !== formatted) el.value = formatted;
      local.onChange(formatted);
    } else {
      local.onChange(el.value);
    }
  };

  return (
    <div class={`inputContainer ${local.error ? "inputContainer--error" : ""}`}>
      <input
        class="input"
        {...attrsFromPreset}
        {...rest}
        value={local.value}
        placeholder={local.placeHolder}
        aria-invalid={local.error ? "true" : "false"}
        onInput={handleInput}
        onChange={handleChange}
      />
    </div>
  );
};

export default FormInput;
