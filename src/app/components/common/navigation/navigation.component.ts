import {Component, OnInit} from "@angular/core";
import {User} from "../../../entities/user";
import {AuthService} from "../../../services/auth.service";
import {UserService} from "../../../services/user.service";
import {TranslateService} from "@ngx-translate/core";

declare var $: any;

@Component({
  moduleId: module.id,
  selector: 'common-nav',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  isLoggedIn: boolean;
  user: User = new User();
  isAdmin: boolean;

  constructor(private authService: AuthService,
              private userService: UserService,
              private translate: TranslateService) {
    this.initLanguage();
    this.user = userService.getAuthUser();
    this.isAdmin = AuthService.isAdmin();
    userService.authData.subscribe(item => {
      this.user = item;
      this.isAdmin = AuthService.isAdmin();
    });
    this.isLoggedIn = AuthService.loggedIn();
    authService.isLoggedIn.subscribe(item => {
      this.isLoggedIn = item;
      this.isAdmin = AuthService.isAdmin();
    });
  }

  ngOnInit(): void {
    NavigationComponent.setSideNav($(window).width());
    $(window).resize(function () {
      $('.button-collapse').sideNav('hide');
      $('.button-collapse').sideNav('destroy');
      NavigationComponent.setSideNav($(window).width());
    });
  }



  private initLanguage() {
    this.translate.addLangs(["en", "ru"]);
    this.translate.setDefaultLang('en');

    let browserLang = this.translate.getBrowserLang();
    this.changeLanguage(browserLang.match(/en|ru/) ? browserLang : 'en')
  }

  changeLanguage(language: string) {
    this.translate.use(language);
    $('#language').attr("src", `/assets/i18n/${language}.png`);
    $("#" + language + "-lan").prependTo("#language_dropdown");
  }

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }

  private static setSideNav(screenWidth: number) {
    if (screenWidth > 992) {
      $(".button-collapse").sideNav({
        menuWidth: 350,
        closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
        draggable: true, // Choose whether you can drag to open on touch screens
        edge: 'right'
      });
    } else {
      $(".button-collapse").sideNav({
        menuWidth: 250,
        closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
        draggable: true, // Choose whether you can drag to open on touch screens
        edge: 'right'
      });
    }
  }

}
