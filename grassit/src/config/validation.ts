import type { Country } from "./site";

export interface CountryValidation {
  /** Postcode shape accepted for this market. */
  zip: RegExp;
  /** Example rendered in the error message, e.g. `Format 12-345`. */
  zipExample: string;
  /** Business tax identifier; `undefined` means "accept anything non-empty". */
  isValidVatId: (raw: string) => boolean;
}

/** Polish NIP: 10 digits with a mod-11 checksum. */
function isValidNip(raw: string): boolean {
  const nip = raw.replace(/\D/g, "");
  if (nip.length !== 10) return false;
  const weights = [6, 5, 7, 2, 3, 4, 5, 6, 7];
  const sum = weights.reduce((acc, weight, i) => acc + weight * Number(nip[i]), 0);
  return sum % 11 === Number(nip[9]);
}

/** German USt-IdNr.: `DE` + 9 digits. The bare 9 digits are accepted too. */
function isValidUstId(raw: string): boolean {
  return /^(DE)?\d{9}$/i.test(raw.replace(/[\s.-]/g, ""));
}

/** Swiss UID: `CHE` + 9 digits, optionally suffixed with MWST / TVA / IVA. */
function isValidUid(raw: string): boolean {
  return /^(CHE)?\d{9}(MWST|TVA|IVA)?$/i.test(raw.replace(/[\s.-]/g, ""));
}

export const COUNTRY_VALIDATION: Record<Country, CountryValidation> = {
  PL: {
    zip: /^\d{2}-\d{3}$/,
    zipExample: "12-345",
    isValidVatId: isValidNip,
  },
  DE: {
    zip: /^\d{5}$/,
    zipExample: "12345",
    isValidVatId: isValidUstId,
  },
  CH: {
    zip: /^\d{4}$/,
    zipExample: "1234",
    isValidVatId: isValidUid,
  },
};
