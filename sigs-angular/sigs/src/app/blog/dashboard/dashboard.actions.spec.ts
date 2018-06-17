
import { NgReduxTestingModule } from '@angular-redux/store/testing';
import { TestBed } from '@angular/core/testing';
import { DashboardActions } from './dashboard.actions';
import { DashboardFactory, } from './dashboard.state';


describe('DashboardActions', () => {

    let actions: DashboardActions;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ ],
            imports: [
                NgReduxTestingModule,
            ]
        });
        actions = TestBed.get(DashboardActions);
    });

    it('should be created', () => {
        expect(actions).toBeTruthy();
    });
