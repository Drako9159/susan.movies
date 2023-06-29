import { chromium } from "@playwright/test";

async function run() {
  // Inicializar Playwright y abrir una instancia de Chromium
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  // Navegar a una página web
  await page.goto("https://w4.cuevana3.ai/67762/fast-x");

  await page.waitForTimeout(5000);

  const button = await page.$("button");
  await button.check()

  // Tomar una captura de pantalla de la página
  await page.screenshot({ path: "screenshot.png", fullPage: true });

  // Cerrar el navegador
  await browser.close();
}

run();
