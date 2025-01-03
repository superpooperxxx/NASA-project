const http = require("node:http");

const app = require("./src/app");
const { loadPlanets } = require("./src/models/planets.model");
const { mongoConnect } = require("./src/services/mongo");

const PORT = process.env.PORT || 80;

const server = http.createServer(app);

async function startServer() {
  await mongoConnect();
  await loadPlanets();

  server.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
  });
}

startServer();
