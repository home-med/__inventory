import type { Actions }  from "@sveltejs/kit";
import { addProductFile, addProductSingle } from "./actions/Product";
import { addBrandFile, addBrandSingle } from "./actions/Brand";
import { addVendorFile, addVendorSingle } from "./actions/Vendor";
import addLocation from "./actions/Location/add/AddLocation";

export const actions: Actions = {
  addBrandSingle,
  addBrandFile,
  addVendorSingle,
  addVendorFile,
  addProductSingle,
  addProductFile,
  addLocation,
}
