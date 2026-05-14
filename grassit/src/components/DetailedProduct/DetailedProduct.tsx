import { Component, For, Show } from "solid-js";
import { ProductGallery } from "./ProductGalery/ProductGallery";
import "./DetailedProduct.css";
import { FiMail, FiShoppingCart, FiFileText } from "solid-icons/fi";
import { AiFillFilePdf } from 'solid-icons/ai'
export interface SimilarProduct {
  id: string;
  img: string;
  nameProduct: string;
  price: string;
}

export interface ColorVariant {
  id: string;
  color: string;
  label: string;
}

export interface IDetailedProduct {
  nameProduct: string;
  id: string;
  price: string;
  producer: string;
  productDescription: string;
  catalogNumber?: string;
  productHeight: string;
  productWeight: string;
  productMaterial: string;
  UVResistant: string;
  images: string[];
  technicalCard?: string;
  colorVariants?: ColorVariant[];
  similarProducts?: SimilarProduct[];
  onAskClick?: (e: MouseEvent) => void;
  onAskClickAskProduct?: (id: string) => void;
  onSimilarProductClick?: (id: string) => void;
  onColorVariantClick?: (id: string) => void;
}

export const DetailedProduct: Component<IDetailedProduct> = (props) => {
  return (
    <div class="wrapper">
      <div id={props.id} class="main-detailedProduct-container">
        <div class="detailedProduct-header">
          <p class="detailedProduct-header-title">Szczegóły produktu</p>
          <p>Specyfikacja, parametry techniczne i kluczowe informacje.</p>
        </div>
        <div class="contentWrapper">
          <div class="detailedProduct-gallery">
            <ProductGallery
              images={props.images?.length ? props.images : []}
              alt={props.nameProduct}
            />
          </div>
          <div class="detailedProduct-info">
            <div class="detailedProduct-name-price">
              <h1 class="detailedProduct-name">{props.nameProduct}</h1>
              <div class="detailedProduct-price-info">
                <span class="detailedProduct-price" style={isNaN(parseFloat(props.price)) ? { "font-size": "14px", "white-space": "nowrap" } : {}}>
                  {props.price}{!isNaN(parseFloat(props.price)) && <> zł <span class="price-unit">netto / m²</span></>}
                </span>
                <p>Dostępne</p>
              </div>
            </div> 

            <Show when={props.colorVariants && props.colorVariants.length > 0}>
              <div class="detailedProduct-color-variants">
                <span class="detailedProduct-section-title">Kolor</span>
                <div class="detailedProduct-color-options">
                  <For each={props.colorVariants}>
                    {(variant) => (
                      <button
                        class={`detailedProduct-color-swatch ${variant.id === props.id ? "active" : ""}`}
                        style={{ "background-color": variant.color }}
                        title={variant.label}
                        onClick={() => {
                          if (variant.id !== props.id) {
                            props.onColorVariantClick?.(variant.id);
                          }
                        }}
                      />
                    )}
                  </For>
                </div>
              </div>
            </Show>

            <span class="detailedProduct-description">
              {props.productDescription}
            </span>

            <div class="detailedProduct-details">
              <span class="detailedProduct-section-title">Szczegóły</span>
              <div class="detailedProduct-wrapper">
                <div class="detailedProduct-row">
                  <span class="detailedProduct-label">Producent</span>
                  <span class="detailedProduct-value">{props.producer}</span>
                </div>
              </div>
            </div>
            <div class="detailedProduct-details">
              <span class="detailedProduct-section-title">Specyfikacja</span>
              <div class="detailedProduct-wrapper">
                <div class="detailedProduct-row">
                  <span class="detailedProduct-label">Wysokość</span>
                  <span class="detailedProduct-value">
                    {props.productHeight}
                  </span>
                </div>
                <div class="detailedProduct-row">
                  <span class="detailedProduct-label">Waga</span>
                  <span class="detailedProduct-value">
                    {props.productWeight}
                  </span>
                </div>
                <div class="detailedProduct-row">
                  <span class="detailedProduct-label">Materiał</span>
                  <span class="detailedProduct-value">
                    {props.productMaterial}
                  </span>
                </div>
              </div>
              <div class="detailedProduct-row">
                <span class="detailedProduct-label">Odporność na UV</span>
                <span class="detailedProduct-value">{props.UVResistant}</span>
              </div>
            </div>

            <div class="detailedProduct-actions">
              <button
                onClick={() => props.onAskClickAskProduct?.(props.id)}
                class="detailedProduct-btn detailedProduct-btn--primary"
              >
                <FiShoppingCart size={16} style={{ color: "#fff" }} />
                Zamów DARMOWĄ próbkę
              </button>
              <button
                type="button"
                onClick={props.onAskClick}
                class="detailedProduct-btn detailedProduct-btn--ghost"
              >
                <FiMail style={{ color: "#0f172a" }} size={16} />
                Wyślij zapytanie
              </button>
              <Show when={props.technicalCard}>
                <a
                  href={props.technicalCard}
                  download=""
                  class="detailedProduct-btn detailedProduct-btn--blue"
                >
                  <AiFillFilePdf style={{ color: "#3b82f6" }} size={18} />
                  Pobierz karte techniczna
                </a>
              </Show>
            </div>
          </div>
        </div>

        {props.similarProducts && props.similarProducts.length > 0 && (
          <div class="similar-products">
            <h2 class="similar-products-title">Podobne produkty</h2>
            <div class="similar-products-grid">
              <For each={props.similarProducts}>
                {(product) => (
                  <div
                    class="similar-product-card"
                    onClick={() => props.onSimilarProductClick?.(product.id)}
                  >
                    <div class="similar-product-image">
                      <img src={product.img} alt={product.nameProduct} loading="lazy" width={400} height={300} />
                    </div>
                    <div class="similar-product-info">
                      <span class="similar-product-name">{product.nameProduct}</span>
                      <span class="similar-product-price" style={isNaN(parseFloat(product.price)) ? { "font-size": "11px", "white-space": "nowrap" } : {}}>{product.price}{!isNaN(parseFloat(product.price)) && " zł"}</span>
                    </div>
                  </div>
                )}
              </For>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
