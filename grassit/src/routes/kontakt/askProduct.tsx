import { BackArrow } from "~/components/BackArrow/BackArrow";
import { ContatUsContainer } from "~/components/Containers/ContatUsContainer/ContatUsContainer";
import { sendEmailWithToast } from "~/utils/sendMail";
import { OnSubmitOrderForm } from "~/utils/types";

const AskProduct = () => {
  return (
    <>
      <BackArrow />
      <ContatUsContainer
        title="Skontaktuj się"
        onSubmit={async (data: OnSubmitOrderForm) => {
          await sendEmailWithToast(
            data,
            "Dziękujemy! Formularz został wysłany.",
          );
        }}
        text="Uzupełnij formularz kontaktowy a nasz pracownik skontaktuje się z Tobą najszybciej jak to możliwe. Jeżeli potrzebujesz pilnej informacji, zapraszamy do kontaktu telefonicznego pod numerem (+48) 515 401 178."
      />
    </>
  );
};

export default AskProduct;
