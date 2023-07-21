import { pb } from "$lib/client";
import type { Action } from "@sveltejs/kit";

export const addBrand: Action = async ({ request, locals }) => {
  // const formData: FormData = await request.formData();
  // const brands: string = formData.get("name")?.toString() || "";
  // const archived: boolean = true

  // if (!brands) return fail(400, { brands, missing: true });

  // const entries: any[] = [...new Set(brands.split(/\r?\n|\n/))]
  //   .filter((name => name.toLowerCase() !== "brand"))
  //   .map(name => ({ name, archived }))

  // const info = await _runner(
  //   locals.pb,
  //   entries,
  //   "brand"
  // );

  // return { info, missing: false }
  const formData = await request.formData();
  const brands = formData.get("name")?.toString().split(/\r?\n/g) || [""];
  const archived = formData.get("archived") === "yes" || false;

  const data = structuredClone(await Promise.allSettled(brands.map(name => pb.collection("brand").create({name, archived}, {$autoCancel: false}))));
  
  return {message: "Finished", data};
}

export default addBrand;
