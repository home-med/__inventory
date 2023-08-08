import { fail, type Action } from "@sveltejs/kit";
import { processRecordsInParrel, processFiles } from "../../database_utils";
import { cmp, isUndefinedOrNull } from "$lib/utils";
import { env } from "$env/dynamic/public";
import addProductSingle from "./Single";

const addProductFile: Action = async ({ request, locals }) => {
  const debug = env.PUBLIC_DEBUG === "true";
  const data = await request.formData();
  const errs: Record<string, string>[] = [];
  if (isUndefinedOrNull(data.get("locations"))) errs.push({ "message": "Locations is missing" });
  if (isUndefinedOrNull(data.get("files"))) errs.push({ "message": "Missing files" });
  if (isUndefinedOrNull(data.get("isFirstRowHeaders"))) errs.push({ "message": "Missing is First Row Header" });
  if (isUndefinedOrNull(data.get("system_id_location"))) errs.push({ "message": "Missing System ID Location" });
  if (errs.length > 0) return fail(400, { errors: errs });
  const files: File[] = data.getAll('files') as File[];
  let visibleLocations: string[] = data.get("locations")?.toString().split(",") || [];
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
    })

  const addProductResults: Record<string, string>[] = (await processRecordsInParrel(
    items,
    async (record: any) => {
      return [record, await locals.pb.collection('product').create(record, { $autoCancel: false })];
    },
  )).map((result: PromiseSettledResult<Record<any, any>>) => {
    if (result.status === "fulfilled") {
      return { ...result.value[1], orig_sys_id: result.value[0].orig_sys_id };
    }
  });

  const systemIDs = (await processRecordsInParrel(
    addProductResults.map((product: Record<string, string>) => {
      const data = {
        item: product.id,
        system_id: product.orig_sys_id,
        location: system_id_location
      }
      return data;
    }),
    async (record: any) => {
      return await locals.pb.collection('product_system_id').create(record, { $autoCancel: false });
    },
  )).flatMap((result: PromiseSettledResult<Record<any, any>>) => {
    if (result.status === "fulfilled") {
      return result.value;
    }
  });

  await processRecordsInParrel(
    systemIDs,
    async (record: any) => await locals.pb.collection('product').update(record.item, {
      system_id: [record.id]
    })
  );

  if (visibleLocations[0] !== "") {
    const setVisibility = addProductResults.reduce(
      (acc: Record<string, any>, cv) => {
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
    await processRecordsInParrel(
      setVisibility,
      async (record: any) => {
        return await locals.pb.collection("product_visibility").create(record, { $autoCancel: false })
      }
    );
  } else {
    console.log("No visibility selected")
  }

  return { message: "Here we go again!" };

};

export default addProductFile;
