import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { } from '@types/googlemaps';
import { Subject } from 'rxjs/Subject';
import * as Immutable from 'immutable';
import { CommonActions } from '@app/store/common/common.actions';
import { IAppStateRecord } from '@app/store/index.state';
import { PositionsStateFactory, IPositionsStateRecord } from './imap.state';

@Injectable()
export class ImapActions extends CommonActions {

  constructor(
    private store: NgRedux<IAppStateRecord>,
  ) {
    super(store);
    this.path = ["views", "sigsMainApp", "imap"];
   }

  onFormSubmit(address): void {
    const addressString = address["line1"] + ", " + address["postcode"]
    const geocoder = new google.maps.Geocoder()
    let positions = new Subject();
    let fullAddress = new Subject();
    geocoder.geocode({ 'address': addressString}, function(
      results: google.maps.GeocoderResult[],
      status: google.maps.GeocoderStatus
      ) {
      const lat = results[0].geometry.location.lat();
      const lon =  results[0].geometry.location.lng();
      if (status === google.maps.GeocoderStatus.OK) {
        positions.next(PositionsStateFactory({
          "latitude": parseFloat(lat.toFixed(1)),
          "longitude": parseFloat(lon.toFixed(1))
        }))
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
    positions.subscribe(positions => {
      this.store.dispatch({
        type: CommonActions.UPDATE_PROPERTY,
        payload: {
          path: this.path,
          prop: 'positions',
          value: positions
        }
      });
      this.store.dispatch({
        type: CommonActions.UPDATE_PROPERTY,
        payload: {
          path: this.path,
          prop: 'stage',
          value: 1
        }
      });
    })
  }
  
  addRoof(): void {
    const roovesMap = this.store.getState().getIn(this.path.concat('rooves'));
    const roovesLength = roovesMap.size;
    
    const newMap = roovesMap.merge(roovesMap, Immutable.Map([[roovesLength, 0]]))
    this.store.dispatch({
      type: CommonActions.UPDATE_PROPERTY,
      payload: {
        path: this.path,
        prop: 'rooves',
        value: newMap
      }
    });
    this.store.dispatch({
      type: CommonActions.UPDATE_PROPERTY,
      payload: {
        path: this.path,
        prop: 'selectedRoof',
        value: roovesLength
      }
    });
    this.store.dispatch({
      type: CommonActions.UPDATE_PROPERTY,
      payload: {
        path: this.path,
        prop: 'stage',
        value: 2
      }
    });
    
  }

  rotate(direction: string, key: number): void {
    let rotation = this.store.getState().getIn(this.path.concat('rooves')).get(key);
    if (direction === 'left') {
      if (rotation === 0) {
        rotation = 359
      } else {
        rotation -= 1;
      }
    } else {
      if (rotation === 359) {
        rotation = 0
      } else {
        rotation += 1;
      }
    }
    this.store.dispatch({
      type: CommonActions.UPDATE_PROPERTY,
      payload: {
        path: this.path.concat('rooves'),
        prop: key,
        value: rotation
      }
    });
  }

  setSelectedRoof(roof: number) {
    this.store.dispatch({
      type: CommonActions.UPDATE_PROPERTY,
      payload: {
        path: this.path,
        prop: 'selectedRoof',
        value: roof
      }
    });
  }
}

