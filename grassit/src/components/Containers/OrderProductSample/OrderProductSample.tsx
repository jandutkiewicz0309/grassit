import { Component } from "solid-js";
import AskFormContainer from "../AskFormContainer/AskFormContainer";
import { OnSubmitOrderForm } from "~/utils/types";
import type { Product } from "~/data/products";
import { t } from "~/utils/translations";
import "./index.css";

export interface IProps {
  product: Product;
  onSubmit: (data: OnSubmitOrderForm) => Promise<boolean>;
}

const OrderProductSample: Component<IProps> = (props) => {
  return (
    <div class="sampleBackground">
      <main class="sample-product-container">
        <div class="sample-product-header">
          <h1>{t("sample.heading")}</h1>
          <p>{t("sample.lead")}</p>
        </div>

        <AskFormContainer product={props.product} onSubmit={props.onSubmit} />
      </main>
    </div>
  );
};

export default OrderProductSample;
