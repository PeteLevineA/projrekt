"use strict";

var React = require('react');
var ProjectMenu = require('./projectMenu.jsx');
var ProjectDetails = require('./projectDetails.jsx');
var CircleTimer = require('./circleTimer.jsx');
var RaisedButton = require('material-ui/lib/raised-button');

var ProjectHandler = React.createClass({
	getInitialState: function() {
		return {
			timerButtonLabel: 'start',
			started: false
		};
	},
	componentDidMount: function() {
		this.getProject(this.props.params.id);
		
	},
	handleTouchTap: function() {
		if(this.state.started) {
			this.setState({
				started: false,
				timerButtonLabel: 'start'
			});
		}
		else {
			this.setState({
				started: true,
				timerButtonLabel: 'end'
			});
		}
	},
	getProject: function(projectId) {
		var project = new DataLoader();
		var self = this;
		project.load(function(projectData, error) {
			if(!error) {
				this.setState({
					project: projectData
				});
			}
		}, config.urls.getProjectUrl + '/' + projectId, null, ProjectApiParser );
	},
	render: function() {
		return <div>
			<div className="circleTimer">
				<CircleTimer />
				<RaisedButton label={this.state.timerButtonLabel}
					onTouchTap={this.handleTouchTap}
					primary={this.state.started}
					secondary={!this.state.started} />
			</div>
			<ProjectMenu project={this.props.project} />
			<ProjectDetails project={this.props.project} />
			</div>;
	}
});

module.exports = ProjectHandler;