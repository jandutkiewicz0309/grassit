import { Component } from "solid-js";
import AskFormContainer from "../AskFormContainer/AskFormContainer";
import { OnSubmitOrderForm } from "~/utils/types";
import "./index.css";

export interface IProps {
  productName: string;
  productImg: string;
  catalogNumber: string;
  producer: string;
  price: string;
  productId?: string;
  description?: string;
  onSubmit: (data: OnSubmitOrderForm) => void;
}

const OrderProductSample: Component<IProps> = (props) => {
  return (
    <div class="sampleBackground">
      <main class="sample-product-container">
        <div class="sample-product-header">
          <h1>Poproś o próbkę</h1>
          <p>
            Proszę wypełnić poniższy formularz, a przedstawiciel handlowy
            skontaktuje się z Państwem, aby pomóc w rozpoczęciu projektu. Można
            również skontaktować się z naszymi licznymi przedstawicielami.
          </p>
        </div>

        <AskFormContainer
          productName={props.productName}
          productImg={props.productImg}
          catalogNumber={props.catalogNumber}
          producer={props.producer}
          price={props.price}
          description={props.description}
          productId={props.productId}
          onSubmit={props.onSubmit}
        />
      </main>
    </div>
  );
};

export default OrderProductSample;
