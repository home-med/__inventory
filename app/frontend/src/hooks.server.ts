import { authClient, brands, pb, vendors } from '$lib/server';
import type { Handle, HandleServerError } from '@sveltejs/kit';


import crypto from 'crypto';


export const handle: Handle = async ({ event, resolve }) => {
  event.locals.sessionId = crypto.randomUUID();
  event.locals.pb = pb;
  event.locals.brands = brands;
  event.locals.vendors = vendors;
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
  console.error("----------------------------<[ERROR ERROR ERROR]>----------------------------");
  console.error("Random ID:", errorId, "\nEvent:", event, "\n", error)
  console.error("-----------------------------<[ERROR ERROR ERROR]>-----------------------------");
  return {
    message: "Something went terribly wrong on the server side!",
    errorId,
  };
}
