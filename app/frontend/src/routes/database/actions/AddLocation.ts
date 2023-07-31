import type { Action } from "@sveltejs/kit";

const addLocation: Action =  async ({ request, locals }) => {
  const formData = await request.formData();
  const name = formData.get("name")?.toString() || "";
  const short_name = formData.get("short_name")?.toString() || "";
  const archived = formData.get("archived") === "yes" || false;

  const data = structuredClone(await locals.pb.collection("location").create({name, short_name, archived}));
  
  return {message: "Finished", data};
}

export default addLocation;
