import React from 'react';

import {
  Button
} from 'antd';

import {
  useTranslation
} from 'react-i18next';

import {
  ClientPluginComponentProps
} from '@terrestris/shogun-gis-client/dist/plugin';

export type MapToolbarProps = ClientPluginComponentProps & React.ComponentProps<'div'> & {};

/**
 * The plugin receives the following props to access the client resources:
 *   * map: The OpenLayers map instance.
 *   * client: The SHOGunAPIClient instance.
 */
export const FooterLinks: React.FC<MapToolbarProps> = () => {

  const {
    t
  } = useTranslation();

  const openLink = (): void => {
    window.open('https://github.com/terrestris/shogun-gis-client-example-plugin');
  };

  return (
    <Button
      type='link'
      onClick={openLink}
    >
      {
        t('FooterLinks.exampleLink')
      }
    </Button>
  );
};

export default FooterLinks;
