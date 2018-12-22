import { MaterialUIModule } from './material-ui.module';

describe('MaterialUiModule', () => {
  let materialUIModuleModule: MaterialUIModule;

  beforeEach(() => {
    materialUIModuleModule = new MaterialUIModule();
  });

  it('should create an instance', () => {
    expect(materialUIModuleModule).toBeTruthy();
  });
});
