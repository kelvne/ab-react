import { PropsWithChildren } from 'react';

import ChildrenHelper from './ChildrenHelper';

/**
 * IWithoutVersionDefinedProps expected props for the component WithoutVersionDefined
 */
interface IWithoutVersionDefinedProps {
  /**
   * cookieName determines where the chosen version will be stored
   */
  cookieName: string;
  /**
   * childrenHelper helper for managing the versions children
   */
  childrenHelper: ChildrenHelper;
  /**
   * event is the callback function that will run when the chosen version is rendered
   *
   * @param {number} version
   * @returns {void}
   */
  event?: (version: number) => void;
}

/**
 * IWithVersionDefinedProps expected props for the component WithVersionDefined
 */
interface IWithVersionDefinedProps {
  /**
   * childrenHelper helper for managing the versions children
   */
  childrenHelper: ChildrenHelper;
  /**
   * forceVersion forces a version to be rendered
   * It's good solution if you already have the cookie set during server side rendering
   * so hydratation will occur properly.
   */
  forceVersion: number;
  /**
   * event is the callback function that will run when the chosen version is rendered
   *
   * @param {number} version
   * @returns {void}
   */
  event?: (version: number) => void;
}

/**
 * IABComponent expected props for the component ABComponent
 */
interface IABComponentProps {
  /**
   * cookieName determines where the chosen version will be stored
   */
  cookieName: string;
  /**
   * event is the callback function that will run when the chosen version is rendered
   *
   * @param {number} version
   * @returns {void}
   */
  event?: (version: number) => void;
  /**
   * forceVersion forces a version to be rendered
   * It's good solution if you already have the cookie set during server side rendering
   * so hydratation will occur properly.
   */
  forceVersion?: number;
}

/**
 * IABReact expected props for the component ABReact
 */
interface IABReactProps {
  /**
   * cookieName determines where the chosen version will be stored
   */
  cookieName: string;
  /**
   * forceVersion forces a version to be rendered
   * It's good solution if you already have the cookie set during server side rendering
   * so hydratation will occur properly.
   */
  forceVersion?: number;
  /**
   * mountCookieProvider indicates if the component should mount the react-cookie CookieProvider.
   * If you already instantiating the CookieProvider outside, you can set this false.
   * By default this is true and the mounted CookieProvider uses the path "/" for the cookies.
   */
  mountCookieProvider?: boolean;
  /**
   * event is the callback function that will run when the chosen version is rendered
   *
   * @param {number} version
   * @returns {void}
   */
  event?: (version: number) => void;
}

/**
 * ABComponentProps is the expected props for the ABComponent component.
 */
type ABComponentProps = PropsWithChildren<IABComponentProps>;

/**
 * ABReactProps is the expected props for the ABReact component.
 * The component can be stateful or stateless.
 */
type ABReactProps = PropsWithChildren<IABReactProps>;

/**
 * WithVersionDefinedProps is the expected props for the WithVersionDefined component.
 * The component is stateless but it contains side-effects.
 * Normally it'll rendered on the server side.
 */
type WithVersionDefinedProps = IWithVersionDefinedProps;

/**
 * WithoutVersionDefinedProps is the expected props for the WithVersionDefined component.
 * The component is stateful. Ideally for client side rendering.
 */
type WithoutVersionDefinedProps = IWithoutVersionDefinedProps;

export type {
  ABComponentProps,
  ABReactProps,
  WithVersionDefinedProps,
  WithoutVersionDefinedProps,
};
