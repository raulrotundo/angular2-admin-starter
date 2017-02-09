import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import 'rxjs/add/operator/filter';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
    title = '';

    constructor(private activatedRoute: ActivatedRoute, private router: Router) { }

    ngOnInit() {
        this.router.events
            .filter(event => event instanceof NavigationEnd)
            .subscribe(event => {
                let currentRoute = this.activatedRoute.root;
                while (currentRoute.children[0]) {
                    currentRoute = currentRoute.children[0];
                }
                this.title = (<any>currentRoute.snapshot.data).title;
            });
    }
}