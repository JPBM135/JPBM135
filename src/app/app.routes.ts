import type { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: async () => (await import('./pages/home/home.component')).HomeComponent,
  },
  {
    path: 'projects',
    loadComponent: async () =>
      (await import('./pages/projects/projects.component')).ProjectsComponent,
  },
  {
    path: 'about-me',
    loadComponent: async () =>
      (await import('./pages/about-me/about-me.component')).AboutMeComponent,
  },
  {
    path: 'contact-me',
    loadComponent: async () =>
      (await import('./pages/contact-me/contact-me.component')).ContactMeComponent,
  },
  {
    path: 'pgp-key',
    loadComponent: async () => (await import('./pages/pgp-key/pgp-key.component')).PgpKeyComponent,
  },
  {
    path: '**',
    loadComponent: async () =>
      (await import('./pages/not-found/not-found.component')).NotFoundComponent,
  },
];
