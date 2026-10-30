// @kinetic/vue - Vue composables for Kinetic CSS
import { onMounted, onUnmounted, ref } from 'vue';
import { KineticCore, KineticConfig } from '@kinetic/core';
import { DialogController } from '@cybercoretech/js';

export function useKinetic(config?: KineticConfig) {
  const core = ref(new KineticCore(config));
  onMounted(() => {
    core.value.mount();
  });
  return core;
}

export function useKineticDialog(selector: string, core: KineticCore) {
  const dialog = ref<DialogController | null>(null);
  onMounted(() => {
    dialog.value = new DialogController(selector, core);
    dialog.value.mount();
  });
  onUnmounted(() => {
    dialog.value?.destroy();
  });
  return dialog;
}
