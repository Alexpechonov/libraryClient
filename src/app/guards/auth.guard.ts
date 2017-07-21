import {Injectable} from "@angular/core";
import {CanActivate, Router} from "@angular/router";
import {AuthService} from "../services/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router,
              private auth: AuthService) {}

  canActivate(){
    if(this.auth.loggedIn()) {
      return true;
    }

    this.router.navigate(['/']);
    return false;
  }

}
