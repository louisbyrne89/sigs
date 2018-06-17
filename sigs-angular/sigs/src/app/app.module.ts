import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgReduxModule } from '@angular-redux/store';
import { NgReduxRouterModule } from '@angular-redux/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@app/store/store.module';
import { SigsMainAppModule } from '@app/sigs-main-app/sigs-main-app.module';
import { BlogModule } from '@app/blog/blog.module';
import { CoreModule } from '@app/core/core.module';
import { SharedModule } from '@app/shared/shared.module'

@NgModule({
  declarations: [
    AppComponent,    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule,
    NgReduxModule,
    NgReduxRouterModule,
    SigsMainAppModule,
    BlogModule,
    CoreModule,
    SharedModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
