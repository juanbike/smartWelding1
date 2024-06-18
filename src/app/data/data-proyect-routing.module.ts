import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DataProyectComponent } from './data-proyect/data-proyect.component';

const routes: Routes = [
  { path:'dataProyect', title: 'add Data Proyect', component: DataProyectComponent },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataProyectRoutingModule { }
