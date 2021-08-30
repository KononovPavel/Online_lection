import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})
export class AuthorizationComponent implements OnInit {

  login:string;
  password:string;

  constructor(
    private flash : FlashMessagesService,
    private router: Router,
    private AuthService:AuthService) { }

  ngOnInit(): void {
  }
 userLoginClick(){
   const user = {
     login:this.login,
     password:this.password
   };
   if (user.password== undefined){
     this.flash.show("Введите пароль",{
       cssClass:'alert-danger',
       timeout:4000
     });
     return false;
   }


  this.AuthService.authUser(user).subscribe(data =>{
    if(!data.success){
      this.flash.show(data.message , {

        cssClass : 'alert-danger', timeout:4000});
      }
       else {
        this.flash.show("Вы успешно авторизовались",{
          cssClass : 'alert-success', timeout:4000});
          this.router.navigate(['/dashboard']);
          this.AuthService.storeUser(data.token, data.user);
      }
    });
  }
}
