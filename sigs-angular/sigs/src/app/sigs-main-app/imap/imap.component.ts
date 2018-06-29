import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/takeUntil';


import { ViewChild } from '@angular/core';
import { } from '@types/googlemaps';
import { select } from '@angular-redux/store';
import * as Immutable from 'immutable';

import { IPositionsStateRecord } from './imap.state';
import { ImapActions } from './imap.actions';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-imap',
  templateUrl: './imap.component.html',
  styleUrls: ['./imap.component.css']
})
export class ImapComponent implements OnInit {
  @select(['views', 'sigsMainApp', 'imap', 'positions']) positions: Observable<IPositionsStateRecord>;
  @select(['views', 'sigsMainApp', 'imap', 'rooves']) rooves: Observable<Immutable.Map<number, number>>;
  @select(['views', 'sigsMainApp', 'imap', 'selectedRoof']) selectedRoofObs: Observable<number>;
  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;
  mapData = {
    "chartType": "Map",
  }
  mapCreated = false;
  roofCreated = false;
  markerMap: any = new Map();
  selectedRoof: number;
  ngUnsubscribe = new Subject();

  constructor(private imapViewsActions: ImapActions) {  }
  
  ngOnInit() {
      this.createMapSubscription();
      this.createRoofSubscription();
      this.createSelectedRoofSubscription();
  }

  createMapSubscription(): void {
    this.positions
    .takeUntil(this.ngUnsubscribe)
    .subscribe((positions: IPositionsStateRecord) => {
      if (positions.latitude !== null && positions.longitude !== null) {
        const mapProp = {
          center: new google.maps.LatLng(positions["latitude"], positions["longitude"]),
          zoom: 19,
          mapTypeId: google.maps.MapTypeId.SATELLITE
        };
        this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
        this.mapCreated = true;
      }
    }); 
  }
  
  createRoofSubscription(): void {
    Observable
    .combineLatest(this.rooves, this.selectedRoofObs)
    .takeUntil(this.ngUnsubscribe)
    .subscribe((params: [Immutable.Map<number, number>, number]) => {
      const rooves = params[0]
      const selectedRoof = params[1]
      rooves.forEach((position: number, key: number) => {
        let strokeColor;
        if (key === selectedRoof) {
          strokeColor = "#00FFFF";
        } else {
          strokeColor = "#B40404";
        }
        if (!this.markerMap.has(key)) {
          const marker = new google.maps.Marker({
            position: this.map.getCenter(),
            icon: {
              path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
              scale: 6,
              rotation: 0,
              strokeWeight:2,
              strokeColor: strokeColor,
            },
            draggable: true,
            map: this.map,
          });
          this.markerMap.set(key, marker);
        } else {
          const oldMarker = this.markerMap.get(key);
          oldMarker.setOptions({
            position: oldMarker.position,
            icon: {
              path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
              scale: 6,
              rotation: position,
              strokeWeight:2,
              strokeColor: strokeColor
            },
            draggable: true,
            map: this.map,
          });
          this.markerMap.set(key, oldMarker);
        }
      });
      this.roofCreated = true;
    });
  }

  createSelectedRoofSubscription() {
    this.selectedRoofObs
    .takeUntil(this.ngUnsubscribe)
    .subscribe(selectedRoof => this.selectedRoof = selectedRoof)
  }

  addRoof(): void {
    this.imapViewsActions.addRoof();
  }

  rotate(direction: string): void {
    this.imapViewsActions.rotate(direction, this.selectedRoof)
  }
  /**
  ----------------------------------------------------------------------------
  On destroy unsubscribe to everything
  ----------------------------------------------------------------------------
  */
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
