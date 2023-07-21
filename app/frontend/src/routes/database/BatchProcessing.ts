import { batchPromiseProcessing } from "$lib/utils";
import type PocketBase from 'pocketbase';
import type { Info } from "$lib/types";

export const batchProcessing = async (pb: PocketBase, entries: any[], table: string, limit = 250): Promise<Info> => {
  const info: Info = {
    total: 0,
    completed: 0,
    errored: 0,
    items: [],
    errors: [],
  }

  let results = await batchPromiseProcessing(
    entries,
    limit,
    (entry: any[]) => pb.collection(table).create(entry, { $autoCancel: false }));
` `
  results.map((result, i) => {
    info.total += 1;
    if (result.status === "fulfilled") {
      info.completed += 1;
      info.items.push(result.value)
    } else {
      info.errored += 1;
      info.errors.push({ data: result.reason.data, entry: entries[i] });
    }
  });

  return info;
}
