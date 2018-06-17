
import { NgReduxTestingModule } from '@angular-redux/store/testing';
import { TestBed } from '@angular/core/testing';
import { ArticleActions } from './article.actions';
import { ArticleFactory, } from './article.state';


describe('ArticleActions', () => {

    let actions: ArticleActions;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ ],
            imports: [
                NgReduxTestingModule,
            ]
        });
        actions = TestBed.get(ArticleActions);
    });

    it('should be created', () => {
        expect(actions).toBeTruthy();
    });
