import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import {map} from 'rxjs/operators';
import { tokenNotExpired } from 'angular2-jwt';
@Injectable({
  providedIn: 'root'
})
export class AuthService {


  token:any;
  user:any;
  constructor(private http:Http) { }
    

  registerUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(
      'http://localhost:3000/account/registration',
      user,
      {headers: headers}).pipe(map((response: any) => response.json()));
  }

  authUser(user){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(
      'http://localhost:3000/account/authorization',user,{headers: headers}).pipe(map((response: any) => response.json()));
  }

storeUser(token,user){
  localStorage.setItem('token',token);//обращение к локальному хранилищу
  localStorage.setItem('user', JSON.stringify(user));
  this.token = token;
  this.user = user;
}
logout(){
  this.token = null;
  this.user = null;
  localStorage.clear();
}
//получает значение авторизован пользователь или нет?
isLoggedIn(){
  return tokenNotExpired();
}
  getUserByLogin(login){
    let headers = new Headers();
			headers.append('Content-Type', 'application/json');
			return this.http.get('http://localhost:3000/post/one/',{headers: headers}).pipe(map((response: any) => response.json()));
  }

}

