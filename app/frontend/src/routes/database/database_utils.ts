import type PocketBase from "pocketbase";

export const processFiles = async (files: File[], givenHeaders: string[] = [], isFirstRowHeaders = false) => {
  return await Promise.allSettled(files.flatMap(async file => {
    const fileData = (await file.text())
      .split(/\r?\n/)
      .filter(Boolean)
      .map(item => {
        item = item.replaceAll(/\$/g, "")
        if (item.startsWith('"')) return item
        .replaceAll(/"?,"?/g, "§")
        .replaceAll(/^"|"$/g, "")
        
        return item
          .replaceAll(/"(.+),(.+)"/g,"$1$2")
          .replaceAll(/,/g, "§");
      });
    const headers = (
      isFirstRowHeaders && fileData.shift()?.split("§")
      || givenHeaders
      || [])
      .map(item => item
        .toLowerCase()
        .trim()
        .replaceAll(/\.?\s/g, "_")
        .replaceAll(/\./g, "")
        .replaceAll(/"+/g, '"')
      );
    return fileData.map((line: string) => {
      const item = line.split("§");
      if (!item) console.log(line);
      const item_flattened = headers.reduce(
        (pv: any, k: string, i: number) => ({
          ...pv,
          [k]: item[i]?.replaceAll(/""/g, '"')
            .replace(/&#38;|&amp;/, "&")
            .replace(/&#039;|&#39;/, "'")
            .trim()
        }),
        {}
      );

      return {
        ...item_flattened,
      }
    });
  }));
}

type Records = {


}

export const processRecordsInParrel = async (records: any, func:Function, limit: number = 2500): Promise<any> => {
  let results: PromiseSettledResult<Record<string, string>>[] = [];
  for (let start = 0, j = 1; start < records.length; start += limit) {
    const end = start + limit > records.length ? records.length : start + limit;
    const slicedResults = await Promise.allSettled(records.slice(start, end).map(async (record: any[]) => func(record)));
    results = [
      ...results,
      ...slicedResults
    ]
  }
  return results;
}
