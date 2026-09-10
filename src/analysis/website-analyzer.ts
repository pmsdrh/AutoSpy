export const analyzeWebsite = (scan: ScanResult): AnalysisResult => {
  
  const pageUrl = new URL(scan.url)
  const pageHostname = pageUrl.hostname

  const resourceTypes: Record<string, number> = {}
  const domains = new Set<string>();
  const thirdPartyDomains = new Set<string>();

  const servers = new Set<string>();
  const poweredBy = new Set<string>();

  for (const request of scan.requests) {
    //resources
    const type = request.resourceType
    resourceTypes[type] = (resourceTypes[type] ?? 0) + 1
    
    //domains
    const hostname = new URL(request.url).hostname
    domains.add(hostname)
    
    const isFirstParty = hostname === pageHostname ||
    hostname.endsWith(`.${pageHostname}`)

    if (!isFirstParty)
      thirdPartyDomains.add(hostname);

    //headers
    const server = request.headers['server']
    const poweredByHeader = request.headers['x-powered-by']

    if (server)
      servers.add(server);

    if (poweredByHeader)
      poweredBy.add(poweredByHeader);

  }

  //Response Timing
  const slowRequests = scan.requests.filter(
    request => 
      request.duration !== null &&
      request.duration > 1000
      
    ).map(request => ({      
        url: request.url,
        duration: request.duration!
    }))

  const totalResponseSize = scan.requests.reduce(
    (total, request) => total + (request.responseSize ?? 0), 0
  )

  //Assets
  const assets: AssetType = {}
  for (const request of scan.requests){
    const type = request.resourceType;
    const size = request.responseSize ?? 0
    
    if(!assets[type])
      assets[type] = {count: 0, totalSize: 0}

    assets[type].count += 1
    assets[type].totalSize += size
  }


  return {
    totalRequests: scan.requests.length,
    resourceTypes,
    domains: [...domains],
    thirdPartyDomains: [...thirdPartyDomains],
    headers: {
      server: [...servers],
      poweredBy: [...poweredBy]
    },
    performance: {
      totalTime: scan.totalTime,
      slowRequests: slowRequests,
      totalResponseSize
    },
    assets
    
  }
}