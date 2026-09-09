import type { FastifyPluginAsync } from "fastify";
import { scanWebsite } from "../../scanner/website-scanner.js";
import { analyzeWebsite } from "../../analysis/website-analyzer.js";

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