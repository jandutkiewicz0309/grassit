import { Component, For } from "solid-js";
import { ContatUsContainer } from "~/components/Containers/ContatUsContainer/ContatUsContainer";
import mainImg from "~/components/static/png/MainImg.jpg";
import grassitLogo from "~/components/static/jpg/grassit.svg";
import { sendEmailWithToast } from "~/utils/sendMail";
import { OnSubmitOrderForm } from "~/utils/types";
import { t } from "~/utils/translations";
import "./AboutHeroSection.css";

const AboutHeroSection: Component = () => {
  const paragraphs = () => [
    t("about.p1"),
    t("about.p2"),
    t("about.p3"),
    t("about.p4"),
    t("about.p5"),
  ];

  return (
    <section class="about-hero-section">
      <div class="about-hero-section__image-wrapper">
        <img
          src={mainImg}
          alt={t("about.imgAlt")}
          class="about-hero-section__image"
          loading="lazy"
        />
        <div class="about-hero-section__overlay">
          <img
            src={grassitLogo}
            alt={t("about.logoAlt")}
            class="about-hero-section__logo"
            loading="lazy"
          />
        </div>
      </div>

      <div class="categories-container">
        <div class="categories-container__inner">
          <h1 class="about-hero-section__title">{t("about.title")}</h1>
          <For each={paragraphs()}>
            {(paragraph) => <p class="about-hero-section__text">{paragraph}</p>}
          </For>

          <div class="about-hero-section__form-wrapper">
            <ContatUsContainer
              onSubmit={async (data: OnSubmitOrderForm) => {
                return await sendEmailWithToast(data, t("toast.success"));
              }}
              text={t("about.formText")}
              title={t("about.formTitle")}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHeroSection;
