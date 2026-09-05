import { MetaProvider, Title } from "@solidjs/meta";
import {
  Route,
  Router,
  RouteSectionProps,
  useLocation,
  useNavigate,
} from "@solidjs/router";
import {
  Component,
  createEffect,
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
import { GeoBanner } from "./components/GeoBanner/GeoBanner";
import { Header } from "./components/Header/Header";
import { MobileHeader } from "./components/Header/MobileHeader/MobileHeader";
import { Seo } from "./components/Seo/Seo";
import { buildRoutePaths, LEGACY_PATHS, localeFromPath, localePath, matchPath, type RouteKey } from "./config/routes";
import { bcp47, resolveSite } from "./config/site";
import { locale, preferredLocale, syncLocaleFromRoute } from "./utils/translations";

import Home from "./routes";
import AskProductByIdPage from "./routes/askProduct/[id]";
import AskProduct from "./routes/kontakt/askProduct";
import ProductPage from "./routes/products";
import DetailedProductPage from "./routes/products/[id]";
import NotFound from "./routes/404/[...404]";
import { Installation } from "./routes/installation";
import { consulting } from "./routes/consulting";
import { delivery } from "./routes/delivery";
import About from "./routes/about";

const PAGES: Record<RouteKey, Component> = {
  home: Home,
  products: ProductPage,
  product: DetailedProductPage,
  orderSample: AskProductByIdPage,
  contact: AskProduct,
  installation: Installation,
  consulting: consulting,
  delivery: delivery,
  about: About,
};

const site = resolveSite();
const routePaths = buildRoutePaths(site);

/** Sends a pre-rework URL to its current equivalent, preserving the product id. */
const LegacyRedirect = (key: RouteKey): Component => () => {
  const navigate = useNavigate();
  const location = useLocation();

  onMount(() => {
    const current = matchPath(location.pathname, site);
    const target = localePath(key, site.defaultLocale, current?.params, site);
    navigate(target + location.search, { replace: true });
  });

  return null;
};

const Layout = (props: RouteSectionProps) => {
  const [isMobileView, setIsMobileView] = createSignal(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleResize = () => setIsMobileView(window.innerWidth < 1200);

  onMount(() => {
    if (typeof window !== "undefined") {
      handleResize();
      window.addEventListener("resize", handleResize);
    }

    // On a prefix-less URL, honour a language the visitor picked previously.
    // Crawlers have no localStorage, so they never trigger this.
    const current = matchPath(location.pathname, site);
    if (current && current.locale === site.defaultLocale) {
      const preferred = preferredLocale(site);
      if (preferred && preferred !== site.defaultLocale) {
        navigate(localePath(current.key, preferred, current.params, site) + location.search, {
          replace: true,
        });
      }
    }
  });

  onCleanup(() => {
    if (typeof window !== "undefined") {
      window.removeEventListener("resize", handleResize);
    }
  });

  // The URL is the source of truth for the active language.
  createEffect(() => {
    syncLocaleFromRoute(localeFromPath(location.pathname, site));
  });

  createEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = bcp47(locale(), site.country);
    }
  });

  return (
    <>
      <Seo />
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
      <GeoBanner />

      <Show when={isMobileView()} fallback={<Header />}>
        <MobileHeader />
      </Show>
      <Suspense>{props.children}</Suspense>
      <Footer />
    </>
  );
};

export default function App() {
  return (
    <MetaProvider>
      <Title>Grassit</Title>
      <Router root={Layout}>
        <For each={routePaths}>
          {(route) => <Route path={route.path} component={PAGES[route.key]} />}
        </For>
        <For each={LEGACY_PATHS}>
          {(legacy) => <Route path={legacy.path} component={LegacyRedirect(legacy.key)} />}
        </For>
        <Route path="**" component={NotFound} />
      </Router>
    </MetaProvider>
  );
}
