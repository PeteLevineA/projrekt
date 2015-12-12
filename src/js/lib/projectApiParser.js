"use strict";

var Project = require('./project.js');

module.exports = function(projectData) {
	if( projectData instanceof Array )
	{
		var projects = projectData.map(function(obj) {
			var project = new Project( obj._id, obj.name, obj.title, obj.entries, obj.date );
			return project;
		});
		return projects;
	}
	else{
		var project = new Project(projectData._id, projectData.name, projectData.title,
							projectData.entries, projectData.date);
		return project;
	}
}