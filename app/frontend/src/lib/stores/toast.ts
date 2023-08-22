import { generateID } from '$lib/utils';
import { writable } from 'svelte/store';




	export const enum Toasts {
		INFO = "info",
		ERROR = "error",
		SUCCESS = "success",
		LOADING = "loading",
		WARNING = "warning",
		DANGER = "danger"
	};

type Toast = {
  id: string
  type: Toasts | undefined
  dismissable?: boolean
  timeout?: number
  message: string
}

export const toasts = writable<Toast[]>([]);

export const addToast = (toast: Partial<Toast>, promise=null) => {
  // Create a unique ID so we can easily find/remove it
  // if it is dismissable/has a timeout.
  const id = generateID();

  // Setup some sensible defaults for a toast.
  const defaults: Toast = {
    id,
    type: Toasts.INFO,
    dismissable: true,
    message: "",
  };

  const t: Toast = { ...defaults, ...toast };

  // Push the toast to the top of the list of toasts
  toasts.update((all) => [t, ...all]);

  // If toast is dismissable, dismiss it after "timeout" amount of time.
  if (t.timeout) setTimeout(() => dismissToast(id), t.timeout);
};

export const dismissToast = (id: string) => {
  toasts.update((all) => all.filter((t: Toast) => t.id !== id));
};
