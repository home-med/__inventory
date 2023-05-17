import type { HandleClientError } from "@sveltejs/kit";

export const handleError: HandleClientError = ({error, event}) => {
  const errorId = crypto.randomUUID();
  console.error("Random ID: ", errorId, "\nEvent: ", event, "Error: ", error);
  return {
    message: "Something went terribly wrong on the server side!",
    errorId
  };
}
