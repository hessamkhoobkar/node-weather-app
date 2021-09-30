const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=17cf665e33d7901a33ca2d47ee3d8347&query=${latitude},${longitude}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        `It's currently ${body.current.temperature} degress out. it feels like ${body.current.feelslike} degrees.`
      );
    }
  });
};

module.exports = forecast;
