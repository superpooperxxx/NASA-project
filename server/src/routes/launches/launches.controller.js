const launchesModel = require("../../models/launches.model");

async function getAllLaunches(req, res) {
  const launches = await launchesModel.getAllLaunches();

  res.status(200).json(launches);
}

async function addNewLaunch(req, res) {
  const launch = req.body;

  if (
    !launch.mission ||
    !launch.rocket ||
    !launch.target ||
    !launch.launchDate
  ) {
    res.status(422).json({
      error: "Some of the fields are missing",
    });

    return;
  }

  launch.launchDate = new Date(launch.launchDate);

  if (isNaN(launch.launchDate)) {
    res.status(422).json({
      error: "Invalid launch date",
    });

    return;
  }

  const createdLaunch = await launchesModel.addNewLaunch(launch);

  res.status(201).json(createdLaunch);
}

async function abortLaunch(req, res) {
  const { id } = req.params;

  const exists = await launchesModel.existsLaunchWithId(+id);

  if (!exists) {
    return res.status(404).json({
      error: "Not Found",
    });
  }

  await launchesModel.abortLaunch(+id);

  return res.sendStatus(204);
}

module.exports = {
  getAllLaunches,
  addNewLaunch,
  abortLaunch,
};
