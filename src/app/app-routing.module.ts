import {NgModule} from "@angular/core";

import {Routes, RouterModule} from "@angular/router";
import {APP_BASE_HREF} from "@angular/common";
import {HomeComponent} from "./components/home/home.component";
import {ProfileComponent} from "./components/user/profile/profile.component";
import {AuthGuard} from "./guards/auth.guard";

const routes: Routes = [

  {path: '', component: HomeComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},

  {path: 'home', redirectTo:''},
  {path: '**', redirectTo: 'Error'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule],
  providers: [{provide: APP_BASE_HREF, useValue: '/'}]
})
export class AppRoutingModule {
}
