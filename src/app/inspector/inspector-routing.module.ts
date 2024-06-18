import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InspectorListComponent } from './inspector/inspector-list.component';

const routes: Routes = [

  { path:'inspectorList', title: 'List inspectors', component: InspectorListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InspectorRoutingModule { }
