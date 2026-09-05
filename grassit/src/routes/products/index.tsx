import { Meta, Title } from "@solidjs/meta";
import { useNavigate } from "@solidjs/router";
import { createMemo } from "solid-js";
import { BackArrow } from "~/components/BackArrow/BackArrow";
import { ProductContainer } from "~/components/Product/ProductContainer/ProductContainer";
import { VISIBLE_PRODUCTS } from "~/data/products";
import { path, productText, t } from "~/utils/translations";

const ProductPage = () => {
  const navigate = useNavigate();

  // A memo, not a plain array: the descriptions come from the dictionary and
  // must follow a language change.
  const products = createMemo(() =>
    VISIBLE_PRODUCTS.map((product) => ({
      id: product.id,
      img: product.img,
      nameProduct: product.nameProduct,
      price: product.price,
      description: productText(product.id).description,
      badge: product.badge,
      category: product.category,
      subcategory: product.subcategory,
      onClick: (id: string) => navigate(path("product", { id })),
    })),
  );

  return (
    <main>
      <Title>{t("seo.productsTitle")}</Title>
      <Meta name="description" content={t("seo.productsDescription")} />
      <BackArrow />
      <ProductContainer productData={products()} />
    </main>
  );
};

export default ProductPage;
