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
  /** Business tax id - NIP in PL, USt-IdNr. in DE, UID in CH. */
  nip?: string;
  notes?: string;
  productId?: string;
  productName?: string;
  sku?: string;
  /** Path to the product data sheet, linked from the confirmation e-mail. */
  technicalCard?: string;
}
