import type { FastifyPluginAsync } from "fastify";
import { scanWebsite } from "../../scanner/website-scanner.js";

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
    const result = await scanWebsite(url);
    return result;
    
  })
}

export default analyzeRoute;