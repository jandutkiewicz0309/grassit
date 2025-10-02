// src/routes/index.tsx

import Categories from "~/components/Containers/MainPageContainer/Category/Category";
import Faq from "~/components/Containers/MainPageContainer/FAQ/Faq";
import Hero from "~/components/Containers/MainPageContainer/Hero/Hero";
import Sustainability from "~/components/Containers/MainPageContainer/Sustainability/Sustainability";
import Why from "~/components/Containers/MainPageContainer/Why/Why";
import { DetailedProduct } from "~/components/DetailedProduct/DetailedProduct";
import data from "~/data/product.json";
export default function Home() {
  return (
    <main>
      <Hero />
      <Categories />
      <Why />
      <Sustainability />
      <Faq />
    </main>
  );
}
