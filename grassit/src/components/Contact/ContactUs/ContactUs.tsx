import { Component } from "solid-js";
import {
  createForm,
  Field,
  Form,
  reset,
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
  onSubmit: (data: OnSubmitOrderForm) => Promise<boolean>;
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
      <Form of={form} onSubmit={async (data) => {
          const success = await props.onSubmit({ ...data });
          if (success) {
            reset(form);
            setTouched({});
          }
        }}>
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
                          (e.currentTarget as HTMLTextAreaElement).value,
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
            Administratorem danych osobowych jest GRASSIT Sp. z o.o. z siedzibą
            w Myślenicach (32-400), ul. Kazimierza Wielkiego 47. Dane osobowe
            podane w formularzu kontaktowym przetwarzane są w celu obsługi
            zapytania przesłanego za pomocą formularza oraz podjęcia działań na
            żądanie osoby, której dane dotyczą, przed zawarciem umowy – na
            podstawie art. 6 ust. 1 lit. b Rozporządzenia Parlamentu
            Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. Dane
            mogą być również przetwarzane w celu kontaktu handlowego – na
            podstawie prawnie uzasadnionego interesu administratora (art. 6 ust.
            1 lit. f RODO). Podanie danych jest dobrowolne, jednak niezbędne do
            realizacji zapytania. Dane osobowe będą przechowywane przez okres
            niezbędny do obsługi zapytania, a w przypadku zawarcia umowy – przez
            okres jej realizacji oraz po jej zakończeniu przez czas wymagany
            przepisami prawa. Przysługuje prawo dostępu do danych, ich
            sprostowania, usunięcia, ograniczenia przetwarzania, wniesienia
            sprzeciwu, przenoszenia danych oraz wniesienia skargi do Prezesa
            Urzędu Ochrony Danych Osobowych.
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
