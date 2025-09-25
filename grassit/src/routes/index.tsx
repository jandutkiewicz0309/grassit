// src/routes/index.tsx

import { DetailedProduct } from "~/components/DetailedProduct/DetailedProduct";
import data from "~/data/product.json";
export default function Home() {
  return (
    <main>
      <DetailedProduct
        UVResistant="Tak"
        catalogNumber="121233"
        nameProduct="tesa"
        price="23"
        producer="Grassit"
        productDescription="Specyfikacja, parametry techniczne i kluczowe informacje."
        productHeight="32"
        productMaterial="Polityen"
        productWeight="2123"
        images={[]}
      />
    </main>
  );
}
