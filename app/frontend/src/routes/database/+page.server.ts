import { batchPromiseProcessing, cmp } from "$lib/utils";
import { fail, type Actions } from "@sveltejs/kit";
import { brands, pb, vendors } from "$lib/server";
import type { Info } from "$lib/types";

let allHeaders: string[] = [];
// const itemHeaders: string[] = ["item", "upc", "ean", "custom_sku", "manufact_sku", "vendor", "brand", "notes", "archived"]

/**
 * Process a CSV line to JSON and return it. 
 * 
 * Delim CANNOT be a comma (,) this is because it is possible to have
 * a comma inside of a csv section making it impossible to split on the
 * comma. In most instances I use an exotic character like § as that is
 * extremely unlikely to be used anywhere in the document.
 */
const processCSVToJSON = (lineStr: string, lineNum: number, fileNum: number, notes: string = "", firstLineHeaders: boolean = true, delim: string = "§") => {
  try {
    const fixed_line: string[] = lineStr
      .replaceAll(/^"|"$/g, "")
      .replaceAll(/","/g, delim)
      .split(delim);
  
    if (firstLineHeaders && allHeaders.length === 0) {
      allHeaders = fixed_line.map(item => item.trim().replaceAll(/\.?\s/g, "_").replaceAll(/\./g, "").replaceAll(/"+/g, '"').toLowerCase());
      return null;
    }
  
    const processed = (allHeaders.reduce((o: any, k: string, i: number) => ({ ...o, [k]: fixed_line[i].replaceAll(/""/g, '"').trim() }), {}));
    const entry = {
      ...processed,
      brand: (brands.filter((brand) => cmp(brand.name, processed.brand))?.pop()?.id),
      vendor: (vendors.filter((vendor) => cmp(vendor.name, processed.vendor)))?.pop()?.id,
      system_id: null,
      notes,
    }
  
    
  
    return entry;
  } catch (e) {
    if (e instanceof Error) {
      console.log(`Passed args\nLineStr: ${lineStr}\nLineNum: ${lineNum}\nFileNum ${fileNum}\nFirstLineHeaders: ${firstLineHeaders}\nDelim: ${delim}\nError Message: ${e.message}\nError: ${e}\n\n`);
    }
  }
}

const batchProcessing = async (entries: any[], table: string, limit = 250): Promise<Info> => {
  const info: Info = {
    total: 0,
    completed: 0,
    errored: 0,
    items: [],
    errors: [],
  }

  console.log(entries.length);

  let results = await batchPromiseProcessing(
    entries,
    limit,
    (entry: any[]) => pb.collection(table).create(entry, { $autoCancel: false }));

  results.map((result, i) => {
    info.total += 1;
    if (result.status === "fulfilled") {
      info.completed += 1;
      info.items.push(result.value)
    } else {
      info.errored += 1;
      info.errors.push({ data: result.reason.data, entry: entries[i] });
    }
  });

  console.log(info);

  return info;
}

export const actions: Actions = {
  /***********************
  *      Add Vendor      *
  ***********************/
  addVendor: async ({ request }) => {
    const formData: FormData = await request.formData();
    const archived: boolean = true;
    const vendors: string = formData.get("name")?.toString() || "";

    if (!vendors) return fail(400, { vendors, missing: true });

    const entries: any[] = [...new Set(vendors.split("\n"))]
      .filter(name => name.toLowerCase() !== "vendor")
      .map(name => ({ name, archived }));

    const info = await batchProcessing(
      entries,
      "vendor"
    );

    return { info, missing: false }
  },

  /************************
  *       Add Brand       *
  ************************/
  addBrand: async ({ request }) => {
    const formData: FormData = await request.formData();
    const brands: string = formData.get("name")?.toString() || "";
    const archived: boolean = true

    if (!brands) return fail(400, { brands, missing: true });

    const entries: any[] = [...new Set(brands.split(/\r?\n|\n/))]
      .filter((name => name.toLowerCase() !== "brand"))
      .map(name => ({ name, archived }))

    const info = await batchProcessing(
      entries,
      "brand"
    );

    return { info, missing: false }
  },

  /***********************
  *     Add Location     *
  ***********************/
  addLocation: async ({ request }) => {
    const formData = await request.formData();
    let name: string = formData.get("name")?.toString() || "";
    let short_name: string = formData.get("short_name")?.toString() || "";

    if (!name || !short_name) return fail(400, { name, short_name, missing: true });

    let entries: any[] = [{ name, short_name, archived: true }];

    const info = await batchProcessing(
      entries,
      "location"
    );
  },

  /***********************
  *  Add Product Single  *
  ***********************/
  addProductSingle: async ({ request }) => {
    const data = await request.formData();
    const item = data.get("item");
    const upc = data.get("upc");
    const ean = data.get("ean");
    const custom_sku = data.get("custom_sku");
    const manufact_sku = data.get("manufact_sku");
    const brand = data.get("brand");
    const vendor = data.get("vendor");

    const info = await batchProcessing(
      [{item, upc, ean, custom_sku, manufact_sku, brand, vendor}],
      "product",
    )
  },

  /***********************
  * Add Product Multiple *
  ***********************/
  addProductMultiple: async ({ request }) => {
    const data = await request.formData();
    const productData: string = data.get("products")?.toString() || "";

    if (productData === "") return fail(400, { message: "No products information" });

    const locations: string[] = data.get("locations")?.toString().split(",").filter(item => item !== "all") || [];
    const headers: string[] = data.get("products")?.toString()
      .slice(
        0,
        productData.indexOf("\n")
      )
      .toLowerCase()
      .split("\n")
      .map((item: string) => item
        .replaceAll(/"(.*?)"/g, "$1")
        .trim()
        .replaceAll(" ", "_")
        .replaceAll(/\.\s?|\s$/g, "")) || [];
    const products: string[] = data.get("products")?.toString()
      .slice(productData.indexOf("\n") + 1)
      .split(/\r?\n|\n/)
      .map((product: string) => product
        .replaceAll(/"([^",]+),([^"]+)"/g, "$1§$2")
        .trim()
        .replaceAll(/"(.*?)"/g, "$1"))
      .filter((product: string) => product != "") || [];

    if (!data) return fail(400, { message: "Missing form data? How did you do that?" });
    if (!products) return fail(400, { message: "No products available." })
  },

  /***********************
  *   Add Product File   *
  ***********************/
  addProductFile: async ({ request }) => {
    const data = await request.formData();
    const files = data.getAll('files');
    const locations: string[] = data.get('locations')?.toString().split(",").filter((item: string) => item !== "all") || [];
    
    let entries: any[] = [];
    let lineNum=0;
    let fileNum=0;
    const results = await Promise.allSettled(files.map(async (f: FormDataEntryValue) => {
      if (f instanceof File) {
        fileNum++;
        console.log(`Processing ${fileNum} of ${files.length}`);
        const fileText = (await f.text()).split(/\r?\n/);
        const results = fileText.map(lineStr => {
          if (!lineStr) return {}
          return processCSVToJSON(lineStr, lineNum++, fileNum);
        }).filter(a => a);
        lineNum=0;
        return results;
      } else {
        return fail(400, {message: "No file found? Or a file is missing?"});
      }
    }));

    const info = await batchProcessing(results.flatMap(result => result.status === 'fulfilled' ? result.value : []), "product");
    return fail(400, structuredClone({ info }));
  },
}
