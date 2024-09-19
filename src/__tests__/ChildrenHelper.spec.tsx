import * as React from 'react';

import ChildrenHelper from '../ChildrenHelper';

describe('ChidrenHelper', () => {
  let children = [<div key="key-1">1</div>, <div key="key-2">2</div>];

  function createDefaultHelper() {
    return new ChildrenHelper(children);
  }

  beforeEach(() => {
    children = [<div key="key-1">1</div>, <div key="key-2">2</div>];
  });

  test('expects instantiation if constructor receives children as React.ReactNode', () => {
    expect(() => createDefaultHelper()).not.toThrow();
  });

  test('expects count to return the right children count', () => {
    const helper = createDefaultHelper();
    expect(helper.count).toBe(2);

    children.push(<div>3</div>);
    expect(helper.count).toBe(3);
  });

  test('expects from to return the right element from an index', () => {
    const text = '4';
    const index = 0;
    const expectedElement = (<div>{ text }</div>);
    children[index] = expectedElement;
    const helper = createDefaultHelper();
    expect(
      (helper.from(index) as React.ReactElement<React.PropsWithChildren>).props.children,
    ).toBe(text);
  });

  test('expects randomize to give always a valid index for children count', () => {
    children.concat(new Array(10).fill('x').map((val, idx) => (<div key={`key-${idx}`}>{ val }</div>)));
    const helper = createDefaultHelper();

    for (let i = 0; i < 20; i += 1) {
      expect(helper.randomize()).toBeLessThan(helper.count);
      expect(helper.randomize()).toBeGreaterThanOrEqual(0);
    }
  });

  test('expects warnMoreThanTwo to warn on the console the message regarding AB testing', () => {
    const consoleSpy = jest.spyOn(console, 'warn');

    const helper = createDefaultHelper();
    helper.warnMoreThanTwo();

    expect(consoleSpy).toHaveBeenCalledTimes(0);

    children.push(<div>3</div>);
    helper.warnMoreThanTwo();

    expect(consoleSpy).toHaveBeenCalledTimes(2);
    expect(consoleSpy).toHaveBeenCalledWith('This component was designed for AB testing. It randomizes between two versions.');
    expect(consoleSpy).toHaveBeenCalledWith('More than two versions, 50/50 over a long period of time can\'t be guaranteed.');
  });
});
