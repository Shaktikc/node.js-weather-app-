const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.tomtom.com/search/2/geocode/${encodeURI(
    address
  )}.json?key=GmGUq66kN788nT119XTx3bps6XDA9SPy`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to geocode service", undefined);
      // console.log();
    } else if (body.results.length === 0) {
      callback("No results found!", undefined);
      // console.log("No results found!");
    } else {
      callback(undefined, {
        latitude: body.results[0].position.lat,
        longitude: body.results[0].position.lon,
        results: body.results[0].address.municipality,
      });
      //  const latitude = response.body.results[0].position.lat;
      //  const longitude = response.body.results[0].position.lon;
      //  console.log(`Latitude ${latitude} && Longitude ${longitude}`);
    }
  });
};

module.exports = geocode;
