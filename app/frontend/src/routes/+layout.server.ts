import type { LocationResponse, ProductResponse } from "$lib/pocketbase-types";
import { brands, pb, vendors } from "$lib/server";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async () => {
    const locations = async () => await pb.collection('location').getFullList({$autoCancel: false});
    const products = async () => await pb.collection('product').getFullList({$autoCancel: false});
  return { site: { brands, vendors, locations: structuredClone(await locations()), products: structuredClone(await products()) } }
}
