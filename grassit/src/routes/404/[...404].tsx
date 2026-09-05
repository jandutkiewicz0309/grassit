import { Title } from "@solidjs/meta";
import logo from "~/components/static/jpg/grassit.svg";
import { t } from "~/utils/translations";
import "./index.css";

export default function NotFound() {
  return (
    <main class="notFound">
      <Title>{t("notFound.title")}</Title>
      <img src={logo} alt="Grassit" class="notFound-logo" />
      <h1 class="notFound-title">{t("notFound.heading")}</h1>
      <p class="notFound-description">{t("notFound.description")}</p>
    </main>
  );
}
