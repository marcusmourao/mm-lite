import IndexPage from './index.vue';

const getRedirectMock = () => jest.fn();

describe('IndexPage', () => {
  describe('IndexPage::middleware', () => {
    it('should page middleware redirects to ConsultsView', () => {
      const redirect = getRedirectMock();

      IndexPage.middleware({ redirect });

      expect(redirect).toHaveBeenCalledTimes(1);
      expect(redirect).toHaveBeenCalledWith({ name: 'ConsultsView' });
    });
  });
});
