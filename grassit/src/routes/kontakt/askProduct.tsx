import { Meta, Title } from "@solidjs/meta";
import { BackArrow } from "~/components/BackArrow/BackArrow";
import { ContatUsContainer } from "~/components/Containers/ContatUsContainer/ContatUsContainer";
import { sendEmailWithToast } from "~/utils/sendMail";
import { OnSubmitOrderForm } from "~/utils/types";

const AskProduct = () => {
  return (
    <main>
      <Title>Kontakt - Grassit</Title>
      <Meta name="description" content="Skontaktuj się z nami – doradztwo, wycena i zamówienia sztucznej trawy Grassit." />
      <BackArrow />
      <ContatUsContainer
        title="Skontaktuj się"
        onSubmit={async (data: OnSubmitOrderForm) => {
          return await sendEmailWithToast(
            data,
            "Dziękujemy! Formularz został wysłany.",
          );
        }}
        text="Uzupełnij formularz kontaktowy a nasz pracownik skontaktuje się z Tobą najszybciej jak to możliwe. Jeżeli potrzebujesz pilnej informacji, zapraszamy do kontaktu telefonicznego pod numerem (+48) 515 401 178."
      />
    </main>
  );
};

export default AskProduct;
