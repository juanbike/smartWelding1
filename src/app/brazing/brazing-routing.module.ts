import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrazingComponent } from './brazing/brazing.component';

const routes: Routes = [
  { path:'brazingCreate', title: 'BrazingCreate', component: BrazingComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrazingRoutingModule { }
