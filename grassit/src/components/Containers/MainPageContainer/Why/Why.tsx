import { Component } from "solid-js";
import "./Why.css";
import drop from "~/components/static/png/drop.png";
import leaf from "~/components/static/png/leaf.png";
import shield from "~/components/static/png/shield.png";
import scissors from "~/components/static/png/scissors.png";
import { IoPawOutline } from "solid-icons/io";

const Why: Component = () => {
  return (
    <section class="why">
      <div class="why__inner">
        <header class="why__head">
          <h2>Zalety trawnika syntetycznego</h2>
        </header>

        <div class="why__grid">
          <article class="whyCard">
            <img src={leaf} alt="" loading="lazy" />
            <h3 class="whyCard__title">Naturalny wygląd</h3>
            <p class="whyCard__desc">
              Nasze produkty stworzone są aby skutecznie imitować żywy, idealnie
              utrzymany trawnik. Niektóre modele posiadają do 14 różnych odcieni
              koloru zielonego na 10 cm²
            </p>
          </article>

          <article class="whyCard">
            <div
              style={{
                background: "#F0FDF4",
                width: "40px",
                height: "40px",
                display: "flex",
                "align-items": "center",
                "justify-content": "center",
                "border-radius": "6px",
              }}
            >
              <IoPawOutline size={20} style={{ color: "#15803D" }} />
            </div>
            <h3 class="whyCard__title">Produkt przyjazny zwierzętom</h3>
            <p class="whyCard__desc">
              Trawniki w naszej ofercie posiadają drenaż który skutecznie
              odprowadza wodę oraz mocz zwierząt nie pozostawiając plam.
            </p>
          </article>

          <article class="whyCard">
            <img src={shield} alt="" loading="lazy" />
            <h3 class="whyCard__title"> Zawsze świeży wygląd</h3>
            <p class="whyCard__desc">
              Skuteczna odpornośc na promienie UV sprawi, że kolor twojego
              trawnika będzie zawsze świeży i mocno nasycony
            </p>
          </article>

          <article class="whyCard">
            <img src={scissors} alt="" loading="lazy" />
            <h3 class="whyCard__title"> Produkt bezobsługowy</h3>
            <p class="whyCard__desc">
              Koniec z nawożeniem, podlewaniem i koszeniem swojego trawnika.
              Nasze produkty są produktami bezobsługowymi. Sugerujemy jednak
              regularne czesanie trawnika aby zachować źdźbła trawy w pionie.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
};

export default Why;
