import { Component } from "solid-js";
import { Checkbox } from "~/components/Input/CheckBox/CheckBox";
import "./Filter.css";

export type Category = "Residential" | "Play" | "Pet" | "Golf";

export interface IFilterProps {
  selected: Set<Category>;
  onToggle: (cat: Category, checked: boolean) => void;
  disabled?: boolean;
}

const ALL_CATEGORIES: Category[] = ["Residential", "Pet", "Play", "Golf"];

export const FilterComponnet: Component<IFilterProps> = (props) => {
  const isChecked = (c: Category) => props.selected.has(c);

  return (
    <div class="main-container">
      <div class="header-section">
        <span>Filtry</span>
        <button>Wyczyść</button>
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
            <span class="cat-label">{cat}</span>
          </label>
        ))}
      </div>
      <div class="bottom-inputs-section">
        <span>Cena (zł/m2)</span>
        <div class="inputs-container">
          <div class="min-input">
            <input placeholder="MIN" />
          </div>
          <div class="max-input">
            <input placeholder="MAX" />
          </div>
        </div>
      </div>
    </div>
  );
};
