export default (scan: ScanResult): AssetType => {

  const assets: AssetType = {}
  
  for (const request of scan.requests){
    const type = request.resourceType;
    const size = request.responseSize ?? 0
    
    if(!assets[type])
      assets[type] = {count: 0, totalSize: 0}

    assets[type].count += 1
    assets[type].totalSize += size
  }
  return assets;

}