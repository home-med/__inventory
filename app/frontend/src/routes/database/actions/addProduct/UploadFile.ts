import { pb } from "$lib/client";
import { type Action, fail } from "@sveltejs/kit";

const addProductFile: Action = async ({ request, locals }) => {
  const data = await request.formData();
  const files = data.getAll('files');
  const visibleLocations: string[] = data.get("locations")?.toString().split(',') || [];
  const isFirstRowHeaders: boolean = data.get("isFirstRowHeaders") === "yes";
  const processed = await Promise.allSettled(files.map(async file => {
    if (!(file instanceof File)) return;
    const csvPrep: string[] = (await file.text()).split(/\r?\n/) || [];
    const headersPrep = (isFirstRowHeaders ? csvPrep.shift() : (data.get("headers")?.toString())) || "";

    const headers = headersPrep
      .replaceAll(/^"|"$/g, "")
      .replaceAll(/","/g, "§")
      .split("§")
      .map((header: string) => header
        .trim()
        .replaceAll(/\.?\s/g, "_")
        .replaceAll(/\./g, "")
        .replaceAll(/"+/g, '"')
        .toLowerCase()
      );

    return csvPrep.map(itemPre => {
      const item = itemPre.replaceAll(/^"|"$/g, "")
        .replaceAll(/","/g, "§")
        .split("§");

      return headers.reduce(
        (o: any, k: string, i: number) =>
          ({ ...o, [k]: item[i]?.replaceAll(/""/g, '"').trim() }),
        {}
      )
    });
  }).map(item => ({...item, archived: false, visibility: null, })));

  const results = await Promise.allSettled(
    processed.map(
      async item => pb.collection("product").create(item, { $autoCancel: false })
    )
  );

  // console.log(processed[0].value);
  
  results.forEach(result => {
    if (result.status==="fulfilled") {
      console.log("Item Value:", result.value);
    } else {
      console.log("Item Reason:", result.reason.response.data);
    }
  })

  return fail(400, { message: "Everything okay." });
};

export default addProductFile;
