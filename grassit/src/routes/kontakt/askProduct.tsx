import { BackArrow } from "~/components/BackArrow/BackArrow";
import { ContatUsContainer } from "~/components/Containers/ContatUsContainer/ContatUsContainer";
import { sendEmailWithToast } from "~/utils/sendMail";
import { OnSubmitOrderForm } from "~/utils/types";

const AskProduct = () => {
  return (
    <>
      <BackArrow />
      <ContatUsContainer
        onSubmit={async (data: OnSubmitOrderForm) => {
          await sendEmailWithToast(data, "Dziękujemy! Formularz został wysłany.");
        }}
      />
    </>
  );
};

export default AskProduct;
