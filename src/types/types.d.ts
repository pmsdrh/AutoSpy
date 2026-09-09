interface AnalyzeBody {
  url: string;
}

interface ScanResult {
  url: string;
  title: string;
  statusCode: number | null;
  requests: NetworkRequest[];
}

interface NetworkRequest {
  url: string;
  method: string;
  statusCode: number | null;
  resourceType: string;
}

interface AnalysisResult {
  totalRequests: number;
  resourceTypes: Record<string, number>
}