import { Component, Show } from "solid-js";
import { FiCheck } from "solid-icons/fi";
import "./Checkbox.css";

export interface ICheckbox {
  id: string;
  onClick: () => void;
  checked: boolean;
  label?: string;
  labelClass?: string;
  styles?: string;
  disabled?: boolean;
}

export const Checkbox: Component<ICheckbox> = (props) => {
  return (
    <div class={"checkbox-group"}>
      <div class="checkbox-wrapper">
        <input
          id={props.id}
          type="checkbox"
          disabled={props.disabled}
          checked={props.checked}
          onChange={props.onClick}
          class={"checkbox-input"}
        />
        <Show when={props.checked}>
          <FiCheck class={"checkbox-icon"} />
        </Show>
      </div>

      <Show when={props.label}>
        <label for={props.id} class={props.labelClass}>
          {props.label}
        </label>
      </Show>
    </div>
  );
};
