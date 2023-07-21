import { type Action, fail } from "@sveltejs/kit";

const addProductMultiple: Action = async ({ request }) => {
  // const data = await request.formData();
  // const productData: string = data.get("products")?.toString() || "";

  // if (productData === "") return fail(400, { message: "No products information" });

  // const locations: string[] = data.get("locations")?.toString().split(",").filter(item => item !== "all") || [];
  // const headers: string[] = data.get("products")?.toString()
  //   .slice(
  //     0,
  //     productData.indexOf("\n")
  //   )
  //   .toLowerCase()
  //   .split("\n")
  //   .map((item: string) => item
  //     .replaceAll(/"(.*?)"/g, "$1")
  //     .trim()
  //     .replaceAll(" ", "_")
  //     .replaceAll(/\.\s?|\s$/g, "")) || [];
  // const products: string[] = data.get("products")?.toString()
  //   .slice(productData.indexOf("\n") + 1)
  //   .split(/\r?\n|\n/)
  //   .map((product: string) => product
  //     .replaceAll(/"([^",]+),([^"]+)"/g, "$1§$2")
  //     .trim()
  //     .replaceAll(/"(.*?)"/g, "$1"))
  //   .filter((product: string) => product != "") || [];

  // if (!data) return fail(400, { message: "Missing form data? How did you do that?" });
  // if (!products) return fail(400, { message: "No products available." })
  return fail(400, {message: "Everything okay."})
}

export default addProductMultiple;
