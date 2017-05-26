import { WaleedPage } from './app.po';

describe('waleed App', () => {
  let page: WaleedPage;

  beforeEach(() => {
    page = new WaleedPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
