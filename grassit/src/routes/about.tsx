import { Meta, Title } from "@solidjs/meta";
import AboutHeroSection from "~/components/Containers/AboutHeroSection/AboutHeroSection";
import { t } from "~/utils/translations";

export default function About() {
  return (
    <main>
      <Title>{t("seo.aboutTitle")}</Title>
      <Meta name="description" content={t("seo.aboutDescription")} />
      <AboutHeroSection />
    </main>
  );
}
