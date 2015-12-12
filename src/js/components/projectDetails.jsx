"use strict";

var React = require('react');
var ProjectHours = require('./projectHours.jsx');

var ProjectDetails = React.createClass({
	propTypes: {
		project: React.PropTypes.object
	},
	handleHover: function() {
		
	},
	render: function() {
		return <div className="projectDetails">
					<div className="title">
						<ProjectHours project={project} />
					</div>
					<div className="details">
						
					</div>
				</div>;
	}
});

module.exports = ProjectDetails;