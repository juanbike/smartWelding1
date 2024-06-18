import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth/auth.component';
import { PagesHomeComponent } from './pages/pages-home/pages-home.component';
import { ClientCreateComponent } from './client/client-create/client-create.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: 'login', title: 'Login', component: AuthComponent },
  { path: 'dashboard', title: 'Dashboard', component: PagesHomeComponent },
  { path: 'client', title: 'ClientCreate', component: ClientCreateComponent },
  {
    path: 'client',
    loadChildren: () =>
      import('./client/client.module').then((m) => m.ClientModule),
  },
  {
    path: 'pages',
    loadChildren: () =>
      import('./pages/pages.module').then((m) => m.PagesModule),
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', title: 'PageNotFound', component: PageNotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
