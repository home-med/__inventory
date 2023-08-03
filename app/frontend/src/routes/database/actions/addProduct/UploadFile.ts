import type { Action } from "@sveltejs/kit";
import { importRecordsInParallel, processFiles } from "../../database_utils";
import { cmp } from "$lib/utils";
import { env } from "$env/dynamic/public";
import addProductSingle from "./Single";

const addProductFile: Action = async ({ request, locals }) => {
  const debug = env.PUBLIC_DEBUG === "true";
  const data = await request.formData();
  const files = data.getAll('files') as File[];
  const visibleLocations: string[] = data.get("locations")?.toString().split(',') || [];
  const system_id_location: string = data.get("system_id_location")?.toString() || "";
  const isFirstRowHeaders: boolean = data.get("isFirstRowHeaders") === "yes";
  const processedFiles = await processFiles(files, (data.get("headers")?.toString().split(",") ?? []), isFirstRowHeaders);
  const items = processedFiles.flatMap(item => {
    if (item.status === "rejected") return null;
    return item.value;
  }).filter(item => item);

  const addProductResults: Record<string, string>[] = (await importRecordsInParallel(
    items.map((item) => ({
      ...item,
      // system_id: null,
      brand: locals.brands.filter(brand => cmp(brand.name, item.brand))[0]?.id,
      vendor: locals.vendors.filter(vendor => cmp(vendor.vendor, item.vendor))[0]?.id,
      archived: false,
      notes: "",
    })),
    locals.pb,
    "product"
  )).map((item: any) => {
    if (item.status === "rejected") return null;
    return item.value;
  }).filter((item: any) => item);

  console.log("addProductResults", addProductResults);

  return { message: "Here we go again!" };
};

export default addProductFile;
