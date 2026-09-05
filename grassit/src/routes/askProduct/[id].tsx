import { Meta, Title } from "@solidjs/meta";
import { useParams } from "@solidjs/router";
import { createMemo, Show } from "solid-js";
import { BackArrow } from "~/components/BackArrow/BackArrow";
import OrderProductSample from "~/components/Containers/OrderProductSample/OrderProductSample";
import ProductNotFound from "~/components/ProductNotFound/ProductNotFound";
import { findProduct } from "~/data/products";
import { sendEmailWithToast } from "~/utils/sendMail";
import { t } from "~/utils/translations";
import { OnSubmitOrderForm } from "~/utils/types";

export default function AskProductByIdPage() {
  const params = useParams();
  const product = createMemo(() => findProduct(params.id));

  return (
    <>
      <Show when={product()}>
        <Title>{t("seo.orderSampleTitle", { name: product()!.nameProduct })}</Title>
        <Meta
          name="description"
          content={t("seo.orderSampleDescription", { name: product()!.nameProduct })}
        />
      </Show>
      <BackArrow />
      <Show when={product()} fallback={<ProductNotFound />}>
        <OrderProductSample
          product={product()!}
          onSubmit={async (payload: OnSubmitOrderForm) => {
            return await sendEmailWithToast(payload, t("toast.successProduct"));
          }}
        />
      </Show>
    </>
  );
}
