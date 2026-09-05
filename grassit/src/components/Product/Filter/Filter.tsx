import { Component, createMemo, createSignal, For, Show } from "solid-js";
import { Checkbox } from "~/components/Input/CheckBox/CheckBox";
import { resolveSite } from "~/config/site";
import {
  CATEGORY_VALUES,
  SUBCATEGORY_VALUES,
  type CategoryType,
  type SubcategoryType,
} from "~/data/products";
import { t } from "~/utils/translations";
import { currencySymbol } from "~/utils/translations/format";
import "./Filter.css";

export type { CategoryType, SubcategoryType };

export interface IFilterProps {
  selected: Set<CategoryType>;
  selectedSubcategories: Set<SubcategoryType>;
  onToggle: (cat: CategoryType, checked: boolean) => void;
  onSubcategoryToggle: (sub: SubcategoryType, checked: boolean) => void;
  onPriceChange: (min: number, max: number) => void;
  onClear: () => void;
  disabled?: boolean;
}

export const FilterComponnet: Component<IFilterProps> = (props) => {
  const site = resolveSite();
  const [minPrice, setMinPrice] = createSignal<string>("");
  const [maxPrice, setMaxPrice] = createSignal<string>("");

  /**
   * Built from `t` on every read so the labels follow a language change - a
   * module-scope map would freeze at import time.
   */
  const categoryLabel = (category: CategoryType) =>
    category === "trawy_dekoracyjne"
      ? t("filter.catDecorative")
      : category === "trawy_sportowe"
        ? t("filter.catSport")
        : t("filter.catAccessories");

  const subcategoryLabel = (sub: SubcategoryType) =>
    sub === "murawy_piłkarskie"
      ? t("filter.subFootball")
      : sub === "murawy_padlowe"
        ? t("filter.subPadel")
        : sub === "murawy_golfowe"
          ? t("filter.subGolf")
          : t("filter.subTennis");

  const priceUnit = createMemo(() => `${currencySymbol(site)}/m²`);

  const handlePriceChange = () => {
    const min = parseFloat(minPrice()) || 0;
    const max = parseFloat(maxPrice()) || site.priceMax;
    props.onPriceChange(min, max);
  };

  const handleClear = () => {
    setMinPrice("");
    setMaxPrice("");
    props.onClear();
  };

  const isChecked = (c: CategoryType) => props.selected.has(c);
  const isSubChecked = (s: SubcategoryType) => props.selectedSubcategories.has(s);
  const sportOpen = () => props.selected.has("trawy_sportowe");

  return (
    <div class="main-container">
      <div class="header-section">
        <span>{t("filter.title")}</span>
        <button onClick={handleClear}>{t("filter.clear")}</button>
      </div>

      <span class="text-category-section">{t("filter.categories")}</span>
      <div class="cat-grid">
        <For each={CATEGORY_VALUES}>
          {(category) => (
            <>
              <label class="cat-item" for={`cat-${category}`}>
                <Checkbox
                  id={`cat-${category}`}
                  checked={isChecked(category)}
                  disabled={props.disabled}
                  onClick={() => props.onToggle(category, !isChecked(category))}
                />
                <span class="cat-label">{categoryLabel(category)}</span>
              </label>

              <Show when={category === "trawy_sportowe" && sportOpen()}>
                <div class="subcat-list">
                  <For each={SUBCATEGORY_VALUES}>
                    {(sub) => (
                      <label class="subcat-item" for={`sub-${sub}`}>
                        <Checkbox
                          id={`sub-${sub}`}
                          checked={isSubChecked(sub)}
                          disabled={props.disabled}
                          onClick={() => props.onSubcategoryToggle(sub, !isSubChecked(sub))}
                        />
                        <span class="subcat-label">{subcategoryLabel(sub)}</span>
                      </label>
                    )}
                  </For>
                </div>
              </Show>
            </>
          )}
        </For>
      </div>

      <div class="bottom-inputs-section">
        <span>{t("filter.price", { unit: priceUnit() })}</span>
        <div class="inputs-container">
          <div class="min-input">
            <input
              placeholder={t("filter.min")}
              type="number"
              value={minPrice()}
              onInput={(e) => {
                setMinPrice(e.currentTarget.value);
                handlePriceChange();
              }}
            />
          </div>
          <div class="max-input">
            <input
              placeholder={t("filter.max")}
              type="number"
              value={maxPrice()}
              onInput={(e) => {
                setMaxPrice(e.currentTarget.value);
                handlePriceChange();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
