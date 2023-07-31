import type { Actions }  from "@sveltejs/kit";
import { addLocation, addVendor } from "./actions";
import { addProductFile } from "./actions/addProduct";
import { addBrandFile, addBrandSingle } from "./actions/addBrand";
import { addVendorFile, addVendorSingle } from "./actions/addVendor";

export const actions: Actions = {
  addVendor,
  addBrandSingle,
  addBrandFile,
  addVendorSingle,
  addVendorFile,
  addLocation,
  // addProductSingle,
  // addProductMultiple,
  addProductFile,

}
