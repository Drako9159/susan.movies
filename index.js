import { chromium } from "@playwright/test";

async function run() {
  // Inicializar Playwright y abrir una instancia de Chromium
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  // Navegar a una página web
  await page.goto("https://example.com");

  await page.waitForTimeout(5000);

  const button = await page.$("button");
  await button.check()

  // Tomar una captura de pantalla de la página
  await page.screenshot({ path: "screenshot.png", fullPage: true });

  // Cerrar el navegador
  await browser.close();
}

run();
