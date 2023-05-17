import { browser } from '$app/environment';
import type PocketBase from 'pocketbase';

export const dbAdd = (pb: PocketBase, table: string, values: FormDataEntryValue[]) => {
  if (!values) values = [];
  return Promise.allSettled(values.map(async item => {
    return await pb.collection(table).create(item, {$autoCancel: false});
  }));
}

export const uuid = () => {
  if (browser) return crypto.randomUUID();
  return '';
}


export const cmp = (item1: unknown, item2: unknown) => {
  if(typeof item1 === 'string' && typeof item2 === 'string') return item1.toLowerCase() === item2.toLowerCase();
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
