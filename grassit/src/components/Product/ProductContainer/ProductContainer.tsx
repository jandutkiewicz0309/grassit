import {
  Component,
  createSignal,
  createMemo,
  For,
  createEffect,
} from "solid-js";
import { useSearchParams } from "@solidjs/router";
import { IProductItem, ProductItem } from "../ProductItem/ProductItem";
import { SearchInput } from "~/components/Input/SearchInput/SearchInput";
import { CategoryType, FilterComponnet } from "../Filter/Filter";
import "./ProductContainer.css";

export interface IProductItemWithCategory extends IProductItem {
  category: CategoryType;
}

export interface IProductContainer {
  productData: IProductItemWithCategory[];
}

export const ProductContainer: Component<IProductContainer> = (props) => {
  const [searchParams] = useSearchParams();

  const [selectedCats, setSelectedCats] = createSignal(new Set<CategoryType>());
  const [searchQuery, setSearchQuery] = createSignal("");
  const [priceRange, setPriceRange] = createSignal({ min: 0, max: 99999 });

createEffect(() => {
    const rawCategory = searchParams.category;
    
    const categoryNameFromUrl = Array.isArray(rawCategory) 
      ? rawCategory[0] 
      : rawCategory;

    const urlToCategoryMap: Record<string, CategoryType> = {
      "Trawy Dekoracyjne": "trawy_dekoracyjne",
      "Trawy sportowe": "trawy_sportowe",
      "Akcesoria": "akcesoria",
    };

    if (categoryNameFromUrl && urlToCategoryMap[categoryNameFromUrl]) {
      const technicalCategoryName = urlToCategoryMap[categoryNameFromUrl];
      setSelectedCats(new Set([technicalCategoryName]));
    }
  });

  const filteredProducts = createMemo(() => {
    return props.productData.filter((item) => {
      const categoryMatch =
        selectedCats().size === 0 || selectedCats().has(item.category);

      const searchMatch = item.nameProduct
        .toLowerCase()
        .includes(searchQuery().toLowerCase());

      const priceVal = parseFloat(item.price);
      const priceMatch =
        priceVal >= priceRange().min && priceVal <= priceRange().max;

      return categoryMatch && searchMatch && priceMatch;
    });
  });

  return (
    <div class="main-product-container">
      <h1>Nasze produkty</h1>
      <span class="main-product-description">
        Odkryj nasze najpopularniejsze produkty do ogrodów, podwórek i
        zastosowań komercyjnych.
      </span>

      <div class="search-section">
        <SearchInput
          onChange={(val) => setSearchQuery(val)}
          placeholder="Wyszukaj produkt..."
          value={searchQuery()}
        />
        <span>{filteredProducts().length} wyników</span>
      </div>

      <div class="filtr-product-section">
        <FilterComponnet
          selected={selectedCats()}
          onToggle={(cat, isSelected) => {
            const newSet = new Set(selectedCats());
            isSelected ? newSet.add(cat) : newSet.delete(cat);
            setSelectedCats(newSet);
          }}
          onPriceChange={(min, max) => setPriceRange({ min, max })}
          onClear={() => {
            setSelectedCats(new Set<CategoryType>());
            setSearchQuery("");
            setPriceRange({ min: 0, max: 99999 });
          }}
        />

        <div class="product-list">
          <For
            each={filteredProducts()}
            fallback={
              <div style="margin-top: 20px;">
                Brak produktów spełniających kryteria.
              </div>
            }
          >
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