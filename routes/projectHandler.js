"use strict";
var Project = require('../models/projectSchema');

module.exports.add = function(x,y) {
    return x + y;
};

module.exports.getProjects = function (req, res, next) {
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
};
module.exports.getProjectsById = function (req, res, next) {
    Project.findOne({ '_id': req.params.id }).sort({ date: -1 }).exec(function (err, projects) {
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
};

module.exports.addProjectGet = function (req, res, next) {
    console.log(req.query.name + " " + req.query.title);
    var name = req.query.name;
    var title = req.query.title;
    addProject(name, title, res);    
};
module.exports.addProjectPost = function (req, res, next) {
    console.log(req.query.name + " " + req.query.title);
    var name = req.body.name;
    var title = req.body.title;
    addProject(name, title, res);    
};
module.exports.addEntryGet = function (req, res, next) {
    // date: { type: Date, required: true, default: Date.now },
    // timeSpent: { type: Number, required: true },
    // note: String   
    var date = req.body.date;
    var timeSpent = req.body.timeSpent;
    var note = req.body.note;    
    addEntry(req.params.id, date, timeSpent, note, res);
};
module.exports.addEntryPost = function (req, res, next) {
    var date = req.query.date;
    var timeSpent = req.query.timeSpent;
    var note = req.query.note;
    addEntry(req.params.id, date, timeSpent, note);    
};
module.exports.getEntries = function (req, res, next) {
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
};

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
var addProject = function(name, title, res) {
    var projectEntry = new Project({
        name: name,
        title: title
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
};
var addEntry = function( projectId, date, timeSpent, note, res) {
    handleAddEntryById(projectId, date, timeSpent, note, function (err) {
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
};