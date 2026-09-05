import { Component, createSignal, For, createMemo, onMount, createEffect, on } from "solid-js";
import "./ProductGallery.css";
import { t } from "~/utils/translations";

export interface ProductGalleryProps {
  images: string[]; // [main, ...additional]
  alt?: string;
  onImageChange?: (src: string, index: number) => void;
}

export const ProductGallery: Component<ProductGalleryProps> = (props) => {
  const [currentIndex, setCurrentIndex] = createSignal(0);

  createEffect(on(() => props.images, () => {
    setCurrentIndex(0);
  }, { defer: true }));

  const mainSrc = createMemo(() => props.images[currentIndex()] || "");
  const thumbs = createMemo(() =>
    props.images
      .map((src, i) => ({ src, i }))
      .filter((t) => t.i !== currentIndex())
  );

  const swapWith = (thumbIndexInImages: number) => {
    const cur = currentIndex();
    if (thumbIndexInImages === cur) return;
    setCurrentIndex(thumbIndexInImages);
    props.onImageChange?.(props.images[thumbIndexInImages], thumbIndexInImages);
  };

  const go = (dir: -1 | 1) => {
    const n = props.images.length;
    if (!n) return;
    const next = (currentIndex() + dir + n) % n;
    setCurrentIndex(next);
    props.onImageChange?.(props.images[next], next);
  };

  let mainEl!: HTMLImageElement;

  onMount(() => {
    // prefetch miniaturek (opcjonalnie)
    thumbs().forEach((t) => {
      const img = new Image();
      img.src = t.src;
    });
  });

  return (
    <div class="pg">
      <div
        class="pg-main"
        role="img"
        aria-label={props.alt ?? t("product.galleryMain")}
      >
        <img
          ref={mainEl}
          src={mainSrc()}
          alt={props.alt ?? ""}
          class="pg-main-img"
          draggable={false}
          loading="lazy"
        />
      </div>

      <div class="pg-thumbs" role="listbox" aria-label={t("product.galleryThumbs")}>
        <For each={thumbs()}>
          {(t) => (
            <button
              type="button"
              role="option"
              aria-selected={false}
              class="pg-thumb"
              onClick={() => swapWith(t.i)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") swapWith(t.i);
              }}
            >
              <img src={t.src} alt="" class="pg-thumb-img" draggable={false} loading="lazy" />
            </button>
          )}
        </For>
      </div>
    </div>
  );
};
