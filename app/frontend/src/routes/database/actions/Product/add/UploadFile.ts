import { processRecordsInParrel, processFiles } from "../../../database_utils";
import { cmp } from "$lib/utils";
import type { Action } from "@sveltejs/kit";

const addProductFile: Action = async ({ request, locals }) => {
  const data = await request.formData();
  const files: File[] = data.getAll('files') as File[] ?? [];
  let visibleLocations: string[] = (data.get("locations") ?? null)?.toString().split(",") ?? [];
  const system_id_location: string = data.get("system_id_location")?.toString() || "";
  const isFirstRowHeaders: boolean = data.get("isFirstRowHeaders") === "yes";
  const processedFiles = await processFiles(files, (data.get("headers")?.toString().split(",") ?? []), isFirstRowHeaders);
  const items = processedFiles.flatMap(item => {
    if (item.status === "rejected") return null;
    return item.value;
  })
    .filter(item => item)
    .map(item => {
      const orig_sys_id = item.system_id
      return {
        ...item,
        orig_sys_id,
        system_id: null,
        brand: locals.brands.filter(brand => cmp(brand.name, item.brand))[0]?.id || "",
        vendor: locals.vendors.filter(vendor => cmp(vendor.vendor, item.vendor))[0]?.id || "",
        archived: false,
        notes: "",
      }
    });

  console.log("Creating product data")
  await locals.pb.collection("status").update("z1ikx1sue58s2kn", { "currentState": "Creating product initial data" });
  const addProductResults: Record<string, string>[] = (await processRecordsInParrel(
    items,
    async (record: any) => {
      return [record, await locals.pb.collection('product').create(record, { $autoCancel: false })];
    },
  )).map((result: PromiseSettledResult<Record<any, any>>) => {
    if (result.status === "fulfilled") {
      return { ...result.value[1], orig_sys_id: result.value[0].orig_sys_id };
    }
  }).filter(Boolean);

  let count = 0;
  let borked: Record<string, string>[] = [];

  const setSystemIDs = addProductResults.map((product: Record<string, string>) => ({
    item: product.id,
    system_id: product.orig_sys_id,
    location: system_id_location
  }));

  console.log("Creating product_system_id data")
  await locals.pb.collection("status").update("z1ikx1sue58s2kn", { "currentState": "Creating system ID map data" });
  const systemIDs = (await processRecordsInParrel(
    setSystemIDs,
    async (record: any) => {
      return await locals.pb.collection('product_system_id').create(record, { $autoCancel: false });
    },
  )).flatMap((result: PromiseSettledResult<Record<any, any>>) => {
    if (result.status === "fulfilled") {
      return result.value;
    }
  });

  if (visibleLocations[0] !== "") {
    console.log("Setting up visibility")
    await locals.pb.collection("status").update("z1ikx1sue58s2kn", { "currentState": "Creating product visibility map data" });
    const setVisibility = addProductResults.reduce(
      (acc: Record<string, any>[], cv) => {
        visibleLocations.forEach(location => {
          acc.push({
            item: cv.id,
            location,
            eCom: true,
            archived: false,
          })
        });
        return acc;
      },
      []
    );

    console.log("Creating product visibility data")
    await locals.pb.collection("status").update("z1ikx1sue58s2kn", { "currentState": "Creating product visibility map data" });
    await processRecordsInParrel(
      setVisibility,
      async (record: any) => {
        return await locals.pb.collection("product_visibility").create(record, { $autoCancel: false })
      }
    );
  }

  await locals.pb.collection("status").update("z1ikx1sue58s2kn", { "currentState": "Idle" }, { $autoCancel: false });
  return { message: "Here we go again!" };

};

export default addProductFile;
