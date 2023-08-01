export const processFiles = async (files: File[], givenHeaders: string[] = [], isFirstRowHeaders = false) => {
  return await Promise.allSettled(files.flatMap(async file => {
    const fileData = (await file.text())
      .split(/\r?\n/)
      .map(item => item
        .replaceAll(/^"|"$/g, "")
        .replaceAll(/"?,"?/g, "§")
      );
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
      const item_flattened = headers.reduce(
        (pv: any, k: string, i: number) => ({
          ...pv,
          [k]: item[i]?.replaceAll(/""/g, '"')
          .replace(/&#38;|&amp;/, "&")
          .replace(/&#039;|&#39;/, "'")
          .trim() }),
        {}
      );

      return {
        ...item_flattened,
      }
    });
  }));
}
