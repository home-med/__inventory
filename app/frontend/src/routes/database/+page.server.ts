import type { PageServerLoad } from "./$types";
import type { TBrand, TVendor, TLocation } from "$lib/types";
import { batchPromiseProcessing } from "$lib/utils";
import { fail } from "@sveltejs/kit";

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
  eCom?: boolean
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

const batchProcessing = async (entries: Entry[], table: string, locals: App.Locals, limit = 100) => {
  const info: Info = {
    total: 0,
    completed: 0,
    errors: 0,
    items: [],
  }

  let results = await batchPromiseProcessing(entries, limit, async (entry: Entry) => await locals.pb.collection(table).create(entry, { $autoCancel: false }))

  results.map(result => {
    info.total += 1;
    if (result.status === 'fulfilled') {
      info.completed += 1;
      info.items.push(structuredClone(result.value))
    } else {
      console.log('Results Reason:', result.reason);
      console.log('Results Data:', result.reason.data);
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

    const info = await batchProcessing(
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

    const info = await batchProcessing(
      entries,
      'brand',
      locals,
    );

    return { info, missing: false }
  },

  addLocation: async ({ request, locals }) => {
    const formData = await request.formData();
    let location: string | undefined = formData.get('name')?.toString();
    let short_name: string | undefined = formData.get('short_name')?.toString()

    if (!location || !short_name) return fail(400, { location, short_name, missing: true });

    let entries = [{ location, short_name }]

    const info = await batchProcessing(
      entries,
      'location',
      locals,
    );
  },


  addProduct: async ({ request, locals }) => {
    const RAW = 0;
    const formData = await request.formData();
    let entries: Entry[] = [];
    const qty: string = formData.get('quantity')?.toString().toLowerCase() || '';
    let locations: string[] = formData.get('locations') && formData.get('locations')?.toString().split(',').filter(item => item !== 'all') || [];
    formData.delete('quantity');
    if (!formData) return { status: 400, message: "Missing data." };
    if (qty === "single") {
      entries = [Array.from(formData.entries()).reduce((memo, [key, value]) => ({
        ...memo,
        [key]: value,
      }), {})];
    } else if (qty === "multi") {
      const prod_data = formData.get('products')?.toString() ?? false;
      if (!prod_data) return fail(400, { message: "No products provided." });
      const headers: string[] = prod_data.toLowerCase().slice(0, prod_data.indexOf('\n')).split(',').map(item => item.trim().replaceAll(" ", "_").replaceAll(".", ""));
      const rows: string[] = prod_data
        .slice(prod_data.indexOf('\n') + 1)
        .split(/\r?\n|\n/)
        .map(product => product.replaceAll(/"([^",]+),([^"]+)"/g, "$1§$2"));

      const usedHeaders = headers.filter(header => [
        'item',
        'upc',
        'ean',
        'custom_sku',
        'manufact_sku',
        'vendor',
        'brand',
      ].includes(header));

      entries = rows.map(row => {
        const values = row.split(',').map(item => item.replace(/^"|"&/g, '').replaceAll("§", ","));
        const fullHeaders = headers.reduce(
          (object: any, curr: string, i: number) => (object[curr] = values[i], object),
          {}
        )
        const minHeaders = usedHeaders.reduce(
          (obj: any, curr: string, _) => (obj[curr] = fullHeaders[curr], obj),
          {}
        )

        return RAW ? fullHeaders : minHeaders
      }).map(product => ({
        ...product,
        brand: locals.brands.filter(brand => brand.name.toLowerCase() === product.brand?.toLowerCase())[0]?.id || product.brand,
        vendor: locals.vendors.filter(vendor => vendor.name.toLowerCase() === product.vendor?.toLowerCase())[0]?.id || product.vendor,
        active,
      }));

      console.log("Processing products.");

      const info = await batchProcessing(
        entries,
        'product',
        locals
      );

      console.log("Product processing complete.")
      
      if (locations && info.items?.length) {
        console.log("Processing Locations.");
        console.log(locations);
        entries = locations.flatMap(location => {
          return info.items.map(product => ({ item: product.id, location: location, active, eCom: true }))
        });
        await batchProcessing(
          entries,
          'product_visibility',
          locals
        )
      }
      return {info};
      // if (products.length < 1) return invalid(400, {message: "Missing product data."});
      // locations = locations.toString().split(',').filter(v => v !== "all");
      // entries = products.map(entry => {
      //   const item = entry.match(/".+?"/g)?.map(item => {
      //     return item.replace(',', '%');
      //   });
      //   if (item) {
      //     item.forEach(item => {
      //       const orig = item.replace('%', ',');
      //       entry = entry.replace(orig, item);
      //     })
      //   }
      //   const product = entry.split(',')
      //     .map(item => item.replace(/%/g, ',').replace(/"/g, ''));
      //   return {
      //     upc: product[0],
      //     ean: product[1],
      //     custom_sku: product[2],
      //     manufact_sku: product[3],
      //     name: product[4],
      //     brand: locals.brands.filter(brand => brand.name.toLowerCase() === product[10]?.toLowerCase())[0]?.id,
      //     vendor: locals.vendors.filter(vendor => vendor.name.toLowerCase() === product[17]?.toLowerCase())[0]?.id,
      //     active,
      //   };
      // });
    } else {
      return fail(400, { message: "Well something exploded." });
    }
    return fail(400, { message: "Not a real issue just stopping prior to processing." })
    const info = await batchProcessing(
      entries,
      'product',
      locals
    );

    if (locations) {
      entries = locations.flatMap(location => {
        return info.items.map(product => ({ product: product.id, location, active, eCom: true }))
      });
      await batchProcessing(
        entries,
        'product_visibility',
        locals
      )
    }

    // const info = {}
    return { info, missing: false }
  },


  setVisibilty: ({ request, locals }) => {

  },
}
