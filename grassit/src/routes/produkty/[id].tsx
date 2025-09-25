// routes/produkty/[id].tsx
import { Title } from "@solidjs/meta";
import { useParams } from "@solidjs/router";
import { createEffect, createMemo, Show } from "solid-js";
import { DetailedProduct } from "~/components/DetailedProduct/DetailedProduct";
import data from "~/data/product.json";

export default function detailedProduct() {
  const params = useParams();

  const product = createMemo(() =>
    data.products.find((p) => p.id === params.id)
  );

  return (
    <>
      <Show
        when={product()}
        fallback={<div style="padding:32px">Nie znaleziono produktu.</div>}
      >
        <DetailedProduct
          nameProduct={product()!.nameProduct}
          price={product()!.price}
          productDescription={product()!.description}
          producer={product()!.details.producer}
          catalogNumber={product()!.details.catalogNumber}
          productHeight={product()!.details.productHeight}
          productWeight={product()!.details.productWeight}
          productMaterial={product()!.details.productMaterial}
          UVResistant={product()!.details.UVResistant}
          images={product()!.images ?? [product()!.img]}
        />
      </Show>
    </>
  );
}
