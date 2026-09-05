import { Title } from "@solidjs/meta";
import { t } from "~/utils/translations";
import "./index.css";

const ProductNotFound = () => {
  return (
    <div class="container">
      <Title>{t("notFound.title")}</Title>
      <h1>{t("notFound.productHeading")}</h1>
    </div>
  );
};

export default ProductNotFound;
