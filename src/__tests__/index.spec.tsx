import Index from '../index';
import ABReact from '../ABReact';

describe('index', () => {
  test('expects to export ABReact', () => {
    expect(Index).toBe(ABReact);
  });
});
