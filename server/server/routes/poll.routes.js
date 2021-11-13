const PollController = require('../controllers/poll.controller');

module.exports = app => {
    app.post("/api/createPoll", PollController.createPoll);
    app.get("/api/getAllPolls", PollController.findAllPolls);
    app.get("/api/topThree", PollController.findTopThree);
    app.get("/api/polls/:id", PollController.findPoll);
    app.put("/api/polls/:id", PollController.updatePoll);
    app.delete("/api/polls/:id", PollController.deletePoll);
}