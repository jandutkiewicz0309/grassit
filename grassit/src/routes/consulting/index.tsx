import { Meta, Title } from "@solidjs/meta";
import { BackArrow } from "~/components/BackArrow/BackArrow";
import { ConsultingPage } from "~/components/Consulting/Consulting";
import { t } from "~/utils/translations";

export const consulting = () => {
  return (
    <main>
      <Title>{t("seo.consultingTitle")}</Title>
      <Meta name="description" content={t("seo.consultingDescription")} />
      <BackArrow />
      <ConsultingPage />
    </main>
  );
};
