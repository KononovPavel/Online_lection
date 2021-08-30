import { Component, OnInit } from '@angular/core';
import { ChekFromService } from '../chek-from.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

import { FlashMessagesService } from 'angular2-flash-messages';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  name:string;
  fam:string;
  login:string;
  password:string;
  group:string;


//после подключения сервиса его нужно объявить в конструкторе
  constructor(private chekForm: ChekFromService,
              private flash : FlashMessagesService,
              private router: Router,
              private AuthService:AuthService
    ) { }

  ngOnInit(): void {
  }
  userRegisterClick(){
    const user = {
      name:this.name,
      fam:this.fam,
      login:this.login,
      password:this.password,
      group:this.group
    };
    if(!this.chekForm.chekName(user.name)){
      this.flash.show("Имя пользователя не введено",{cssClass : 'alert-danger', timeout:4000});
      return false;
}
if(!this.chekForm.chekFam(user.fam)){
  this.flash.show("Фамилия пользователя не введена",{cssClass : 'alert-danger', timeout:4000});
  return false;
}
 else if(!this.chekForm.cheklogin(user.login)){
  this.flash.show("Логин пользователя не введен",{cssClass : 'alert-danger', timeout:4000});
  return false;
}
 else if(!this.chekForm.chekPassword(user.password)){
  this.flash.show("Пароль пользователя не введен",{cssClass : 'alert-danger', timeout:4000});
  return false;
}
else if(!this.chekForm.chekGroup(user.group)){
  this.flash.show("Группа пользователя не введена",{cssClass : 'alert-danger', timeout:4000});
  return false;
}

  this.AuthService.registerUser(user).subscribe(data =>{
    if(!data.success){
      this.flash.show(data.message,{
        cssClass: 'alert-danger',
        timeout:4000
      });
      this.router.navigate(['/registration']);
    }
    else{
      this.flash.show(data.message,{
        cssClass: 'alert-success',
        timeout:2000
      });
      this.router.navigate(['/authorization']);
    }
  });

};




}
