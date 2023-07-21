import type { BrandResponse, ProductResponse, VendorResponse } from "$lib/pocketbase-types";
import { pb } from "$lib/client";
import { fail, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

type Texpand = {
  brand: BrandResponse
  vendor: VendorResponse
}

export const load: PageServerLoad = async ({params}) => {
  const product: ProductResponse<Texpand> = structuredClone(await pb.collection("product").getOne(params.id, { expand:"brand,vendor,visibility,system_id" }));
  return { product };
}

export const actions: Actions = {
  /***********************
   *     Update Item     *
   **********************/

    updateItem: async ({request}) => {
      const data = await request.formData();
      const item = data.get("item")?.toString();
      const upc = data.get("upc")?.toString();
      const ean = data.get("ean")?.toString();
      const custom_sku = data.get("custom_sku")?.toString();
      const manufact_sku = data.get("manufact_sku")?.toString();
      const brand = data.get("brand")?.toString();
      const vendor = data.get("vendor")?.toString();
      const table = data.get("table")?.toString();
  
      if (!table || !item) return fail(400, {message: "Missing item or table."});

      console.log(item, {upc, ean, custom_sku, manufact_sku, brand, vendor})
  
      const info = await pb.collection(table).update(item, {upc, ean, custom_sku, manufact_sku, brand, vendor});
      console.log(info);
      return {info}
    },
}
