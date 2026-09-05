import { Component, For, Show } from "solid-js";
import { ProductGallery } from "./ProductGalery/ProductGallery";
import "./DetailedProduct.css";
import { FiMail, FiShoppingCart } from "solid-icons/fi";
import { AiFillFilePdf } from "solid-icons/ai";
import { Price } from "~/components/Price/Price";
import { resolveSite } from "~/config/site";
import type { Product } from "~/data/products";
import { productText, t } from "~/utils/translations";
import { formatHeight, formatWeight } from "~/utils/translations/format";

export interface IDetailedProduct {
  product: Product;
  similarProducts?: Product[];
  onAskClick?: (e: MouseEvent) => void;
  onAskClickAskProduct?: (id: string) => void;
  onSimilarProductClick?: (id: string) => void;
  onColorVariantClick?: (id: string) => void;
}

export const DetailedProduct: Component<IDetailedProduct> = (props) => {
  const site = resolveSite();
  const text = () => productText(props.product.id);
  const specs = () => props.product.specs;

  return (
    <div class="wrapper">
      <div id={props.product.id} class="main-detailedProduct-container">
        <div class="detailedProduct-header">
          <p class="detailedProduct-header-title">{t("product.headerTitle")}</p>
          <p>{t("product.headerLead")}</p>
        </div>
        <div class="contentWrapper">
          <div class="detailedProduct-gallery">
            <ProductGallery
              images={props.product.images?.length ? props.product.images : [props.product.img]}
              alt={props.product.nameProduct}
            />
          </div>
          <div class="detailedProduct-info">
            <div class="detailedProduct-name-price">
              <h1 class="detailedProduct-name">{props.product.nameProduct}</h1>
              <div class="detailedProduct-price-info">
                <Price
                  price={props.product.price}
                  class="detailedProduct-price"
                  unitKey="product.netPerSqm"
                  unitClass="price-unit"
                />
                <p>{t("common.available")}</p>
              </div>
            </div>

            <Show when={props.product.colorVariants?.length}>
              <div class="detailedProduct-color-variants">
                <span class="detailedProduct-section-title">{t("product.color")}</span>
                <div class="detailedProduct-color-options">
                  <For each={props.product.colorVariants}>
                    {(variant) => (
                      <button
                        class={`detailedProduct-color-swatch ${
                          variant.id === props.product.id ? "active" : ""
                        }`}
                        style={{ "background-color": variant.color }}
                        title={t(`product.${variant.labelKey}` as "product.colorGreen")}
                        aria-label={t(`product.${variant.labelKey}` as "product.colorGreen")}
                        onClick={() => {
                          if (variant.id !== props.product.id) {
                            props.onColorVariantClick?.(variant.id);
                          }
                        }}
                      />
                    )}
                  </For>
                </div>
              </div>
            </Show>

            <Show when={text().longDescription}>
              <span class="detailedProduct-description">{text().longDescription}</span>
            </Show>

            <div class="detailedProduct-details">
              <span class="detailedProduct-section-title">{t("product.details")}</span>
              <div class="detailedProduct-wrapper">
                <div class="detailedProduct-row">
                  <span class="detailedProduct-label">{t("product.producer")}</span>
                  <span class="detailedProduct-value">{specs().producer}</span>
                </div>
              </div>
            </div>
            <div class="detailedProduct-details">
              <span class="detailedProduct-section-title">{t("product.specification")}</span>
              <div class="detailedProduct-wrapper">
                <div class="detailedProduct-row">
                  <span class="detailedProduct-label">{t("product.height")}</span>
                  <span class="detailedProduct-value">
                    {formatHeight(specs().heightMm, site)}
                  </span>
                </div>
                <div class="detailedProduct-row">
                  <span class="detailedProduct-label">{t("product.weight")}</span>
                  <span class="detailedProduct-value">
                    {formatWeight(specs().weightGsm, specs().weightApprox, site)}
                  </span>
                </div>
                <div class="detailedProduct-row">
                  <span class="detailedProduct-label">{t("product.material")}</span>
                  <span class="detailedProduct-value">{text().material}</span>
                </div>
              </div>
              <div class="detailedProduct-row">
                <span class="detailedProduct-label">{t("product.uvResistant")}</span>
                <span class="detailedProduct-value">
                  {specs().uvResistant ? t("product.yes") : t("product.no")}
                </span>
              </div>
            </div>

            <div class="detailedProduct-actions">
              <button
                onClick={() => props.onAskClickAskProduct?.(props.product.id)}
                class="detailedProduct-btn detailedProduct-btn--primary"
              >
                <FiShoppingCart size={16} style={{ color: "#fff" }} />
                {t("product.orderSample")}
              </button>
              <button
                type="button"
                onClick={props.onAskClick}
                class="detailedProduct-btn detailedProduct-btn--ghost"
              >
                <FiMail style={{ color: "#0f172a" }} size={16} />
                {t("common.sendInquiry")}
              </button>
              <Show when={props.product.technicalCard}>
                <button
                  type="button"
                  onClick={() => window.open(props.product.technicalCard, "_blank")}
                  class="detailedProduct-btn detailedProduct-btn--blue"
                >
                  <AiFillFilePdf style={{ color: "#3b82f6" }} size={18} />
                  {t("product.downloadCard")}
                </button>
              </Show>
            </div>
          </div>
        </div>

        <Show when={props.similarProducts?.length}>
          <div class="similar-products">
            <h2 class="similar-products-title">{t("product.similar")}</h2>
            <div class="similar-products-grid">
              <For each={props.similarProducts}>
                {(product) => (
                  <div
                    class="similar-product-card"
                    onClick={() => props.onSimilarProductClick?.(product.id)}
                  >
                    <div class="similar-product-image">
                      <img src={product.img} alt={product.nameProduct} loading="lazy" />
                    </div>
                    <div class="similar-product-info">
                      <span class="similar-product-name">{product.nameProduct}</span>
                      <Price
                        price={product.price}
                        class="similar-product-price"
                        onRequestClass="similar-product-price--onRequest"
                      />
                    </div>
                  </div>
                )}
              </For>
            </div>
          </div>
        </Show>
      </div>
    </div>
  );
};
