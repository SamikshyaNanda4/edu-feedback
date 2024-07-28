// Feedback Routes
const router = require('express').Router();
const Feedback = require('../models/Feedback');
const auth = require('../middleware/auth');

// Create feedback
router.post('/create', auth, (req, res) => {
  const newFeedback = new Feedback({
    userId: req.user.id,
    content: req.body.content,
  });

  newFeedback.save()
    .then(() => res.json('Feedback added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Get all feedback
router.get('/', (req, res) => {
  Feedback.find()
    .populate('userId', 'username')
    .then(feedbacks => res.json(feedbacks))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
