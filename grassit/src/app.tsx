import { Router, RouteSectionProps } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import { MetaProvider } from "@solidjs/meta";
import "./app.css";
import { Header } from "./components/Header/Header";

const Layout = (props: RouteSectionProps) => {
  return (
    <>
      <Header />
      <Suspense>{props.children}</Suspense>
    </>
  );
};

export default function App() {
  return (
    <MetaProvider>
      <Router root={Layout}>
        <FileRoutes />
      </Router>
    </MetaProvider>
  );
}
