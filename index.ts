import app from "./src/app";
async function main() {
  app.listen(app.get("port"));
  console.log(`[server]: running on port ${app.get("port")}`);
}

main();
