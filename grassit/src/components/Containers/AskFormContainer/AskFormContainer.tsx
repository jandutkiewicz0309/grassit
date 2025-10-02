// src/components/AskProduct/AskFormContainer.tsx
import { Component, Show } from "solid-js";
import { OnSubmitOrderForm } from "~/utils/types";
import "./AskFormContainer.css";
import AskProductFormCmp from "~/components/Contact/AskForSample/AskForSample";

export interface IAskFormContainer {
  productName: string;
  productImg: string;
  catalogNumber: string;
  producer: string;
  price: string;
  productId?: string;
  description?: string;
  onSubmit: (data: OnSubmitOrderForm) => void;
}

export const AskFormContainer: Component<IAskFormContainer> = (props) => {
  return (
    <section class="askCard">
      {/* Header */}
      <header class="askCard__head">
        <div class="askCard__media">
          <img
            src={props.productImg}
            alt={props.productName}
            class="askCard__img"
            loading="lazy"
          />
        </div>

        <div class="askCard__meta">
          <h1 class="askCard__title">{props.productName}</h1>

          {/* cena */}
          <div class="askCard__priceRow">
            <span class="askCard__priceNew">{props.price}</span>
          </div>

          {/* opis (krótki lead) */}
          <Show when={props.description}>
            <p class="askCard__lead">{props.description}</p>
          </Show>

          {/* tabela szczegółów */}
          <div class="askCard__details">
            <div class="askCard__detailsTitle">Szczegóły</div>

            <div class="askCard__row">
              <span class="askCard__label">Producent</span>
              <span class="askCard__value">{props.producer}</span>
            </div>

            <div class="askCard__row">
              <span class="askCard__label">Numer katalogowy</span>
              <span class="askCard__value">{props.catalogNumber}</span>
            </div>

            <Show when={props.productId}>
              <div class="askCard__row">
                <span class="askCard__label">ID Produktu</span>
                <span class="askCard__value">{props.productId}</span>
              </div>
            </Show>
          </div>
        </div>
      </header>

      <div class="askCard__form">
        <AskProductFormCmp
          initial={{
            productId: props.productId,
            productName: props.productName,
            sku: props.catalogNumber,
          }}
          onSubmit={props.onSubmit}
        />
      </div>
    </section>
  );
};

export default AskFormContainer;
