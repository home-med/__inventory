import { fail, type Action } from "@sveltejs/kit";

const addProductSingle: Action = async ({ request, locals }) => {
  // const data = await request.formData();
  // const item = data.get("item");
  // const upc = data.get("upc");
  // const ean = data.get("ean");
  // const custom_sku = data.get("custom_sku");
  // const manufact_sku = data.get("manufact_sku");
  // const brand = data.get("brand");
  // const vendor = data.get("vendor");

  // const info = await _runner(
  //   locals.pb,
  //   [{item, upc, ean, custom_sku, manufact_sku, brand, vendor}],
  //   "product",
  // )
  return fail(400, {message: "Everything okay."})
}

export default addProductSingle;
