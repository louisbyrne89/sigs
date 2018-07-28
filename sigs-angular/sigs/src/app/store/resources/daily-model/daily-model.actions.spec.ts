
import { NgReduxTestingModule } from '@angular-redux/store/testing';
import { TestBed } from '@angular/core/testing';
import { DailyModelActions } from './daily-model.actions';
import { DailyModelFactory, } from './daily-model.state';


describe('DailyModelActions', () => {

    let actions: DailyModelActions;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ ],
            imports: [
                NgReduxTestingModule,
            ]
        });
        actions = TestBed.get(DailyModelActions);
    });

    it('should be created', () => {
        expect(actions).toBeTruthy();
    });
