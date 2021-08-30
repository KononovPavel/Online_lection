import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';

// Эти библиотеки нам нужны для получения значения из URL
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-show-post',
	templateUrl: './show-post.component.html',
	styleUrls: ['./show-post.component.css']
})
export class ShowPostComponent implements OnInit {

	// В неё мы поместим пост что получим из базы данных
	post: any;
	// Сюда поместим ID статьи, что возьмем из URL адреса
	id: String;

	constructor(
		private postsService: PostsService,
		private route: ActivatedRoute
	) { }

	ngOnInit() {
		// Получаеем значение из URL по его названию
		this.id = this.route.snapshot.paramMap.get('id');

		// Вызываем нужную для нас функцию
		this.postsService.getOnePost(this.id).subscribe(data => {
			this.post = data.post;
		});
	}
}