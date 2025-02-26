/**
 * @format
 */

import React from 'react';
import App from '@components/app/Main';
import ReactTestRenderer from 'react-test-renderer';

test('renders correctly', async () => {
  await ReactTestRenderer.act(() => {
    ReactTestRenderer.create(<App />);
  });
});
