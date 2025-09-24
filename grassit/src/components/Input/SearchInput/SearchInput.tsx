import { FiSearch } from "solid-icons/fi";
import { Component } from "solid-js";
import "./SearchInput.css";

export interface ISearchInput {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

export const SearchInput: Component<ISearchInput> = (props) => {
  return (
    <div class="search-input-container">
      <FiSearch color="#9CA3AF" size={16} />
      <input
        class="search-input"
        value={props.value}
        onInput={(e) => props.onChange(e.currentTarget.value)}
        placeholder={props.placeholder}
      />
    </div>
  );
};
