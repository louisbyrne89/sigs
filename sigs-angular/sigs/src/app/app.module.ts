import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgReduxModule } from '@angular-redux/store';
import { NgReduxRouterModule } from '@angular-redux/router';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@app/store/store.module';
import { SigsMainAppModule } from '@app/sigs-main-app/sigs-main-app.module';
import { BlogModule } from '@app/blog/blog.module';
import { CoreModule } from '@app/core/core.module';
import { SharedModule } from '@app/shared/shared.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { EnvironmentService } from '@environments/environment.service';

@NgModule({
  declarations: [
    AppComponent,    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule,
    NgReduxModule,
    NgReduxRouterModule,
    SigsMainAppModule,
    BlogModule,
    CoreModule,
    SharedModule,
    MDBBootstrapModule.forRoot(),
    Ng2GoogleChartsModule,
  ],
  providers: [
    EnvironmentService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
