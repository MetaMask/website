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

export const TEMPLATE_LAYOUT_LIST = [
  {
    name: 'Defaut',
    path: './src/templates/ContentfulLayout.js',
  },
  {
    name: 'Download',
    path: './src/templates/ContentfulDownloadLayout.js',
  },
  {
    name: 'Asset',
    path: './src/templates/ContentfulAssetLayout.js',
  },
  {
    name: 'Legal',
    path: './src/templates/MarkdownPageLayout.js',
  },
  {
    name: 'Portfolio',
    path: './src/templates/ContentfulPortfolioLayout.js',
  },
  {
    name: 'SwapWithPorfolio',
    path: './src/templates/SwapWithPortfolioLayout.js',
  },
  {
    name: 'MultiToken',
    path: './src/templates/MultiTokenSwapLayout.js',
  },
  {
    name: 'PYUSD',
    path: './src/templates/PYUSDLayout.js',
  },
  {
    name: 'Blog',
    path: './src/templates/NewsLayout.js',
  },
  {
    name: 'Author',
    path: './src/templates/AuthorProfileLayout.js',
  },
  {
    name: 'News',
    path: './src/templates/ContentfulNewsCategoryLayout.js',
  },
]

export const mapTemplateLayout = name => {
  if (!name) return TEMPLATE_LAYOUT_LIST[0].path
  const template = TEMPLATE_LAYOUT_LIST.find(l => l.name === name)
  if (template) {
    return template.path
  }
  return TEMPLATE_LAYOUT_LIST[0].path
}

export const LOCALES = [
  {
    name: 'English',
    localizedName: 'English',
    code: 'en-US',
    shortName: 'EN',
    htmlLang: 'en',
    default: true,
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
export const DEFAULT_LOCALE = LOCALES.find(l => l.default)
export const DEFAULT_LOCALE_CODE = DEFAULT_LOCALE.code

export const mapCodeToHtmlLang = code => {
  const locale = LOCALES.find(l => l.code === code)
  return locale ? locale.htmlLang : DEFAULT_LOCALE.htmlLang
}

export const GB_BLOCKED_PATHS = ['/buy-crypto/', '/sell-crypto/', '/swaps/']