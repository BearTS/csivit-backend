const router = require('express').Router();
const Feedback = require('../models/feedback');
const emailRegex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');

router.post('/feedback', (req, res) => {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) return res.status(400).json({ message: 'Missing Parameters' }); 
    if (!emailRegex.test(email)) return res.status(400).json({ message: 'Invalid Email' });
    if (subject.length > 50) return res.status(400).json({ message: 'Subject too long' });
    if (message.length < 10) return res.status(400).json({ message: 'Message too short' });
    try {
        const feedback = new Feedback({
            name: name,
            email: email,
            subject: subject,
            message: message
        });
        feedback.save()
            .then(() => { 
                res.status(200).json({ message: 'Feedback Sent' });
            }).catch(err => {
                console.log(err);
                res.status(500).json({ message: 'Internal Server Error'});
            });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err });
    }
});

router.get('/feedback', (req, res) => {
    Feedback.find()
        .then(feedbacks => {
            res.send(feedbacks);
        }).catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving notes.'
            });
        });
    
});

router.put('/feedback/:id', (req, res) => {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) return res.status(400).json({ message: 'Missing Parameters' });
    if (!emailRegex.test(email)) return res.status(400).json({ message: 'Invalid Email' });
    if (subject.length > 50) return res.status(400).json({ message: 'Subject too long' });
    if (message.length < 10) return res.status(400).json({ message: 'Message too short' });
    Feedback.findByIdAndUpdate(req.params.id, {
        name: name,
        email: email,
        subject: subject,
        message: message
    }, { new: true })
        .then(feedback => {
            if (!feedback) {
                return res.status(404).send({
                    message: 'Feedback not found with id ' + req.params.id
                });
            }
            res.send(feedback);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: 'Feedback not found with id ' + req.params.id
                });
            }
            return res.status(500).send({
                message: 'Error updating feedback with id ' + req.params.id
            });
        });
});

router.delete('/feedback/:id', (req, res) => {
    Feedback.findByIdAndDelete(req.params.id)
        .then(feedback => {
            if(!feedback) {
                return res.status(404).send({
                    message: 'Feedback not found with id ' + req.params.id
                });
            }
            res.send({message: 'Feedback deleted successfully!'});
        }).catch(err => {
            if(err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: 'Feedback not found with id ' + req.params.id
                });                
            }
            return res.status(500).send({
                message: 'Could not delete feedback with id ' + req.params.id
            });
        });
});

module.exports = router;