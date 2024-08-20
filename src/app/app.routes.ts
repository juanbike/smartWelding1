import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth/auth.component';
import { PagesHomeComponent } from './pages/pages-home/pages-home.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: 'login', title: 'Login', component: AuthComponent },
  {
    path: 'dashboard', title: 'Dashboard', component: PagesHomeComponent,
    children: [
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
      {
        path: 'brazing',
        loadChildren: () =>
          import('./brazing/brazing.module').then((m) => m.BrazingModule),
      },
      {
        path: 'inspectors',
        loadChildren: () =>
          import('./inspector/inspector.module').then((m) => m.InspectorModule),
      },
      {
        path: 'welders',
        loadChildren: () =>
          import('./welder/welder.module').then((m) => m.WelderModule),
      },
      {
        path: 'materials',
        loadChildren:()=>
          import('./material/material.module').then((m) =>m.MaterialModule ),
      },
      {
        path:'proyect',
        loadChildren:() =>
          import('./data/data.module').then((m)=> m.DataModule),
      },
      {
        path:'junta',
        loadChildren:() =>
          import('./junta/junta.module').then((m)=> m.JuntaModule),
      }
    ],

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
