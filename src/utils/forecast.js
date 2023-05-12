const request = require("request");

const foreCast = (longitude, Latitude, callback) => {
  // const url = `http://api.weatherstack.com/current?access_key=c079214de89df77e13aa49f8f3ccc99e&query=${longitude},${Latitude}&units=f`;
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${Latitude}&lon=${longitude}&appid=8a79f028612ac7e76d7a90ecabfbfea6&units=metric`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback(error, undefined);
      console.log("Unable to connect to weather service");
    } else {
      const otherData = body?.list[0]?.main;
      const main = body?.list[0]?.main?.temp;
      const feelsLike = body?.list[0]?.main?.feels_like;
      const data = `It is currently ${main} degress.But it feels like ${feelsLike} degress out there`;
      callback(undefined, data, otherData);
      console.log("response33", otherData);
      // console.log(
      //   `${response.body.current.weather_descriptions[0]}. It is currently ${response.body.current.temperature} degress out. It feels like ${response.body.current.feelslike} degress out`
      // );
    }
  });
};

module.exports = foreCast;
