import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import {Router}  from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { faBottleWater, faTemperatureHigh, faTemperatureLow, faSun, faEarthEurope, faSeedling, faPlus, faHourglass, faEdit, faSkullCrossbones, faPlantWilt } from '@fortawesome/free-solid-svg-icons';
import {User} from '../model/user';
import { MatDialog } from '@angular/material/dialog';
import { EditRaumComponent } from '../dialog/edit-raum/edit-raum.component';
import * as moment from 'moment';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent {
  auth: AuthService;
  dialog: MatDialog
  router: Router;
  userData : User;
  searchterm : string = '';

  constructor( auth: AuthService,
    private http: HttpClient, 
    private _snackBar: MatSnackBar, 
    router: Router,
    dialog: MatDialog
    ) {
    this.auth = auth
    this.router = router;
    this.dialog = dialog
    this.userData = JSON.parse((localStorage.getItem("userData") ?? "{}"))
    auth.check()
  }

    //Icons
    waterIcon = faBottleWater;
    temp_low = faTemperatureLow;
    temp_high = faTemperatureHigh;
    sun = faSun;
    earth = faEarthEurope;
    seedling = faSeedling;
    clock = faHourglass
    plus = faPlus
    edit = faEdit
    tot = faSkullCrossbones
    pflanzeKaputt = faPlantWilt

    convertSun(number: number) : string {
      if(number==0){
        return 'schattig';
      }else if(number==1){
        return 'halbschattig';
      } else {
        return 'sonnig';
      }
    }

    waessern(item : any) : void{
      let headers = new HttpHeaders({
        'Access-Control-Allow-Origin':'*',
        'x-access-token': this.auth.token(),
      });
      let body = {
        "_id" : item._id
      }
      this.http
        .post<any>('http://localhost:3000/api/user/plant/water/add', body, {
          headers: headers
        })
        .subscribe(data => {
          this._snackBar.open('Daten erfolgreich gespeichert', '', {
            duration : 3000
          });
          // muss so gemacht werden, gibt sonst kein rerendering
          item.waesserungen = [... item.waesserungen, new Date().toISOString()];
        });
    }

    editName(item:any){
      let headers = new HttpHeaders({
        'Access-Control-Allow-Origin':'*',
        'x-access-token': this.auth.token(),
      });
      let body = {
        "_id" : item._id,
        "beschreibung" : item.beschreibung,
        "raum" : item.raum,
        "alive" : item.alive,
      }
      this.http
        .post<any>('http://localhost:3000/api/user/plant/update', body, {
          headers: headers
        })
        .subscribe(data => {
          if(data.error==0){
            this._snackBar.open('Daten erfolgreich gespeichert', '', {
              duration : 3000
            });
          } else{
            this._snackBar.open('Es ist ein Fehler aufgetreten', '', {
              duration : 3000
            });
          }
          
        });
    }

    openEditDialog(item:any){
      let dialogRef = this.dialog.open(EditRaumComponent);
      let instance = dialogRef.componentInstance;
      instance.selectedRoom= item.raum;
      dialogRef.afterClosed().subscribe(result => {
        if(!result){
          return;
        }
        if(result.event == 'Edit'){
          item.raum = result.room

          let headers = new HttpHeaders({
            'Access-Control-Allow-Origin':'*',
            'x-access-token': this.auth.token(),
          });
          let body = {
            "_id" : item._id,
            "beschreibung" : item.beschreibung,
            "raum" : result.room,
            "alive" : item.alive,
          }
          this.http
            .post<any>('http://localhost:3000/api/user/plant/update', body, {
              headers: headers
            })
            .subscribe(data => {
              if(data.error==0){
                this._snackBar.open('Daten erfolgreich gespeichert', '', {
                  duration : 3000
                });
              } else{
                this._snackBar.open('Es ist ein Fehler aufgetreten', '', {
                  duration : 3000
                });
              }
              
            });



        }
      });

    }

    pflanzeEntfernen(item:any) : void{

      let headers = new HttpHeaders({
        'Access-Control-Allow-Origin':'*',
        'x-access-token': this.auth.token(),
      });
      let body = {
        "id" : item._id
      }
      this.http
        .post<any>('http://localhost:3000/api/user/plant/delete', body, {
          headers: headers
        })
        .subscribe(data => {
          if(data.error == 0){
            const objIndex = this.userData.plants.findIndex(el => {
              return el._id ==  item._id;
            });
            this.userData.plants.splice(objIndex, 1);
            this._snackBar.open('Pflanze erfolgreich entfernt', '', {
              duration : 3000
            });
          } else {
            this._snackBar.open('Es ist ein Fehler aufgetreten', '', {
              duration : 3000
            });
          }
        });
    }
   

  ngOnInit(){

    //GET Data
    let headers = new HttpHeaders({
      'Access-Control-Allow-Origin':'*',
      'x-access-token': this.auth.token(),
    });
    this.http
      .get<any>('http://localhost:3000/api/user/get', {
        headers: headers
      })
      .subscribe(data => {
        data.plants.sort(
          function(a:any, b:any){
            let waterAOffset = (a.wasser_max + a.wasser_min)/2
            let waterBOffset = (b.wasser_max + b.wasser_min)/2
            let waterA = moment(a["waesserungen"][ a["waesserungen"].length-1 ]  ).add(waterAOffset, 'd').unix()
            let waterB = moment(b["waesserungen"][ b["waesserungen"].length-1 ]  ).add(waterBOffset, 'd').unix()

            if(waterA> waterB){
              return 1
            } else if(waterA == waterB){
              return 0;
            } else {
              return -1;
            }
          }
      );
        localStorage.setItem('userdata', JSON.stringify(data));
        this.userData = data;
      });
    }  
  }

