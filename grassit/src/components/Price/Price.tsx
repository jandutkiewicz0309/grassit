import { Component, Show } from "solid-js";
import { resolveSite } from "~/config/site";
import type { PriceMap } from "~/data/products";
import { t } from "~/utils/translations";
import { formatPrice, priceFor } from "~/utils/translations/format";
import "./Price.css";

export interface PriceProps {
  price: PriceMap;
  class?: string;
  /** Suffix such as `netto / m²`; omitted on compact cards. */
  unitKey?: "product.netPerSqm" | "product.perSqm";
  unitClass?: string;
  /** Extra class applied only when the product is quote-only. */
  onRequestClass?: string;
}

/**
 * Single place that turns a per-currency price into text. Replaces the four
 * hand-rolled `isNaN(parseFloat(price))` variants that each formatted the
 * amount slightly differently and hard-coded `zł`.
 */
export const Price: Component<PriceProps> = (props) => {
  const site = resolveSite();
  const amount = () => priceFor(props.price, site);

  return (
    <span
      class={props.class}
      classList={{
        "price--onRequest": amount() === null,
        ...(props.onRequestClass ? { [props.onRequestClass]: amount() === null } : {}),
      }}
    >
      <Show when={amount() !== null} fallback={t("product.priceOnRequest")}>
        {formatPrice(amount()!, site)}
        <Show when={props.unitKey}>
          {" "}
          <span class={props.unitClass}>{t(props.unitKey!)}</span>
        </Show>
      </Show>
    </span>
  );
};
