import type { ProductResponse } from "$lib/pocketbase-types";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({locals}) => {
  const locations = locals.locations;
  const brands = locals.brands;
  const vendors = locals.vendors;
  const products: ProductResponse[] = structuredClone(await locals.pb.collection('product').getFullList({ $autoCancel: false }));
  return {locations, brands, vendors, products}
}
