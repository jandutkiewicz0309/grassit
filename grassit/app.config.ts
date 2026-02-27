import { defineConfig } from "@solidjs/start/config";

export default defineConfig({
  server: {
    preset: "static",
    prerender: {
      routes: [
        "/",
        "/produkty",
        "/kontakt",
        "/montaz",
        "/doradztwo",
        "/dostawa",
        "/o-nas",
        "/produkty/amalfi",
        "/produkty/genewa",
        "/produkty/lagos",
        "/produkty/santiago",
        "/produkty/sofia",
        "/produkty/santa_cruz",
        "/produkty/vienna",
        "/produkty/wenecja",
        "/produkty/Football_Pro_50",
        "/produkty/Football_Nosandy",
        "/produkty/Padel_Kit_Common",
        "/produkty/Padel_Kit_pro_blue",
        "/produkty/Padel_Kit_pro_green",
        "/produkty/golf_club_pro",
        "/produkty/golf_club_27",
        "/produkty/golf_turf_12",
      ],
    },
  },
  ssr: true,
  vite: {
    build: {
      rollupOptions: {
        output: {
          assetFileNames: (info) => {
            if (info.name?.endsWith(".woff2")) {
              return "assets/fonts/[name][extname]";
            }
            return "assets/[name]-[hash][extname]";
          },
        },
      },
    },
  },
});