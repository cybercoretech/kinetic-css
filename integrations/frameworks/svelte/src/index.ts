// @kinetic/svelte - Svelte stores and actions for Kinetic CSS
import { onDestroy, onMount } from 'svelte';
import { KineticCore, KineticConfig } from '@kinetic/core';
import { DialogController } from '@cybercoretech/js';

export function createKinetic(config?: KineticConfig) {
  const core = new KineticCore(config);
  onMount(() => {
    core.mount();
  });
  return core;
}

export function createDialog(selector: string, core: KineticCore) {
  let dialog: DialogController | null = null;
  onMount(() => {
    dialog = new DialogController(selector, core);
    dialog.mount();
  });
  onDestroy(() => {
    dialog?.destroy();
  });
  return {
    open: () => dialog?.open(),
    close: () => dialog?.close()
  };
}
