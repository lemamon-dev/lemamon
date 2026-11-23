import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { beforeAll, describe, expect, it } from "vitest";

import ServiceView from "@/views/ServiceView.astro";
import { getSection, tDynamic } from "@/i18n";

let container: AstroContainer;
beforeAll(async () => {
  container = await AstroContainer.create();
});

const LOCALES = ["pt", "en", "es"] as const;

describe("ServiceView — price_factors vazio esconde título e container", () => {
  it("modernização: nenhum idioma renderiza o título nem o container do bloco price_factors", async () => {
    for (const locale of LOCALES) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const html = await container.renderToString(ServiceView as any, { props: { locale, service: "modernizacao" } });
      const title = tDynamic(locale, "services.modernizacao.price_factors_title");
      expect(html, `${locale}: título órfão`).not.toContain(title);
      expect(html, `${locale}: container o-que-pesa-no-preco não deve existir`).not.toMatch(/id="o-que-pesa-no-preco"/);
    }
  });

  it("modernização: fonte da verdade do i18n confirma que o array está vazio nos 3 idiomas", () => {
    for (const locale of LOCALES) {
      const factors = getSection(locale, "services.modernizacao.price_factors" as const) as readonly unknown[];
      expect(factors.length, locale).toBe(0);
    }
  });
});
