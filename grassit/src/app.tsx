import { MetaProvider, Title } from "@solidjs/meta";
import { Route, Router, RouteSectionProps } from "@solidjs/router";
import { For, Suspense } from "solid-js";
import "./app.css";
import Footer from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { TopInfo } from "./components/TopInfo/TopInfo";
import Home from "./routes";
import AskProductByIdPage from "./routes/askProduct/[id]";
import AskProduct from "./routes/kontakt/askProduct";
import product from "./routes/products";
import detailedProduct from "./routes/products/[id]";
import NotFound from "./routes/404/[...404]";

const Layout = (props: RouteSectionProps) => {
  return (
    <>
      <TopInfo email="company@gmail.com" phone="+48 123 456 789" />
      <Header />
      <Suspense>{props.children}</Suspense>
      <Footer />
    </>
  );
};

const routes = [
  {
    path: "/kontakt",
    componnet: AskProduct,
  },
  {
    path: "/produkty",
    componnet: product,
  },
  {
    path: "/produkty/:id",
    componnet: detailedProduct,
  },
  {
    path: "/zamów-próbkę/:id",
    componnet: AskProductByIdPage,
  },
  {
    path: "/",
    componnet: Home,
  },

  {
    path: "**",
    componnet: NotFound,
  },
];

export default function App() {
  return (
    <MetaProvider>
      <Title>Grassit</Title>
      <Router root={Layout}>
        <For each={routes}>
          {(route) => <Route path={route.path} component={route.componnet} />}
        </For>
      </Router>
    </MetaProvider>
  );
}
