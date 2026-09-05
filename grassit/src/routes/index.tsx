import { Meta, Title } from "@solidjs/meta";
import Home from "~/components/Containers/Home/Home";
import { t } from "~/utils/translations";

export default function HomeRoot() {
  return (
    <>
      <Title>{t("seo.homeTitle")}</Title>
      <Meta name="description" content={t("seo.homeDescription")} />
      <Home />
    </>
  );
}
