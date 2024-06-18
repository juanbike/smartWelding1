import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesAboutComponent } from './pages-about/pages-about.component';
import { PagesContactComponent } from './pages-contact/pages-contact.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


  const routes: Routes = [
    { path:'about', title: 'About', component: PagesAboutComponent },
    { path:'contact', title: 'Contact', component:PagesContactComponent },
    { path:'pageNotFound', title: 'PageNotFound', component: PageNotFoundComponent }
  ];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
