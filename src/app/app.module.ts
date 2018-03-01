import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


//components
import { AppComponent } from './app.component';
import { Container6Component, ModalContentComponent} from './container-6/container-6.component';
import { MachineContainerComponent } from './machine-container/machine-container.component';
import { RegisterButtonsComponent } from './register-buttons/register-buttons.component';
import { UserContainerComponent } from './user-container/user-container.component';
import { NavContainerComponent } from './nav-container/nav-container.component';
import { LoginComponent } from './login/login.component';
import { BottomNavComponent } from './bottom-nav/bottom-nav.component';
import { RegisterScoreComponent } from './register-score/register-score.component';
import { MachineUserChartComponent } from './machine-user-chart/machine-user-chart.component'

//services
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';

//external
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFireDatabaseModule } from 'angularfire2/database';
//import { AngularFireStorageModule } from 'angularfire2/storage';
import { BsDropdownModule } from 'ngx-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal';
import { 
  MatPaginatorModule, 
  MatTableModule, 
  MatStepperModule, 
  MatFormFieldModule, 
  MatInputModule, 
  MatSelectModule,
  MatCardModule,
  MatTabsModule, 
} from '@angular/material';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { WebcamModule } from 'ngx-webcam';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { AmChartsModule } from "@amcharts/amcharts3-angular";

import {
  AuthMethods,
  AuthProvider,
  AuthProviderWithCustomConfig,
  CredentialHelper,
  FirebaseUIAuthConfig,
  FirebaseUIModule
} from 'firebaseui-angular';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FiveNewestScoresComponent } from './five-newest-scores/five-newest-scores.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { FirebaseService } from './services/firebase.service';

const facebookCustomConfig: AuthProviderWithCustomConfig = {
  provider: AuthProvider.Facebook,
  customConfig: {
    scopes: [
      'public_profile',
      'email',
      'user_likes',
      'user_friends'
    ],
    customParameters: {
      // Forces password re-entry.
      auth_type: 'reauthenticate'
    }
  }
};

const firebaseUiAuthConfig: FirebaseUIAuthConfig = {
  providers: [
    AuthProvider.Google,
    //facebookCustomConfig,
    AuthProvider.Password
    //AuthProvider.Twitter,
    //AuthProvider.Github,
    //AuthProvider.Phone
  ],
  method: AuthMethods.Popup,
  tos: '<your-tos-link>',
  credentialHelper: CredentialHelper.AccountChooser
};

const appRoutes: Routes = [
  { 
    path: 'index',
    canActivate: [AuthGuardService],
    component: MachineContainerComponent 
  },
  { 
    path: 'user',
    canActivate: [AuthGuardService],
    component: UserContainerComponent 
  },
  {
    path: 'score',
    canActivate: [AuthGuardService],
    component: RegisterScoreComponent
  },
  {
    path: 'userSettings',
    canActivate: [AuthGuardService],
    component: UserSettingsComponent
  },
  // { path: '',
  //   redirectTo: '/index',
  //   pathMatch: 'full'
  // }
  {
    path: '',
    component: LoginComponent
  }
  //{ path: '**', component: PageNotFoundComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    Container6Component,
    MachineContainerComponent,
    RegisterButtonsComponent,
    UserContainerComponent,
    NavContainerComponent,
    LoginComponent,
    ModalContentComponent,
    BottomNavComponent,
    RegisterScoreComponent,
    MachineUserChartComponent,
    FiveNewestScoresComponent,
    UserSettingsComponent
  ],
  entryComponents: [
    ModalContentComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    ),
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule, // imports firebase/firestore, only needed for database features
    //AngularFireStorageModule, // imports firebase/storage only needed for storage features
    AngularFireAuthModule,
    FirebaseUIModule.forRoot(firebaseUiAuthConfig),
    BsDropdownModule.forRoot(),
    MatPaginatorModule, 
    MatTableModule,
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    ProgressbarModule.forRoot(),
    WebcamModule,
    TypeaheadModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatFormFieldModule, 
    MatInputModule,
    MatSelectModule,
    AmChartsModule,
    MatCardModule,
    MatTabsModule
  ],
  providers: [AuthService, AuthGuardService, FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
