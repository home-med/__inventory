import { pb } from '$lib/client';
import { SECRET_EMAIL, SECRET_PASSWORD } from '$env/static/private';


export const authClient = await pb.admins.authWithPassword(SECRET_EMAIL, SECRET_PASSWORD);
