"use strict";

module.exports = function(projectData) {
	if( projectData instanceof Array )
	{
		var projects = projectData.map(function(obj) {
			var project = {
				id: obj._id,
				name: obj.name,
				title: obj.title,
				entries: obj.entries,
				date: obj.date
			};
			return project;
		});
		return projects;
	}
	else{
		return projectData;
	}
}