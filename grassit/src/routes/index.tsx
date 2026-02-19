import { Meta, Title } from "@solidjs/meta";
import Home from "~/components/Containers/Home/Home";

export default function HomeRoot() {
  return (
    <>
      <Title>Grassit - Sztuczna trawa premium</Title>
      <Meta name="description" content="Sztuczna trawa najwyższej jakości do ogrodów, obiektów sportowych i przestrzeni komercyjnych. Profesjonalny montaż i gwarancja trwałości." />
      <Home />
    </>
  );
}
