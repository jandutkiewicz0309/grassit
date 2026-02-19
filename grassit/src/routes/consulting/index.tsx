import { Meta, Title } from "@solidjs/meta";
import { BackArrow } from "~/components/BackArrow/BackArrow";
import { ConsultingPage } from "~/components/Consulting/Consulting";

export const consulting = () => {
  return (
    <main>
      <Title>Doradztwo - Grassit</Title>
      <Meta name="description" content="Bezpłatne doradztwo przy wyborze sztucznej trawy do Twojego projektu." />
      <BackArrow />
      <ConsultingPage />
    </main>
  );
};
