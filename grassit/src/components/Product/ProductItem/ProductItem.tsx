import { Component } from "solid-js";
import { FiDroplet } from "solid-icons/fi";
import "./ProductItem.css";

export interface IProductItem {
  img: string;
  nameProduct: string;
  price: string;
  description: string;
  id: string;
  badge?: string;
  onClick?: (id: string) => void;
}

export const ProductItem: Component<IProductItem> = (props) => {
  return (
    <div
      onClick={() => props.onClick!(props.id)}
      id={props.id}
      class="mainContainer"
    >
      <div class="product_img-wrapper">
        {props.badge && <span class="product_badge">{props.badge}</span>}
        <img class="product_img" src={props.img} alt="" loading="lazy" />
      </div>
      <div class="text-container">
        <div class={`name-price-info-container${isNaN(parseFloat(props.price)) ? " name-price-info-container--stacked" : ""}`}>
          <span class="nameProduct">{props.nameProduct}</span>
          <span class={`price${isNaN(parseFloat(props.price)) ? " price--text" : ""}`}>{props.price}{!isNaN(parseFloat(props.price)) && <> zł <span class="price-netto">netto / m²</span></>}</span>
        </div>
        <span class="description">{props.description}</span>
        <div class="bottom-info">
          <FiDroplet size={11} class="icon" />
          <span class="text">Komercyjne</span>
        </div>
      </div>
    </div>
  );
};
