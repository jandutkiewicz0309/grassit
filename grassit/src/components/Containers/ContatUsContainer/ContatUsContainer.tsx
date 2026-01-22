import { Component } from "solid-js";
import { ContactUs } from "~/components/Contact/ContactUs/ContactUs";
import { OnSubmitOrderForm } from "~/utils/types";
import "./ContatUsContainer.css";

export interface IContatUsContainer {
  onSubmit: (data: OnSubmitOrderForm) => void;
  text?: string;
  title?: string
}

export const ContatUsContainer: Component<IContatUsContainer> = (props) => {
  return (
    <div class="contactUsBackground">
      <div class="contactUsContainer-container">
        <div class="contactUsContainer-description">
          <h1 class="contactUsContainer-title">{props.title}</h1>
          <span class="contactUsContainer-depiction">{props.text}</span>
        </div>
        <ContactUs onSubmit={props.onSubmit} />
      </div>
    </div>
  );
};
