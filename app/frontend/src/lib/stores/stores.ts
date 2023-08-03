import { browser } from "$app/environment";
import Pocketbase, { BaseAuthStore } from "pocketbase";
import { writable } from "svelte/store";

function createPbStore(
  baseUrl?: string | undefined,
  authStore?: BaseAuthStore | null | undefined,
  lang?: string | undefined
) {
  const store = writable<Pocketbase>();

  const set = (
    baseUrl?: string | undefined,
    authStore?: BaseAuthStore | null | undefined,
    lang?: string | undefined
  ) => {
    const pb = new Pocketbase(baseUrl, authStore, lang);
    if (browser) pb.authStore.loadFromCookie(document.cookie);
    store.set(pb);
  }

  set(baseUrl, authStore, lang);

  return {
    subscribe: store.subscribe,
    set
  };
}


export const pbStore = createPbStore();
