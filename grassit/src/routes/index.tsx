// src/routes/index.tsx

import { ProductItem } from "~/components/Product/ProductItem/ProductItem";
import testImg from "../../src/components/static/png/testImg.png";
import { Checkbox } from "~/components/Input/CheckBox/CheckBox";
import { Category, FilterComponnet } from "~/components/Product/Filter/Filter";
import { createSignal } from "solid-js";
import { ProductContainer } from "~/components/Product/ProductContainer/ProductContainer";
import { productData } from "~/utils/mockData";
export default function Home() {
  return (
    <main>
      <ProductContainer productData={productData} />
    </main>
  );
}
