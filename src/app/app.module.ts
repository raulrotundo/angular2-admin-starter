import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {ResourceModule} from 'ng2-resource-rest';

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
    ModalModule.forRoot(),
    ResourceModule.forRoot()
  ],
  entryComponents: [HelloModalContentComponent, ListModalContentComponent],
  providers: [HeroService],
  bootstrap: [AppComponent]
})
export class AppModule { }
