"use strict";

var React = require('react');
var ProjectMenu = require('./projectMenu.jsx');
var ProjectDetails = require('./projectDetails.jsx');
var CircleTimer = require('./circleTimer.jsx');
var RaisedButton = require('material-ui/lib/raised-button');
var config = require('../../../config/config.json');
var DataLoader = require('../lib/dataLoader.js');
var ProjectApiParser = require('../lib/projectApiParser.js');

var ProjectHandler = React.createClass({
	getInitialState: function() {
		return {
			timerButtonLabel: 'start',
			started: false,
			project: { name: 'loading' }
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
				self.setState({
					project: projectData
				});
			}
		}, config.urls.projectApiUrl + config.urls.projectsUrl + projectId, null, ProjectApiParser );
	},
	render: function() {
		return <div className="projects">
			<div className="circleTimer">
				<CircleTimer timerLengthInSeconds={30} timerStarted={this.state.started} />
				<div className="projectStart centerFlex">
					<RaisedButton label={this.state.timerButtonLabel}
						onTouchTap={this.handleTouchTap}
						primary={this.state.started}
						secondary={!this.state.started}
						onClick={this.handleTouchTap} />
				</div>
			</div>
			<ProjectMenu project={this.state.project} />
			<ProjectDetails project={this.state.project} />
			</div>;
	}
});

module.exports = ProjectHandler;