import { Component } from "solid-js";
import { createForm, Field, Form, reset, setValue, zodForm } from "@modular-forms/solid";
import { makeAskProductSchema, type AskProductForm } from "./schema";
import FormInput from "~/components/Input/FormInput/FormInput";
import { TbMailFilled } from "solid-icons/tb";
import "./AskForSample.css";
import { OnSubmitOrderForm } from "~/utils/types";
import { t } from "~/utils/translations";

export const AskProductFormCmp: Component<{
  initial?: Partial<AskProductForm>;
  /** Path to the product data sheet, forwarded to the confirmation e-mail. */
  technicalCard?: string;
  onSubmit: (data: OnSubmitOrderForm) => Promise<boolean>;
}> = (props) => {
  const form = createForm<AskProductForm>({
    validate: zodForm(makeAskProductSchema()),
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

  const required = (label: string) => `${label}${t("form.required")}`;

  return (
    <div class="askForm">
      <Form
        of={form}
        onSubmit={async (data) => {
          const success = await props.onSubmit({
            ...(data as AskProductForm),
            technicalCard: props.technicalCard,
          });
          if (success) {
            reset(form);
          }
        }}
      >
        <div class="askForm__fields">
          <div class="askForm__group">
            <span class="askForm__label">{required(t("form.firstName"))}</span>
            <Field of={form} name="productId">
              {(f) => <input type="hidden" name="productId" value={f.value ?? ""} />}
            </Field>
            <Field of={form} name="productName">
              {(f) => <input type="hidden" name="productName" value={f.value ?? ""} />}
            </Field>
            <Field of={form} name="name">
              {(f) => (
                <>
                  <FormInput
                    name="name"
                    preset="text"
                    value={f.value ?? ""}
                    onChange={(v) => setValue(form, "name", v)}
                    placeHolder={t("form.phFirstName")}
                    error={!!f.error}
                  />
                  {f.error && <span class="field__error">{f.error}</span>}
                </>
              )}
            </Field>
          </div>

          <div class="askForm__group">
            <span class="askForm__label">{required(t("form.lastName"))}</span>
            <Field of={form} name="lastName">
              {(f) => (
                <>
                  <FormInput
                    name="lastName"
                    preset="text"
                    value={f.value ?? ""}
                    onChange={(v) => setValue(form, "lastName", v)}
                    placeHolder={t("form.phLastName")}
                    error={!!f.error}
                  />
                  {f.error && <span class="field__error">{f.error}</span>}
                </>
              )}
            </Field>
          </div>

          <div class="askForm__group">
            <span class="askForm__label">{required(t("form.email"))}</span>
            <Field of={form} name="email">
              {(f) => (
                <>
                  <FormInput
                    name="email"
                    preset="email"
                    value={f.value ?? ""}
                    onChange={(v) => setValue(form, "email", v)}
                    placeHolder={t("form.phEmail")}
                    error={!!f.error}
                  />
                  {f.error && <span class="field__error">{f.error}</span>}
                </>
              )}
            </Field>
          </div>

          <div class="askForm__group">
            <span class="askForm__label">{required(t("form.phoneLong"))}</span>
            <Field of={form} name="phoneNumber">
              {(f) => (
                <>
                  <FormInput
                    name="phoneNumber"
                    preset="tel"
                    value={f.value ?? ""}
                    onChange={(v) => setValue(form, "phoneNumber", v)}
                    placeHolder={t("form.phPhone")}
                    error={!!f.error}
                    inputmode="tel"
                  />
                  {f.error && <span class="field__error">{f.error}</span>}
                </>
              )}
            </Field>
          </div>

          <div class="askForm__row">
            <div class="askForm__group">
              <span class="askForm__label">{required(t("form.street"))}</span>
              <Field of={form} name="street">
                {(f) => (
                  <>
                    <FormInput
                      name="street"
                      preset="street"
                      value={f.value ?? ""}
                      onChange={(v) => setValue(form, "street", v)}
                      placeHolder={t("form.phStreet")}
                      error={!!f.error}
                    />
                    {f.error && <span class="field__error">{f.error}</span>}
                  </>
                )}
              </Field>
            </div>

            <div class="askForm__group askForm__group--zip">
              <span class="askForm__label">{required(t("form.zip"))}</span>
              <Field of={form} name="zip">
                {(f) => (
                  <>
                    <FormInput
                      name="zip"
                      preset="postalCode"
                      value={f.value ?? ""}
                      onChange={(v) => setValue(form, "zip", v)}
                      placeHolder={t("form.phZip")}
                      error={!!f.error}
                    />
                    {f.error && <span class="field__error">{f.error}</span>}
                  </>
                )}
              </Field>
            </div>
          </div>

          <div class="askForm__group">
            <span class="askForm__label">{required(t("form.city"))}</span>
            <Field of={form} name="city">
              {(f) => (
                <>
                  <FormInput
                    name="city"
                    preset="city"
                    value={f.value ?? ""}
                    onChange={(v) => setValue(form, "city", v)}
                    placeHolder={t("form.phCity")}
                    error={!!f.error}
                  />
                  {f.error && <span class="field__error">{f.error}</span>}
                </>
              )}
            </Field>
          </div>

          <div class="askForm__group">
            <span class="askForm__label">{t("form.company")}</span>
            <Field of={form} name="company">
              {(f) => (
                <FormInput
                  name="company"
                  preset="company"
                  value={f.value ?? ""}
                  onChange={(v) => setValue(form, "company", v)}
                  placeHolder={t("form.phCompany")}
                />
              )}
            </Field>
          </div>

          <div class="askForm__group">
            <span class="askForm__label">{t("form.vatId")}</span>
            <Field of={form} name="nip">
              {(f) => (
                <>
                  <FormInput
                    name="nip"
                    preset="nip"
                    value={f.value ?? ""}
                    onChange={(v) => setValue(form, "nip", v)}
                    placeHolder={t("form.phVatId")}
                    error={!!f.error}
                  />
                  {f.error && <span class="field__error">{f.error}</span>}
                </>
              )}
            </Field>
          </div>

          <div class="askForm__group">
            <span class="askForm__label">{t("form.notes")}</span>
            <Field of={form} name="notes">
              {(f) => (
                <div class="field field--textarea">
                  <textarea
                    class="field__textarea"
                    name="notes"
                    placeholder={t("form.phNotes")}
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

export default AskProductFormCmp;
