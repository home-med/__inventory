import PocketBase from 'pocketbase';

export const pb = new PocketBase('http://127.0.0.1:8090');
export const brands = structuredClone(await pb.collection("brand").getFullList({sort: "name"}));
export const vendors = structuredClone(await pb.collection("vendor").getFullList({sort: "name"}));
