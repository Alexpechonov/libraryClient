import {Injectable} from "@angular/core";
import {CanActivate, Router} from "@angular/router";
import {AuthService} from "../services/auth.service";

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private router: Router) {
  }

  canActivate() {
    if (AuthService.isAdmin()) {
      return true;
    }

    this.router.navigate(['/404']);
    return false;
  }
}
