import { Component } from "solid-js";
import "./Header.css";
import { A } from "@solidjs/router";

export const Header: Component = (props) => {
  return (
    <div class="header-container">
      <A href="/">
        <img src="" alt="" />
      </A>

      <div class="header-buttons">
        <A
          href="./produkty/produkty"
          class="button-header"
          activeClass="button-header--active"
          end
        >
          <span class="button-header-text">Produkty</span>
        </A>

        <A
          href="/uslugi"
          class="button-header"
          activeClass="button-header--active"
          end
        >
          <span class="button-header-text">Usługi</span>
        </A>

        <A
          href="/realizacje"
          class="button-header"
          activeClass="button-header--active"
          end
        >
          <span class="button-header-text">Realizacje</span>
        </A>

        <A
          href="/kontakt"
          class="button-header"
          activeClass="button-header--active"
          end
        >
          <span class="button-header-text">Kontakt</span>
        </A>
      </div>
    </div>
  );
};
