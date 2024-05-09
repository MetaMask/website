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
        const response = await page.goto(url)
        await page.waitForSelector('meta[name="description"]')
        await page.waitForSelector('img[alt]')

        // Check for 200 status code
        try {
          expect(response.status()).toBe(200)
        } catch (error) {
          throw new Error(`❌: ${url}\n\n ${error.message}`)
        }

        // Check for title
        let title = await page.title()

        try {
          expect(title).toBeTruthy()
          title = title.replace(' | MetaMask News', '')
          expect(title.length).toBeGreaterThanOrEqual(4)
          expect(title.length).toBeLessThanOrEqual(60)
        } catch (error) {
          throw new Error(`❌ Title: ${title}\n- ${url}\n\n ${error.message}`)
        }

        // Check for meta description
        const metaDescriptionContent = await page.$eval(
          'meta[name="description"]',
          element => element.content
        )

        try {
          expect(metaDescriptionContent).toBeTruthy()
          expect(metaDescriptionContent.length).toBeGreaterThanOrEqual(4)
          expect(metaDescriptionContent.length).toBeLessThanOrEqual(160)
        } catch (error) {
          throw new Error(
            `❌ Meta description: ${metaDescriptionContent}\n- ${url}\n\n ${error.message}`
          )
        }

        // Check for alt text
        const imgElement = await page.$eval('img[alt]', element => {
          return { alt: element.alt, src: element.src }
        })

        // Only check alt text if src is not equal to the gatsby placeholder
        const regex = /^data:image\/svg\+xml;charset=utf-8,%3Csvg%20height='(\d+)'%20width='(\d+)'%20xmlns='http:\/\/www.w3.org\/2000\/svg'%20version='1.1'%3E%3C\/svg%3E$/

        if (!regex.test(imgElement.src)) {
          try {
            expect(imgElement.alt).toBeTruthy()
            expect(imgElement.alt.length).toBeGreaterThanOrEqual(4)
            expect(imgElement.alt.length).toBeLessThanOrEqual(125)
          } catch (error) {
            throw new Error(
              `❌ Alt text: ${imgElement.alt}\n- ${imgElement.src}\n\n${url}\n\n ${error.message}`
            )
          }
        }
      }
    },
    8 * 60 * 1000
  )
})
