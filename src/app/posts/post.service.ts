import {Injectable} from '@angular/core';
import {RequestMethod} from '@angular/http';

import {ResourceAction, ResourceMethod, ResourceParams} from 'ng2-resource-rest';
import {RestClient} from '../shared/rest-client';

export interface IQueryInput {
    page?: number;
    perPage?: number;
    dateFrom?: string;
    dateTo?: string;
    isRead?: string;
}

export  interface IPost {
    id?: number;
    title?: string;
    body?: string;
}

@Injectable()
@ResourceParams({
    url: '/posts'
})
export class PostService extends RestClient {

    @ResourceAction({
        isArray: false,
        path: '/',
        auth: true
    })
    getPosts: ResourceMethod<IQueryInput, IPost[]>;

    @ResourceAction({
        path: '/{!id}'
    })
    getPost: ResourceMethod<{id: any}, IPost>;

    @ResourceAction({
        method: RequestMethod.Post
    })
    savePost: ResourceMethod<IPost, any>;

    @ResourceAction({
        method: RequestMethod.Put,
        path: '/{!id}'
    })
    updatePost: ResourceMethod<IPost, any>;

    @ResourceAction({
        method: RequestMethod.Delete,
        path: '/{!id}'
    })
    deletePost: ResourceMethod<{id: any}, any>;
}