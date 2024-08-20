import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JuntaCreateComponent } from './junta-create/junta-create.component';

const routes: Routes = [
  { path:'juntaCreate', title: 'Create Junta', component: JuntaCreateComponent },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})
export class JuntaRoutingModule { }
