import { Component } from "solid-js";
import { A } from "@solidjs/router";
import "./Footer.css";
import logo from "~/components/static/png/logo.png";
import { resolveSite } from "~/config/site";
import { path, t } from "~/utils/translations";

const IconFB = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
    <path
      fill="currentColor"
      d="M13 20v-7h2.6l.4-3H13V8.2c0-.9.3-1.5 1.7-1.5H16V4.1C15.7 4 14.7 4 13.6 4 11.3 4 9.7 5.4 9.7 7.9V10H7v3h2.7v7h3.3z"
    />
  </svg>
);
const IconIG = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
    <path
      fill="currentColor"
      d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5A5.5 5.5 0 1 1 6.5 13 5.5 5.5 0 0 1 12 7.5zm0 2A3.5 3.5 0 1 0 15.5 13 3.5 3.5 0 0 0 12 9.5zM18.5 6a1 1 0 1 1-1 1 1 1 0 0 1 1-1z"
    />
  </svg>
);

const Footer: Component = () => {
  const site = resolveSite();

  /** Category deep-links carry the technical slug, never a translated label. */
  const categoryHref = (category: string) => `${path("products")}?category=${category}`;

  return (
    <footer class="ft">
      <div class="ft__inner">
        <div class="ft__col ft__brand">
          <A href={path("home")} class="ft__logoLink" aria-label={t("nav.home")}>
            <img src={logo} alt="Grassit" class="ft__logo" />
            <span class="sr-only">Grassit</span>
          </A>
          <p class="ft__tagline">{t("footer.tagline")}</p>

          <div class="ft__social" aria-label={t("footer.socialLabel")}>
            <a
              href="https://www.facebook.com/grassitpolska"
              aria-label="Facebook"
              class="ft__socialBtn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconFB />
            </a>
            <a
              href="https://www.instagram.com/grassit.pl/"
              aria-label="Instagram"
              class="ft__socialBtn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconIG />
            </a>
          </div>
        </div>

        <nav class="ft__col" aria-label={t("footer.colProducts")}>
          <p class="ft__title">{t("footer.colProducts")}</p>
          <ul class="ft__links">
            <li>
              <A href={categoryHref("trawy_dekoracyjne")}>{t("nav.decorative")}</A>
            </li>
            <li>
              <A href={categoryHref("trawy_sportowe")}>{t("nav.sport")}</A>
            </li>
            <li>
              <A href={categoryHref("akcesoria")}>{t("nav.accessories")}</A>
            </li>
          </ul>
        </nav>

        <nav class="ft__col" aria-label={t("footer.colInfo")}>
          <p class="ft__title">{t("footer.colInfo")}</p>
          <ul class="ft__links">
            <li>
              <A href={path("about")}>{t("nav.about")}</A>
            </li>
            <li>
              <A href={path("delivery")}>{t("nav.delivery")}</A>
            </li>
            <li>
              <A href={path("contact")}>{t("nav.contact")}</A>
            </li>
          </ul>
        </nav>

        <nav class="ft__col" aria-label={t("footer.colServices")}>
          <p class="ft__title">{t("footer.colServices")}</p>
          <ul class="ft__links">
            <li>
              <A href={path("installation")}>{t("nav.installation")}</A>
            </li>
            <li>
              <A href={path("consulting")}>{t("nav.consulting")}</A>
            </li>
          </ul>
        </nav>

        <address class="ft__col ft__contact" aria-label={t("footer.colContact")}>
          <p class="ft__title">{t("footer.colContact")}</p>
          <p>Kazimierza Wielkiego 47 A</p>
          <p>32-400 Myślenice, {t("footer.country")}</p>
          <p>{t("footer.regon")}: 522476299</p>
          <p>
            {t("footer.vatId")}: 6812093897
          </p>
          <p>{site.phone}</p>
          <p>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
        </address>
      </div>

      <div class="ft__bottom__wrapper">
        <div class="ft__bottom">
          <div class="ft__bottomInner">
            <p>{t("footer.copyright", { year: new Date().getFullYear() })}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
