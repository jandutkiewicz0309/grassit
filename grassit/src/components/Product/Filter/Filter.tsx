import { Component, createSignal, Show } from "solid-js";
import { Checkbox } from "~/components/Input/CheckBox/CheckBox";
import "./Filter.css";

export type CategoryType = "trawy_dekoracyjne" | "trawy_sportowe" | "akcesoria";
export type SubcategoryType = "murawy_piłkarskie" | "murawy_padlowe" | "murawy_golfowe" | 'murawy_tenis';

const CATEGORY_LABELS: Record<CategoryType, string> = {
  trawy_dekoracyjne: "Dekoracyjne",
  trawy_sportowe: "Sportowe",
  akcesoria: "Akcesoria",
};

const SUBCATEGORY_LABELS: Record<SubcategoryType, string> = {
  "murawy_piłkarskie": "Piłka Nożna",
  "murawy_padlowe": "Padel",
  "murawy_golfowe": "Golf",
  "murawy_tenis": 'Tenis',
};

const ALL_SUBCATEGORIES = Object.keys(SUBCATEGORY_LABELS) as SubcategoryType[];
const SIMPLE_CATEGORIES: CategoryType[] = ["trawy_dekoracyjne", "akcesoria"];

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
  const [minPrice, setMinPrice] = createSignal<string>("");
  const [maxPrice, setMaxPrice] = createSignal<string>("");

  const handlePriceChange = () => {
    const min = parseFloat(minPrice()) || 0;
    const max = parseFloat(maxPrice()) || 99999;
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
        <span>Filtry</span>
        <button onClick={handleClear}>Wyczysc</button>
      </div>

      <span class="text-category-section">Kategorie</span>
      <div class="cat-grid">
        <label class="cat-item" for="cat-trawy_dekoracyjne">
          <Checkbox
            id="cat-trawy_dekoracyjne"
            checked={isChecked("trawy_dekoracyjne")}
            disabled={props.disabled}
            onClick={() => props.onToggle("trawy_dekoracyjne", !isChecked("trawy_dekoracyjne"))}
          />
          <span class="cat-label">Dekoracyjne</span>
        </label>

        <label class="cat-item" for="cat-trawy_sportowe">
          <Checkbox
            id="cat-trawy_sportowe"
            checked={isChecked("trawy_sportowe")}
            disabled={props.disabled}
            onClick={() => props.onToggle("trawy_sportowe", !isChecked("trawy_sportowe"))}
          />
          <span class="cat-label">Sportowe</span>
        </label>

        <Show when={sportOpen()}>
          <div class="subcat-list">
            {ALL_SUBCATEGORIES.map((sub) => (
              <label class="subcat-item" for={`sub-${sub}`}>
                <Checkbox
                  id={`sub-${sub}`}
                  checked={isSubChecked(sub)}
                  disabled={props.disabled}
                  onClick={() => props.onSubcategoryToggle(sub, !isSubChecked(sub))}
                />
                <span class="subcat-label">{SUBCATEGORY_LABELS[sub]}</span>
              </label>
            ))}
          </div>
        </Show>

        <label class="cat-item" for="cat-akcesoria">
          <Checkbox
            id="cat-akcesoria"
            checked={isChecked("akcesoria")}
            disabled={props.disabled}
            onClick={() => props.onToggle("akcesoria", !isChecked("akcesoria"))}
          />
          <span class="cat-label">Akcesoria</span>
        </label>
      </div>

      <div class="bottom-inputs-section">
        <span>Cena (zl/m2)</span>
        <div class="inputs-container">
          <div class="min-input">
            <input
              placeholder="Min"
              type="number"
              value={minPrice()}
              onInput={(e) => { setMinPrice(e.currentTarget.value); handlePriceChange(); }}
            />
          </div>
          <div class="max-input">
            <input
              placeholder="Max"
              type="number"
              value={maxPrice()}
              onInput={(e) => { setMaxPrice(e.currentTarget.value); handlePriceChange(); }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
