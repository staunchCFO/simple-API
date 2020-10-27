var express = require('express');
var router = express.Router();

const IndexController = require('../controller/indexController')

// Get all subscribers
router.get('/', IndexController.getAllSubcribers)

// Get one subscriber
router.get('/single/:id', IndexController.getSingleSubcriber)

// Create one subscriber
router.post('/create', IndexController.createSingleSubcriber)

// Update one subscriber
router.patch('/update/:id', IndexController.updateSubscriber)

// Delete one subscriber
router.delete('/remove/:id', IndexController.removeSubscriber)


module.exports = router;
