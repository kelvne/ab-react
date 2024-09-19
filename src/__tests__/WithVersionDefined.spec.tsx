import * as React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import ChildrenHelper from '../ChildrenHelper';
import WithVersionDefined from '../WithVersionDefined';

describe('WithVersionDefined', () => {
  const children = [<div key="key-1">1</div>, <div key="key-2">2</div>];
  const helper = new ChildrenHelper(children);

  test('expect the right version to be rendered', () => {
    const randomized = helper.randomize();

    render(
      <WithVersionDefined
        childrenHelper={helper}
        forceVersion={randomized}
      />,
    );

    const expectedText = (children[randomized].props as React.PropsWithChildren).children;

    expect(screen.queryByText(expectedText as string)).toBeInTheDocument();
  });

  test('expect event to be triggred if set', () => {
    const randomized = helper.randomize();
    const event = jest.fn();

    render(
      <WithVersionDefined
        childrenHelper={helper}
        forceVersion={randomized}
        event={event}
      />,
    );

    expect(event).toHaveBeenCalledTimes(1);
    expect(event).toHaveBeenCalledWith(randomized);
  });
});
