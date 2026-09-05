import { Component, Show } from "solid-js";
import "./ProductItem.css";
import { Price } from "~/components/Price/Price";
import type { PriceMap } from "~/data/products";
import { t } from "~/utils/translations";

export interface IProductItem {
  img: string;
  nameProduct: string;
  price: PriceMap;
  description: string;
  id: string;
  /** Key under `product.*` in the dictionary, e.g. `badgeBestseller`. */
  badge?: string;
  onClick?: (id: string) => void;
}

export const ProductItem: Component<IProductItem> = (props) => {
  return (
    <div onClick={() => props.onClick?.(props.id)} id={props.id} class="mainContainer">
      <div class="product_img-wrapper">
        <Show when={props.badge}>
          <span class="product_badge">{t(`product.${props.badge}` as "product.badgeBestseller")}</span>
        </Show>
        <img
          class="product_img"
          src={props.img}
          alt={props.nameProduct}
          loading="lazy"
        />
      </div>
      <div class="text-container">
        <div class="name-price-info-container">
          <span class="nameProduct">{props.nameProduct}</span>
          <Price
            price={props.price}
            class="price"
            onRequestClass="price--text"
            unitKey="product.netPerSqm"
            unitClass="price-netto"
          />
        </div>
        <span class="description">{props.description}</span>
      </div>
    </div>
  );
};
