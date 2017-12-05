import { StreetlightsAngularspaPage } from './app.po';

describe('streetlights-angularspa App', function() {
  let page: StreetlightsAngularspaPage;

  beforeEach(() => {
    page = new StreetlightsAngularspaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
