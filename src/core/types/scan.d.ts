interface ScanResult {
  url: string;
  title: string;
  statusCode: number | null;
  requests: NetworkRequest[];
  totalTime: number;
}
