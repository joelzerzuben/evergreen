import { Component } from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { faLeaf } from '@fortawesome/free-solid-svg-icons';
import {MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import {Router}  from '@angular/router';
import Validation from './password-match'

import { HttpClientModule,HttpHeaders, HttpClient } from '@angular/common/http';
import { sha256 } from 'js-sha256';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private http: HttpClient, private _snackBar: MatSnackBar, private router: Router) { }

  //Icons
  icon = faLeaf;
  

  //Form
  registerForm = new FormGroup({
    username : new FormControl('', [Validators.required]),
    password : new FormControl('', [Validators.required, Validators.minLength(8)]),
    password2 : new FormControl('', [Validators.required])
  },{
    validators: [Validation.match('password', 'password2')]
  });

  goToLogin(){
    this.router.navigate(["/login"]);
  }


  submitRegister() {
    if (this.registerForm.valid) {
      // API Call
      let headers = new HttpHeaders({
        'Access-Control-Allow-Origin':'*',
        'x-access-token': '',
      });
      const body = {
        username : this.registerForm.controls.username.value,
        password_hash : sha256( (this.registerForm.controls.password.value || '' ).toString() )
      }
      this.http
        .post<any>('http://localhost:3000/api/user/register', body, {
          headers: headers
        })
        .subscribe(data => {
          if(data.valid){
            localStorage.setItem('token', data.token);
            this.router.navigate(['/dashboard'])
          } else{
            this._snackBar.open(data.msg, 'x', {
              duration : 3000
            });
          }
        });
      }   
	}

}
