export default (scan: ScanResult) => {
  const pageUrl = new URL(scan.url)
  const pageHostname = pageUrl.hostname

  const domains = new Set<string>();
  const thirdPartyDomains = new Set<string>();

  const servers = new Set<string>();
  const poweredBy = new Set<string>();

  for (const request of scan.requests) {
    const hostname = new URL(request.url).hostname
    domains.add(hostname)
    
    const isFirstParty = hostname === pageHostname ||
    hostname.endsWith(`.${pageHostname}`)

    if (!isFirstParty)
      thirdPartyDomains.add(hostname);

  }

  return {domains: [...domains], thirdPartyDomains: [...thirdPartyDomains]}

}