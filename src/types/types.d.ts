interface AnalyzeBody {
  url: string;
}

interface ScanResult {
  url: string;
  title: string;
  statusCode: number | null;
  requests: NetworkRequest[];
  totalTime: number;
}

interface NetworkRequest {
  url: string;
  method: string;
  statusCode: number | null;
  resourceType: string;
  headers: Record<string, string>
  duration: number | null;
  responseSize: number | null;
}

type AssetType = Record<string, {
      count: number;
      totalSize: number;
    }>

interface AnalysisResult {
  totalRequests: number;
  resourceTypes: Record<string, number>;
  domains: string[];
  thirdPartyDomains: string[];
  headers: {
    server: string[];
    poweredBy: string[];
  },
  performance: {
    totalTime: number;
    slowRequests: {
      url: string;
      duration: number;
    }[]
    totalResponseSize: number;
  },
  assets: AssetType;
}