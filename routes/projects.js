var express = require('express');
var router = express.Router();
var Project = require('../models/projectSchema');

/* GET project listing. */
router.get('/', function (req, res, next) {
    Project.find({}).sort({ date: -1 }).exec(function (err, projects) {
        if (!err) {
            res.json(projects);
        }
        else {
            res.status(err.status || 500);
            res.json({
                'error': {
                    'message': err.message,
                    'error': err
                }
            });
        }
    });
    
});
// Add a new project via GET
router.get('/add', function (req, res, next) {
    console.log(req.query.name + " " + req.query.title);
    var projectEntry = new Project({
        name: req.query.name,
        title: req.query.title
    });
    projectEntry.save(function (err) {
        if (!err)
        {
            res.json({
                'response': {
                    'message': 'Project Added'
                }
            });
        }
        else
        {
            res.status(err.status || 500);
            res.json({
                'error': {
                    'message': err.message,
                    'error': err
                }
            });
        }
    });    
});
// Add a new project via POST
router.post('/add', function (req, res, next) {
    console.log(req.body.name + " " + req.body.title);
    var projectEntry = new Project({
        name: req.body.name,
        title: req.body.title
    });
    projectEntry.save(function (err) {
        if (!err)
        {
            res.json({
                'response': {
                    'message': 'Project Added. Name: ' + req.body.name
                }
            });
        }
        else
        {
            res.status(err.status || 500);
            res.json({
                'error': {
                    'message': err.message,
                    'error': err
                }
            });
        }
    });    
});
// Add a new entry for a project via POST by id
router.post('/addEntry/:id', function (req, res, next) {
    // date: { type: Date, required: true, default: Date.now },
    // timeSpent: { type: Number, required: true },
    // note: String   
    var date = req.body.date;
    var timeSpent = req.body.timeSpent;
    var note = req.body.note;
    
    handleAddEntryById(req.params.id, date, timeSpent, note, function (err) {
        if (!err) {
            res.json({
                'response': {
                    'message': 'Project Entry Added'
                }
            });
        }
        else {
            res.status(err.status || 500);
            res.json({
                'error': {
                    'message': err.message,
                    'error': err
                }
            });
        }
    });
});
// Add a new entry for a project via GET by ID
router.get('/addEntry/:id', function (req, res, next) {
    // date: { type: Date, required: true, default: Date.now },
    // timeSpent: { type: Number, required: true },
    // note: String   
    var date = req.query.date;
    var timeSpent = req.query.timeSpent;
    var note = req.query.note;
    
    handleAddEntryById(req.params.id, date, timeSpent, note, function (err) {
        if (!err) {
            res.json({
                'response': {
                    'message': 'Project Entry Added'
                }
            });
        }
        else {
            res.status(err.status || 500);
            res.json({
                'error': {
                    'message': err.message,
                    'error': err
                }
            });
        }
    });
});
// GET: All entries by id
router.get('/entries/:id', function (req, res, next) {
    var forDate = null;
    if (req.query.date)
    {
        forDate = new Date(req.query.date);
        console.log(forDate);
    }
    getEntries(req.params.id, forDate, function (err, entries) {
        console.log(err);
        console.log(JSON.stringify(entries));
        if (!err) {
            res.json({ 'entries': entries });
        }
    });
});
// Add a time entry for a date for the selected project
var handleAddEntryById = function (id, date, timeSpent, note, callback) {
    console.log('adding entry for id' + id);
    Project.findOne({ '_id': id }).exec(function (err, project) {
        if (!err) {
            project.entries.push({ date: date, timeSpent: timeSpent, note: note });
            project.save(function (err) {
                callback.call(project, err);
            });
        }
    });
};
// Get a list of entries for a project name and/or date
var getEntries = function (id, forDate, callback) {
    Project.findOne({ '_id': id }).exec(function (err, project) {
        if (err)
        {
            callback.call(this, err);
        }
        if(forDate) {
            var limitedEntries = new Array();
            var day = forDate.getDate();
            var month = forDate.getMonth() + 1;
            var year = forDate.getFullYear();
            var fullForDate = day + '/' + month + '/' + year;

            project.entries.forEach(function(entry, i) {
                var searchDay = entry.date.getDate();
                var searchMonth = entry.date.getMonth() + 1;
                var searchYear = entry.date.getFullYear();
                var fullSearchDate = searchDay + '/' + searchMonth + '/' + searchYear;
                if (fullForDate == fullSearchDate)
                {
                    limitedEntries.push(project.entries[i]);
                }
            });
            callback.call(project, null, limitedEntries);
        }
        else
        {
            callback.call(project, null, project.entries);
        }
    });
};

module.exports = router;
