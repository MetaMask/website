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
    name: 'Arabic',
    localizedName: 'العربية',
    shortName: 'AR',
    code: 'ar',
    htmlLang: 'ar',
  },
  {
    name: 'Chinese',
    localizedName: '中文',
    shortName: 'CN',
    code: 'zh-CN',
    htmlLang: 'zh',
  },
  {
    name: 'German',
    localizedName: 'Deutsch',
    shortName: 'DE',
    code: 'de',
    htmlLang: 'de',
  },
  {
    name: 'Spanish',
    localizedName: 'Español',
    shortName: 'ES',
    code: 'es',
    htmlLang: 'es',
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

export const GB_BLOCKED_PATHS = ['/buy-crypto/', '/sell-crypto/', '/swaps/']
export const GB_DISCLAIMER_PATHS = [
  '/',
  '/download/',
  '/swaps/',
  '/buy-crypto/',
  '/sell-crypto/',
  '/swaps/swap-with-portfolio/',
  '/news/',
]
