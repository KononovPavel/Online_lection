import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChekFromService {

  constructor() { }


  chekName(name:string){
    if(name == undefined){
      return false;
    }
    else{
      return true;
    }
  };

  chekFam(fam:string){
    if(fam == undefined){
      return false;
    }
    else{
      return true;
    }
  };

  cheklogin(login:string){
    if(login == undefined){
      return false;
    }
    else{
      return true;
    }
  };
  chekPassword(password:string){
    if(password == undefined){
      return false;
    }
    else{
      return true;
    }
  };
  chekGroup(group){
    if(group == undefined){
      return false;
    }
    else{
      return true;
    }
  };

}
