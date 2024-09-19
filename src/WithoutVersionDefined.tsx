import { useEffect } from 'react';
import { useCookies } from 'react-cookie';

import { WithoutVersionDefinedProps } from './types';

/**
 * WithoutVersionDefined stateful component to select a version and set the cookie,
 * ideally to be used on the client-side.
 */
function WithoutVersionDefined({
  childrenHelper: helper,
  cookieName,
  event,
}: WithoutVersionDefinedProps) {
  const [cookies, setCookie] = useCookies([cookieName], { doNotParse: true });
  const version = Number(cookies[cookieName] as string);

  useEffect(() => {
    if (Number.isNaN(version)) {
      const selectedVersion = helper.randomize();
      setCookie(cookieName, selectedVersion.toString());

      return;
    }

    if (event) {
      event(version);
    }
  }, [version, event, setCookie, helper, cookieName]);

  return Number.isNaN(version) ? null : helper.from(version);
}

export default WithoutVersionDefined;
