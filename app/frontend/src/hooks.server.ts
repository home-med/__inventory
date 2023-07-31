import { authClient, pb } from "$lib/server";
import type { Handle, HandleServerError } from "@sveltejs/kit";


import crypto from 'crypto';


export const handle: Handle = async ({ event, resolve }) => {
  event.locals.sessionId = crypto.randomUUID();
  event.locals.pb = pb;
  event.locals.brands = structuredClone(await pb.collection("brand").getFullList({sort: "name"}));
  event.locals.vendors = structuredClone(await pb.collection("vendor").getFullList({sort: "vendor"}));
  event.locals.locations = structuredClone(await pb.collection("location").getFullList({sort: "name"}));
  event.locals.authClient = authClient;

  try {
    event.locals.pb.authStore.isValid && await event.locals.pb.collection('users').authRefresh();
  } catch {
    event.locals.pb.authStore.clear();
  }

  const response = await resolve(event);
  
  response.headers.append('set-cookie', event.locals.pb.authStore.exportToCookie());
  return response;
}

export const handleError: HandleServerError = async ({ error, event }) => {
  const errorId = crypto.randomUUID();
  if (error instanceof Error) {
    console.log(error);
    return {
      message: error.toString(),
      errorId,
    };
  }
}
