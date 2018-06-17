import { SigsMainAppModule } from './sigs-main-app.module';

describe('SigsMainAppModule', () => {
  let sigsMainAppModule: SigsMainAppModule;

  beforeEach(() => {
    sigsMainAppModule = new SigsMainAppModule();
  });

  it('should create an instance', () => {
    expect(sigsMainAppModule).toBeTruthy();
  });
});
