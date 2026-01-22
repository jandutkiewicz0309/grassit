import { Component, For } from "solid-js";
import { ProductGallery } from "./ProductGalery/ProductGallery";
import "./DetailedProduct.css";
import { FiMail, FiShoppingCart } from "solid-icons/fi";

export interface SimilarProduct {
  id: string;
  img: string;
  nameProduct: string;
  price: string;
}

export interface IDetailedProduct {
  nameProduct: string;
  id: string;
  price: string;
  producer: string;
  productDescription: string;
  catalogNumber: string;
  productHeight: string;
  productWeight: string;
  productMaterial: string;
  UVResistant: string;
  images: string[];
  similarProducts?: SimilarProduct[];
  onAskClick?: (e: MouseEvent) => void;
  onAskClickAskProduct?: (id: string) => void;
  onSimilarProductClick?: (id: string) => void;
}

export const DetailedProduct: Component<IDetailedProduct> = (props) => {
  const galleryImages = props.images?.length ? props.images : [];
  return (
    <div class="wrapper">
      <div id={props.id} class="main-detailedProduct-container">
        <div class="detailedProduct-header">
          <h1>Szczegóły produktu</h1>
          <p>Specyfikacja, parametry techniczne i kluczowe informacje.</p>
        </div>
        <div class="contentWrapper">
          <div class="detailedProduct-gallery">
            <ProductGallery
              images={galleryImages}
              alt="Piłka nożna na murawie"
            />
          </div>
          <div class="detailedProduct-info">
            <div class="detailedProduct-name-price">
              <h1 class="detailedProduct-name">{props.nameProduct}</h1>
              <div class="detailedProduct-price-info">
                <h2 class="detailedProduct-price">
                  {props.price}zł <span class="price-unit">/ m²</span>
                </h2>
                <p>Dostępne</p>
              </div>
            </div> 

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
                <div class="detailedProduct-row">
                  <span class="detailedProduct-label">Numer katalogowy</span>
                  <span class="detailedProduct-value">
                    {props.catalogNumber}
                  </span>
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
                      <img src={product.img} alt={product.nameProduct} loading="lazy" />
                    </div>
                    <div class="similar-product-info">
                      <span class="similar-product-name">{product.nameProduct}</span>
                      <span class="similar-product-price">{product.price} zł/m²</span>
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
