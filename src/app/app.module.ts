import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, RequestOptions, XHRBackend } from '@angular/http';
import { HttpService } from './shared/http.service';
import { PostService } from './posts/post.service';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent, HelloModalContentComponent, ListModalContentComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './heroe-detail/hero-detail.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroService } from './services/hero.service';
import { ExpenseReportComponent } from './expense-report/expense-report.component';
import { PostComponent }  from './posts/post.component';

import { ModalModule } from '../modal';

@NgModule({
    declarations: [
        HelloModalContentComponent,
        ListModalContentComponent,
        AppComponent,
        DashboardComponent,
        HeroDetailComponent,
        HeroesComponent,
        ExpenseReportComponent,
        PostComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule,
        ModalModule.forRoot()
    ],
    entryComponents: [HelloModalContentComponent, ListModalContentComponent],
    providers: [
        {
            provide: HttpService,
            useFactory: useFactory,
            deps: [XHRBackend, RequestOptions]
        },
        HeroService,
        PostService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

export function useFactory (backend: XHRBackend, options: RequestOptions) {
    return new HttpService(backend, options);
}
