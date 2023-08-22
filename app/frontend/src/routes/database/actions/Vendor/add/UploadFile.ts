import { type Action, fail } from "@sveltejs/kit";
import { processFiles } from "../../../database_utils";

const addBrandFile: Action = async ({ request, locals }) => {
  const data = await request.formData();
  const files = data.getAll('files') as File[];
  const isFirstRowHeaders: boolean = data.get("isFirstRowHeaders") === "yes";
  const processedFiles = await processFiles(files, (data.get("headers")?.toString().split(",") ?? []), isFirstRowHeaders);
  const results = await Promise.allSettled(processedFiles.flatMap(segment => {
    if (segment.status === "fulfilled") {
      return segment.value.map(async item => {
        return locals.pb.collection("vendor").create(
          {
            ...item,
            archived: false,
          },
          {$autoCancel: false})
        }
      );
    }
  }));

  results.forEach(result => {
    if (result.status==="fulfilled") {
      console.log("Item Value:", result.value);
    } else {
      // console.log("Item Reason:", result.reason);
    }
  })

  return fail(400, { message: "Everything okay." });
};

export default addBrandFile;
