import { Component, createSignal, createMemo, For, createEffect } from "solid-js";
import { useSearchParams } from "@solidjs/router";
import { IProductItem, ProductItem } from "../ProductItem/ProductItem";
import { SearchInput } from "~/components/Input/SearchInput/SearchInput";
import { FilterComponnet } from "../Filter/Filter";
import { isCategory, type CategoryType, type SubcategoryType } from "~/data/products";
import { resolveSite } from "~/config/site";
import { priceFor } from "~/utils/translations/format";
import { t } from "~/utils/translations";
import "./ProductContainer.css";

export interface IProductItemWithCategory extends IProductItem {
  category: CategoryType;
  subcategory?: SubcategoryType;
  badge?: string;
}

export interface IProductContainer {
  productData: IProductItemWithCategory[];
}

/**
 * Category values that used to travel in the URL as Polish display labels.
 * Kept so links shared or indexed before the rework still apply the filter.
 */
const LEGACY_CATEGORY_ALIASES: Record<string, CategoryType> = {
  "Trawy Dekoracyjne": "trawy_dekoracyjne",
  "Trawy sportowe": "trawy_sportowe",
  Akcesoria: "akcesoria",
};

export const ProductContainer: Component<IProductContainer> = (props) => {
  const site = resolveSite();
  const [searchParams] = useSearchParams();

  const [selectedCats, setSelectedCats] = createSignal(new Set<CategoryType>());
  const [selectedSubs, setSelectedSubs] = createSignal(new Set<SubcategoryType>());
  const [searchQuery, setSearchQuery] = createSignal("");
  const [priceRange, setPriceRange] = createSignal({ min: 0, max: site.priceMax });

  createEffect(() => {
    const raw = searchParams.category;
    const value = Array.isArray(raw) ? raw[0] : raw;
    if (!value) return;

    const category = isCategory(value) ? value : LEGACY_CATEGORY_ALIASES[value];
    if (category) setSelectedCats(new Set([category]));
  });

  const filteredProducts = createMemo(() => {
    return props.productData.filter((item) => {
      const categoryMatch =
        selectedCats().size === 0 || selectedCats().has(item.category);

      const subcategoryMatch =
        selectedSubs().size === 0 ||
        item.category !== "trawy_sportowe" ||
        (item.subcategory && selectedSubs().has(item.subcategory));

      const searchMatch = item.nameProduct
        .toLocaleLowerCase()
        .includes(searchQuery().toLocaleLowerCase());

      // Quote-only products have no amount and are never filtered out by price.
      const amount = priceFor(item.price, site);
      const priceMatch =
        amount === null || (amount >= priceRange().min && amount <= priceRange().max);

      return categoryMatch && subcategoryMatch && searchMatch && priceMatch;
    });
  });

  const handleCategoryToggle = (cat: CategoryType, isSelected: boolean) => {
    const newSet = new Set(selectedCats());
    isSelected ? newSet.add(cat) : newSet.delete(cat);
    setSelectedCats(newSet);

    if (cat === "trawy_sportowe" && !isSelected) {
      setSelectedSubs(new Set<SubcategoryType>());
    }
  };

  const handleSubcategoryToggle = (sub: SubcategoryType, isSelected: boolean) => {
    const newSet = new Set(selectedSubs());
    isSelected ? newSet.add(sub) : newSet.delete(sub);
    setSelectedSubs(newSet);
  };

  return (
    <div class="main-product-container">
      <h1>{t("products.heading")}</h1>
      <span class="main-product-description">{t("products.lead")}</span>

      <div class="search-section">
        <SearchInput
          onChange={(val) => setSearchQuery(val)}
          placeholder={t("products.searchPlaceholder")}
          value={searchQuery()}
        />
        <span>{t("products.results", { count: filteredProducts().length })}</span>
      </div>

      <div class="filtr-product-section">
        <FilterComponnet
          selected={selectedCats()}
          selectedSubcategories={selectedSubs()}
          onToggle={handleCategoryToggle}
          onSubcategoryToggle={handleSubcategoryToggle}
          onPriceChange={(min, max) => setPriceRange({ min, max })}
          onClear={() => {
            setSelectedCats(new Set<CategoryType>());
            setSelectedSubs(new Set<SubcategoryType>());
            setSearchQuery("");
            setPriceRange({ min: 0, max: site.priceMax });
          }}
        />

        <div class="product-list">
          <For
            each={filteredProducts()}
            fallback={<div style="margin-top: 20px;">{t("products.empty")}</div>}
          >
            {(product) => (
              <ProductItem
                description={product.description}
                id={product.id}
                img={product.img}
                nameProduct={product.nameProduct}
                onClick={product.onClick}
                price={product.price}
                badge={product.badge}
              />
            )}
          </For>
        </div>
      </div>
    </div>
  );
};
