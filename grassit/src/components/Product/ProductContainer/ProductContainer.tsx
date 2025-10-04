import { Component, createSignal, For } from "solid-js";
import { IProductItem, ProductItem } from "../ProductItem/ProductItem";
import { SearchInput } from "~/components/Input/SearchInput/SearchInput";
import { Category, FilterComponnet } from "../Filter/Filter";
import "./ProductContainer.css";

export interface IProductContainer {
  productData: IProductItem[];
}

export const ProductContainer: Component<IProductContainer> = (props) => {
  const [selected, setSelected] = createSignal(
    new Set<Category>(["Residential"])
  );

  return (
    <div class="main-product-container">
      <h1>Nasze produkty</h1>
      <span class="main-product-description">
        Odkryj nasze najpopularniejsze produkty do ogrodów, podwórek i
        zastosowań komercyjnych.
      </span>
      <div class="search-section">
        <SearchInput
          onChange={() => {}}
          placeholder="Wyszukaj produkt..."
          value=""
        />
        <span>{props.productData.length} wyników</span>
      </div>
      <div class="filtr-product-section">
        <FilterComponnet
          onToggle={(cat: Category, next: boolean) => {
            const s = new Set(selected());
            next ? s.add(cat) : s.delete(cat);
            setSelected(s);
          }}
          selected={selected()}
        />
        <div class="product-list">
          <For each={props.productData}>
            {(product) => (
              <ProductItem
                description={product.description}
                id={product.id}
                img={product.img}
                nameProduct={product.nameProduct}
                onClick={product.onClick}
                price={product.price}
              />
            )}
          </For>
        </div>
      </div>
    </div>
  );
};
