import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PostService } from './post.service';

@Component({
    selector: 'my-heroes',
    templateUrl: './post.component.html'
})

export class PostComponent {

    posts: Array<any>;

    constructor(private postService: PostService) { }

    getPosts(): void {
        this.postService.getPosts().subscribe((resp) => {
            this.posts = resp;
        });
    }
}