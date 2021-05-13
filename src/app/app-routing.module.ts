import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import {SubChildRoutingComponent} from './sub-child-routing/sub-child-routing.component';
import {AsdGuardGuard} from './asd-guard.guard';
import {TankDetailsComponent} from './tank-details/tank-details.component';
import {LoginComponent} from './login/login.component';
import {LoginGuard} from './guards/login.guard';


const routes: Routes = [
  {
    path: 'list',
    component: ListComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'details/:id',
    component: TankDetailsComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'login',
    component: LoginComponent

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

