import { ExpenseReportPage } from './app.po';

describe('expense-report App', function() {
  let page: ExpenseReportPage;

  beforeEach(() => {
    page = new ExpenseReportPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
