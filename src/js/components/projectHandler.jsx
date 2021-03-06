"use strict";

var React = require('react');
var ProjectMenu = require('./projectMenu.jsx');
var ProjectDetails = require('./projectDetails.jsx');
var CircleTimer = require('./circleTimer.jsx');
var config = require('../../../config/config.json');
var DataLoader = require('../lib/dataLoader.js');
var ProjectApiParser = require('../lib/projectApiParser.js');
var ProjectTimer = require('./projectTimer.jsx');

var ProjectHandler = React.createClass({
	getInitialState: function() {
		return {
			started: false
		};
	},
	componentDidMount: function() {
		this.getProject(this.props.params.id);		
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
	
	handleTimerClicked: function(started, elapsedTime) {
		this.setState({
				started: started
			});
        if( !started ) {
			var projectUrl = config.urls.projectApiUrl + config.urls.projectsUrl + 
				config.urls.projectAddEntry + this.id + "?date=" + Date.now() + 
				"&timeSpent=" + timeSpentOnProject;
            this.state.project.addEntry(projectUrl, elapsedTime);
        }
	},
	render: function() {
		var projectMenu;
		var projectDetails;
        var projectHours;
        var projectAverageDailyHours;
		if( this.state.project ) {
			projectMenu = <ProjectMenu project={this.state.project} />;
			projectDetails = <ProjectDetails project={this.state.project} />;
		}
		return <div className="projects">
			<div className="circleTimer">
				<CircleTimer timerLengthInSeconds={30} timerStarted={this.state.started} />
				<ProjectTimer handleTimerClicked={this.handleTimerClicked} />
			</div> 
			{projectMenu}
			{projectDetails}
			</div>;
	}
});

module.exports = ProjectHandler;