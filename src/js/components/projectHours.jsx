"use strict";

var React = require('react');

var ProjectHours = React.createClass({
	propTypes: {
		project: React.PropTypes.object
	},
	handleHover: function() {
		
	},
	render: function() {
        var hours = this.props.project.totalHours();
        hours = (Math.round(hours * 10) / 10).toFixed(1);
		return <span className="projectHours">
                    {hours} Hours Spent
				</span>;
	}
});

module.exports = ProjectHours;