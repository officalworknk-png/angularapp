import { CanActivate, ActivatedRouteSnapshot, Router } from "@angular/router";
import { MainObjectService } from "core/services/master-object.service";

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root', // Ensure it's provided correctly
})
export class AbstractGuard  implements CanActivate {

    constructor(public object:MainObjectService, private router: Router) {
    }

    isAuthenticated(): boolean {
        // Example: Check if token exists in local storage
        return !!localStorage.getItem('token');
      }
    
      login(token: string) {
        localStorage.setItem('token', token);
      }
    
      logout() {
        localStorage.removeItem('token');
      }
    canActivate(): boolean {
        console.log("LOGIN===>",this.isAuthenticated())
        if (this.isAuthenticated()) {
          return true; // Allow access if user is authenticated
        } else {
          this.router.navigate(['/']); // Redirect to login if not authenticated
          this.object.isLogin =false
          return false;
        }
      }
}