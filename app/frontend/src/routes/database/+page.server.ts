import type { Actions }  from "@sveltejs/kit";
import { addProductFile, addProductSingle } from "./actions/addProduct";
import { addBrandFile, addBrandSingle } from "./actions/addBrand";
import { addVendorFile, addVendorSingle } from "./actions/addVendor";
import addLocation from "./actions/AddLocation";

export const actions: Actions = {
  addBrandSingle,
  addBrandFile,
  addVendorSingle,
  addVendorFile,
  addProductSingle,
  addProductFile,
  addLocation,
}
