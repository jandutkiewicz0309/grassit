import { Title } from "@solidjs/meta";
import { ProductContainer } from "~/components/Product/ProductContainer/ProductContainer";
import { productData } from "~/utils/mockData";

const product = () => {
  return (
    <div>
      <Title>Produkty</Title>
      <ProductContainer productData={productData} />
    </div>
  );
};

export default product;
