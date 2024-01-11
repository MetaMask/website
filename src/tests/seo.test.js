const puppeteer = require('puppeteer')

describe('SEO Metadata', () => {
  let browser
  let page
  let urls

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox'],
    })

    page = await browser.newPage()
  })

  afterAll(async () => {
    await browser.close()
  })

  test('news-sitemap.xml is valid', async () => {
    await page.goto('https://metamask.io/news-sitemap.xml')

    // Extract the URLs
    urls = await page.$$eval('loc', nodes => nodes.map(n => n.textContent))

    // Check that there are URLs
    expect(urls.length).toBeGreaterThan(0)

    // Check for valid URLs
    urls.forEach(url => {
      expect(url).toMatch(/^(http|https):\/\/[^ "]+$/)
    })
  })

  test(
    'each page has a title and a meta description',
    async () => {
      for (const url of urls) {
        console.log('->', url)
        const response = await page.goto(url)
        await page.waitForSelector('meta[name="description"]')

        // Check for 200 status code
        expect(response.status()).toBe(200)

        const title = await page.title()
        expect(title).toBeTruthy()

        const metaDescriptionContent = await page.$eval(
          'meta[name="description"]',
          element => element.content
        )
        expect(metaDescriptionContent).toBeTruthy()
      }
    },
    300 * 1000
  )
})
