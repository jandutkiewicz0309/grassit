import { Component } from "solid-js";
import { FiDroplet } from "solid-icons/fi";
import "./ProductItem.css";

export interface IProductItem {
  img: string;
  nameProduct: string;
  price: string;
  description: string;
  id: string;
  onClick?: (id: string) => void;
}

export const ProductItem: Component<IProductItem> = (props) => {
  return (
    <div
      onClick={() => props.onClick!(props.id)}
      id={props.id}
      class="mainContainer"
    >
      <img class="product_img" src={props.img} alt="" loading="lazy" />
      <div class="text-container">
        <div class="name-price-info-container">
          <span class="nameProduct">{props.nameProduct}</span>
          <span class="price">{props.price}zł</span>
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
