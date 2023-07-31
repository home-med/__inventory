import { type Action, fail } from "@sveltejs/kit";
import { processFiles } from "../../FileProcessor";
import { cmp } from "$lib/utils";

const debug = true;

const addProductFile: Action = async ({ request, locals }) => {
  const data = await request.formData();
  const files = data.getAll('files') as File[];
  const visibleLocations: string[] = data.get("locations")?.toString().split(',') || [];
  const isFirstRowHeaders: boolean = data.get("isFirstRowHeaders") === "yes";
  const processedFiles = await processFiles(files, (data.get("headers")?.toString().split(",") ?? []), isFirstRowHeaders);

  const addProductResults = debug && [{status: "rejected", reason: "You are in debug mode", value: []}] || await Promise.allSettled(processedFiles.flatMap(segment => {
    if (segment.status === "fulfilled") {
      return segment.value.map(async item => {
        return locals.pb.collection("product").create(
        {
          ...item,
          system_id: null,
          brand: locals.brands.filter(brand => cmp(brand.name, item.brand))[0]?.id,
          vendor: locals.vendors.filter(vendor => cmp(vendor.vendor, item.vendor))[0]?.id,
          archived:false,
          notes: ""
        },
        {$autoCancel: false}
      )
    })};
  }));

  const addSystemID = () => {

  }

  addProductResults.forEach(result => {
    if (result.status==="fulfilled") {
      console.log("Item Value:", result.value);
    } else {
      console.log("Item Rejection Reason:", result.reason);
    }
  });



  const message = "Nothing wrong, enjoy!"

  return fail(400, {message:"Here we go again!"});
};

export default addProductFile;
