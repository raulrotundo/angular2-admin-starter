import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PostService, IPost } from './post.service';

@Component({
    moduleId: module.id,
    selector: 'my-heroes',
    templateUrl: './post.component.html'
})

export class PostComponent {

    constructor(private postService: PostService) { }

    getPosts(): void {
        console.log(this.postService.getPosts({page: 2, perPage: 10}));
    }
}