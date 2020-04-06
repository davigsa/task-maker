const express = require('express');

const TaskController = require('./controllers/TaskController');
const SearchController = require('./controllers/SearchController');

const routes = express.Router();

routes.get('/tasks', TaskController.index);
routes.post('/tasks', TaskController.store);
routes.delete('/tasks/:id', TaskController.remove);

routes.get('/search', SearchController.index);

module.exports = routes;