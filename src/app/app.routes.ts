import type { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: async () => (await import('./pages/home/home.component')).HomeComponent,
  },
  // {
  //   path: 'projects',
  //   loadComponent: async () =>
  //     (await import('./components/layout/layout.component')).LayoutComponent,
  // },
  // {
  //   path: 'about-me',
  //   loadComponent: async () =>
  //     (await import('./components/layout/layout.component')).LayoutComponent,
  // },
  {
    path: '**',
    loadComponent: async () =>
      (await import('./pages/not-found/not-found.component')).NotFoundComponent,
  },
];
