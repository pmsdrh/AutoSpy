export const analyzeWebsite = (scan: ScanResult): AnalysisResult => {
  const resourceTypes: Record<string, number> = {}
  for (const request of scan.requests) {
    const type = request.resourceType
    resourceTypes[type] = (resourceTypes[type] ?? 0) + 1
  }
  return {
    totalRequests: scan.requests.length,
    resourceTypes
  }
}