// import temp characterization
const tempCharacterization = require('../utils/tempCharacterization');

// user agent string for NWS API requests
const USER_AGENT = "(weather-api-tanner-watson, tanner.watsondev@gmail.com)";

// function to fetch point data from NWS API
const getPointData = async (latitude, longitude) => {
  const response = await fetch(
    `https://api.weather.gov/points/${latitude},${longitude}`,
    {
      headers: {
        "User-Agent": USER_AGENT,
      },
    },
  );
  // Check if the response is ok, if not throw an error with status text
  if (!response.ok) {
    throw new Error(`Error fetching point data: ${response.statusText}`);
  }
  // return the JSON response
  return response.json();
};


// function to fetch forecast data from NWS API
const getForecast = async (forecastUrl) => {
  const response = await fetch(forecastUrl, {
    headers: {
      "User-Agent": USER_AGENT,
    },
  });
  // Check if the response is ok, if not throw an error with status text
  if (!response.ok) {
    throw new Error(`Error fetching forecast data: ${response.statusText}`);
  }
  // return the JSON response
  return response.json();
};

//function to fetch weather data from NWS API based on latitude and longitude
const getWeatherForLocation = async (latitude, longitude) => {
  try {
    // fetch point data from NWS API
    const pointData = await getPointData(latitude, longitude);
    // extract forecast URL from point data
    const forecastUrl = pointData.properties.forecast;
    // fetch forecast data from NWS API using the forecast URL
    const forecastData = await getForecast(forecastUrl);
    // find the period in the forecast data that corresponds to "Today"
    const todayPeriod = forecastData.properties.periods.find(
      (period) => period.name === "Today" || period.name === "Tonight",
    );

    // if today's weather information is not found, throw an error
    if (!todayPeriod) {
      throw new Error("Today's weather information not found in forecast data");
    }

    // return object containing todays weather information
    return {
      name: todayPeriod.name,
      date: todayPeriod.startTime,
      temperature: todayPeriod.temperature,
      temperatureUnit: todayPeriod.temperatureUnit,
      shortForecast: todayPeriod.shortForecast,
      tempCharacterization: tempCharacterization(todayPeriod.temperature),
    };
  } catch (error) {
    // log any errors that occur during the fetch process
    console.error(error);
    throw error;
  }
};

// export function for use in other files
module.exports = {
  getPointData,
  getForecast,
  getWeatherForLocation,
};