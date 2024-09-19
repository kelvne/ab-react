import * as React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import WithCookieProvider from '../WithCookieProvider';

jest.mock('react-cookie', () => ({
  __esModule: true,
  CookiesProvider: jest.fn(
    ({ children }: React.PropsWithChildren) => {
      if (children) {
        return children;
      }

      return null;
    },
  ),
}));

describe('WithCookieProvider', () => {
  test('expect CookieProvider to be instantiated', () => {
    /* eslint-disable-next-line */
    const { CookiesProvider } = require('react-cookie');

    render(
      <WithCookieProvider>
        <div>Test Child</div>
      </WithCookieProvider>,
    );

    expect(CookiesProvider).toHaveBeenCalledWith(
      {
        defaultSetOptions: { path: '/' },
        children: expect.anything() as React.ReactNode,
      },
      {},
    );
  });
});
