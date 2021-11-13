const Poll = require("../models/poll.models");

module.exports.createPoll = (request, response) => {
    Poll.create(request.body)
        .then(newPoll => response.json(newPoll))
        .catch(err => response.status(400).json(err))
};

module.exports.findAllPolls = (request, response) => {
  Poll.find().sort({created:-1})
      .then(allPolls => response.json(allPolls))
      .catch(err => response.json(err))
};

module.exports.findTopThree = (request, response) => {
    Poll.find().sort("-totalVotes").limit(3)
        .then(allPolls => response.json(allPolls))
        .catch(err => response.json(err))
};

module.exports.findPoll = (request, response) => {
    Poll.find({_id: request.params.id})
        .then(foundPoll => response.json(foundPoll))
        .catch(err => response.json(err))
};

module.exports.updatePoll = (request, response) => {
  Poll.findOneAndUpdate({_id: request.params.id}, request.body, {new:true, runValidators: true})
      .then(updatedPoll => response.json(updatedPoll))
      .catch(err => response.json(err))
};

module.exports.deletePoll = (request, response) => {
    Poll.deleteOne({_id: request.params.id})
        .then(deleteConfirmation => response.json(deleteConfirmation))
        .catch(err => response.json(err))
};