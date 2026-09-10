import type { FastifyPluginAsync } from "fastify";
import { scanWebsite } from "../../core/scanner/website-scanner.js";
import { analyzeWebsite } from "../../core/analysis/full-analyzer.js";

interface AnalyzeBody {
  url: string;
}

const analyzeRoute: FastifyPluginAsync = 
async (app) => {
  app.post<{Body: AnalyzeBody}>('/analyze',
    {
      schema: {
        body: {
          type: 'object',
          properties: {
            url: {
              type: 'string',
              format: 'uri'
            }
          },
          required: ["url"],
        }
      }
    }, async (request) => {
    const { url } = request.body;
    const scanResult = await scanWebsite(url);
    const analyzeResult = analyzeWebsite(scanResult);
    return {
      scanResult,
      analyzeResult
    };
    
  })
}

export default analyzeRoute;