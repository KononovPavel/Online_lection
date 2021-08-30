import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
// Добавляем PostsService
import { PostsService } from '../posts.service';

// Router для возможности переадресации
import { Router } from '@angular/router';

@Component({
	selector: 'app-create-post',
	templateUrl: './create-post.component.html',
	styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

	title: String;
	anons: String;
	text: String;

	constructor(
		private router: Router,
		private flashMessages: FlashMessagesService,
		private postsService: PostsService // Переменную создаем
	) { }

	ngOnInit() {
	}

	onSubmit() {
		const post = {
			title: this.title,
			anons: this.anons,
			text: this.text
		};

		if(post.title == undefined) {
			this.flashMessages.show("Название статьи не указано", {
				cssClass: 'alert-danger',
				timeout: 4000
			});
			return false;
		} else if(post.title.length < 5) {
			this.flashMessages.show("Название статьи не менее 5 символов", {
				cssClass: 'alert-danger',
				timeout: 4000
			});
			return false;
		} else if(post.anons == undefined) {
			this.flashMessages.show("Тема статьи не указан", {
				cssClass: 'alert-danger',
				timeout: 4000
			});
			return false;
		} else if(post.anons.length < 15) {
			this.flashMessages.show("Тема статьи не менее 15 символов", {
				cssClass: 'alert-danger',
				timeout: 4000
			});
			return false;
		} else if(post.text == undefined) {
			this.flashMessages.show("Текст статьи не указан", {
				cssClass: 'alert-danger',
				timeout: 4000
			});
			return false;
		} else if(post.text.length < 25) {
			this.flashMessages.show("Текст статьи не менее 25 символов", {
				cssClass: 'alert-danger',
				timeout: 4000
			});
			return false;
		}

		// Добавляем статью через сервис PostsService
		this.postsService.addPost(post).subscribe(data => {
			if(!data.success) {
				this.flashMessages.show(data.msg, {
					cssClass: 'alert-danger',
					timeout: 2000
				});
				this.router.navigate(['/post/create']);
			} else {
				this.flashMessages.show(data.msg, {
					cssClass: 'alert-success',
					timeout: 2000
				});
				// На главную пересылаем пользователя
				this.router.navigate(['/']);
			}
		});
	}
}