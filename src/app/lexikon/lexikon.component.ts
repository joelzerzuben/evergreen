import { Component } from '@angular/core';
import { faBottleWater, faTemperatureHigh, faTemperatureLow, faSun, faEarthEurope, faSeedling, faPlus, faHourglass, faEdit, faSkullCrossbones } from '@fortawesome/free-solid-svg-icons';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Lexikon } from '../model/lexikon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lexikon',
  templateUrl: './lexikon.component.html',
  styleUrls: ['./lexikon.component.css']
})
export class LexikonComponent {
  searchterm : string = '';
  lexikon : Lexikon = JSON.parse((localStorage.getItem("lexikon") ?? "{}"))
  router: Router;

  constructor(
    private http: HttpClient,
    router: Router,
  ){
    this.router = router;
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

  ngOnInit(){

    //GET Data
    let headers = new HttpHeaders({
      'Access-Control-Allow-Origin':'*'
    });
    this.http
      .get<any>('http://localhost:3000/api/plant/getAll', {
        headers: headers
      })
      .subscribe(data => {
        localStorage.setItem('lexikon', JSON.stringify(data));
        this.lexikon = data;
      });
  } 

  navigateDetail(item:any){
    this.router.navigate(["/lexikon/detail", item._id] );
  }

}
