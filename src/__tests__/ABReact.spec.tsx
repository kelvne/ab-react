import * as React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import ABReact from '../ABReact';

jest.mock('../WithCookieProvider', () => function WCP() { return (<div>WithCookieProvider</div>); });

describe('ABReact', () => {
  test('expects WithCookieProvider to be mounted if mountCookieProvider is set', () => {
    const { getByText } = render(
      <ABReact cookieName="" mountCookieProvider>
        <div>x</div>
        <div>y</div>
        <div>z</div>
      </ABReact>,
    );

    expect(getByText('WithCookieProvider')).toBeInTheDocument();
  });

  test('expects mountCookieProvider to be default true', () => {
    const { getByText } = render(
      <ABReact cookieName="">
        <div>w</div>
        <div>s</div>
      </ABReact>,
    );

    expect(getByText('WithCookieProvider')).toBeInTheDocument();
  });

  test('expects WithCookieProvider to not be rendered if mountCookieProvider is false', () => {
    const { queryByText } = render(
      <ABReact cookieName="cookie-1" mountCookieProvider={false}>
        <div>w</div>
        <div>s</div>
      </ABReact>,
    );

    expect(queryByText('WithCookieProvider')).not.toBeInTheDocument();
  });
});
