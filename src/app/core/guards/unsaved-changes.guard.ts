import { CanDeactivateFn } from '@angular/router';
export interface HasUnsavedChanges { hasUnsavedChanges(): boolean; }
// TODO P2.4: zapytaj o potwierdzenie tylko przy niezapisanych zmianach.
export const unsavedChangesGuard: CanDeactivateFn<HasUnsavedChanges> = () => true;
