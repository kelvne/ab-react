import React from 'react';
import * as matchers from 'jest-extended';

expect.extend(matchers);

global.React = React;
