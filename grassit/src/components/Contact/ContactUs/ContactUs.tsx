import { Component } from "solid-js";
import {
  createForm,
  Field,
  Form,
  setValue,
  zodForm,
} from "@modular-forms/solid";
import FormInput from "~/components/Input/FormInput/FormInput";
import "./ContactUs.css";
import { setTouched, touched } from "~/components/store/contactUsStore";
import schema from "./schema";
import { TbMailFilled } from "solid-icons/tb";
import { OnSubmitOrderForm } from "~/utils/types";

export const ContactUs: Component<{
  onSubmit: (data: OnSubmitOrderForm) => void;
}> = (props) => {
  const form = createForm({
    validate: zodForm(schema),
    validateOn: "input",
    initialValues: {
      name: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      message: "",
    },
  });

  return (
    <div class="mainContainer-ContactUs">
      <Form of={form} onSubmit={(data) => props.onSubmit({ ...data })}>
        <div class="inputsContainer">
          <div class="fieldContainer">
            <span class="nameInput">Imię</span>
            <Field of={form} name="name">
              {(field) => (
                <>
                  <FormInput
                    name="name"
                    preset="text"
                    value={field.value ?? ""}
                    onChange={(v) => setValue(form, "name", v)}
                    onBlur={() => setTouched("name", true)}
                    placeHolder="Wprowadź swoje imie"
                    error={!!touched.name && !!field.error}
                  />
                  {!!touched.name && field.error && (
                    <span class="inputError nameInput">{field.error}</span>
                  )}
                </>
              )}
            </Field>
          </div>

          <div class="fieldContainer">
            <span class="nameInput">Nazwisko</span>
            <Field of={form} name="lastName">
              {(field) => (
                <>
                  <FormInput
                    name="lastName"
                    preset="text"
                    value={field.value ?? ""}
                    onChange={(v) => setValue(form, "lastName", v)}
                    onBlur={() => setTouched("lastName", true)}
                    placeHolder="Wprowadź swoje nazwisko"
                    error={!!touched.lastName && !!field.error}
                  />
                  {!!touched.lastName && field.error && (
                    <span class="inputError nameInput">{field.error}</span>
                  )}
                </>
              )}
            </Field>
          </div>

          <div class="fieldContainer">
            <span class="nameInput">Email</span>
            <Field of={form} name="email">
              {(field) => (
                <>
                  <FormInput
                    name="email"
                    preset="email"
                    value={field.value ?? ""}
                    onChange={(v) => setValue(form, "email", v)}
                    onBlur={() => setTouched("email", true)}
                    placeHolder="Wprowadź swój adres email"
                    error={!!touched.email && !!field.error}
                  />
                  {!!touched.email && field.error && (
                    <span class="inputError nameInput">{field.error}</span>
                  )}
                </>
              )}
            </Field>
          </div>

          <div class="fieldContainer">
            <span class="nameInput">Telefon</span>
            <Field of={form} name="phoneNumber">
              {(field) => (
                <>
                  <FormInput
                    name="phoneNumber"
                    preset="tel"
                    value={field.value ?? ""}
                    onChange={(v) => setValue(form, "phoneNumber", v)}
                    onBlur={() => setTouched("phoneNumber", true)}
                    placeHolder="Wprowadź swój numer telefonu"
                    error={!!touched.phoneNumber && !!field.error}
                    inputmode="tel"
                  />
                  {!!touched.phoneNumber && field.error && (
                    <span class="inputError nameInput">{field.error}</span>
                  )}
                </>
              )}
            </Field>
          </div>

          <div class="fieldContainer">
            <span class="nameInput">Pytanie</span>
            <Field of={form} name="message">
              {(field) => (
                <>
                  <div
                    class={`inputContainer inputContainer--textarea ${
                      touched.message && field.error
                        ? "inputContainer--error"
                        : ""
                    }`}
                  >
                    <textarea
                      class="textArea"
                      name="message"
                      placeholder="Twoja wiadomość..."
                      value={field.value ?? ""}
                      onInput={(e) =>
                        setValue(
                          form,
                          "message",
                          (e.currentTarget as HTMLTextAreaElement).value
                        )
                      }
                      onBlur={() => setTouched("message", true)}
                      aria-invalid={
                        touched.message && field.error ? "true" : "false"
                      }
                    />
                  </div>
                  {!!touched.message && field.error && (
                    <span class="inputError nameInput">{field.error}</span>
                  )}
                </>
              )}
            </Field>
          </div>
        </div>
        <div class="buttonContainer">
          <p class="askForm__legal">
            Wyrażam zgodę na przetwarzanie moich danych osobowych podanych w
            formularzu kontaktowym przez GRASSIT SPÓŁKA Z OGRANICZONĄ
            ODPOWIEDZIALNOŚCIĄ z siedzibą w Kazimierza Wielkiego 47 A, 32-400
            Myślenice, w celu udzielenia odpowiedzi na przesłane zapytanie
            dotyczące produktów, przedstawienia oferty cenowej oraz realizacji
            kontaktu handlowego i ewentualnej realizacji zamówienia, na
            podstawie art. 6 ust. 1 lit. a oraz b Rozporządzenia Parlamentu
            Europejskiego i Rady (UE) 2016/679 (RODO). Zostałem/-am
            poinformowany/-a, że podanie danych jest dobrowolne, ale niezbędne
            do realizacji powyższych celów, a dane będą przetwarzane przez okres
            niezbędny do obsługi zapytania lub realizacji umowy. Przysługuje mi
            prawo dostępu do treści moich danych, ich sprostowania, usunięcia,
            ograniczenia przetwarzania oraz cofnięcia zgody w dowolnym momencie.
          </p>
          <button
            type="submit"
            class="detailedProduct-btn detailedProduct-btn--primary"
          >
            <TbMailFilled size={16} style={{ color: "white" }} />
            Wyślij zapytanie
          </button>
        </div>
      </Form>
    </div>
  );
};
