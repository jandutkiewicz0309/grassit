import { Component } from "solid-js";
import "./Header.css";
import { A } from "@solidjs/router";
import logo from "~/components/static/png/greenLogo.png";

export const Header: Component = () => {
  return (
    <div class="header">
      <div class="header-container">
        <A href="/" class="header-logo">
          <img src={logo} alt="" />
        </A>
        <div class="header-buttons">
          <A
            href="./produkty"
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
    </div>
  );
};
