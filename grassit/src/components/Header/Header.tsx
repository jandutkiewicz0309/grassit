import { Component } from "solid-js";
import "./Header.css";
import { A } from "@solidjs/router";
import logo from "~/components/static/jpg/grassit.svg";
import { LanguageSwitcher } from "~/components/LanguageSwitcher/LanguageSwitcher";
import { path, t } from "~/utils/translations";

export const Header: Component = () => {
  return (
    <div class="header">
      <div class="header-container">
        <A href={path("home")} class="header-logo" aria-label={t("nav.home")}>
          <img src={logo} alt="Grassit" class="img" />
        </A>
        <div class="header-buttons">
          <A
            href={path("products")}
            class="button-header"
            activeClass="button-header--active"
            end
          >
            <span class="button-header-text">{t("nav.products")}</span>
          </A>
          <A
            href={path("installation")}
            class="button-header"
            activeClass="button-header--active"
            end
          >
            <span class="button-header-text">{t("nav.services")}</span>
          </A>
          <A
            href={path("about")}
            class="button-header"
            activeClass="button-header--active"
            end
          >
            <span class="button-header-text">{t("nav.about")}</span>
          </A>
          <A
            href={path("contact")}
            class="button-header"
            activeClass="button-header--active"
            end
          >
            <span class="button-header-text">{t("nav.contact")}</span>
          </A>
          <LanguageSwitcher />
        </div>
      </div>
    </div>
  );
};
