import { Component } from "solid-js";
import { ContactUs } from "~/components/Contact/ContactUs/ContactUs";
import { OnSubmitOrderForm } from "~/utils/types";
import "./ContatUsContainer.css";

export interface IContatUsContainer {
  onSubmit: (data: OnSubmitOrderForm) => void;
}

export const ContatUsContainer: Component<IContatUsContainer> = (props) => {
  return (
    <div class="contactUsBackground">
      <div class="contactUsContainer-container">
        <div class="contactUsContainer-description">
          <h1 class="contactUsContainer-title">Skontaktuj się</h1>
          <span class="contactUsContainer-depiction">
            Uzupełnij formularz kontaktowy a nasz pracownik skontaktuje się z
            Tobą najszybciej jak to możliwe. Jeżeli potrzebujesz pilnej
            informacji, zapraszamy do kontaktu telefonicznego pod numerem (+48)
            515 401 178.
          </span>
        </div>
        <ContactUs onSubmit={props.onSubmit} />
      </div>
    </div>
  );
};
