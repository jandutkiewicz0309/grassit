import { MetaProvider, Title } from "@solidjs/meta";
import { Route, Router, RouteSectionProps } from "@solidjs/router";
import {
  createSignal,
  For,
  onCleanup,
  onMount,
  Show,
  Suspense,
} from "solid-js";
import { Toaster } from "solid-toast";
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
import { MobileHeader } from "./components/Header/MobileHeader/MobileHeader";
import { Installation } from "./routes/installation";
import { consulting } from "./routes/consulting";
import { delivery } from "./routes/delivery";
import About from "./routes/about";

const Layout = (props: RouteSectionProps) => {
  const [isMobileView, setIsMobileView] = createSignal(false);

  const handleResize = () => setIsMobileView(window.innerWidth < 1200);

  onMount(() => {
    if (typeof window !== "undefined") {
      handleResize();
      window.addEventListener("resize", handleResize);
    }
  });

  onCleanup(() => {
    if (typeof window !== "undefined") {
      window.removeEventListener("resize", handleResize);
    }
  });

  return (
    <>
      <Toaster
        position="top-center"
        gutter={12}
        toastOptions={{
          duration: 4000,
          style: {
            "border-radius": "8px",
            padding: "14px 20px",
            "font-size": "14px",
            "line-height": "20px",
            "box-shadow": "0 4px 12px rgba(0, 0, 0, 0.15)",
          },
        }}
      />
      {/* <TopInfo email="biuro@grassit.pl" phone="+48 515 401 178" /> */}

      <Show when={isMobileView()} fallback={<Header />}>
        <MobileHeader />
      </Show>
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
    path: "/montaz",
    componnet: Installation,
  },
  {
    path: "/doradztwo",
    componnet: consulting,
  },
  {
    path: "/dostawa",
    componnet: delivery,
  },
  {
    path: "/o-nas",
    componnet: About,
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
