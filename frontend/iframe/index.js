import { iframeResize } from 'iframe-resizer'

const script = document.getElementById('widget-recosante')

const search = script.dataset.search ? script.dataset.search : '?theme=default'
const source = window.location.href.toString()

const src = `https://recosante.beta.gouv.fr/${search}&iframe=1&source=${source}`

const iframe = document.createElement('iframe')

const iframeAttributes = {
  src,
  style: 'border: none; width: 100%; display: block; margin: 0 auto;',
  allowfullscreen: true,
  webkitallowfullscreen: true,
  mozallowfullscreen: true,
  allow: 'geolocation',
}
for (var key in iframeAttributes) {
  iframe.setAttribute(key, iframeAttributes[key])
}
iframeResize({}, iframe)

script.parentNode.insertBefore(iframe, script)
