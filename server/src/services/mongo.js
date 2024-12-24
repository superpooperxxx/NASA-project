const mongoose = require("mongoose");

const MONGO_URL =
  "mongodb+srv://nasa-api:LmiZ08Qu6s7gD4nW@nasacluster.sls0f.mongodb.net/?retryWrites=true&w=majority&appName=NASACluster";

mongoose.connection.once("open", () => {
  console.log("MongoDB connection is ready!");
});

mongoose.connection.once("error", (error) => {
  console.error(error);
});

async function mongoConnect() {
  await mongoose.connect(MONGO_URL, {
    dbName: "nasa",
  });
}

async function mongoDisconnect() {
  await mongoose.disconnect();
}

module.exports = {
  mongoConnect,
  mongoDisconnect,
};
