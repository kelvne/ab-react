# ab-react

![Jest coverage](./badges/coverage-jest%20coverage.svg)

If this component helped you or your team, please give it a GitHub 🌟!

---

## Installation

```sh
yarn add ab-react
```

or 

```sh
npm install ab-react
```

## Usage

**This is mainly for AB testing, it will work with multiple children but try to stick with two**

### Normal use case

In the following example, three things can happen:
1 - The ABReact component will randomize one of the children and store the value on a cookie, after that the user will always see the same version. 
2 - If a version is set on the cookie with the defined cookie name, that version will be rendered.
3 - If a version is set on the cookie with the defined cookie name but the child doesn't exist null will be returned.

**No matter what scenario happens, the trackVersion event will be called each time the component is rendered.**

```tsx
import * as React from 'react';
import { useCallback } from 'react';
import ABReact from 'ab-react';

export default function MyComponent() {
  const trackVersion = useCallback((version: number) => {
    gtag('event', 'screen_view', {
      'screen_name': 'MyComponent',
      'version': version,
    });
  });

  return (
    <ABReact cookieName='cookie-name-to-store-version' event={trackVersion}>
      <div key="version-1">Version 1</div>
      <div key="version-2">Version 2</div>
    </ABReact>
  ) 
}
```

### If you are already using react-cookies and CookiesProvider

If you already has a top-level CookiesProvider mounted you can set a property so the ABReact won't mount the CookiesProvider internally:

```tsx
import * as React from 'react';
import { useCallback } from 'react';
import ABReact from 'ab-react';

export default function MyComponent() {
  return (
    <ABReact cookieName='cookie-name' mountCookieProvider={false}>
      <div key="version-1">Version 1</div>
      <div key="version-2">Version 2</div>
    </ABReact>
  ) 
}
```

### Forcing a version

If you want to force a version to be rendered (to disable one or to maintain SSR consistency), you can set the property forceVersion:

```tsx
import * as React from 'react';
import { useCallback } from 'react';
import ABReact from 'ab-react';

export default function MyComponent() {
  return (
    <ABReact cookieName='cookie-name' forceVersion={1}>
      <div key="version-1">Version 1</div>
      <div key="version-2">Version 2</div> {/* This version will always be rendered */}
    </ABReact>
  ) 
}
```

## Examples

### Vite.js: Using only CSR (Client Side Rendering)

```tsx
import { useState, useCallback } from 'react';
import ABReact from 'ab-react';

export default function ABTesting() {
  const [selectedState, setSelectedState] = useState<string>('');

  const eventExample = useCallback((version: number) => {
    setSelectedState(version.toString());

    /**
     * Do any tracking here such as sending an event to Google Analytics
     */
  }, [setSelectedState]);

  return (
    <div>
      <h1>Normal scenario for a pure client side rendering (CSR)</h1>
      <ABReact cookieName='cookie-1' event={eventExample}>
        <div>1</div>
        <div>2</div>
      </ABReact>
      <p>Selected version for cookie-1 (returned by the callback): { selectedState }</p>
    </div>
  );
}
```

### Next.js: Using SSR (Server Side Rendering), CSR (Client Side Rendering) and AppRouter

page.tsx:
```tsx
/* file: page.tsx */

import { cookies } from 'next/headers';

import Components from './components';

export default function ABTestings() {
  const v1 = Number(cookies().get('cookie-1')?.value);
  const v2 = Number(cookies().get('cookie-2')?.value);

  console.log(cookies().get('cookie-1'));

  return (
    <div>
      <Components v1={Number.isNaN(v1) ? undefined : v1} v2={Number.isNaN(v2) ? undefined : v2} />
    </div>
  );
}
```

components.tsx:
```tsx
/* file: components.tsx */
'use client';
import { useState, useCallback } from 'react';
import ABReact from 'ab-react';

export default function Components({ v1, v2 }: { v1?: number, v2?: number }) {
  const [selectedState, setSelectedState] = useState<string>('');

  const eventExample = useCallback((version: number) => {
    setSelectedState(version.toString());

    /**
     * Do any tracking here such as sending an event to Google Analytics
     */
  }, [setSelectedState]);

  return (
    <div>
      <h1>Normal scenario, after SSR forces version from v1</h1>
      <ABReact cookieName='cookie-1' forceVersion={v1}>
        <div>1</div>
        <div>2</div>
      </ABReact>

      <h1>Another scenario, after SSR forces version from v2 and runs an callback when the version is rendered</h1>
      <ABReact cookieName='cookie-2' event={eventExample} forceVersion={v2}>
        <div>1</div>
        <div>2</div>
      </ABReact>
      <p>Selected version for cookie-2 (returned by the callback): { selectedState }</p>

      <h1>Forced version scenario, no internal choosing. Version hard coded.</h1>
      <ABReact cookieName='cookie-3' forceVersion={1}>
        <div>1</div>
        <div>2 forced</div>
      </ABReact>
    </div>
  );
}
```