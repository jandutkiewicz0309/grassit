import { Component } from "solid-js";
import {
  createForm,
  Field,
  Form,
  setValue,
  zodForm,
} from "@modular-forms/solid";
import { z } from "zod";
import { askProductSchema, type AskProductForm } from "./schema";
import FormInput from "~/components/Input/FormInput/FormInput";
import { TbMailFilled } from "solid-icons/tb";
import "./AskForSample.css";
import { OnSubmitOrderForm } from "~/utils/types";

export const AskProductFormCmp: Component<{
  initial?: Partial<AskProductForm>;
  onSubmit: (data: OnSubmitOrderForm) => void;
}> = (props) => {
  const form = createForm<AskProductForm>({
    validate: zodForm(askProductSchema),
    validateOn: "input",
    initialValues: {
      name: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      street: "",
      zip: "",
      city: "",
      company: "",
      nip: "",
      notes: "",
      productId: props.initial?.productId ?? "",
      productName: props.initial?.productName ?? "",
      sku: props.initial?.sku ?? "",
      ...(props.initial ?? {}),
    },
  });

  return (
    <div class="askForm">
      <Form
        of={form}
        onSubmit={(data) => props.onSubmit(data as AskProductForm)}
      >
        <div class="askForm__fields">
          {/* Imię */}
          <div class="askForm__group">
            <span class="askForm__label">Imię*</span>
            <Field of={form} name="productId">
              {(f) => (
                <input type="hidden" name="productId" value={f.value ?? ""} />
              )}
            </Field>
            <Field of={form} name="name">
              {(f) => (
                <>
                  <FormInput
                    name="name"
                    preset="text"
                    value={f.value ?? ""}
                    onChange={(v) => setValue(form, "name", v)}
                    placeHolder="Wprowadź swoje imię"
                    error={!!f.error}
                  />
                  {f.error && <span class="field__error">{f.error}</span>}
                </>
              )}
            </Field>
          </div>

          {/* Nazwisko */}
          <div class="askForm__group">
            <span class="askForm__label">Nazwisko*</span>
            <Field of={form} name="lastName">
              {(f) => (
                <>
                  <FormInput
                    name="lastName"
                    preset="text"
                    value={f.value ?? ""}
                    onChange={(v) => setValue(form, "lastName", v)}
                    placeHolder="Wprowadź swoje nazwisko"
                    error={!!f.error}
                  />
                  {f.error && <span class="field__error">{f.error}</span>}
                </>
              )}
            </Field>
          </div>

          {/* Email */}
          <div class="askForm__group">
            <span class="askForm__label">Email*</span>
            <Field of={form} name="email">
              {(f) => (
                <>
                  <FormInput
                    name="email"
                    preset="email"
                    value={f.value ?? ""}
                    onChange={(v) => setValue(form, "email", v)}
                    placeHolder="Wprowadź swój adres email"
                    error={!!f.error}
                  />
                  {f.error && <span class="field__error">{f.error}</span>}
                </>
              )}
            </Field>
          </div>

          {/* Telefon */}
          <div class="askForm__group">
            <span class="askForm__label">Numer telefonu*</span>
            <Field of={form} name="phoneNumber">
              {(f) => (
                <>
                  <FormInput
                    name="phoneNumber"
                    preset="tel"
                    value={f.value ?? ""}
                    onChange={(v) => setValue(form, "phoneNumber", v)}
                    placeHolder="Wprowadź swój numer telefonu"
                    error={!!f.error}
                    inputmode="tel"
                  />
                  {f.error && <span class="field__error">{f.error}</span>}
                </>
              )}
            </Field>
          </div>

          {/* Ulica + Kod pocztowy (grid) */}
          <div class="askForm__row">
            <div class="askForm__group">
              <span class="askForm__label">Ulica i numer mieszkania*</span>
              <Field of={form} name="street">
                {(f) => (
                  <>
                    <FormInput
                      name="street"
                      preset="street"
                      value={f.value ?? ""}
                      onChange={(v) => setValue(form, "street", v)}
                      placeHolder="Wprowadź ulicę i numer domu/mieszkania"
                      error={!!f.error}
                    />
                    {f.error && <span class="field__error">{f.error}</span>}
                  </>
                )}
              </Field>
            </div>

            <div class="askForm__group askForm__group--zip">
              <span class="askForm__label">Kod pocztowy*</span>
              <Field of={form} name="zip">
                {(f) => (
                  <>
                    <FormInput
                      name="zip"
                      preset="postalCode"
                      value={f.value ?? ""}
                      onChange={(v) => setValue(form, "zip", v)}
                      placeHolder="Wprowadź kod pocztowy"
                      error={!!f.error}
                    />
                    {f.error && <span class="field__error">{f.error}</span>}
                  </>
                )}
              </Field>
            </div>
          </div>

          {/* Miasto */}
          <div class="askForm__group">
            <span class="askForm__label">Miasto*</span>
            <Field of={form} name="city">
              {(f) => (
                <>
                  <FormInput
                    name="city"
                    preset="city"
                    value={f.value ?? ""}
                    onChange={(v) => setValue(form, "city", v)}
                    placeHolder="Wprowadź miasto"
                    error={!!f.error}
                  />
                  {f.error && <span class="field__error">{f.error}</span>}
                </>
              )}
            </Field>
          </div>

          {/* Firma */}
          <div class="askForm__group">
            <span class="askForm__label">Firma (opcjonalnie)</span>
            <Field of={form} name="company">
              {(f) => (
                <FormInput
                  name="company"
                  preset="company"
                  value={f.value ?? ""}
                  onChange={(v) => setValue(form, "company", v)}
                  placeHolder="Wprowadź nazwę firmy do wysyłki"
                />
              )}
            </Field>
          </div>

          {/* NIP */}
          <div class="askForm__group">
            <span class="askForm__label">NIP (opcjonalnie)</span>
            <Field of={form} name="nip">
              {(f) => (
                <>
                  <FormInput
                    name="nip"
                    preset="nip"
                    value={f.value ?? ""}
                    onChange={(v) => setValue(form, "nip", v)}
                    placeHolder="Wprowadź numer NIP do faktury"
                    error={!!f.error}
                  />
                  {f.error && <span class="field__error">{f.error}</span>}
                </>
              )}
            </Field>
          </div>

          {/* Uwagi */}
          <div class="askForm__group">
            <span class="askForm__label">Uwagi / preferencje</span>
            <Field of={form} name="notes">
              {(f) => (
                <div class="field field--textarea">
                  <textarea
                    class="field__textarea"
                    name="notes"
                    placeholder="Dodatkowe uwagi do wysyłki…"
                    value={f.value ?? ""}
                    onInput={(e) =>
                      setValue(
                        form,
                        "notes",
                        (e.currentTarget as HTMLTextAreaElement).value,
                      )
                    }
                  />
                </div>
              )}
            </Field>
          </div>
        </div>

        <div class="askForm__actions">
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

export default AskProductFormCmp;
