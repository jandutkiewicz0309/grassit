import { Component } from "solid-js";
import { ContatUsContainer } from "~/components/Containers/ContatUsContainer/ContatUsContainer";
import mainImg from "~/components/static/png/MainImg.jpg";
import grassitLogo from "~/components/static/jpg/grassit.svg";
import { sendEmailWithToast } from "~/utils/sendMail";
import { OnSubmitOrderForm } from "~/utils/types";
import "./AboutHeroSection.css";

const AboutHeroSection: Component = () => {
  return (
    <section class="about-hero-section">
      <div class="about-hero-section__image-wrapper">
        <img
          src={mainImg}
          alt="Sztuczna trawa - główne zdjęcie"
          class="about-hero-section__image"
        />
        <div class="about-hero-section__overlay">
          <img
            src={grassitLogo}
            alt="Grassit logo"
            class="about-hero-section__logo"
          />
        
        </div>
      </div>

      <div class="categories-container">
        <div class="categories-container__inner">
          <p class="about-hero-section__text">
            Jesteśmy firmą specjalizującą się w sprzedaży oraz profesjonalnej instalacji wysokiej jakości
            sztucznej trawy. Od lat pomagamy naszym klientom tworzyć estetyczne, funkcjonalne i trwałe
            przestrzenie zielone — bez konieczności czasochłonnej pielęgnacji.
          </p>
          <p class="about-hero-section__text">
            Nasza oferta obejmuje nowoczesne rozwiązania, które doskonale sprawdzają się w ogrodach, na
            tarasach i balkonach, placach zabaw, boiskach sportowych, a także w przestrzeniach komercyjnych.
            Współpracujemy wyłącznie z renomowanymi producentami, dzięki czemu oferowana przez nas
            sztuczna trawa wiernie odwzorowuje naturalną murawę, jest odporna na warunki atmosferyczne i
            bezpieczna w użytkowaniu.
          </p>
          <p class="about-hero-section__text">
            Każdy projekt traktujemy indywidualnie. Zapewniamy fachowe doradztwo na każdym etapie
            realizacji — od wyboru odpowiedniego produktu, przez przygotowanie podłoża, aż po precyzyjny
            montaż. Nasz doświadczony zespół dba o detale, terminowość oraz najwyższą jakość wykonania.
          </p>
          <p class="about-hero-section__text">
            Stawiamy na rzetelność, nowoczesne technologie i zadowolenie klientów. Dzięki naszym
            realizacjom możesz cieszyć się idealnie zieloną powierzchnią przez cały rok — bez koszenia,
            podlewania i nawożenia.
          </p>
          <p class="about-hero-section__text">
            Zapraszamy do współpracy i kontaktu — chętnie pomożemy stworzyć przestrzeń dopasowaną do
            Twoich potrzeb.
          </p>

          <div class="about-hero-section__form-wrapper">
            <ContatUsContainer
              onSubmit={async (data: OnSubmitOrderForm) => {
                await sendEmailWithToast(data, "Dziękujemy! Formularz został wysłany.");
              }}
              text="Skontaktuj się z naszym zespołem i dowiedz się, jak możemy pomóc Ci zaplanować i zrealizować Twój projekt."
              title="Zrób pierwszy krok do pięknego ogrodu – napisz do nas."
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHeroSection;
