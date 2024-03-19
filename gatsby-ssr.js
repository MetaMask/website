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
    '*.hsforms.net',
    '*.hsforms.com',
    '*.hs-scripts.com',
    'www.redditstatic.com',
    'static.ads-twitter.com',
    '*.google-analytics.com',
    'www.youtube.com',
    'www.youtube-nocookie.com',
    'www.google.com',
    'www.googletagmanager.com',
    'snap.licdn.com',
    'static.hotjar.com',
    'metrics.hotjar.io',
    'analytics.tiktok.com',
    'connect.facebook.net',
    'cdn.segment.com',
    "'sha256-p7GM5J06Df0tjLtIBRTRPfUlChlp2NEHuAVv5RURqhQ='", // redirect.js
    "'sha256-Fqsr5OoR84c8MEgFdjaB6ZDxvRGKs9uVy+/j8LutFB8='", // thememode.js
    "'sha256-j9lLvRejv7s00QaLE2x0z6fJ/ThAaOR9VCotUXKA0F0='", // Accessibe
    "'sha256-RKmL82YWJnVeZH4PEXSjw7hnErXwtsmJSpmYEq8C9B8='", // lintrk.js (_linkedin_partner_id = 451393)
    "'sha256-yZFBBEAhVR7+Ftx72ma6BMxZ0sAlz7DrJpEQjM6yvdk='", // gatsby-plugin-image
    "'sha256-mBD8EjuSzfLnSyV/kf64G/OwWt1b2FkRNQ0coR4iRaw='", // react-helmet
    "'sha256-8MQ2PLa7RW5LIHewJTDWrTnRig6sPfYwzJCuMnSDj+w='", // gtm.js
    "'sha256-fsJSer+HnXWBI5coGhVg2IEC1owFqVBolfuAAs+pz9s='", // lintrk.js (_linkedin_data_partner_ids = 7714137)
    "'sha256-yoMdr24pHub35XtfE0g+KKJ/3jgt9wO6A41+++BPn2w='", // checkLocale.js
    "'sha256-JHVwSufIF23Bmdl9HFL0FyPKDhAB10ZlcUJ8qdYOdr0='",
  ],
  'style-src': ["'self'", "'unsafe-inline'"],
  'object-src': ["'self'"],
  'manifest-src': ["'self'"],
  'frame-src': [
    'www.youtube.com',
    'www.youtube-nocookie.com',
    '*.twitter.com',
    'www.google.com',
    '*.hsforms.net',
    '*.hsforms.com',
  ],
  'font-src': ["'self'", 'data:'],
  'connect-src': [
    "'self'",
    '*.acsbapp.com',
    '*.osano.com',
    '*.hsforms.com',
    '*.hubapi.com',
    '*.gstatic.com',
    '*.google-analytics.com',
    'content.consensys.net',
    'unpkg.com',
    '*.ctfassets.net',
    'www.youtube.com',
    'www.youtube-nocookie.com',
    'analytics.tiktok.com',
    'analytics.pangle-ads.com',
    'addons.mozilla.org',
    '*.consensys.io',
    '*.contentful.com',
    'cdn.segment.com',
    'api.segment.io',
    'px.ads.linkedin.com',
    'conversions-config.reddit.com',
    '*.launchdarkly.com',
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
    'cdn.consensys.io',
    '*.linkedin.com',
    '*.hubspotusercontent10.net',
    'www.facebook.com',
    'analytics.pangle-ads.com',
    '*.cloudinary.com',
    'www.googletagmanager.com',
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
  const filePath = 'public/_gatsby/slices/_gatsby-scripts-1.html'
  if (!fs.existsSync(filePath)) {
    return []
  }
  const data = fs.readFileSync(filePath).toString()
  const hashes = []
  const scriptRegex = /<script[^>]*?>(.*?)<\/script>/gms
  let match = null
  while ((match = scriptRegex.exec(data)) !== null) {
    if (match[1]) {
      const hash = crypto
        .createHash('sha256')
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
    'script-src': [
      ...baseCSP['script-src'],
      ...getHashes(components, 'script'),
      ...getHashesCodeSplitting(),
    ],
  }

  const cspString = Object.keys(csp).reduce((acc, key) => {
    const value = csp[key]
    return `${acc}${key} ${value.join(' ')}; `
  }, '')

  const cspComponent = (
    <meta
      key="gatsby-csp"
      httpEquiv="Content-Security-Policy"
      content={cspString}
    />
  )

  let headComponentsWithCsp = [cspComponent, ...getHeadComponents()]

  replaceHeadComponents(headComponentsWithCsp)
}
