import { firefox } from 'playwright';

export const scanWebsite = async (url:string): Promise<ScanResult> => {
  const browser = await firefox.launch({
    headless: true
  })

  try {
    const page = await browser.newPage()
    const requests: NetworkRequest[] = [];
    
    page.on('response', res=> {
      requests.push({
        url: res.url(),
        method: res.request().method(),
        statusCode: res?.status() ?? null,
        resourceType: res.request().resourceType()
      })
    })
    
    const response = await page.goto(url, {
      waitUntil: 'domcontentloaded'
    });
    const title = await page.title();
    const statusCode = response?.status() ?? null;

    return {
      url,
      title,
      statusCode,
      requests
    }
  
  } finally {
  
    await browser.close()
  
  }
}