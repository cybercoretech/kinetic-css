// @kinetic/react - React bindings using KAS controllers
import React, { useEffect, useRef } from 'react';
import { KineticCore, KineticConfig } from '@kinetic/core';
import { DialogController } from '@kinetic/js';

export function useKinetic(config?: KineticConfig) {
  const coreRef = useRef<KineticCore | null>(null);
  if (!coreRef.current) {
    coreRef.current = new KineticCore(config);
  }
  useEffect(() => {
    coreRef.current?.mount();
  }, []);
  return coreRef.current;
}

export function useKineticDialog(selector: string, core: KineticCore) {
  const dialogRef = useRef<DialogController | null>(null);
  if (!dialogRef.current) {
    dialogRef.current = new DialogController(selector, core);
  }
  useEffect(() => {
    dialogRef.current?.mount();
    return () => dialogRef.current?.destroy();
  }, [core, selector]);
  return dialogRef.current;
}
