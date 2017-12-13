const rp = require('request-promise');

function getWeatherdata(req, res) {
  rp(`https://api.darksky.net/forecast/${process.env.DARK_SKIES_API_KEY}/${req.params.lat},${req.params.lng}?units=si`)
    .then(data => {
      return res.status(200).json(JSON.parse(data));
    });
}

module.exports = {
  weather: getWeatherdata
};
