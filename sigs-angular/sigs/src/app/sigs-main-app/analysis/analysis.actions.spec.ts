
import { NgReduxTestingModule } from '@angular-redux/store/testing';
import { TestBed } from '@angular/core/testing';
import { AnalysisActions } from './analysis.actions';
import { AnalysisFactory, } from './analysis.state';


describe('AnalysisActions', () => {

    let actions: AnalysisActions;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ ],
            imports: [
                NgReduxTestingModule,
            ]
        });
        actions = TestBed.get(AnalysisActions);
    });

    it('should be created', () => {
        expect(actions).toBeTruthy();
    });
