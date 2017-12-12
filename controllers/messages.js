const Message = require('../models/message');

function messagesIndex(req, res, next) {
  Message
    .find()
    .populate('createdBy')
    .exec()
    .then((message) => res.status(200).json(message))
    .catch(next);
}

function messagesCreate(req, res, next) {
  const message = req.body;
  message.createdBy = req.user;
  Message
    .create(message)
    .then((message) => res.status(201).json(message))
    .catch(next);
}

function messagesShow(req, res, next) {
  Message
    .findById(req.params.id)
    .exec()
    .then((message) => {
      if(!message) return res.notFound();
      res.json(message);
    })
    .catch(next);
}

function messagesUpdate(req, res, next) {
  Message
    .findByIdAndUpdate(req.params.id, req.body, { new: true })
    .exec()
    .then(message => res.status(200).json(message))
    .catch(next);
}

function messagesDelete(req, res, next) {
  Message
    .findByIdAndRemove(req.params.id)
    .exec()
    .then(() => res.sendStatus(204))
    .catch(next);
}

function replyCreate(req, res, next) {
  Message
    .findById(req.params.id)
    .exec()
    .then(message => {
      if(!message) return res.notFound();
      req.body.createdBy = req.user._id;
      message.replies.push(req.body);
      message.save();
      res.status(201).json(message);
    })
    .catch(next);
}

function replyDelete(req, res, next) {
  Message
    .findById(req.params.id)
    .exec()
    .then(message => {
      if(!message) return res.notFound();
      const reply = message.replies.id(req.params.replyId);
      console.log(reply);
      reply.remove();
      message.save();
    })
    .then(() => res.sendStatus(204))
    .catch(next);
}

module.exports = {
  index: messagesIndex,
  create: messagesCreate,
  show: messagesShow,
  update: messagesUpdate,
  delete: messagesDelete,
  replyCreate: replyCreate,
  replyDelete: replyDelete
};
