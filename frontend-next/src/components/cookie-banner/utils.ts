import TagManager from 'react-gtm-module';

export function setGTag() {
  const G_TAG = 'GTM-PH63NLNJ';
  const tagManagerArgs = {
    gtmId: G_TAG,
  };
  TagManager.initialize(tagManagerArgs);
}
