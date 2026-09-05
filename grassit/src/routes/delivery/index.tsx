import { Meta, Title } from "@solidjs/meta";
import { BackArrow } from "~/components/BackArrow/BackArrow";
import { DeliveryPage } from "~/components/Delivery/Delivery";
import { t } from "~/utils/translations";

export const delivery = () => {
  return (
    <main>
      <Title>{t("seo.deliveryTitle")}</Title>
      <Meta name="description" content={t("seo.deliveryDescription")} />
      <BackArrow />
      <DeliveryPage />
    </main>
  );
};
