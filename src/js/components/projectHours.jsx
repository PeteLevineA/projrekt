"use strict";

var React = require('react');

var ProjectHours = React.createClass({
	propTypes: {
		project: React.PropTypes.object
	},
	handleHover: function() {
		
	},
	render: function() {
		return <div className="projectHours">
					<div className="title">Hours Spent</div>
					<div className="hours">{this.project.totalHours()}</div>
				</div>;
	}
});

module.exports = ProjectHours;