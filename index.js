// Express.js boilerplate for simple web server
const express = require("express");
const app = express();
const port = 3000;

// import weather route
const weatherRoute = require("./src/routes/weather");
// use weather route
app.use("/", weatherRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});