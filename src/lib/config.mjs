export const NODE_ENV = process.env.NODE_ENV

export const CONTENTFUL_SPACE_ID = process.env.GATSBY_CONTENTFUL_SPACE_ID
export const CONTENTFUL_ENVIRONMENT = process.env.GATSBY_CONTENTFUL_ENVIRONMENT
export const CONTENTFUL_API_KEY = process.env.GATSBY_CONTENTFUL_API_KEY
export const CONTENTFUL_HOST = process.env.GATSBY_CONTENTFUL_HOST
export const CONSENSYS_HOST = process.env.GATSBY_CONSENSYS_HOST
export const CONTENTFUL_PREVIEW_HOST =
  process.env.GATSBY_CONTENTFUL_PREVIEW_HOST
export const CONTENTFUL_PREVIEW_API_KEY =
  process.env.GATSBY_CONTENTFUL_PREVIEW_API_KEY
export const OSANO_CUSTOMER_ID = process.env.GATSBY_OSANO_CUSTOMER_ID
export const OSANO_CCID_ID = process.env.GATSBY_OSANO_CCID_ID

export const TEMPLATE_LAYOUT_LIST = {
  Defaut: './src/templates/ContentfulLayout.js',
  Download: './src/templates/ContentfulDownloadLayout.js',
  Asset: './src/templates/ContentfulAssetLayout.js',
  Legal: './src/templates/MarkdownPageLayout.js',
  Portfolio: './src/templates/ContentfulPortfolioLayout.js',
  SwapWithPorfolio: './src/templates/SwapWithPortfolioLayout.js',
  MultiToken: './src/templates/MultiTokenSwapLayout.js',
  PYUSD: './src/templates/PYUSDLayout.js',
  Blog: './src/templates/NewsLayout.js',
  Author: './src/templates/AuthorProfileLayout.js',
  News: './src/templates/ContentfulNewsCategoryLayout.js',
}

export const mapTemplateLayout = name => {
  if (!name) return TEMPLATE_LAYOUT_LIST['Defaut']
  const path = TEMPLATE_LAYOUT_LIST[name]
  if (path) {
    return path
  }
  return TEMPLATE_LAYOUT_LIST['Defaut']
}

export const LOCALES = [
  {
    name: 'English',
    localizedName: 'English',
    code: 'en-US',
    shortName: 'EN',
    htmlLang: 'en',
  },
  {
    name: 'Chinese',
    localizedName: '中文',
    code: 'zh-CN',
    shortName: 'CN',
    htmlLang: 'zh-CN',
  },
  {
    name: 'Hindi',
    localizedName: 'हिन्दी',
    code: 'hi-IN',
    shortName: 'HI',
    htmlLang: 'hi-IN',
  },
  {
    name: 'Italian',
    localizedName: 'Italiano',
    code: 'it',
    shortName: 'IT',
    htmlLang: 'it',
  },
  {
    name: 'Japanese',
    localizedName: '日本語',
    code: 'ja',
    shortName: 'JA',
    htmlLang: 'ja',
  },
  {
    name: 'Korean',
    localizedName: '한국어',
    code: 'ko',
    shortName: 'KO',
    htmlLang: 'ko',
  },
  {
    name: 'Russian',
    localizedName: 'Русский',
    code: 'ru',
    shortName: 'RU',
    htmlLang: 'ru',
  },
  {
    name: 'Spanish',
    localizedName: 'Español',
    shortName: 'ES',
    code: 'es',
    htmlLang: 'es',
  },
  {
    name: 'Turkish',
    localizedName: 'Türkçe',
    code: 'tr',
    shortName: 'TR',
    htmlLang: 'tr',
  },
  {
    name: 'Nigerian Pidgin',
    localizedName: 'Nigerian Pidgin',
    code: 'pcm-NG',
    shortName: 'NP',
    htmlLang: 'pcm',
  },
]

export const LOCALES_TRANSLATE = LOCALES.slice(1)
export const DEFAULT_LOCALE = LOCALES[0]
export const DEFAULT_LOCALE_CODE = DEFAULT_LOCALE.code

export const mapCodeToHtmlLang = code => {
  const locale = LOCALES.find(l => l.code === code)
  return locale ? locale.htmlLang : DEFAULT_LOCALE.htmlLang
}

export const getLocalizedPath = (pathname, newLocaleCode) => {
  const localesRegexPattern = `^/(${LOCALES.map(locale => locale.code).join(
    '|'
  )})`
  let localizedPath

  if (newLocaleCode === DEFAULT_LOCALE_CODE) {
    localizedPath = pathname.replace(new RegExp(localesRegexPattern), '')
  } else {
    const newLocale = newLocaleCode === DEFAULT_LOCALE_CODE ? '' : newLocaleCode
    localizedPath = `/${newLocale}${pathname.replace(
      new RegExp(localesRegexPattern + '/'),
      '/'
    )}`
  }

  return localizedPath
}

export const GB_BLOCKED_PATHS = [
  '/news/latest/how-to-sell-crypto-for-cash/',
  '/news/latest/how-to-swap-crypto/',
  '/news/latest/how-to-buy-crypto/',
]
export const GB_DISCLAIMER_PATHS = [
  '/',
  '/download/',
  '/swaps/',
  '/buy-crypto/',
  '/sell-crypto/',
  '/swaps/swap-with-portfolio/',
  '/news/',
]

export const NO_FOLLOW_URLS = ['/cla/', '/about/']
