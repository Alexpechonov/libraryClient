import {NgModule} from "@angular/core";

import {Routes, RouterModule} from "@angular/router";
import {APP_BASE_HREF} from "@angular/common";
import {HomeComponent} from "./components/home/home.component";
import {ProfileComponent} from "./components/user/profile/profile.component";
import {AuthGuard} from "./guards/auth.guard";
import {PageNotFound} from "./components/common/error/404/404";
import {InstructionUpdateComponent} from "./components/instruction/update/instruction.update.component";
import {InstructionWatchComponent} from "./components/instruction/watch/instruction.watch.component";
import {WatchProfileComponent} from "./components/user/profile/watch/profile.watch.component";
import {AdminGuard} from "./guards/admin.guard";
import {AdminUsersComponent} from "./components/user/admin/users/admin.users";
import {AdminManageComponent} from "./components/user/admin/management/admin.manage";
import {InstructionByTagComponent} from "./components/instruction/bytag/instruction.bytag.component";
import {InstructionCategoryComponent} from "./components/instruction/bycategory/instruction.category.component";
import {SearchComponent} from "./components/common/search/search.component";
import {UsersComponent} from "./components/user/component/users.component";
import {InstructionComponent} from "./components/instruction/component/instruction.component";

const routes: Routes = [

  {path: '', component: HomeComponent},
  {path: 'profile/me', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'profile/:id', component: WatchProfileComponent},
  {path: '404', component: PageNotFound},
  {path: 'instruction/update/:id', component: InstructionUpdateComponent, canActivate: [AuthGuard]},
  {path: 'instruction/watch/:id', component: InstructionWatchComponent},
  {path: 'admin/users', component: AdminUsersComponent, canActivate: [AdminGuard]},
  {path: 'admin/manage', component: AdminManageComponent, canActivate: [AdminGuard]},
  {path: 'instruction/tag/:id', component: InstructionByTagComponent},
  {path: 'instruction/category/:id', component: InstructionCategoryComponent},
  {path: 'instructions', component: InstructionComponent},
  {path: 'search', component: SearchComponent},
  {path: 'users', component: UsersComponent},

  {path: 'home', redirectTo:''},
  {path: '**', redirectTo: '404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule],
  providers: [{provide: APP_BASE_HREF, useValue: '/'}]
})
export class AppRoutingModule {
}
