var express = require('express');
var router = express.Router();
var ProjectHandler = require('./projectHandler.js');
var add = ProjectHandler.add(1,2);
/* GET project listing. */
router.get('/', ProjectHandler.getProjects);
/* GET project by id. */
router.get('/:id', ProjectHandler.getProjectsById);
// Add a new project via GET
router.get('/add', ProjectHandler.addProjectGet);
// Add a new project via POST
router.post('/add', ProjectHandler.addProjectPost);
// Add a new entry for a project via POST by id
router.post('/addEntry/:id', ProjectHandler.addEntryGet);
// Add a new entry for a project via GET by ID
router.get('/addEntry/:id', ProjectHandler.addEntryPost);
// GET: All entries by id
router.get('/entries/:id', ProjectHandler.getEntries);

module.exports = router;
