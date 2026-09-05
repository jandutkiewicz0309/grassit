// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server";

/**
 * With `ssr: false` + the static preset this document is rendered once at build
 * time and shipped as the single index.html for all three domains. Anything
 * locale- or market-specific therefore has to be set at runtime:
 *  - `<html lang>`      -> effect in src/app.tsx
 *  - description / OG   -> src/components/Seo/Seo.tsx and the route components
 *
 * Keep this head free of those tags; a hard-coded copy here would sit alongside
 * the one @solidjs/meta injects and contradict it.
 */
export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang="pl">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/Grassit_logo-monochrom_black.png" />
          {assets}
        </head>
        <body>
          <div id="app">{children}</div>
          {scripts}
        </body>
      </html>
    )}
  />
));
