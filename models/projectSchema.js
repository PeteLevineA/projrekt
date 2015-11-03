var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var projectSchema = new Schema({
    name: { type: String, required: true, unique: true},
    title: String,
    entries: [{
        time: { type: Date, default: Date.now },
        note: String,
        out: { type: Boolean, default: false },
        endOfDay: { type: Boolean, default: false }
    }],
    date: { type: Date, default: Date.now },
    iconUrl: String
});

module.exports = Project = mongoose.model('Contractor', projectSchema);