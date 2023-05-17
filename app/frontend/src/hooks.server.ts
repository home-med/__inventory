import type { Handle, HandleServerError } from '@sveltejs/kit';

import PocketBase from 'pocketbase';
import crypto from 'crypto';

import {POCKETBASE_URI} from '$env/static/private';

export const handle: Handle = async ({event, resolve}) => {
  event.locals.sessionId = crypto.randomUUID();
  event.locals.pb = new PocketBase(POCKETBASE_URI);
  event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

  if (!event.locals.brands) {
    event.locals.brands = await event.locals.pb.collection('brand').getFullList();
  }

  if (!event.locals.vendors) {
    event.locals.vendors = await event.locals.pb.collection('vendor').getFullList();
  }

  try {
    event.locals.pb.authStore.isValid && await event.locals.pb.collection('users').authRefresh();
  } catch {
    event.locals.pb.authStore.clear();
  }

  const response = await resolve(event);

  response.headers.append('set-cookie', event.locals.pb.authStore.exportToCookie());

  return response;
}

export const handleError: HandleServerError = async ({error, event}) => {
  const errorId = crypto.randomUUID();
  console.error("----------------------------<[ERROR ERROR ERROR]>----------------------------\nRandom ID: ", errorId, "\nEvent: ", event, "Error: ", error, "\n-----------------------------<[ERROR ERROR ERROR]>-----------------------------");
  return {
    message: "Something went terribly wrong on the server side!",
    errorId,
  };
}
