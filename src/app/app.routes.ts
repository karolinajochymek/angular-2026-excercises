import { Routes } from '@angular/router';
export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'items' },
  { path: 'items', loadComponent: () => import('./features/items/items-list/items-list.component').then(m => m.ItemsListComponent) },
  // TODO P2.2: dodaj szczegóły i edycję z guardami; wildcard musi pozostać ostatni.
  { path: '**', loadComponent: () => import('./features/not-found/not-found.component').then(m => m.NotFoundComponent) },
];
