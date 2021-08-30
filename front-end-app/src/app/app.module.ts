import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthorizationComponent } from './authorization/authorization.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';


import { RouterModule, Routes } from '@angular/router';
import { ContactsComponent } from './contacts/contacts.component';
import { FooterComponent } from './footer/footer.component';

import { FormsModule } from '@angular/forms';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { ChekFromService } from './chek-from.service';
import { CreatePostComponent } from './create-post/create-post.component';
import { AuthService } from './auth.service';
import {HttpModule} from '@angular/http';
import{ PostsService } from './posts.service';
import { ShowPostComponent } from './show-post/show-post.component';
import { IsLoggedIn } from './isLogged.guard';
import { CreateTestComponent } from './create-test/create-test.component';



const appRoute: Routes = [

  {path:'', component:HomeComponent},
  {path:'registration', component:RegistrationComponent},
  {path:'authorization', component:AuthorizationComponent},
  {path:'dashboard', component:DashboardComponent, canActivate:[IsLoggedIn]},
  {path:'contacts', component:ContactsComponent},
  {path:'post/create', component:CreatePostComponent},
  {path: 'post/:id', component: ShowPostComponent},
  {path:'tests/create', component:CreateTestComponent}
 
];
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RegistrationComponent,
    AuthorizationComponent,
    DashboardComponent,
    HomeComponent,
    ContactsComponent,
    FooterComponent,
    CreatePostComponent,
    CreateTestComponent,
    ShowPostComponent,
  
    
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoute),
    FormsModule,
    FlashMessagesModule.forRoot(),
    HttpModule
    




  ],
  providers: [ChekFromService, AuthService, IsLoggedIn],
  bootstrap: [AppComponent]
})
export class AppModule { }
