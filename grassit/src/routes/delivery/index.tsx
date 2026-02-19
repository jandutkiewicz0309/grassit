import { Meta, Title } from "@solidjs/meta";
import { BackArrow } from "~/components/BackArrow/BackArrow";
import { DeliveryPage } from "~/components/Delivery/Delivery";

export const delivery = () => {
  return (
    <main>
      <Title>Dostawa - Grassit</Title>
      <Meta name="description" content="Szybka i bezpieczna dostawa sztucznej trawy Grassit na terenie całej Polski." />
      <BackArrow />
      <DeliveryPage />
    </main>
  );
};
