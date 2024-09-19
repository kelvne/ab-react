/// <reference types="jest-extended" />

import * as React from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useCookies } from 'react-cookie';

import ChildrenHelper from '../ChildrenHelper';
import WithoutVersionDefined from '../WithoutVersionDefined';

jest.mock('react-cookie', () => ({
  __esModule: true,
  useCookies: jest.fn(),
}));

describe('WithoutVersionDefined', () => {
  const cookieName = 'cookie';
  const children = [<div key="key-1">1</div>, <div key="key-2">2</div>];
  const helper = new ChildrenHelper(children);

  let setCookie: jest.Mock;

  beforeEach(() => {
    setCookie = jest.fn();
  });

  test('expect to select version and set cookie if cookie not present', () => {
    (useCookies as jest.Mock).mockImplementationOnce(
      () => [{ [cookieName]: '' }, setCookie],
    );

    render(<WithoutVersionDefined cookieName={cookieName} childrenHelper={helper} />);

    setCookie.mock.calls.forEach((call) => {
      expect(call).toBeOneOf(children.map((_, index) => [cookieName, index.toString()]));
    });
  });

  test('expect the version to be rendered if cookie is set', () => {
    (useCookies as jest.Mock).mockImplementationOnce(() => [{ [cookieName]: '1' }, setCookie]);

    const spy = jest.spyOn(helper, 'from');

    render(<WithoutVersionDefined cookieName={cookieName} childrenHelper={helper} />);

    expect(spy).toHaveBeenCalledWith(1);
  });

  test('expect to return null if version is not a number', () => {
    (useCookies as jest.Mock).mockImplementationOnce(() => [{ [cookieName]: 'abc' }, setCookie]);

    const { container } = render(
      <WithoutVersionDefined cookieName={cookieName} childrenHelper={helper} />,
    );

    /* eslint-disable-next-line */
    expect(container).toBeEmptyDOMElement();
  });

  test('expect event to be triggred if set', async () => {
    const event = jest.fn();
    (useCookies as jest.Mock).mockImplementationOnce(() => [{ [cookieName]: '1' }, setCookie]);

    render(<WithoutVersionDefined cookieName={cookieName} childrenHelper={helper} event={event} />);

    await waitFor(() => expect(event).toHaveBeenCalledWith(1));
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });
});
