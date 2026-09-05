import { Component } from "solid-js";
import { createForm, Field, Form, reset, setValue, zodForm } from "@modular-forms/solid";
import FormInput from "~/components/Input/FormInput/FormInput";
import "./ContactUs.css";
import { setTouched, touched } from "~/components/store/contactUsStore";
import { makeContactSchema } from "./schema";
import { TbMailFilled } from "solid-icons/tb";
import { OnSubmitOrderForm } from "~/utils/types";
import { t } from "~/utils/translations";

export const ContactUs: Component<{
  onSubmit: (data: OnSubmitOrderForm) => Promise<boolean>;
}> = (props) => {
  const form = createForm({
    validate: zodForm(makeContactSchema()),
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
      <Form
        of={form}
        onSubmit={async (data) => {
          const success = await props.onSubmit({ ...data });
          if (success) {
            reset(form);
            setTouched({});
          }
        }}
      >
        <div class="inputsContainer">
          <div class="fieldContainer">
            <span class="nameInput">{t("form.firstName")}</span>
            <Field of={form} name="name">
              {(field) => (
                <>
                  <FormInput
                    name="name"
                    preset="text"
                    value={field.value ?? ""}
                    onChange={(v) => setValue(form, "name", v)}
                    onBlur={() => setTouched("name", true)}
                    placeHolder={t("form.phFirstName")}
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
            <span class="nameInput">{t("form.lastName")}</span>
            <Field of={form} name="lastName">
              {(field) => (
                <>
                  <FormInput
                    name="lastName"
                    preset="text"
                    value={field.value ?? ""}
                    onChange={(v) => setValue(form, "lastName", v)}
                    onBlur={() => setTouched("lastName", true)}
                    placeHolder={t("form.phLastName")}
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
            <span class="nameInput">{t("form.email")}</span>
            <Field of={form} name="email">
              {(field) => (
                <>
                  <FormInput
                    name="email"
                    preset="email"
                    value={field.value ?? ""}
                    onChange={(v) => setValue(form, "email", v)}
                    onBlur={() => setTouched("email", true)}
                    placeHolder={t("form.phEmail")}
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
            <span class="nameInput">{t("form.phone")}</span>
            <Field of={form} name="phoneNumber">
              {(field) => (
                <>
                  <FormInput
                    name="phoneNumber"
                    preset="tel"
                    value={field.value ?? ""}
                    onChange={(v) => setValue(form, "phoneNumber", v)}
                    onBlur={() => setTouched("phoneNumber", true)}
                    placeHolder={t("form.phPhone")}
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
            <span class="nameInput">{t("form.question")}</span>
            <Field of={form} name="message">
              {(field) => (
                <>
                  <div
                    class={`inputContainer inputContainer--textarea ${
                      touched.message && field.error ? "inputContainer--error" : ""
                    }`}
                  >
                    <textarea
                      class="textArea"
                      name="message"
                      placeholder={t("form.phMessage")}
                      value={field.value ?? ""}
                      onInput={(e) =>
                        setValue(
                          form,
                          "message",
                          (e.currentTarget as HTMLTextAreaElement).value,
                        )
                      }
                      onBlur={() => setTouched("message", true)}
                      aria-invalid={touched.message && field.error ? "true" : "false"}
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
          <p class="askForm__legal">{t("form.legal")}</p>
          <button
            type="submit"
            class="detailedProduct-btn detailedProduct-btn--primary"
          >
            <TbMailFilled size={16} style={{ color: "white" }} />
            {t("common.sendInquiry")}
          </button>
        </div>
      </Form>
    </div>
  );
};
