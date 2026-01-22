import { Title } from "@solidjs/meta";
import logo from "~/components/static/jpg/grassit.svg";
import "./index.css";

export default function NotFound() {
  return (
    <main class="notFound">
      <Title>Not Found</Title>
      <img src={logo} alt="Grassit" class="notFound-logo" />
      <h1 class="notFound-title">Przepraszamy</h1>
      <p class="notFound-description">
        Strona jest jeszcze nie dostępna, pracujemy nad jej dodaniem.
      </p>
    </main>
  );
}
