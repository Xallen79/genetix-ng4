import { GenetixNg4Page } from './app.po';

describe('genetix-ng4 App', () => {
  let page: GenetixNg4Page;

  beforeEach(() => {
    page = new GenetixNg4Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
