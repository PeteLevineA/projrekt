"use strict";

var React = require('react');
var ProjectHours = require('./projectHours.jsx');
var BarChart = require("rc-chartjs").Bar;
var Chart = require('chartjs');

var ProjectDetails = React.createClass({
	propTypes: {
		project: React.PropTypes.object
	},
	handleHover: function() {
		
	},
	render: function() {
		return <div className="projectDetails">
					<div className="hours">
						<ProjectHours project={this.props.project} />
					</div>
					<div className="details">
						<BarChart data={this.props.project.barChartData()} 
                                options={{responsive: true}} width="450" height="300" />
                        <BarChart data={this.props.project.dayOfWeekChartData()} 
                                        options={{responsive: true}} width="450" height="300" />
					</div>
				</div>;
	}
});

module.exports = ProjectDetails;