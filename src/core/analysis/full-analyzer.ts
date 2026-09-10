import assets from "./assets.js";
import domains from "./domains.js";
import errors from "./errors.js";
import performance from "./performance.js";

export const analyzeWebsite = (scan: ScanResult): AnalysisResult => {
  
  const resourceTypes: Record<string, number> = {}

  const servers = new Set<string>();
  const poweredBy = new Set<string>();

  for (const request of scan.requests) {
    //resources
    const type = request.resourceType
    resourceTypes[type] = (resourceTypes[type] ?? 0) + 1
    
    //headers
    const server = request.headers['server']
    const poweredByHeader = request.headers['x-powered-by']

    if (server)
      servers.add(server);

    if (poweredByHeader)
      poweredBy.add(poweredByHeader);

  }


  return {
    totalRequests: scan.requests.length,
    resourceTypes,
    ...domains(scan),
    headers: {
      server: [...servers],
      poweredBy: [...poweredBy]
    },
    performance: performance(scan),
    assets: assets(scan),
    errors: errors(scan),    
  }
}