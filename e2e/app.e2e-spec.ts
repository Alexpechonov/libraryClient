import { LibraryClientPage } from './app.po';

describe('library-client App', () => {
  let page: LibraryClientPage;

  beforeEach(() => {
    page = new LibraryClientPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
