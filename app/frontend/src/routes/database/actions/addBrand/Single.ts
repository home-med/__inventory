import type { Action } from "@sveltejs/kit";

export const addBrandSingle: Action = async ({ request, locals }) => {
  const formData = await request.formData();
  const brands = formData.get("name")?.toString().split(/\r?\n/g) || [""];
  const archived = formData.get("archived") === "yes" || false;

  const data = structuredClone(await Promise.allSettled(brands.map(name => locals.pb.collection("brand").create({name, archived}, {$autoCancel: false}))));
  
  return {message: "Finished", data};
}

export default addBrandSingle;
