import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RouteGuard implements  CanActivate{
  constructor(private route:Router,private authSrvice:AuthService){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.authSrvice.isUserLogged()
    .pipe(map(d=>{
      if(d){
        return true
      }
      else{
        this.route.navigate(['/login'])
        return false
      }     
    }))
  }
  
}
