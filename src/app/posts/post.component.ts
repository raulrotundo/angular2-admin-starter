import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PostService } from './post.service';
import { Post } from './post';

@Component({
    selector: 'my-heroes',
    templateUrl: './post.component.html'
})

export class PostComponent {

    posts: Array<any>;
    post: Post = new Post;

    constructor(private postService: PostService) { }

    getPosts(): void {
        this.postService.getPosts().subscribe((resp) => {
            this.posts = resp;
        });
    }

    getPost() {
        this.postService.getPost(this.post.id).subscribe((resp) => {
            this.posts = [resp];
        });
    }
}