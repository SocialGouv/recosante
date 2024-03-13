export function setGTag() {
  const G_TAG = 'GTM-PH63NLNJ';
  window.dataLayer = window.dataLayer || [];
  function gtag(_arg: 'js' | 'config' | 'event', ..._args: any[]) {
    if (window.dataLayer) {
      window.dataLayer.push(arguments);
    } else {
      console.error('window.dataLayer is not defined');
    }
  }
  gtag('js', new Date());
  gtag('config', G_TAG);
}
