import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from '@app/blog/dashboard/dashboard.component';
import { ArticleComponent } from '@app/blog/article/article.component';
import { SigsMainComponent } from '@app/sigs-main-app/sigs-main/sigs-main.component';
import { AnalysisComponent } from '@app/sigs-main-app/analysis/analysis.component';


const routes: Routes = [
  {
    path: 'blog-dashboard',
    component: DashboardComponent,
  },
  {
    path: 'blog-article/:id',
    component: ArticleComponent,
  },
  {
    path: 'main',
    component: SigsMainComponent,
  },
  {
    path: 'analysis',
    component: AnalysisComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
