import { useNavigate } from "@solidjs/router";
import { BackArrow } from "~/components/BackArrow/BackArrow";
import { CategoryType } from "~/components/Product/Filter/Filter";
import { ProductContainer } from "~/components/Product/ProductContainer/ProductContainer";
import data from "~/data/product.json";

const ProductPage = () => {
  const navigate = useNavigate();

  const products = data.products.filter((p) => !(p as any).hidden).map((p) => ({
    id: p.id,
    img: p.img,
    nameProduct: p.nameProduct,
    price: p.price,
    description: p.description,
    badge: "badge" in p ? (p as any).badge : undefined,
    category: p.category as CategoryType,
    subcategory: "subcategory" in p ? (p as any).subcategory : undefined,
    onClick: (id: string) => navigate(`/produkty/${id}`),
  }));

  return (
    <div>
      <BackArrow />
      <ProductContainer productData={products} />
    </div>
  );
};

export default ProductPage;