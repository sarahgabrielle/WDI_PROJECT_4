const Trip = require('../models/trip');

const sockets = require('../lib/sockets');
const io = sockets.getConnection();

function tripIndex(req, res, next){

  Trip
    .find()
    .populate('createdBy users')
    .exec()
    .then(trips => res.status(200).json(trips))
    .catch(next);
}

function tripCreate(req, res, next){

  req.body.createdBy = req.currentUser;

  Trip
    .create(req.body)
    .then(trip => res.status(201).json(trip))
    .catch(next);
}

function tripShow(req, res, next){

  Trip
    .findById(req.params.id)
    .populate('createdBy groupMessage.createdBy users')
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

function tripMessageCreate(req, res, next) {

  req.body.createdBy = req.currentUser;

  Trip
    .findById(req.params.id)
    .exec()
    .then(trip => {
      if(!trip) return res.notFound();

      trip.groupMessage.push(req.body);
      return trip.save();
    })
    .then(trip => Trip.populate(trip, {path: 'groupMessage.createdBy'}))
    .then(trip => {
      const message = trip.groupMessage[trip.groupMessage.length -1];
      io.emit('MESSAGE', message);
      return res.sendStatus(201);
    })
    .catch(next);
}

function tripMessageDelete(req, res, next) {

  Trip
    .findById(req.params.id)
    .exec()
    .then((trip) => {
      if(!trip) return res.notFound();

      const message = trip.groupMessage.id(req.params.messageId);
      message.remove();

      return trip.save();
    })
    .then(() => res.status(204).end())
    .catch(next);
}

function tripMemoriesCreate(req, res, next) {

  if(req.file) {
    req.body.filename = req.file.filename;
    req.body.fileType = req.file.type;
  }

  Trip
    .findById(req.params.id)
    .exec()
    .then(trip => {
      if(!trip) return res.notFound();

      trip.memories.push(req.body);
      return trip.save();
    })
    .then(trip => res.status(201).json(trip))
    .catch(next);
}

function tripMemoryDelete(req, res, next) {

  Trip
    .findById(req.params.id)
    .exec()
    .then((trip) => {
      if(!trip) return res.notFound();
      console.log(trip);
      trip.memories.pull(req.params.memoryId);

      return trip.save();
    })
    .then(() => res.status(204).end())
    .catch(next);
}

module.exports = {
  index: tripIndex,
  create: tripCreate,
  show: tripShow,
  update: tripUpdate,
  delete: tripDelete,
  createMessage: tripMessageCreate,
  deleteMessage: tripMessageDelete,
  createMemory: tripMemoriesCreate,
  deleteMemory: tripMemoryDelete
};
