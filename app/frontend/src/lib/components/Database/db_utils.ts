import { applyAction, deserialize } from "$app/forms";
import { invalidateAll } from "$app/navigation";
import type { ActionResult } from "@sveltejs/kit";


export const submitForm = async  (event: CustomEvent) => {
  // const e = event.detail.event;
  const detail = event.detail;
  console.log([...detail.data]);
  const response = await fetch(detail.action, {method: "POST", body: detail.data});
  const result: ActionResult = deserialize(await response.text());
  console.log(result);

  if (result.type === "success") {
    await invalidateAll();
  }

  applyAction(result);
};
