import { chromium } from "@playwright/test";

async function run() {
  // Inicializar Playwright y abrir una instancia de Chromium
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://example.com");

  await page.waitForTimeout(5000);

  const button = await page.$("button");
  await button.check()

  await page.screenshot({ path: "screenshot.png", fullPage: true });

  await browser.close();
}

run();
