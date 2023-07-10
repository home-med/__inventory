import type PocketBase from 'pocketbase';
import { derived, type Readable } from 'svelte/store';

export const dbAdd = (pb: PocketBase, table: string, values: FormDataEntryValue[]) => {
  if (!values) values = [];
  return Promise.allSettled(values.map(async item => {
    return await pb.collection(table).create(item, { $autoCancel: false });
  }));
}



export const cmp = (item1: unknown, item2: unknown) => {
  if (typeof item1 === 'string' && typeof item2 === 'string') return item1.toLowerCase() === item2.toLowerCase();
  return item1 === item2;
}

export const zip = (arr1: any[], arr2: any[], out: any = {}) => {
  arr1.map((val, i) => {out[val] = arr2[i]});
  return out;
}

export const ordinals = (n: number): string => {
  var o: string[] = ["th", "st", "nd", "rd"];
  var v: number = n % 100;
  return n + (o[(v-20)%10] || o[v] || o[0]);
}


export const debounce = (cb: Function, delay: number = 250) => {
  let timeout: ReturnType<typeof setTimeout>;

  return (...args: Array<unknown>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      cb(...args)
    }, delay)
  }
}

export const throttle = (cb: Function, delay: number = 250) => {
  let shouldWait: boolean = false;
  let waitingArgs: Array<unknown> = [];

  const timeoutFunc = () => {
    if (!waitingArgs) {
      shouldWait = false;
    } else {
      cb(...waitingArgs)
      waitingArgs = []
      setTimeout(timeoutFunc, delay);
    }
  }

  return (...args: Array<unknown>) => {
    if (shouldWait) {
      waitingArgs = [...args];
      return;
    }

    cb(...args);
    shouldWait = true;
    setTimeout(timeoutFunc, delay)
  }
}

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


const map = (arr: any[], fn: any): any[] => arr.map(fn);
const filter = (arr: any[], fn: any): any[] => arr.filter(fn);
