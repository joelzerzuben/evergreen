import { Injectable } from "@angular/core";
import { JwtModule } from "@auth0/angular-jwt";
import {Router}  from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 

  constructor(
    private router: Router
  ) { }

  //TODO
  //An autorefrehs Token function would be cool but not nessecary

  check() : void{
    if(this.expired()){
      this.logout();
    }
  }

  logout() : void{
    localStorage.setItem('token', '');
    this.router.navigate(['/login']);
  }

  expired() : boolean{
    if(!localStorage.getItem("token")){
        return true;
    } else{
      const expiry = (JSON.parse(atob((localStorage.getItem("token")??'').split('.')[1]))).exp;
      return  (Math.floor((new Date).getTime() / 1000))  >= expiry
    }
  }

  token() : string{
    return localStorage.getItem("token") ?? '';
  }

}
