import { Meta, Title } from "@solidjs/meta";
import { BackArrow } from "~/components/BackArrow/BackArrow";
import { InstallationPage } from "~/components/Installation/Installation";
import { t } from "~/utils/translations";

export const Installation = () => {
  return (
    <main>
      <Title>{t("seo.installationTitle")}</Title>
      <Meta name="description" content={t("seo.installationDescription")} />
      <BackArrow />
      <InstallationPage />
    </main>
  );
};
