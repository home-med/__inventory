import { SECRET_EMAIL, SECRET_PASSWORD } from '$env/static/private';
import PocketBase from 'pocketbase';

export const pb = new PocketBase('http://127.0.0.1:8090');
export const authClient = await pb.admins.authWithPassword(SECRET_EMAIL, SECRET_PASSWORD);
