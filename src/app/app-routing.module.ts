import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent }   from './dashboard/dashboard.component';
import { HeroesComponent }      from './heroes/heroes.component';
import { HeroDetailComponent }  from './heroe-detail/hero-detail.component';
import { ExpenseReportComponent }  from './expense-report/expense-report.component';
import { PostComponent }  from './posts/post.component';

const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent, data: {title: 'Dashboard'} },
    { path: 'detail/:id', component: HeroDetailComponent, data: {title: 'Details'} },
    { path: 'heroes', component: HeroesComponent, data: {title: 'Heroes'} },
    { path: 'expense-report', component: ExpenseReportComponent, data: {title: 'Expense Report'} },
    { path: 'posts', component: PostComponent, data: {title: 'Posts'} }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})

export class AppRoutingModule {}