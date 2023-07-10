import { derived, type Readable } from "svelte/store";
import { dedupe } from "../utils";
import { page } from "$app/stores";

export const siteStore: Readable<any> = dedupe(derived(page, $page => $page.data.site));
