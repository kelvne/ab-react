import * as React from 'react';

/**
 * ChildrenHelper is a class for helping handling children matching.
 */
class ChildrenHelper {
  constructor(private children: React.ReactNode) { }

  public get count(): number {
    return React.Children.count(this.children);
  }

  private get array(): Exclude<React.ReactNode, boolean | null | undefined>[] {
    return React.Children.toArray(this.children);
  }

  public from(index: number): Exclude<React.ReactNode, boolean | null | undefined> {
    return this.array[index] ?? null;
  }

  public randomize(): number {
    return Math.floor(Math.random() * this.count);
  }

  public warnMoreThanTwo(): void {
    if (this.count > 2) {
      console.warn('This component was designed for AB testing. It randomizes between two versions.');
      console.warn('More than two versions, 50/50 over a long period of time can\'t be guaranteed.');
    }
  }
}

export default ChildrenHelper;
