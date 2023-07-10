import PocketBase from 'pocketbase';
import { SECRET_EMAIL, SECRET_PASSWORD } from '$env/static/private';
import type { BrandResponse, VendorResponse } from '$lib/pocketbase-types';

export const pb = new PocketBase('http://127.0.0.1:8090');
export const authClient = await pb.admins.authWithPassword(SECRET_EMAIL, SECRET_PASSWORD);
export const brands:  BrandResponse[] = structuredClone(await pb.collection('brand').getFullList({sort:'name'}));
export const vendors: VendorResponse[] = structuredClone(await pb.collection('vendor').getFullList({sort:'name'}));
