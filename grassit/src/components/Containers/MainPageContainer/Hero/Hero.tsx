import { Component } from "solid-js";
import { A } from "@solidjs/router";
import mainImg from "~/components/static/png/MainImg.jpg";
import shape from "~/components/static/png/shape.png";
import waterDrop from "~/components/static/png/waterDrop.png";
import whiteScissors from "~/components/static/png/whiteScissors.png";

import { BsShieldCheck } from "solid-icons/bs";
import "./Hero.css";
import { path, t } from "~/utils/translations";

const Hero: Component = () => (
  <section class="hero" style={{ "--hero-bg": `url(${mainImg})` }}>
    <div class="hero__inner">
      <p class="hero__eyebrow">
        <img alt={t("hero.altShape")} src={shape} />
        {t("hero.eyebrow")}
      </p>

      {/* One string, wrapped by CSS: the line break falls in a different place
          in every language. */}
      <h1 class="hero__title">{t("hero.title")}</h1>

      <p class="hero__lead">{t("hero.lead")}</p>

      <div class="hero__actions">
        <A href={path("contact")} class="btn btn--primary">
          {t("common.contactUs")}
        </A>

        <A href={path("products")} class="btn btn--ghost">
          {t("common.seeProducts")}
        </A>
      </div>

      <ul class="hero__usps" aria-label={t("hero.uspsLabel")}>
        <li>
          <img alt={t("hero.altWaterDrop")} src={waterDrop} />
          {t("hero.usp1")}
        </li>
        <li>
          <BsShieldCheck />
          {t("hero.usp2")}
        </li>
        <li>
          <img alt={t("hero.altScissors")} src={whiteScissors} />
          {t("hero.usp3")}
        </li>
      </ul>
    </div>
  </section>
);

export default Hero;
