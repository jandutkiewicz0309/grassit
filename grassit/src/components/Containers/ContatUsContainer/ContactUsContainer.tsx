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

export const ContactUs: Component<{ onSubmit: (data: any) => void }> = (
  props
) => {
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
    <div class="mainContainer">
      <Form of={form} onSubmit={(data) => props.onSubmit({ ...data })}>
        <div class="inputsContainer">
          <div>
            <span class="nameInput">Imię</span>
            <Field of={form} name="name">
              {(field) => (
                <>
                  <FormInput
                    name="name"
                    preset="text"
                    value={field.value ?? ""}
                    onChange={(v) => setValue(form, "name", v)}
                    onBlur={() => setTouched("name", true)} // ⬅️ lokalne touched
                    placeHolder="Imię"
                    error={!!touched.name && !!field.error} // ⬅️ pokaż dopiero po blur
                  />
                  {!!touched.name && field.error && (
                    <span class="inputError">{field.error}</span>
                  )}
                </>
              )}
            </Field>
          </div>

          <div>
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
                    placeHolder="Nazwisko"
                    error={!!touched.lastName && !!field.error}
                  />
                  {!!touched.lastName && field.error && (
                    <span class="inputError">{field.error}</span>
                  )}
                </>
              )}
            </Field>
          </div>

          <div>
            <span class="nameInput">E-mail</span>
            <Field of={form} name="email">
              {(field) => (
                <>
                  <FormInput
                    name="email"
                    preset="email"
                    value={field.value ?? ""}
                    onChange={(v) => setValue(form, "email", v)}
                    onBlur={() => setTouched("email", true)}
                    placeHolder="E-mail"
                    error={!!touched.email && !!field.error}
                  />
                  {!!touched.email && field.error && (
                    <span class="inputError">{field.error}</span>
                  )}
                </>
              )}
            </Field>
          </div>

          <div>
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
                    placeHolder="Telefon"
                    error={!!touched.phoneNumber && !!field.error}
                    inputmode="tel"
                  />
                  {!!touched.phoneNumber && field.error && (
                    <span class="inputError">{field.error}</span>
                  )}
                </>
              )}
            </Field>
          </div>

          <div>
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
                    <span class="inputError">{field.error}</span>
                  )}
                </>
              )}
            </Field>
          </div>
        </div>
        <div class="buttonContainer">
          <button class="formButton" type="submit">
            <TbMailFilled size={16} class="icon" />
            <span class="textButton"> Wyślij zapytanie</span>
          </button>
        </div>
      </Form>
    </div>
  );
};
