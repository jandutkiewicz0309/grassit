import Categories from "~/components/Containers/MainPageContainer/Category/Category";
import Faq from "~/components/Containers/MainPageContainer/FAQ/Faq";
import Hero from "~/components/Containers/MainPageContainer/Hero/Hero";
import Sustainability from "~/components/Containers/MainPageContainer/Sustainability/Sustainability";
import Why from "~/components/Containers/MainPageContainer/Why/Why";
import "./Home.css";
const Home = () => {
  return (
    <main class="home-container">
      <Hero />
      <div class="categories-container">
        <Categories />
      </div>
      <Why />
      <Sustainability />
      <Faq />
    </main>
  );
};

export default Home;
