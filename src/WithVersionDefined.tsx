import { useEffect } from 'react';
import { WithVersionDefinedProps } from 'types';

/**
 * WithVersionDefined stateless component to render an already selected version
 */
function WithVersionDefined(
  {
    childrenHelper: helper,
    forceVersion,
    event,
  }: WithVersionDefinedProps,
) {
  useEffect(() => {
    if (event) {
      event(forceVersion);
    }
  }, [forceVersion, event]);

  return helper.from(forceVersion);
}

export default WithVersionDefined;
