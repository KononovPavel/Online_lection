import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})


export class DashboardComponent implements OnInit {
  
  
  constructor(private flash : FlashMessagesService,
    private router: Router,
    private AuthService:AuthService) { }
    user:any;

  ngOnInit(): void {
   
  }
  LogoutUser(){
    this.AuthService.logout();
    this.flash.show("Вы вышли из учетной записи",{
      cssClass:'alert-warning',
      timeout:4000
    });
    this.router.navigate(['./authorization']);
    return false;
  };

}
