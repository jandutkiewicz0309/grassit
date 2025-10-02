import { Component } from "solid-js";
import { ContactUs } from "~/components/Contact/ContactUs/ContactUs";
import { OnSubmitOrderForm } from "~/utils/types";
import "./ContatUsContainer.css";

export interface IContatUsContainer {
  onSubmit: (data: OnSubmitOrderForm) => void;
}

export const ContatUsContainer: Component<IContatUsContainer> = (props) => {
  return (
    <div class="contactUsContainer-container">
      <div class="contactUsContainer-description">
        <h1 class="contactUsContainer-title">Skontaktuj się</h1>
        <span class="contactUsContainer-depiction">
          Proszę wypełnić poniższy formularz, a przedstawiciel handlowy
          skontaktuje się z Państwem, aby pomóc w rozpoczęciu projektu. Można
          również skontaktować się z naszymi licznymi
        </span>
      </div>
      <ContactUs onSubmit={props.onSubmit} />
    </div>
  );
};
