const launchesModel = require("../../models/launches.model");

function getAllLaunches(req, res) {
  res.status(200).json(launchesModel.getAllLaunches());
}
function addNewLaunch(req, res) {
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

  const createdLaunch = launchesModel.addNewLaunch(launch);

  res.status(201).json(createdLaunch);
}

function abortLaunch(req, res) {
  const { id } = req.params;

  if (!launchesModel.existsLaunchWithId(+id)) {
    return res.status(404).json({
      error: "Not Found",
    });
  }

  const abortedLaunch = launchesModel.abortLaunch(+id);

  return res.status(200).json(abortedLaunch);
}

module.exports = {
  getAllLaunches,
  addNewLaunch,
  abortLaunch,
};
