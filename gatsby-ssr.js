const React = require('react')
const { flatten } = require('lodash')
const crypto = require('crypto')
const fs = require('fs')

const baseCSP = {
  'base-uri': ["'self'"],
  'default-src': ["'self'"],
  'script-src': [
    "'self'",
    "'unsafe-eval'",
    'acsbapp.com',
    '*.osano.com',
    'js.hsforms.net',
    'www.gstatic.com',
    'www.redditstatic.com',
    'static.ads-twitter.com',
    '*.google-analytics.com',
    'www.youtube.com',
    'www.google.com',
    'www.googletagmanager.com',
    'snap.licdn.com',
    'static.hotjar.com',
    'analytics.tiktok.com',
    'connect.facebook.net',
    "'sha256-mMdX8nDeLSt6DQzghYqiYdDQTLvrtk2ovsRZd8ToErk='",
    "'sha256-p7GM5J06Df0tjLtIBRTRPfUlChlp2NEHuAVv5RURqhQ='",
    "'sha256-Fqsr5OoR84c8MEgFdjaB6ZDxvRGKs9uVy+/j8LutFB8='",
    "'sha256-FB2mCrrmxexqKmxViJPOJlH5WxZuRYopsLCvFr+ZUAU='",
    "'sha256-icSxpu6YO8mXPRaPUbF2jZgrXiVcO5anCb7ta/+ddtc='",
    "'sha256-Orye2Pc3+v1zYd11mB2LFpXOx8BTAn4iPQCtL18wAU8='",
    "'sha256-JnKrP1bysURBOgFUGgsie7Dk5My55HND4EE3lGpvgsc='",
    "'sha256-j9lLvRejv7s00QaLE2x0z6fJ/ThAaOR9VCotUXKA0F0='", // Accessibe
    "'sha256-RKmL82YWJnVeZH4PEXSjw7hnErXwtsmJSpmYEq8C9B8='",
    "'sha256-yZFBBEAhVR7+Ftx72ma6BMxZ0sAlz7DrJpEQjM6yvdk='", // gatsby-plugin-image
  ],
  'style-src': ["'self'", "'unsafe-inline'"],
  'object-src': ["'self'"],
  'manifest-src': ["'self'"],
  'frame-src': ['www.youtube.com', '*.twitter.com', 'www.google.com'],
  'font-src': ["'self'", 'data:'],
  'connect-src': [
    "'self'",
    '*.acsbapp.com',
    '*.osano.com',
    '*.hsforms.com',
    '*.gstatic.com',
    '*.google-analytics.com',
    'content.consensys.net',
    'unpkg.com',
    '*.ctfassets.net',
    'www.youtube.com',
    'analytics.tiktok.com',
    'analytics.pangle-ads.com',
    'addons.mozilla.org',
    '*.consensys.io'
  ],
  'img-src': [
    "'self'",
    'blob:',
    'data:',
    '*.ctfassets.net',
    '*.hsforms.com',
    '*.hubspot.net',
    '*.ytimg.com',
    '*.reddit.com',
    't.co',
    '*.twitter.com',
    '*.google-analytics.com',
    'images.contentful.com',
    'cdn.consensys.net',
    '*.linkedin.com',
    '*.hubspotusercontent10.net',
    'www.facebook.com',
    'analytics.pangle-ads.com',
    '*.cloudinary.com'
  ],
  'media-src': ["'self'", '*.ctfassets.net', 'www.googletagmanager.com'],
  'worker-src': ['blob:'],
}

const computeHash = component => {
  let { __html: stringHtml } = component.props.dangerouslySetInnerHTML

  let hash = crypto
    .createHash('sha256')
    .update(stringHtml)
    .digest('base64')

  return `'sha256-${hash}'`
}

const getHashes = (components, type) => {
  let isType = element => element.type === type
  let isInline = element =>
    element.props.dangerouslySetInnerHTML &&
    element.props.dangerouslySetInnerHTML.__html.length > 0

  return components
    .filter(isType)
    .filter(isInline)
    .map(computeHash)
}

const getHashesCodeSplitting = () => {
  const data = fs.readFileSync('public/_gatsby/slices/_gatsby-scripts-1.html').toString()
  const hashes = []
  const scriptRegex = /<script[^>]*?>(.*?)<\/script>/gms
  let match = null
  while ((match = scriptRegex.exec(data)) !== null) {
    if (match[1]) {
      const hash = crypto.createHash('sha256')
        .update(match[1])
        .digest('base64')
      hashes.push(`'sha256-${hash}'`)
    }
  }
  return hashes
}

exports.onPreRenderHTML = ({
  getHeadComponents,
  replaceHeadComponents,
  getPreBodyComponents,
  getPostBodyComponents,
}) => {
  let components = [
    ...flatten(getHeadComponents()),
    ...flatten(getPostBodyComponents()),
    ...flatten(getPreBodyComponents()),
  ]

  let csp = {
    ...baseCSP,
    'script-src': [...baseCSP['script-src'], ...getHashes(components, 'script'), ...getHashesCodeSplitting()],
    // 'style-src': [...baseCSP['style-src'], ...getHashes(components, 'style')],
  }

  const cspString = Object.keys(csp).reduce((acc, key) => {
    const value = csp[key]
    return `${acc}${key} ${value.join(' ')}; `
  }, '')
  
  const cspComponent = <meta key="gatsby-csp" httpEquiv="Content-Security-Policy" content={cspString} />

  let headComponentsWithCsp = [cspComponent, ...getHeadComponents()]

  replaceHeadComponents(headComponentsWithCsp)
}
