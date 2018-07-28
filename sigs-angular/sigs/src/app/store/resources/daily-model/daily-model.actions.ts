import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';

import { DailyModelValueStateFactory } from './daily-model.state';
import { ApiResourceActions } from '../../common/common-api.actions';
import { IAppStateRecord } from '@app/store/index.state';
import { EnvironmentService } from '@environments/environment.service';



@Injectable()
export class DailyModelActions extends  ApiResourceActions {
  static readonly RESET = 'resources/companies/RESET';
  static readonly SET_COUNT = 'resources/companies/SET_COUNT';

  constructor(
    protected http: HttpClient,
    protected environmentService: EnvironmentService,
    protected store: NgRedux<IAppStateRecord>,
  ) {
      super(http, environmentService, store, 'sigs', 'daily_global_irradiance', 'dailyModel');
    }

    getParams(filters: any): HttpParams {
      console.log(filters)
      console.log("BYRNE")
      // Return a list of ids following the rules provided as inputs
      // Since we do the filtering server side, setting up the filters consist in building the url with the right filters
      let params = new HttpParams();
      if (filters.hasOwnProperty('latitude')) {
        console.log("TST")
        params = params.append('latitude', filters['latitude'])
      } 

      if (filters.hasOwnProperty('longitude')) {
        console.log("LOUIS")
        params = params.append('longitude', filters['longitude'])
      }
      params = params.append('ordering', 'date')
      return params;
    }
    
    convertJsonToStoreRecord(item: any): any {
      return DailyModelValueStateFactory({
        id: item.id,
        latitude: item.latitude,
        longitude: item.longitude,
        date: this.convertStringToDate(item.date),
        value: item.horizontal_CMSAF
      })      
    }
  
    convertStoreRecordToJson(_item: any, _optionalParams?: any): any {
  
    };
  }
