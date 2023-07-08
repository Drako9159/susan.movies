import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const DB_IPTV = path.join(process.cwd(), "./db/iptv.json");

export async function readIPTV() {
  const iptvList = await readFile(DB_IPTV, "utf-8");
  return JSON.parse(iptvList);
}

export async function readOneIPTV(id: string) {
  const iptvList = await readIPTV();
  return iptvList.find((e: any) => {
    return e.id === id;
  });
}

export async function deleteOneIPTV(id: string) {
  const iptvList = await readIPTV();
  const filtered = iptvList.filter((e: any) => {
    return e.id !== id;
  });
  await writeFile(DB_IPTV, JSON.stringify(filtered, null, 2), "utf-8");
}

export async function updateOneIPTV(id: string, element: object) {
  const iptvList = await readIPTV();
  const filtered = iptvList.filter((e: any) => {
    return e.id !== id;
  });
  let data: object[] = [...filtered];
  data.push(element);
  await writeFile(DB_IPTV, JSON.stringify(data, null, 2), "utf-8");
}
