export interface IContactUsFields {
  email: string;
  phoneNumber: string;
  name: string;
  lastName: string;
  message?: string;
}

export interface IAskProductFields {
  email: string;
  phoneNumber: string;
  name: string;
  lastName: string;
  street: string;
  zip: string;
  city: string;
  company?: string;
  nip?: string;
  notes?: string;
  productId?: string;
  productName?: string;
  sku?: string;
}

export interface ProductDetails {
  producer: string;
  productDescription: string;
  catalogNumber: string;
  productHeight: string;
  productWeight: string;
  productMaterial: string;
  UVResistant: string;
}
export interface Product {
  id: string;
  img: string;
  images?: string[];
  nameProduct: string;
  price: string;
  description: string;
  details: ProductDetails;
}
