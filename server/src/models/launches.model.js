const launches = new Map();

let latestFlightNumber = 100;

function existsLaunchWithId(id) {
  return launches.has(id);
}

function getAllLaunches() {
  return Array.from(launches.values());
}

function addNewLaunch(launch) {
  launches.set(
    ++latestFlightNumber,
    Object.assign(launch, {
      flightNumber: latestFlightNumber++,
      customers: ["ZTM", "NASA"],
      upcoming: true,
      success: true,
    })
  );

  return launch;
}

function abortLaunch(id) {
  const abortedLaunch = launches.get(id);

  abortedLaunch.upcoming = false;
  abortedLaunch.success = false;

  return abortedLaunch;
}

module.exports = {
  existsLaunchWithId,
  getAllLaunches,
  addNewLaunch,
  abortLaunch,
};
