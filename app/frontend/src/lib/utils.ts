import { derived, type Readable } from 'svelte/store';
import { brands, vendors } from './client';

export const batchPromiseProcessing = async (collection: any[], limit: number = 100, fn: Function) => {
  let ret = [];
  const batches = collection.reduce(
    (acc: any[], _: any, i: number) => (i % limit) ? acc : [...acc, collection.slice(i, i + limit)], []
  );
  for (let i = 0, l = batches.length; i < l; i++) {
    ret[i] = await Promise.allSettled(batches[i].filter((v: any) => v).map((item: any) => {
      try {
        return fn(item)
      } catch (e) {
        if (e instanceof Error) {
          console.log(`Error Name: ${e.name}\n Error Message: ${e.message}\nItem: ${item}\nError: ${e}`);
        }
      }
    }));
  }
  return ret.flat(2);
}

export const dedupe = <T>(store: Readable<T>): Readable<T> => {
  let previous: T;

  return derived(store, ($value, set) => {
    if ($value !== previous) {
      previous = $value;
      set($value);
    }
  })
}

export const generateID = (stringLength = 20) => {
  let randomStr = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZqeytrpolkadjsghfgmnbzxcvnQPOWEYRKASJHDGFMNBCVX--___-_jsfhrlg-_124903564576986483658fgh4sdfh687e4h897WETHJ68F7G4688471877GFHJFFGJ87469857468746hfghwrtiyj4598yhdjkhgnk";
  for (let index = 0; index < stringLength; index++) {
    randomStr += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  return randomStr;
};

export const cmp = (item1: unknown, item2: unknown) => {
  if (typeof item1 === 'string' && typeof item2 === 'string') return item1.toLowerCase() === item2.toLowerCase();
  return item1 === item2;
}

let allHeaders: string[] = [];
const processCSVToJSON = (lineStr: string, lineNum: number, fileNum: number, notes: string = "", firstLineHeaders: boolean = true, delim: string = "§") => {
  try {
    const fixed_line: string[] = lineStr
      .replaceAll(/^"|"$/g, "")
      .replaceAll(/","/g, delim)
      .split(delim);
    
  
    if (firstLineHeaders && allHeaders.length === 0) {
      allHeaders = fixed_line.map(item => item.trim().replaceAll(/\.?\s/g, "_").replaceAll(/\./g, "").replaceAll(/"+/g, '"').toLowerCase());
      return null;
    }

    if (!fixed_line?.[0]) return;
  
    const processed = (allHeaders.reduce((o: any, k: string, i: number) => ({ ...o, [k]: (fixed_line[i] ?? "").replaceAll(/""/g, '"').trim() }), {}));
    const entry = {
      ...processed,
      brand: (brands.filter((brand) => cmp(brand.name, processed.brand))?.pop()?.id),
      vendor: (vendors.filter((vendor) => cmp(vendor.name, processed.vendor)))?.pop()?.id,
      system_id: null,
      notes,
    }
  
    
  
    return entry;
  } catch (e) {
    if (e instanceof Error) {
      console.log(`Passed args\nLineStr: ${lineStr}\nLineNum: ${lineNum}\nFileNum ${fileNum}\nFirstLineHeaders: ${firstLineHeaders}\nDelim: ${delim}\nError Message: ${e.message}\nError: ${e}\n\n`);
    }
  }
}
