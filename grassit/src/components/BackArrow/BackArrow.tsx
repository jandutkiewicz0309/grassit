import { Component } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { t } from "~/utils/translations";
import "./BackArrow.css";

export const BackArrow: Component = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <button class="back-arrow" onClick={handleBack} aria-label={t("common.back")}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M19 12H5" />
        <path d="M12 19l-7-7 7-7" />
      </svg>
    </button>
  );
};
