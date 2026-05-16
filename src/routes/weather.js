// import getWeatherForLocation function from weatherService.js
const { getWeatherForLocation } = require("../services/weatherService");
// import express
const express = require("express");
const router = express.Router();

// define route for /weather
router.get("/weather", async (req, res) => {
  // get latitude and longitude from query parameters
  const lat = req.query.lat;
  const lon = req.query.lon;
  // validate that latitude and longitude are provided.
  if (!lat || !lon) {
    return res
      .status(400)
      .json({ error: "Missing latitude or longitude query parameters" });
  }
  // call weather service to get weather data for the provided lat/lon
  try {
    const weatherData = await getWeatherForLocation(lat, lon);
    res.json(weatherData);
  } catch (error) {
    // handle errors from weather service
    console.error("Error fetching weather data:", error);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

// export the router
module.exports = router;