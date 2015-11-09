var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var projectSchema = new Schema({
    name: { type: String, required: true, unique: true},
    title: String,
    entries: [{
        date: { type: Date, required: true, default: Date.now },
        timeSpent: { type: Number, required: true },
        note: String        
    }],
    date: { type: Date, default: Date.now },
    iconUrl: String
});

var Project = mongoose.model('Project', projectSchema);

module.exports = Project;