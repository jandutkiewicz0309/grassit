// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server";

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang="pl">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta
            name="description"
            content="Idealna dla ogrodów, obiektów sportowych i przestrzeni komercyjnych. Oferujemy profesjonalny montaż i gwarantujemy trwałość na lata"
          />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="Grassit" />
          <meta property="og:locale" content="pl_PL" />
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
