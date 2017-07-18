import {NgModule} from "@angular/core";

import {Routes, RouterModule} from "@angular/router";
import {APP_BASE_HREF} from "@angular/common";
import {AppComponent} from "./app.component";

const routes: Routes = [
  {path: '', component: AppComponent},

  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule],
  providers: [{provide: APP_BASE_HREF, useValue: '/'}]
})
export class AppRoutingModule {
}
