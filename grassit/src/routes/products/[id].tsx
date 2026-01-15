// routes/produkty/[id].tsx
import { useNavigate, useParams } from "@solidjs/router";
import { createMemo, Show } from "solid-js";
import { DetailedProduct } from "~/components/DetailedProduct/DetailedProduct";
import ProductNotFound from "~/components/ProductNotFound/ProductNotFound";
import data from "~/data/product.json";

export default function detailedProduct() {
  const params = useParams();
  const navigate = useNavigate();
  const product = createMemo(() =>
    data.products.find((p) => p.id === params.id)
  );

  return (
    <>
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
          onAskClick={() => navigate("/kontakt")}
          onAskClickAskProduct={(id: string) => navigate(`/zamów-próbkę/${id}`)}
        />
      </Show>
    </>
  );
}
