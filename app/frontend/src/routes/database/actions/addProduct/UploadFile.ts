import { type Action, fail } from "@sveltejs/kit";
import { processFiles } from "../../FileProcessor";
import { cmp } from "$lib/utils";
import { env } from "$env/dynamic/public";

const addProductFile: Action = async ({ request, locals }) => {
  const debug = env.PUBLIC_DEBUG === "true";
  const data = await request.formData();
  const files = data.getAll('files') as File[];
  const visibleLocations: string[] = data.get("locations")?.toString().split(',') || [];
  const system_id_location: string = data.get("system_id_location")?.toString() || "";
  const isFirstRowHeaders: boolean = data.get("isFirstRowHeaders") === "yes";
  const processedFiles = await processFiles(files, (data.get("headers")?.toString().split(",") ?? []), isFirstRowHeaders);
  console.log(processedFiles);
  const addProductResults = await Promise.allSettled(processedFiles.map(async segment => {
    if (segment.status !== "fulfilled") return [];
    const response = Promise.allSettled(segment.value.map(async item => {
      return await locals.pb.collection("product").create(
        {
          ...item,
          system_id: null,
          brand: locals.brands.filter(brand => cmp(brand.name, item.brand))[0]?.id,
          vendor: locals.vendors.filter(vendor => cmp(vendor.vendor, item.vendor))[0]?.id,
          archived: false,
          notes: ""
        },
        { $autoCancel: false }
      )
    }));
    
    return (await response).flatMap(item => {
      segment.value.map()
    })
  }));

  const createSystemIDResults = system_id_location !== "" && await Promise.allSettled(addProductResults.map(async segment => {
    if (segment.status === "rejected") return [];
    return segment.value.map(item => {
      return locals.pb.collection("product_system_id").create(
        {
          item: "",
          system_id: "",
          location: system_id_location
        },
        { $autoCancel: false }
      )
    });
  }));

  return fail(400, { message: "Here we go again!" });
};

export default addProductFile;
