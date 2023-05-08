const express = require('express');
const router = express.Router();
const jokesController = require('../controllers/jokes.controller');

//------------------------------MY CRUD ROUTES-------------------------

// GET all jokes
router.get('/jokes', jokesController.getJokes);

// GET single joke by ID
router.get('/jokes/:id', jokesController.getJoke);

//POST new joke
router.post('/jokes', jokesController.createJoke);

//PUT update whole joke by ID
router.put('/jokes/:id', jokesController.updateJokePut);

// PATCH update partial joke by ID
router.patch('/:id', jokesController.updateJokePatch);

//DELETE joke by ID
router.delete('/jokes/:id', jokesController.deleteJoke);

module.exports = router;