import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import {SubChildRoutingComponent} from './sub-child-routing/sub-child-routing.component';

const routes: Routes = [
  {
    path: 'list',
    component: ListComponent
  },
  {
    path: 'details/:id',
    component: SubChildRoutingComponent
  }
  /*{
    path: 'asdasdasd',
    component: AsdasdasdComponent
  }*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

