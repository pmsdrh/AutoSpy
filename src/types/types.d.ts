interface AnalyzeBody {
  url: string;
}

interface ScanResult {
  url: string;
  title: string;
  statusCode: number | null;
}