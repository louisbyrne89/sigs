
import { NgReduxTestingModule } from '@angular-redux/store/testing';
import { TestBed } from '@angular/core/testing';
import { ToolbarActions } from './toolbar.actions';
import { ToolbarFactory, } from './toolbar.state';


describe('ToolbarActions', () => {

    let actions: ToolbarActions;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ ],
            imports: [
                NgReduxTestingModule,
            ]
        });
        actions = TestBed.get(ToolbarActions);
    });

    it('should be created', () => {
        expect(actions).toBeTruthy();
    });
