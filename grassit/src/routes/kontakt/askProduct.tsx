import { Meta, Title } from "@solidjs/meta";
import { BackArrow } from "~/components/BackArrow/BackArrow";
import { ContatUsContainer } from "~/components/Containers/ContatUsContainer/ContatUsContainer";
import { resolveSite } from "~/config/site";
import { sendEmailWithToast } from "~/utils/sendMail";
import { t } from "~/utils/translations";
import { OnSubmitOrderForm } from "~/utils/types";

const AskProduct = () => {
  const site = resolveSite();

  return (
    <main>
      <Title>{t("seo.contactTitle")}</Title>
      <Meta name="description" content={t("seo.contactDescription")} />
      <BackArrow />
      <ContatUsContainer
        title={t("contactPage.title")}
        onSubmit={async (data: OnSubmitOrderForm) => {
          return await sendEmailWithToast(data, t("toast.success"));
        }}
        text={t("contactPage.text", { phone: site.phone })}
      />
    </main>
  );
};

export default AskProduct;
