import {Resource} from 'ng2-resource-rest';
import {Observable} from 'rxjs/Observable';
import {Subscriber} from 'rxjs/Subscriber';
import {Request, Response} from '@angular/http';

export class RestClient extends Resource {

    getHeaders(methodOptions?: any): any {
        let headers: any = {};

        if (methodOptions.auth) {
            headers.Authorization = localStorage.getItem('token');
        }

        return headers;
    }

    getUrl(methodOptions?: any): string | Promise<string> {
        let resPath = super.getUrl();
        return 'https://jsonplaceholder.typicode.com' + resPath;
    }

    responseInterceptor(observable: Observable<any>, request?: Request): Observable<any> {

        return Observable.create((subscriber: Subscriber<any>) => {

            observable.subscribe(
                (res: Response) => {
                    if (res.headers) {
                        let newToken: string = res.headers.get('Authorization');
                        if (newToken) {
                            localStorage.setItem('token', newToken);
                        }
                    }
                    subscriber.next((<any>res)._body ? res.json().data : null);
                },
                (error: Response) => {
                    // I also made a layer to parse errors
                    subscriber.error(new Error(error.toString()));
                },
                () => subscriber.complete()
                );

        });
    }
}