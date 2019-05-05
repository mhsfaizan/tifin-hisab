import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './services/authentication.service';
import { CanActivate } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate{
  constructor(private _auth: AuthenticationService,private router:Router) {
    console.log(this._auth.isLoggedIn());
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    if(! this._auth.isLoggedIn()){
      this.router.navigate(["/home"]) ;
      return false;
    }
    return true;
  }
}
