import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WelderListComponent } from '../welder/welder-list/welder-list.component';

const routes: Routes = [
  { path:'welderList', title: 'List welders', component: WelderListComponent },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WelderRoutingModule { }

