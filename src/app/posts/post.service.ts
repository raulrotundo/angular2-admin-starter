import { Injectable } from '@angular/core';
import {HttpService} from '../shared/http.service';

@Injectable()
export class PostService {
    constructor (private http: HttpService) {}

    // token will added automatically to get request header
    getPost (id: number) {
        return this.http.get(`https://jsonplaceholder.typicode.com/posts/${id}`).map((res) => {
            return res.json();
        } );
    }

    getPosts() {
        return this.http.get('https://jsonplaceholder.typicode.com/posts').map((res) => {
            return res.json();
        });
    }
}