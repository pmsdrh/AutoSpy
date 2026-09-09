import Fastify from "fastify";

const app = Fastify({
  logger: true
})

app.get('/health', async () => {
  return {
    status: "ok"
  }
})

const start = async () => {
  try {
    await app.listen({
      port: 3000,
      host: '127.0.0.1'
    })
  } catch (e) {
    app.log.error(e);
    process.exit(1);
  }
}

start();