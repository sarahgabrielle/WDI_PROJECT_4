const Trip = require('../models/trip');

function tripIndex(req, res, next){
  Trip
    .find()
    .populate('createdBy')
    .exec()
    .then(trips => res.status(200).json(trips))
    .catch(next);
}

function tripCreate(req, res, next){
  const trip = req.body;
  trip.createdBy = req.user;

  Trip
    .create(trip)
    .then(trip => res.status(201).json(trip))
    .catch(next);
}

function tripShow(req, res, next){
  Trip
    .findById(req.params.id)
    .exec()
    .then((trip) => {
      if (!trip) return res.notFound();

      res.json(trip);
    })
    .catch(next);
}


function tripUpdate(req, res, next){
  Trip
    .findById(req.params.id)
    .exec()
    .then((trip) => {
      if(!trip) return res.notFound();
      trip = Object.assign(trip, req.body);
      return trip.save();
    })
    .then(trip => res.json(trip))
    .catch(next);
}

function tripDelete(req, res, next){
  Trip
    .findById(req.params.id)
    .exec()
    .then((trip) => {
      if(!trip) return res.notFound();
      return trip.remove();
    })
    .then(() => res.status(204).end())
    .catch(next);
}

module.exports = {
  index: tripIndex,
  create: tripCreate,
  show: tripShow,
  update: tripUpdate,
  delete: tripDelete
};
