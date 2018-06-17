
import { NgReduxTestingModule } from '@angular-redux/store/testing';
import { TestBed } from '@angular/core/testing';
import { GoogleMapsResourcesActions } from './google-maps.actions';
import { GoogleMapsResourcesFactory, } from './google-maps.state';


describe('GoogleMapsResourcesActions', () => {

    let actions: GoogleMapsResourcesActions;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ ],
            imports: [
                NgReduxTestingModule,
            ]
        });
        actions = TestBed.get(GoogleMapsResourcesActions);
    });

    it('should be created', () => {
        expect(actions).toBeTruthy();
    });
