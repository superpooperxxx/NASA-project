const http = require("node:http");
const mongoose = require("mongoose");
const app = require("./src/app");
const { loadPlanets } = require("./src/models/planets.model");

const PORT = process.env.PORT || 80;

const MONGO_URL =
  "mongodb+srv://nasa-api:LmiZ08Qu6s7gD4nW@nasacluster.sls0f.mongodb.net/?retryWrites=true&w=majority&appName=NASACluster";

const server = http.createServer(app);

async function startServer() {
  await mongoose.connect(MONGO_URL, {
    dbName: "nasa",
  });
  await loadPlanets();

  server.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
  });
}

startServer();
