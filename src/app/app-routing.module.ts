import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PopupCardComponent } from './content/popup-card-component/popup-card.component';
import { LoginComponent } from './login/login.component';
import { SidenavComponent } from './sidenav/sidenav.component';

const routes: Routes = [
  {path: '', component: SidenavComponent},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
