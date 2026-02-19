import { Meta, Title } from "@solidjs/meta";
import AboutHeroSection from "~/components/Containers/AboutHeroSection/AboutHeroSection";

export default function About() {
  return (
    <main>
      <Title>O nas - Grassit</Title>
      <Meta name="description" content="Poznaj Grassit – producenta sztucznej trawy premium. Nasza historia, wartości i misja." />
      <AboutHeroSection />
    </main>
  );
}
