const puppeteer = require('puppeteer')
const uniq = require('lodash/fp/uniq')
const pipe = require('lodash/fp/pipe')
const filter = require('lodash/fp/filter')
const map = require('lodash/fp/map')
const get = require('lodash/fp/get')
const startsWith = require('lodash/fp/startsWith')
const last = require('lodash/last')
const split = require('lodash/fp/split')

const notIn =
  /**
   * Curried function to check if a value is not included in the array
   * @param {string[]} array
   */
  array =>
    /**
     * @param {string} value
     * @returns {boolean}
     */
    value => !array.includes(value)

const notAsset =
  /**
   * Check if the URL object is not an asset.
   * @param {URL} url
   */
  url =>
    pipe(
      get('pathname'),
      split('.'),
      last,
      notIn(['svg', 'pdf', 'png', 'jpeg'])
    )(url)

describe('Test internal links', () => {
  let browser
  let page
  const BASE_URL = 'https://metamask.io'

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox'],
    })

    page = await browser.newPage()

    await page.setRequestInterception(true)
    page.on('request', request => {
      if (['document'].includes(request.resourceType())) {
        request.continue()
      } else {
        request.abort()
      }
    })
  })

  afterAll(async () => {
    await browser.close()
  })

  test('All internal links should have trailing slash.', async () => {
    const sitemaps = [
      `${BASE_URL}/sitemap-0.xml`,
      `${BASE_URL}/news-sitemap.xml`,
    ]
    let allUrls = []
    for (const sitemap of sitemaps) {
      await page.goto(sitemap)
      const locs = await page.$$('loc')
      const urls = await Promise.all(
        locs.map(aTag => aTag.evaluate(e => e.textContent))
      )
      allUrls = [...allUrls, ...urls]
    }

    let hasError = false

    for (const url of allUrls) {
      // console.log('ℹ Testing: %s', url)
      await page.goto(url)
      const allLinks = await page.$$('a')
      const hrefs = await Promise.all(
        allLinks.map(aTag => aTag.evaluate(e => e.href))
      )

      const nonTrailingSlashUrls = pipe(
        uniq,
        filter(startsWith(BASE_URL)),
        map(url => new URL(url)),
        filter(urlObj => !urlObj.pathname.endsWith('/')),
        filter(notAsset),
        map(get('href'))
      )(hrefs)

      try {
        expect(nonTrailingSlashUrls.length).toBe(0)
      } catch (e) {
        console.log(
          `❌ Found missing trailing slash links on ${url} :\n - ${nonTrailingSlashUrls.join(
            '\n - '
          )}`
        )
        hasError = true
      }
    }
    if (hasError) {
      throw new Error('Found missing trailing slash url.')
    }
  }, 1800000)
})
