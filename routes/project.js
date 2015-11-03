var express = require('express');
var router = express.Router();
var Project = require('../models/projectSchema');

/* GET project listing. */
router.get('/', function (req, res, next) {
    Project.find({}).sort({ date: -1 }).exec(function (err, projects) {
        if (!err) {
            res.json(JSON.stringify(projects));
        }
        else {
            res.json({
                'error': {
                    'message': err.message,
                    'error': err
                }
            });
        }
    });
    
});
router.get('/add', function (req, res, next) {
    console.log(req.query.name + " " + req.query.title);
    var projectEntry = new Project({
        name: req.query.name,
        title: req.query.title
    });
    projectrEntry.save(function (err) {
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
            res.json({
                'error': {
                    'message': err.message,
                    'error': err
                }
            });
        }
    });    
});
router.post('/addEntry/:name', function (req, res, next) {
    //timeIn: { type: Date, default: Date.now },
    //timeOut: Date,
    //note: String,
    //endOfDay: Boolean
    var timeIn = req.body.timeIn;
    var timeOut = req.body.timeOut;
    var note = req.body.note;
    var endOfDay = false;
    if (req.body.endOfDay && req.body.endOfDay.toLowerCase() === 'y')
    {
        endOfDay = true;
    }
    handleAddEntry(req.params.name, timeIn, timeOut, note, endOfDay, function (err) {
        if (!err) {
            res.json({
                'response': {
                    'message': 'Project Entry Added'
                }
            });
        }
        else {
            res.json({
                'error': {
                    'message': err.message,
                    'error': err
                }
            });
        }
    });
});
router.get('/addEntry/:name', function (req, res, next) {
    var timeIn = req.query.timeIn;
    var timeOut = req.query.timeOut;
    var note = req.query.note;
    var endOfDay = false;
    if (req.query.endOfDay && req.query.endOfDay.toLowerCase() === 'y') {
        endOfDay = true;
    }
    handleAddEntry(req.params.name, timeIn, timeOut, note, endOfDay, function (err) {
        if (!err) {
            res.json({
                'response': {
                    'message': 'Project Entry Added'
                }
            });
        }
        else {
            res.json({
                'error': {
                    'message': err.message,
                    'error': err
                }
            });
        }
    });
});
router.get('/entries/:name', function (req, res, next) {
    var forDate = null;
    if (req.query.forDate)
    {
        forDate = new Date(req.query.forDate);
        console.log(forDate);
    }
    getEntries(req.params.name, forDate, function (err, entries) {
        console.log(err);
        console.log(JSON.stringify(entries));
        if (!err) {
            res.json({ 'entries': entries });
        }
    });
});

var handleAddEntry = function (name, timeIn, timeOut, note, endOfDay, callback) {
    console.log('name' + name);
    Project.findOne({ name: name }).exec(function (err, project) {
        if (!err) {
            project.entries.push({ timeIn: timeIn, timeOut: timeOut, note: note, endOfDay: endOfDay });
            project.save(function (err) {
                callback.call(project, err);
            });
        }
    });
};
var getEntries = function (name, forDate, callback) {
    Project.findOne({ name: name }).exec(function (err, project) {
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

            for( var i = 0, len = project.entries.length; i < len; i++ )
            {
                console.log(JSON.stringify(project.entries[i]));
                var searchDay = project.entries[i].timeIn.getDate();
                var searchMonth = project.entries[i].timeIn.getMonth() + 1;
                var searchYear = project.entries[i].timeIn.getFullYear();
                var fullSearchDate = day + '/' + month + '/' + year;
                if (fullForDate == fullSearchDate)
                {
                    limitedEntries.push(project.entries[i]);
                }
            }
            callback.call(project, null, limitedEntries);
        }
        else
        {
            callback.call(project, null, project.entries);
        }
    });
};

module.exports = router;
