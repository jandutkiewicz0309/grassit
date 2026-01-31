import { useNavigate, useParams } from "@solidjs/router";
import { createMemo, Show } from "solid-js";
import { BackArrow } from "~/components/BackArrow/BackArrow";
import { DetailedProduct } from "~/components/DetailedProduct/DetailedProduct";
import ProductNotFound from "~/components/ProductNotFound/ProductNotFound";
import data from "~/data/product.json";

export default function detailedProduct() {
  const params = useParams();
  const navigate = useNavigate();
  const product = createMemo(() =>
    data.products.find((p) => p.id === params.id)
  );

  const similarProducts = createMemo(() => {
    const currentProduct = product();
    if (!currentProduct) return [];

    return data.products
      .filter(
        (p) =>
          p.category === currentProduct.category && p.id !== currentProduct.id
      )
      .slice(0, 3)
      .map((p) => ({
        id: p.id,
        img: p.img,
        nameProduct: p.nameProduct,
        price: p.price,
      }));
  });

  return (
    <>
      <BackArrow />
      <Show when={product()} fallback={<ProductNotFound />}>
        <DetailedProduct
          id={product()!.id}
          nameProduct={product()!.nameProduct}
          price={product()!.price}
          productDescription={product()!.details.productDescription}
          producer={product()!.details.producer}
          catalogNumber={product()!.details.catalogNumber}
          productHeight={product()!.details.productHeight}
          productWeight={product()!.details.productWeight}
          productMaterial={product()!.details.productMaterial}
          UVResistant={product()!.details.UVResistant}
          images={product()!.images ?? [product()!.img]}
          technicalCard={product()!.technicalCard}
          similarProducts={similarProducts()}
          onAskClick={() => navigate("/kontakt")}
          onAskClickAskProduct={(id: string) => navigate(`/zamów-próbkę/${id}`)}
          onSimilarProductClick={(id: string) => navigate(`/produkty/${id}`)}
        />
      </Show>
    </>
  );
}
