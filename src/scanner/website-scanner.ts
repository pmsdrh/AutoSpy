import { firefox } from 'playwright';

export const scanWebsite = async (url:string): Promise<ScanResult> => {
  const browser = await firefox.launch({
    headless: true
  })

  try {
    const page = await browser.newPage()
    const requests = new Map<string,NetworkRequest>();

    page.on('response', res=> {
      const req = res.request();

        requests.set(req.url(), {
        url: req.url(),
        method: req.method(),
        statusCode: res?.status() ?? null,
        resourceType: req.resourceType(),
        headers: res.headers(),
        duration: null,
        responseSize: null,
      })
    })

    page.on('requestfinished', async req => {
      const result = requests.get(req.url())
      
      if(!result)
        return;

      const timing = req.timing();
      const sizes = await req.sizes();

      result.duration = timing.responseEnd >= 0 ?
        timing.responseEnd : null;
      result.responseSize = sizes.responseBodySize;
    })

    const startTime = Date.now();

    const response = await page.goto(url, {
      waitUntil: 'domcontentloaded'
    });

    const title = await page.title();
    const statusCode = response?.status() ?? null;

    await page.waitForLoadState('load')
    const totalTime = Date.now() - startTime

    return {
      url,
      title,
      statusCode,
      requests: [...requests.values()],
      totalTime
    }
  
  } finally {
  
    await browser.close()
  
  }
}