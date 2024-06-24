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
  },
  {
    name: 'Chinese',
    localizedName: '中文',
    shortName: 'CN',
    code: 'zh-CN',
    htmlLang: 'zh',
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

export const mapCodeToHtmlLang = (code, previewMode) => {
  const listLocales = previewMode ? PREVIEW_LOCALES : LOCALES
  const locale = listLocales.find(l => l.code === code)
  return locale ? locale.htmlLang : DEFAULT_LOCALE.htmlLang
}

export const PREVIEW_LOCALES = [
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
    htmlLang: 'zh',
  },
  {
    name: 'Hindi',
    localizedName: 'हिन्दी',
    code: 'hi-IN',
    shortName: 'HI',
    htmlLang: 'hi',
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
    htmlLang: 'pcm-NG',
  },
]

export const GB_BLOCKED_PATHS = ['/buy-crypto/', '/sell-crypto/', '/swaps/']
