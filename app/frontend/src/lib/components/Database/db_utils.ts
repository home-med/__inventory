import { applyAction, deserialize } from "$app/forms";
import { invalidateAll } from "$app/navigation";
import type { ActionResult } from "@sveltejs/kit";


export const submitForm = async  (event: CustomEvent) => {
  const data = event.detail.data;
  const action = event.detail.action;
  const e = event.detail.event;
  console.log(action, ...data);
  const response = await fetch(action, {method: "POST", body: data})
  const result: ActionResult = deserialize(await response.json());

  if (result.type === "success") {
    await invalidateAll();
  }

  applyAction(result);
};
