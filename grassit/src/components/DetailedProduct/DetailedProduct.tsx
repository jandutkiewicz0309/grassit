import { Component } from "solid-js";
import { ProductGallery } from "./ProductGalery/ProductGalery";

export interface IDetailedProduct {}

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
    </div>
  );
};
