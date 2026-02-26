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
  onSubmit: (data: OnSubmitOrderForm) => Promise<boolean>;
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
            width={400}
            height={300}
          />
        </div>

        <div class="askCard__meta">
          <div class="askProduct-name-price">
            <h2 class="askProduct-name">{props.productName}</h2>
            <div class="askProduct-price-info">
              <span class="askProduct-price" style={isNaN(parseFloat(props.price)) ? { "font-size": "14px", "white-space": "nowrap" } : {}}>
                {props.price}{!isNaN(parseFloat(props.price)) && <>zł <span class="price-unit">/ m²</span></>}
              </span>
              <p>Dostępne</p>
            </div>
          </div>

          <Show when={props.description}>
            <p class="askCard__lead">{props.description}</p>
          </Show>

          {/* tabela szczegółów */}
          <div class="askCard__details">
            <div class="askCard__detailsTitle">Szczegóły</div>

            <div class="askCard__detailsTable">
              <div class="askCard__row">
                <span class="askCard__label">Producent</span>
                <span class="askCard__value">{props.producer}</span>
              </div>

              <div class="askCard__row">
                <span class="askCard__label">Cena</span>
                <span class="askCard__value">{props.price}</span>
              </div>

              <Show when={props.productId}>
                <div class="askCard__row">
                  <span class="askCard__label">ID Produktu</span>
                  <span class="askCard__value">{props.productId}</span>
                </div>
              </Show>
            </div>
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
