import { Router, RouteSectionProps } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import { MetaProvider, Title } from "@solidjs/meta";
import "./app.css";
import { Header } from "./components/Header/Header";
import { TopInfo } from "./components/TopInfo/TopInfo";

const Layout = (props: RouteSectionProps) => {
  return (
    <>
      <TopInfo email="test@gmail.com" phone="888 999 111" />
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
