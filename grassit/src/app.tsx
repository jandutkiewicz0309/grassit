import { Route, Router, RouteSectionProps } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { For, Suspense } from "solid-js";
import { MetaProvider, Title } from "@solidjs/meta";
import "./app.css";
import { Header } from "./components/Header/Header";
import { TopInfo } from "./components/TopInfo/TopInfo";
import product from "./routes/products";
import AskProduct from "./routes/kontakt/askProduct";
import detailedProduct from "./routes/products/[id]";
import AskProductByIdPage from "./routes/askProduct/[id]";

const Layout = (props: RouteSectionProps) => {
  return (
    <>
      <TopInfo email="sdaasdas" phone="322312323" />
      <Header />
      <Suspense>{props.children}</Suspense>
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
