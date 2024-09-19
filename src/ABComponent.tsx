import * as React from 'react';
import { useMemo } from 'react';

import { ABComponentProps } from './types';
import ChildrenHelper from './ChildrenHelper';
import WithVersionDefined from './WithVersionDefined';
import WithoutVersionDefined from './WithoutVersionDefined';

/**
 * ABComponent is the component that decides if the stateful or stateless version
 * of the element will be rendered.
 */
function ABComponent({
  cookieName, children, event, forceVersion,
}: ABComponentProps) {
  const helper = useMemo(() => new ChildrenHelper(children), [children]);
  helper.warnMoreThanTwo();

  if (typeof forceVersion === 'number' && forceVersion >= 0) {
    return (
      <WithVersionDefined
        childrenHelper={helper}
        forceVersion={forceVersion}
        event={event}
      />
    );
  }

  return (
    <WithoutVersionDefined
      childrenHelper={helper}
      cookieName={cookieName}
      event={event}
    />
  );
}

export default ABComponent;
