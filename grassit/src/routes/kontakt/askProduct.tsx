import { ContatUsContainer } from "~/components/Containers/ContatUsContainer/ContatUsContainer";
import { sendContactEmail } from "~/utils/sendMail";
import { OnSubmitOrderForm } from "~/utils/types";

const AskProduct = () => {
  return (
    <ContatUsContainer
      onSubmit={async (data: OnSubmitOrderForm) => {
        try {
          const res = await sendContactEmail(data);
          if (!res.ok) throw new Error(res.error || "Błąd wysyłki");
          alert("Dziękujemy! Formularz został wysłany.");
        } catch (e: any) {
          console.error(e);
          alert("Nie udało się wysłać formularza.");
        }
      }}
    />
  );
};

export default AskProduct;
