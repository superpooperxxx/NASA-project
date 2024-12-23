const BASE_URL = "http://localhost";

const getFullUrl = (url) => `${BASE_URL}${url}`;

async function httpGetPlanets() {
  const response = await fetch(getFullUrl("/planets"));

  return await response.json();
}

async function httpGetLaunches() {
  const response = await fetch(getFullUrl("/launches"));

  return await response.json();
}

async function httpSubmitLaunch(launch) {
  try {
    return await fetch(getFullUrl("/launches"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(launch),
    });
  } catch {
    return {
      ok: false,
    };
  }
}

async function httpAbortLaunch(id) {
  try {
    return await fetch(getFullUrl(`/launches/${id}`), {
      method: "DELETE",
    });
  } catch {
    return {
      ok: false,
    };
  }
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
