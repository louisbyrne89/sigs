import 'rxjs/add/observable/of';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/share';
import { combineLatest } from 'rxjs'


import * as Immutable from 'immutable';
import { DatePipe } from '@angular/common';
import { NgRedux } from '@angular-redux/store';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { EnvironmentService } from '@environments/environment.service';
import { IAppStateRecord } from '../index.state';

export abstract class ApiResourceActions {
  static readonly ADD = 'common/api/ADD';
  static readonly REMOVE = 'common/api/REMOVE';
  static readonly UPDATE_PROPERTY = 'common/api/UPDATE_PROPERTY';

  readonly apiUrl: string;
  public readonly storePath: any[];
  protected headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(
    protected http: HttpClient,
    protected environmentService: EnvironmentService,
    protected store: NgRedux<IAppStateRecord>,
    protected microserviceTarget: string,
    protected apiEndpoint: string,
    protected storeName: string,
  ) {
    this.apiUrl = this.environmentService.getApiUrl(this.microserviceTarget, this.apiEndpoint);
    this.storePath = ['resources', this.storeName];
  }

  /**
  ----------------------------------------------------------------------------
  Make a select that emits only when the value exists.
  ----------------------------------------------------------------------------
  */
 storeSelect(statePath: any[]) {
    return this.store.select(statePath).filter(obj => obj !== undefined && obj !== null);
  }

  /**
   * Prepare filter criteria for the HTTP request.
   * Should be overriden in child class.
   */
  getParams(_filters: any): HttpParams {
    console.log("LOUIS")
    return new HttpParams();
  }

   /**
  ----------------------------------------------------------------------------
  Date conversion methods
  ----------------------------------------------------------------------------
  */

  /**
   * Convert date received from the API to proper date to be stored in the state.
   * @param date as a string
   */
  convertStringToDate(dateString: string): Date {
    let date: Date = null;
    if (dateString !== null) {
      date = new Date(dateString);
    }
    return date;
  }

  /**
   * Convert date to a string to be sent to the API.
   * @param date
   */
  convertDateToString(date: Date): string {
    const datePipe = new DatePipe('en-UK');
    return datePipe.transform(date, 'yyyy-MM-dd');
  }

  /**
   * Get item for given id. If it does not exists make an API call.
   * @return An observable of the store path `resources/<storeName>/byId/<id>` .
   */
  get(id: number): Observable<any> {
    if (!this.has(id)) {
      const url = String.raw`${this.apiUrl}${id}/`;
      this.getAPIData(url, new HttpParams());
    }
    return this.storeSelect(['resources', this.storeName, 'byId', id]);
  }

  getList(ids: number[]): Observable<any> {
    // If it is an empty list just return an observable of an empty list
    if (ids.length === 0) {
      return Observable.of([]);
    }
    // Get a list of resources from the database
    // Get the ids of the resource that are currently in the store
    const byId = this.store.getState().getIn(this.storePath.concat('byId'));
    const getIds: Array<number> = [];
    // Store ids not currently in store as list
    ids.forEach((id: number) => {
      if (!byId.has(id)) {
        getIds.push(id);
      }
    });
    // If not all the ids are in the store, get the data from the backend.
    if (getIds.length !== 0) {
      const params = new HttpParams().set('id__in', getIds.join(',')).set('limit', '0');
      this.getAPIData(this.apiUrl, params);
    }
    // return the list of ids as an observable
    const idsObservable = ids.map((id: number) => {
      return this.storeSelect(['resources', this.storeName, 'byId', id]);
    });
    return combineLatest(...idsObservable);
  }

  getAll(): Observable<any> {
    const params = new HttpParams().set('limit', '0');
    const idListObservable = this.getAPIData(this.apiUrl, params).map((result: any) => {
      return result.objects.map((obj: any) => obj.id);
    });
    return idListObservable.switchMap((idList: number[]) => this.getList(idList));
  }


  refresh(id: number) {
    // Refresh the resource in the store by requesting the data from the backend again
    const url = String.raw`${this.apiUrl}${id}/`;
    this.getAPIData(url, new HttpParams());
  }

  /**
   * Load data received from the API in the store.
   */
  makeAPIRequest(filters: any) {
    // Return a list of ids following the rules provided as inputs
    const params = this.getParams(filters);
    const request = this.getAPIData(this.apiUrl, params);
    return request;
  }

  /**
   * Retrieve data from the API.
   */
  getAPIData(url: string, params: HttpParams) {
    // Fetch data from the API and populate the byId map
    // Note that we still return the request observable in case we need to subscribe to it to get other informations.
    // We have to do a share to make sure the API call is not triggered twice if 2 things subscribe to it.
    const request = this.http.get(url, { params: params, headers: this.headers }).share();
    // Successful API call add the data to the state
    request.subscribe(
      (result: any) => {
        let convertedList: any[];
        if (result.length > 1) {
          // check if the request returned a list of objects
          convertedList = result.map((item: any) => this.convertJsonToStoreRecord(item));
        } else {
          // if it doesn't have an objects attribute it means it contains only one
          convertedList = [this.convertJsonToStoreRecord(result)];
        }
        console.log(convertedList)
        this.store.dispatch({
          type: ApiResourceActions.ADD,
          payload: {
            value: convertedList,
            storePath: this.storePath
          }
        });
      },
      (error: any) => {
        // Error handling
        console.log(error)
      },
      () => {
      }
    );
    return request;
  }

  /**
   * Abstract function to convert a store record to JSON to send to the charts
   * microservice.
   * Override in child class to add custom functionality.
   * Accepts optional extra params in the initialisation
   */
  abstract convertStoreRecordToJson(_item: any, _optionalParams?: any): any;

  /**
   * Abstract function to convert a data representation from the back-end API to a
   * useful front-end object. Should be overriden in child class.
   * Converts one element into it's corresponding resource.
   * Does not convert a list of API objects to a corresponding list of store
   * records.
   */
  abstract convertJsonToStoreRecord(_item: any): any;

  updateProperty(path: any[], property: string | number, value: any) {
    this.store.dispatch({
      type: ApiResourceActions.UPDATE_PROPERTY,
      payload: {
        path: path,
        property: property,
        value: value
      }
    });
  }

  has(id: number): boolean {
    const byId = this.store.getState().getIn(this.storePath.concat('byId'));
    return byId.has(id);
  }
}
