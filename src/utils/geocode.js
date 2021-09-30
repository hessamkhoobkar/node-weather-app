const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiemVjaGFyaWFoYXRraW5zb24iLCJhIjoiY2p1bDY1cW9sMDEycjN6bXV6NHA2dnBpMiJ9.WfXbSLnIR2uVwZaso3aM_A&limit=1"`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to cennect to location services!", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location. Try another search.", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
