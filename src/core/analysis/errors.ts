export default (scan: ScanResult) => {

    const brokenRequests = scan.requests
    .filter(request=> 
      request.statusCode !== null &&
      request.statusCode >= 400)
    .map(request => ({
      url: request.url,
      statusCode: request.statusCode!,
      resourceType: request.resourceType
    }))
    
    return {
      count: brokenRequests.length,
      requests: brokenRequests
    }
;

}