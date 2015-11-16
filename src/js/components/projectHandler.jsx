"use strict";

var React = require('react');
var ProjectMenu = require('./projectMenu.jsx');
var ProjectDetails = require('./projectDetails.jsx');

var ProjectHandler = React.createClass({
	render: function() {
		return <div>
			<ProjectMenu project={this.props.project} />
			<ProjectDetails project={this.props.project} />
			</div>;
	}
});

module.exports = ProjectHandler;