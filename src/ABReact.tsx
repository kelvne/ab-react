import * as React from 'react';

import WithCookieProvider from './WithCookieProvider';
import { ABReactProps } from './types';
import ABComponent from './ABComponent';

/**
 * ABReact is the main component,
 * children will be chosen and set the reference as a cookie.
 */
function ABReact({
  cookieName,
  children,
  event,
  forceVersion,
  mountCookieProvider = true,
}: ABReactProps) {
  return mountCookieProvider
    ? (
      <WithCookieProvider>
        <ABComponent
          cookieName={cookieName}
          event={event}
          forceVersion={forceVersion}
        >
          {children}
        </ABComponent>
      </WithCookieProvider>
    )
    : (
      <ABComponent
        cookieName={cookieName}
        event={event}
        forceVersion={forceVersion}
      >
        {children}
      </ABComponent>
    );
}

export default ABReact;
