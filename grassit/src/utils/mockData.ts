import { IProductItem } from "~/components/Product/ProductItem/ProductItem";
import testImg from "../components/static/png/testImg.png";

export const productData: Omit<IProductItem, "onClick">[] = [
  {
    id: "1",
    img: testImg,
    nameProduct: "PlayTurf 50",
    price: "15",
    description: "Trwała, amortyzowana...",
  },
  {
    id: "2",
    img: testImg,
    nameProduct: "PlayTurf 40",
    price: "30",
    description: "Trwała, amortyzowana...",
  },
  {
    id: "3",
    img: testImg,
    nameProduct: "PlayTurf 40",
    price: "40",
    description: "Trwała, amortyzowana...",
  },
  // ...
];
