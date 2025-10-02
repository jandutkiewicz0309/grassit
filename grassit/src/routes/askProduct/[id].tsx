import { useParams } from "@solidjs/router";
import { createMemo, Show } from "solid-js";
import AskFormContainer from "~/components/Containers/AskFormContainer/AskFormContainer";
import { sendContactEmail } from "~/utils/sendMail";

import data from "~/data/product.json";
import { Product } from "~/utils/interfaces";
import { OnSubmitOrderForm } from "~/utils/types";

export default function AskProductByIdPage() {
  const params = useParams();
  const product = createMemo<Product | undefined>(() => {
    const all = (data as { products: Product[] }).products;
    return all.find((p) => p.id === params.id);
  });

  return (
    <main style="display:grid; gap:16px; padding: 80px 32px;">
      <Show
        when={product()}
        fallback={<div style="padding:32px">Nie znaleziono produktu.</div>}
      >
        <h1>Poproś o próbkę</h1>
        <p>
          Proszę wypełnić poniższy formularz, a przedstawiciel skontaktuje się z
          Państwem.
        </p>

        <AskFormContainer
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
    </main>
  );
}
