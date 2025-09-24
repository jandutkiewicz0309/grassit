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
  },
  city: { autocomplete: "address-level2" },
  street: { autocomplete: "street-address" },
  company: { autocomplete: "organization" },
  nip: { inputmode: "numeric", maxlength: 13 },
};

export const FormInput: Component<IFormInput> = (props) => {
  const [local, rest] = splitProps(props, [
    "value",
    "onChange",
    "placeHolder",
    "preset",
    "error",
  ]);

  const attrsFromPreset = local.preset ? presetAttrs[local.preset] ?? {} : {};

  return (
    <div class={`inputContainer ${local.error ? "inputContainer--error" : ""}`}>
      <input
        class="input"
        {...attrsFromPreset}
        {...rest}
        value={local.value}
        placeholder={local.placeHolder}
        aria-invalid={local.error ? "true" : "false"}
        onInput={(e) =>
          local.onChange((e.currentTarget as HTMLInputElement).value)
        }
        onChange={(e) =>
          local.onChange((e.currentTarget as HTMLInputElement).value)
        }
      />
    </div>
  );
};

export default FormInput;
