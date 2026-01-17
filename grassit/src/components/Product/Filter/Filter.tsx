import { Component, createSignal } from "solid-js";
import { Checkbox } from "~/components/Input/CheckBox/CheckBox";
import "./Filter.css";

export type CategoryType = "trawy_dekoracyjne" | "trawy_sportowe" | "trawy_ogrodowe" | "akcesoria";


const CATEGORY_LABELS: Record<CategoryType, string> = {
  trawy_dekoracyjne: "Dekoracyjne",
  trawy_sportowe: "Sportowe",
  trawy_ogrodowe: "Ogrodowe",
  akcesoria: "Akcesoria",
};

export interface IFilterProps {
  selected: Set<CategoryType>;
  onToggle: (cat: CategoryType, checked: boolean) => void;
  onPriceChange: (min: number, max: number) => void;
  onClear: () => void;
  disabled?: boolean;
}

const ALL_CATEGORIES = Object.keys(CATEGORY_LABELS) as CategoryType[];

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
  }

  const isChecked = (c: CategoryType) => props.selected.has(c);

  return (
    <div class="main-container">
      <div class="header-section">
        <span>Filtry</span>
        <button onClick={handleClear}>Wyczyść</button>
      </div>
      
      <span class="text-category-section">Kategorie</span>
      <div class="cat-grid">
        {ALL_CATEGORIES.map((cat) => (
          <label class="cat-item" for={`cat-${cat}`}>
            <Checkbox
              id={`cat-${cat}`}
              checked={isChecked(cat)}
              disabled={props.disabled}
              onClick={() => props.onToggle(cat, !isChecked(cat))}
            />
            <span class="cat-label">{CATEGORY_LABELS[cat]}</span>
          </label>
        ))}
      </div>

      <div class="bottom-inputs-section">
        <span>Cena (zł/m2)</span>
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