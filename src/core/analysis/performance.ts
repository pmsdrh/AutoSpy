export default (scan: ScanResult) => {
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

  return {
    totalTime: scan.totalTime,
    slowRequests: slowRequests,
    totalResponseSize
  }

}
