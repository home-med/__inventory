import type { Action } from "@sveltejs/kit";

// const addVendor: Action = async ({ request, locals }) => {
//   const formData: FormData = await request.formData();
//   const archived: boolean = true;
//   const vendors: string = formData.get("name")?.toString() || "";

//   if (!vendors) return fail(400, { vendors, missing: true });

//   const entries: any[] = [...new Set(vendors.split("\n"))]
//     .filter(name => name.toLowerCase() !== "vendor")
//     .map(name => ({ name, archived }));

//   const info = await batchProcessing(
//     entries,
//     entries.map((entry: any[]) => locals.pb.collection("vendor").create(entry, { $autoCancel: false })),
//   );

//   return { info, missing: false }
// };


const addVendor: Action = async({ request, locals }) => {
  const formData = await request.formData();
  const vendors = formData.get("name")?.toString().split(/\r?\n/g) || [""];
  const archived = formData.get("archived") === "yes" || false;

  const data = structuredClone(await Promise.allSettled(vendors.map(name => locals.pb.collection("vendor").create({name, archived}, {$autoCancel: false}))));
  
  return structuredClone({message: "Finished", data});
};
export default addVendor;
