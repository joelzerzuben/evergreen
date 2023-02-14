import {Component} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { faLeaf } from '@fortawesome/free-solid-svg-icons';
import {MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import {Router}  from '@angular/router';

import { HttpClientModule,HttpHeaders, HttpClient } from '@angular/common/http';
import { sha256 } from 'js-sha256';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private http: HttpClient, private _snackBar: MatSnackBar, private router: Router) { }

  //Icons
  icon = faLeaf;

  //Form
  loginForm = new FormGroup({
    username : new FormControl('', [Validators.required]),
    password : new FormControl('', [Validators.required])
  });

  goToRegister(){
    this.router.navigate(["/register"]);
  }
  
  submitLogin() {
    if (this.loginForm.valid) {
      // API Call
      let headers = new HttpHeaders({
        'Access-Control-Allow-Origin':'*',
        'x-access-token': '',
      });
      const body = {
        username : this.loginForm.controls.username.value,
        password : sha256( (this.loginForm.controls.password.value || '' ).toString() )
      }
      this.http
        .post<any>('http://localhost:3000/api/user/login', body, {
          headers: headers
        })
        .subscribe(data => {
          if(data.valid){
            localStorage.setItem('token', data.token);
            this.router.navigate(['/dashboard'])
          } else{
            this._snackBar.open('Benutzername und Password stimmen nicht überein', 'x', {
              duration : 3000
            });
          }
        });
      }      
	}

}
