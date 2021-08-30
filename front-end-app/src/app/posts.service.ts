import { Injectable } from '@angular/core';

// Импортируем необходимые классы
import {Http, Headers} from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class PostsService {

	constructor(private http: Http) { }

	addPost(post) {
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		return this.http.post(
		  'http://localhost:3000/post/create',
		  post,
		  {headers: headers}).pipe(map((response: any) => response.json()));
		} 

		getPosts(){
			let headers = new Headers();
			headers.append('Content-Type', 'application/json');
			return this.http.get('http://localhost:3000/post/all',{headers: headers}).pipe(map((response: any) => response.json()));
		}

		getOnePost(id:any){
			let headers = new Headers();
			headers.append('Content-Type', 'application/json');
			return this.http.get('http://localhost:3000/post/one/' + id,{headers: headers}).pipe(map((response: any) => response.json())); 
		}
}