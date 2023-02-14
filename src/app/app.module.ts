import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import {HttpClientModule} from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { RegisterComponent } from './register/register.component';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatDividerModule} from '@angular/material/divider';
import {MatTabsModule} from '@angular/material/tabs';
import { BottomNavComponent } from './bottom-nav/bottom-nav.component';
import { LexikonComponent } from './lexikon/lexikon.component';
import { UserPlantFilterPipe } from './user-plant-filter.pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { UserPlantWaterDaysPipe } from './user-plant-water-days.pipe';
import { MatIconModule } from '@angular/material/icon'
import {MatDialogModule} from '@angular/material/dialog';
import { EditRaumComponent } from './dialog/edit-raum/edit-raum.component';
import { LexikonDetailComponent } from './lexikon-detail/lexikon-detail.component';


// Custom Components

const routes: Routes = [
  { path: '', redirectTo: 'login' , pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'lexikon', component: LexikonComponent },
  { path: 'lexikon/detail/:id', component: LexikonDetailComponent },
];


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    BottomNavComponent,
    LexikonComponent,
    UserPlantFilterPipe,
    UserPlantWaterDaysPipe,
    EditRaumComponent,
    LexikonDetailComponent,
  ],
  imports: [
    MatDialogModule,
    MatIconModule,
    Ng2SearchPipeModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatChipsModule,
    MatDividerModule,
    MatInputModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    FontAwesomeModule,
    HttpClientModule,
    MatSnackBarModule,
    RouterModule.forRoot(routes),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  exports : [
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
