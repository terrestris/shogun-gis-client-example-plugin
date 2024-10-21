import React from 'react';

import {
  render
} from '@testing-library/react';

import Plugin from './index';

describe('Plugin', () => {

  it('can be rendered', () => {
    const {
      container
    } = render(<Plugin />);

    expect(container).toBeVisible();
  });

  it('renders the button for the example link', () => {
    const {
      getByText
    } = render(<Plugin />);

    const button = getByText('FooterLinks.exampleLink');

    expect(button).toBeVisible();
  });
});
