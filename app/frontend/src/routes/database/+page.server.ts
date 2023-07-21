import type { Actions }  from "@sveltejs/kit";
import { addBrand, addVendor } from "./actions";
import { addProductFile } from "./actions/addProduct";

export const actions: Actions = {
  addVendor,
  addBrand,
  // addLocation,
  // addProductSingle,
  // addProductMultiple,
  addProductFile,
}
