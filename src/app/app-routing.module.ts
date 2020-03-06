import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent }      from './login/login.component';
import { RegisterComponent }      from './register/register.component';
import { HomeComponent }      from './home/home.component';
import { ManagerComponent }      from './manager/manager.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: HomeComponent },
  { path: 'maneger', component: ManagerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
