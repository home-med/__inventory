import PocketBase from 'pocketbase';
import { writable } from 'svelte/store';

export const client = new PocketBase();

client.authStore.onChange(() => {
  currentUser.set(client.authStore.model);
});

export const currentUser = writable(client.authStore.model);

export const login = async (
  email: string,
  password: string,
  register = false,
  rest: { [key: string]: any } = {}
) => {
  if (register) {
    const user = { ...rest, email, password, confirmPassword: password };
    await client.collection("users").create(user);
  }
  await client.collection("users").authWithPassword(email, password);
}
