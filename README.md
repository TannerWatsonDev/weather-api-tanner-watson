Basic web server utilizing National Weather Service (NWS) API. Returns a response model object with the period name("today"), the period start time (date/time), temperature, temperature unit, short forecast, and the temperature characterization based on its temperature range(Cold, Moderate, or Hot).

Includes 2 Test Suites utilizing jest to ensure proper functionality.

To install:
Clone repo via HTTP link in github
Install necessary packages using: npm install

To run web server:
node index.js

To run test suites:
npx jest