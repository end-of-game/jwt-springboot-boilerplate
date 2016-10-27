import { AngularStatelessAppPage } from './app.po';

describe('angular-stateless-app App', function() {
  let page: AngularStatelessAppPage;

  beforeEach(() => {
    page = new AngularStatelessAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
