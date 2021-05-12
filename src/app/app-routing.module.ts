import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import {SubChildRoutingComponent} from './sub-child-routing/sub-child-routing.component';
import {AsdGuardGuard} from './asd-guard.guard';
import {TankDetailsComponent} from './tank-details/tank-details.component';

const routes: Routes = [
  {
    path: 'list',
    component: ListComponent
    /*canActivate: [AsdGuardGuard]*/ /*hamindegyik true val tér vissza.*/
  },
  {
    path: 'details/:id',
    component: TankDetailsComponent
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

