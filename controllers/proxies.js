const rp = require('request-promise');

function getWeatherdata(req, res) {
  rp({
    url: `https://api.darksky.net/forecast/${process.env.DARK_SKIES_API_KEY}/${req.params.lat},${req.params.lng}`,
    qs: {
      units: 'si'
    },
    json: true
  })
    .then(data => {
      return res.status(200).json(data);
    });
}

module.exports = {
  weather: getWeatherdata
};
