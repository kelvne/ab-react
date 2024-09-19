import * as React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import ABComponent from '../ABComponent';

jest.mock('../WithoutVersionDefined', () => function WVD() { return (<div>WithoutVersionDefined</div>); });

describe('ABComponent', () => {
  const cookieName = 'cookie-1';
  const children = [<div key="k-1">a</div>, <div key="k-2">b</div>];

  test('expect to render WithVersionDefined if forceVersion is set', () => {
    const { container } = render(
      <ABComponent
        cookieName={cookieName}
        forceVersion={0}
      >
        {children.map((el) => el)}
      </ABComponent>,
    );

    expect(container).toMatchSnapshot();
  });

  test('expect to render WithoutVersionDefined if forceVersion is not set', () => {
    const { getByText } = render(
      <ABComponent cookieName={cookieName}>
        {children.map((el) => el)}
      </ABComponent>,
    );

    expect(getByText('WithoutVersionDefined')).toBeInTheDocument();
  });
});
