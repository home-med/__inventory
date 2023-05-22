import { fail } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import type { TBrand, TVendor, TLocation } from "$lib/types";

interface Entry {
  name?: string
  ean?: string
  upc?: string
  product?: string
  location?: string
  custom_sku?: string
  manufact_sku?: string
  brand?: string | null
  vendor?: string | null
  active?: boolean
}

interface Info {
  total: number
  completed: number
  errors: number
  items: any[]
}


const active = true;

export const load: PageServerLoad = async ({ locals }) => {
  const vendors: TVendor[] = structuredClone(locals.brands);
  const brands: TBrand[] = structuredClone(locals.vendors);
  const locations: TLocation[] = structuredClone(await locals.pb.collection('location').getFullList())
  return { vendors, brands, locations }
}

const allSettled = async (entries: Entry[], table: string, locals: App.Locals) => {
  const promises = entries.map(async entry => await locals.pb.collection(table).create(entry, { $autoCancel: false }));
  const results = await Promise.allSettled(promises);
  const info: Info = {
    total: 0,
    completed: 0,
    errors: 0,
    items: [],
  }

  results.map(result => {
    info.total += 1;
    if (result.status === 'fulfilled') {
      info.completed += 1;
      info.items.push(structuredClone(result.value))
    } else {
      console.log(result.reason);
      info.errors += 1;
    }
  });

  return info;
}

export const actions = {
  addVendor: async ({ request, locals }) => {
    const formData = await request.formData();
    let vendors: string | string[] = String(formData.get('name'));

    if (!vendors) return fail(400, { vendors, missing: true });

    const entries: Entry[] = [...new Set(vendors.split(/\r?\n|\n/))]
      .filter(name => name.toLowerCase() !== "vendor")
      .map(name => ({ name, active }));

    const info = await allSettled(
      entries,
      'vendor',
      locals,
    );

    return { info, missing: false }
  },


  addBrand: async ({ request, locals }) => {
    const formData = await request.formData();
    let brands: string | string[] = String(formData.get('name'));

    if (!brands) return fail(400, { brands, missing: true });

    const entries = [...new Set(brands.split(/\r?\n|\n/))]
      .filter((name => name.toLowerCase() !== "brand"))
      .map(name => ({ name, active }))

    const info = await allSettled(
      entries,
      'brand',
      locals,
    );

    return { info, missing: false }
  },


  addProduct: async ({ request, locals }) => {
    const formData = await request.formData();
    let entries: Entry[] = [];
    const qty = formData.get('quantity')?.toString().toLowerCase();
    const visibility: string[] = [];
    formData.delete('quantity');
    if (!formData) fail(400);
    if (qty === "single") {
      entries = [Array.from(formData.entries()).reduce((memo, [key, value]) => ({
        ...memo,
        [key]: value,
      }), {})];
    } else if (qty === "multi") {
      const products: string[] = formData.get('products')?.toString().split(/\r?\n|\n/) || [];
      if (!products) fail(400);
      entries = products.map(entry => {
        const item = entry.match(/".+?"/g)?.map(item => {
          return item.replace(',', '%');
        });
        if (item) {
          item.forEach(item => {
            const orig = item.replace('%', ',');
            entry = entry.replace(orig, item);
          })
        }
        const product = entry.split(',').map(item => item.replace(/%/g, ',').replace(/"/g, ''));
        return {
          upc: product[0],
          ean: product[1],
          custom_sku: product[2],
          manufact_sku: product[3],
          name: product[4],
          brand: locals.brands.filter(brand => brand.name.toLowerCase() === product[10]?.toLowerCase())[0]?.id,
          vendor: locals.vendors.filter(vendor => vendor.name.toLowerCase() === product[17]?.toLowerCase())[0]?.id,
          active
        };
      });
    } else {
      return fail(400);
    }
    // const info = await allSettled(
    //   entries,
    //   'product',
    //   locals
    // );
    const locations = visibility[0] === "all"
    console.log(locations, visibility)
    const info = {}
    return { info, missing: false }
  },

  
  setVisibilty: ({ request, locals }) => {

  },
}
