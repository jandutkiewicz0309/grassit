import { Meta, Title } from "@solidjs/meta";
import { useNavigate, useParams } from "@solidjs/router";
import { createMemo, Show } from "solid-js";
import { BackArrow } from "~/components/BackArrow/BackArrow";
import { DetailedProduct } from "~/components/DetailedProduct/DetailedProduct";
import ProductNotFound from "~/components/ProductNotFound/ProductNotFound";
import { resolveSite } from "~/config/site";
import { findProduct, similarProducts } from "~/data/products";
import { path, productText, t } from "~/utils/translations";

export default function DetailedProductPage() {
  const params = useParams();
  const navigate = useNavigate();
  const site = resolveSite();

  const product = createMemo(() => findProduct(params.id));
  const similar = createMemo(() => {
    const current = product();
    return current ? similarProducts(current) : [];
  });

  const description = () => productText(product()!.id).description;

  /** OG scrapers reject relative image paths, so they are made absolute. */
  const ogImage = () => {
    const current = product()!;
    return site.origin + (current.images?.[0] ?? current.img);
  };

  return (
    <main>
      <Show when={product()}>
        <Title>{t("seo.productTitle", { name: product()!.nameProduct })}</Title>
        <Meta name="description" content={description()} />
        <Meta
          property="og:title"
          content={t("seo.productTitle", { name: product()!.nameProduct })}
        />
        <Meta property="og:description" content={description()} />
        <Meta property="og:image" content={ogImage()} />
      </Show>
      <BackArrow />
      <Show when={product()} fallback={<ProductNotFound />}>
        <DetailedProduct
          product={product()!}
          similarProducts={similar()}
          onAskClick={() => navigate(path("contact"))}
          onAskClickAskProduct={(id: string) => navigate(path("orderSample", { id }))}
          onSimilarProductClick={(id: string) => navigate(path("product", { id }))}
          onColorVariantClick={(id: string) => navigate(path("product", { id }))}
        />
      </Show>
    </main>
  );
}
