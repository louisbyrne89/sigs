
import { NgReduxTestingModule } from '@angular-redux/store/testing';
import { TestBed } from '@angular/core/testing';
import { ImapActions } from './imap.actions';
import { ImapFactory, } from './imap.state';


describe('ImapActions', () => {

    let actions: ImapActions;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ ],
            imports: [
                NgReduxTestingModule,
            ]
        });
        actions = TestBed.get(ImapActions);
    });

    it('should be created', () => {
        expect(actions).toBeTruthy();
    });
