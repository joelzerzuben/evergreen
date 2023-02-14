import { Component } from '@angular/core';
import {faBook, faLeaf, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../auth.service';
import { MatTabChangeEvent } from '@angular/material/tabs';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bottom-nav',
  templateUrl: './bottom-nav.component.html',
  styleUrls: ['./bottom-nav.component.css']
})
export class BottomNavComponent {
  auth: AuthService;
  private router : Router;
  leaf = faLeaf;
  book = faBook;
  logoutIcon = faRightFromBracket;

  constructor(auth: AuthService, router:Router){
    this.auth = auth;
    this.router = router;
  }

  navigate(event: MatTabChangeEvent) {
    if( event.tab.textLabel === "Logout" ){
      this.auth.logout()
    } else if( event.tab.textLabel === "Lexikon" ){
      this.router.navigate(["/lexikon"]);
    } else{
      this.router.navigate(["/dashboard"]);
    }
  }

  getActiveTab() {
    let currRoute = this.router.url
    if(currRoute.includes("lexikon")  ){
      return 1;
    } else {
      return 0;
    }
  }

 

}
