import { firefox } from 'playwright';

export const scanWebsite = async (url:string): Promise<ScanResult | null> => {
  const browser = await firefox.launch({
    headless: true
  })

  try {
    const page = await browser.newPage()
    const response = await page.goto(url, {
      waitUntil: 'domcontentloaded'
    })
    const title = await page.title()
    const statusCode = response?.status() ?? null
    return {
      url,
      title,
      statusCode
    }
  } finally {
    await browser.close()
  }
}