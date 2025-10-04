import { useParams } from "@solidjs/router";
import { createMemo, Show } from "solid-js";
import OrderProductSample from "~/components/Containers/OrderProductSample/OrderProductSample";
import ProductNotFound from "~/components/ProductNotFound/ProductNotFound";
import data from "~/data/product.json";
import { Product } from "~/utils/interfaces";
import { sendContactEmail } from "~/utils/sendMail";
import { OnSubmitOrderForm } from "~/utils/types";

export default function AskProductByIdPage() {
  const params = useParams();
  const product = createMemo<Product | undefined>(() => {
    const all = (data as { products: Product[] }).products;
    return all.find((p) => p.id === params.id);
  });

  return (
    <Show when={product()} fallback={<ProductNotFound />}>
      <OrderProductSample
        productName={product()!.nameProduct}
        productImg={product()!.images?.[0] ?? product()!.img}
        catalogNumber={product()!.details.catalogNumber}
        producer={product()!.details.producer}
        price={product()!.price}
        description={product()!.description}
        productId={product()!.id}
        onSubmit={async (payload: OnSubmitOrderForm) => {
          await sendContactEmail(payload);
          alert("Dziękujemy! Wysłaliśmy zapytanie o produkt.");
        }}
      />
    </Show>
  );
}
