import { inject, Injectable } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { UtilsService } from '../services/utils.service';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class noAuthGuard implements CanActivate {


  fireBaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);



  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree | boolean | UrlTree> {


    let user = localStorage.getItem('user');

    return new Promise((resolve) => {

      this.fireBaseSvc.getAuth().onAuthStateChanged((auth) => {
        if (!auth) {
          resolve(true)
        } else {
          this.utilsSvc.routerLInk('/lists')
          resolve(false);
        }
      })



    });


  }


}
