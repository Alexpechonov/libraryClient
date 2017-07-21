import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {UserService} from "./services/user.service";
import {HttpModule, Http, RequestOptions} from "@angular/http";
import {FormsModule} from "@angular/forms";
import {AuthService} from "./services/auth.service";
import {MaterializeModule} from "angular2-materialize";
import {CommonModule} from "@angular/common";
import {AuthHttp} from "angular2-jwt";
import {authHttpServiceFactory} from "./factories/auth.factory";
import {TranslateModule, TranslateLoader} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {NgSpinningPreloader} from "./components/common/preloader/ng-spinning-preloader.service";
import {NavigationComponent} from "./components/common/navigation/navigation.component";
import {HomeComponent} from "./components/home/home.component";
import {ProfileComponent} from "./components/user/profile/profile.component";
import {AuthGuard} from "./guards/auth.guard";
import {Ng2CloudinaryModule} from "ng2-cloudinary";
import {FileUploadModule} from "ng2-file-upload";


export function HttpLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http, "assets/i18n/", ".json");
}

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    MaterializeModule,
    Ng2CloudinaryModule,
    FileUploadModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [Http]
      }
    })
  ],
  providers: [
    UserService,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    },
    AuthService,
    NgSpinningPreloader,
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
