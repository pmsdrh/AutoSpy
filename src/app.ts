import Fastify from "fastify";
import healthRoute from "./api/routes/health.js";
import analyzeRoute from "./api/routes/analyze.js";

export const app = Fastify({
  logger: true,
  routerOptions: {
    ignoreTrailingSlash: true,
  }
})

app.register(healthRoute)
app.register(analyzeRoute)
