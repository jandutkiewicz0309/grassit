import { Component, Show } from "solid-js";
import { OnSubmitOrderForm } from "~/utils/types";
import "./AskFormContainer.css";
import AskProductFormCmp from "~/components/Contact/AskForSample/AskForSample";
import { Price } from "~/components/Price/Price";
import type { Product } from "~/data/products";
import { productText, t } from "~/utils/translations";

export interface IAskFormContainer {
  product: Product;
  onSubmit: (data: OnSubmitOrderForm) => Promise<boolean>;
}

export const AskFormContainer: Component<IAskFormContainer> = (props) => {
  const text = () => productText(props.product.id);
  const image = () => props.product.images?.[0] ?? props.product.img;

  return (
    <section class="askCard">
      <header class="askCard__head">
        <div class="askCard__media">
          <img
            src={image()}
            alt={props.product.nameProduct}
            class="askCard__img"
            loading="lazy"
          />
        </div>

        <div class="askCard__meta">
          <div class="askProduct-name-price">
            <h2 class="askProduct-name">{props.product.nameProduct}</h2>
            <div class="askProduct-price-info">
              <Price
                price={props.product.price}
                class="askProduct-price"
                unitKey="product.perSqm"
                unitClass="price-unit"
              />
              <p>{t("common.available")}</p>
            </div>
          </div>

          <Show when={text().description}>
            <p class="askCard__lead">{text().description}</p>
          </Show>

          <div class="askCard__details">
            <div class="askCard__detailsTitle">{t("sample.detailsTitle")}</div>

            <div class="askCard__detailsTable">
              <div class="askCard__row">
                <span class="askCard__label">{t("product.producer")}</span>
                <span class="askCard__value">{props.product.specs.producer}</span>
              </div>

              <div class="askCard__row">
                <span class="askCard__label">{t("sample.price")}</span>
                <Price price={props.product.price} class="askCard__value" />
              </div>

              <div class="askCard__row">
                <span class="askCard__label">{t("sample.productId")}</span>
                <span class="askCard__value">{props.product.id}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div class="askCard__form">
        <AskProductFormCmp
          initial={{
            productId: props.product.id,
            productName: props.product.nameProduct,
            sku: props.product.specs.catalogNumber,
          }}
          technicalCard={props.product.technicalCard}
          onSubmit={props.onSubmit}
        />
      </div>
    </section>
  );
};

export default AskFormContainer;
