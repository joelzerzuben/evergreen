import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { faBottleWater, faTemperatureHigh, faTemperatureLow, faSun, faEarthEurope, faSeedling, faPlus, faHourglass, faEdit, faSkullCrossbones, faGlobeEurope } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../auth.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-lexikon-detail',
  templateUrl: './lexikon-detail.component.html',
  styleUrls: ['./lexikon-detail.component.css']
})
export class LexikonDetailComponent {

  auth: AuthService;
  lexikon:any
  plant:any
  router:Router;
  raum : string = 'Balkon'
  beschreibung = ''

  //Icons
  waterIcon = faBottleWater;
  temp_low = faTemperatureLow;
  temp_high = faTemperatureHigh;
  sun = faSun;
  earth = faEarthEurope;
  seedling = faSeedling;
  clock = faHourglass
  edit = faEdit
  tot = faSkullCrossbones
  erde = faGlobeEurope

  constructor(
    auth: AuthService,
    router: Router,
    private route: ActivatedRoute,
    private http: HttpClient, 
    private _snackBar: MatSnackBar, 
  ){
    this.auth = auth
    this.router=router;
    this.lexikon = JSON.parse((localStorage.getItem("lexikon") ?? "{}"));
    this.plant = this.lexikon.filter( (plant:any) => plant?._id == this.route.snapshot.paramMap.get('id') )
    console.log(  this.plant );

    if(this.plant.length==0){
      router.navigate(['lexikon']);
    }
    this.plant = this.plant[0]

    auth.check();
  }

  gotToLexikon() : void{
    this.router.navigate(["/lexikon"]);
  }

  convertSun(number: number) : string {
    if(number==0){
      return 'schattig';
    }else if(number==1){
      return 'halbschattig';
    } else {
      return 'sonnig';
    }
  }

  changeRaum(raum:string){
    this.raum = raum;
  }

  addPlant(){

    let headers = new HttpHeaders({
      'Access-Control-Allow-Origin':'*',
      'x-access-token': this.auth.token(),
    });
    let body = {
      "name" : this.plant.name,
      "beschreibung" : this.beschreibung,
      "raum" : this.raum,
      "kategorie" : this.plant.kategorie,
      "lichtbedarf_min" : this.plant.licht_min,
      "lichtbedarf_max" : this.plant.licht_max,
      "wasser_min" : this.plant.wasser_min,
      "wasser_max" : this.plant.wasser_max,
      "boden" : this.plant.boden,
      "temperatur_min" : this.plant.temperatur_min,
      "temperatur_max" : this.plant.temperatur_max,
      "bild" : this.plant.bild,

    }
    this.http
      .post<any>('http://localhost:3000/api/user/plant/create', body, {
        headers: headers
      })
      .subscribe(data => {
        if( data.error != 0 ){
          this._snackBar.open('Füllen Sie bitte alle Felder aus', '', {
            duration : 3000
          });
        } else{
          this.router.navigate(['dashboard']);
        }
       
      });
    
  }

}
