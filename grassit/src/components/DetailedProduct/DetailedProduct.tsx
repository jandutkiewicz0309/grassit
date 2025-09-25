import { Component } from "solid-js";
import { ProductGallery } from "./ProductGalery/ProductGalery";

export interface IDetailedProduct {
  nameProduct: string;
  price: string;
  producer: string;
  productDescription: string;
  catalogNumber: string;
}

export const DetailedProduct: Component<IDetailedProduct> = (props) => {
  return (
    <div>
      <ProductGallery
        images={[
          "/img/prod-main.jpg",
          "/img/prod-2.jpg",
          "/img/prod-3.jpg",
          "/img/prod-4.jpg",
        ]}
        alt="Piłka nożna na murawie"
      />
      <div>
        <div>
          <h1>{props.nameProduct}</h1>
          <h2>{props.price}</h2>
        </div>
        <span>{props.productDescription}</span>
        <div>
          <span>Szczegóły</span>
          <div>
            <span>Producent</span>
            <span>{props.producer}</span>
          </div>
          <div>
            <span>Numer katalogowy</span>
            <span>{props.catalogNumber}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
