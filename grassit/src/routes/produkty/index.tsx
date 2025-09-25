import { Title } from "@solidjs/meta";
import { useNavigate } from "@solidjs/router";
import { ProductContainer } from "~/components/Product/ProductContainer/ProductContainer";
import data from "~/data/product.json";

const product = () => {
  const navigate = useNavigate();

  const products = data.products.map((p) => ({
    id: p.id,
    img: p.img,
    nameProduct: p.nameProduct,
    price: p.price,
    description: p.description,
    onClick: (id: string) => navigate(`/produkty/${id}`),
  }));
  return (
    <div>
      <Title>test</Title>
      <ProductContainer productData={products} />
    </div>
  );
};

export default product;
