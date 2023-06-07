import type PocketBase from 'pocketbase';

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
    console.log(`Starting batch ${i+1} of ${l}`);
    ret[i] = await Promise.allSettled(batches[i].map((item: any) => fn(item)));
    console.log('Batch completed.')
  }
  return ret.flat(2);
}
