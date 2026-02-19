import { Meta, Title } from "@solidjs/meta";
import { BackArrow } from "~/components/BackArrow/BackArrow";
import { InstallationPage } from "~/components/Installation/Installation";

export const Installation = () => {
  return (
    <main>
      <Title>Montaż trawy syntetycznej - Grassit</Title>
      <Meta name="description" content="Profesjonalny montaż sztucznej trawy – przygotowanie podłoża, układanie i wykończenie." />
      <BackArrow />
      <InstallationPage />
    </main>
  );
};
