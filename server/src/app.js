const path = require("node:path");
const express = require("express");
const cors = require("cors");

const planetsRouter = require("./routes/planets/planets.router");
const launchesRouter = require("./routes/launches/launches.router");

const PUBLIC_PATH = path.join(__dirname, "..", "public");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.static(PUBLIC_PATH));
app.use(express.json());

app.use("/planets", planetsRouter);
app.use("/launches", launchesRouter);

app.get("/*", (req, res) => {
  res.sendFile(path.join(PUBLIC_PATH, "index.html"));
});

module.exports = app;
