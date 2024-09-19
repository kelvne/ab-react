import * as React from 'react';
import { CookiesProvider } from 'react-cookie';

/**
 * WithCookieProvider injects the CookiesProvider from react-cookie.
 */
function WithCookieProvider({ children }: React.PropsWithChildren) {
  return (
    <CookiesProvider defaultSetOptions={{ path: '/' }}>
      {children}
    </CookiesProvider>
  );
}

export default WithCookieProvider;
