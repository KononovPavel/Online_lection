import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor( private router:Router, private postsService:PostsService
   ) { }

  posts:any;




  ngOnInit(): void {

    this.postsService.getPosts().subscribe(data=>{
      this.posts = data.posts;
    });

   
  }

}
