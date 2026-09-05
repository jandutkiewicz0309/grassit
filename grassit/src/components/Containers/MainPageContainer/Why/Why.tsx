import { Component, For, JSX, createMemo } from "solid-js";
import "./Why.css";
import leaf from "~/components/static/png/leaf.png";
import shield from "~/components/static/png/shield.png";
import scissors from "~/components/static/png/scissors.png";
import { IoPawOutline } from "solid-icons/io";
import { t } from "~/utils/translations";

const PawIcon = () => (
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
);

const Why: Component = () => {
  const cards = createMemo<{ icon: JSX.Element; title: string; desc: string }[]>(() => [
    {
      icon: <img src={leaf} alt="" loading="lazy" />,
      title: t("why.naturalTitle"),
      desc: t("why.naturalDesc"),
    },
    {
      icon: <PawIcon />,
      title: t("why.petsTitle"),
      desc: t("why.petsDesc"),
    },
    {
      icon: <img src={shield} alt="" loading="lazy" />,
      title: t("why.freshTitle"),
      desc: t("why.freshDesc"),
    },
    {
      icon: <img src={scissors} alt="" loading="lazy" />,
      title: t("why.maintenanceTitle"),
      desc: t("why.maintenanceDesc"),
    },
  ]);

  return (
    <section class="why">
      <div class="why__inner">
        <header class="why__head">
          <h2>{t("why.heading")}</h2>
        </header>

        <div class="why__grid">
          <For each={cards()}>
            {(card) => (
              <article class="whyCard">
                {card.icon}
                <h3 class="whyCard__title">{card.title}</h3>
                <p class="whyCard__desc">{card.desc}</p>
              </article>
            )}
          </For>
        </div>
      </div>
    </section>
  );
};

export default Why;
