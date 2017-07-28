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
import {TagService} from "./services/tag.service";
import {PageNotFound} from "./components/common/error/404/404";
import {InstructionService} from "./services/instruction.service";
import {InstructionUpdateComponent} from "./components/instruction/update/instruction.update.component";
import {DndModule} from "ng2-dnd";
import {ImageUploadComponent} from "./components/common/upload/upload.component";
import {InstructionWatchComponent} from "./components/instruction/watch/instruction.watch.component";
import {PartService} from "./services/part.service";
import {YoutubePlayerModule} from "ng2-youtube-player";
import {NgxPaginationModule} from "ngx-pagination";
import {MarkdownModule} from "angular2-markdown";
import {CommentService} from "./services/comment.service";
import {MaterialModule} from "@angular/material";


export function HttpLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http, "assets/i18n/", ".json");
}

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    PageNotFound,
    ProfileComponent,
    InstructionUpdateComponent,
    InstructionWatchComponent,
    ImageUploadComponent
  ],
  imports: [
    DndModule.forRoot(),
    MarkdownModule.forRoot(),
    NgxPaginationModule,
    BrowserModule,
    YoutubePlayerModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    MaterializeModule,
    MaterialModule,
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
    TagService,
    InstructionService,
    PartService,
    CommentService,
    NgSpinningPreloader,
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
