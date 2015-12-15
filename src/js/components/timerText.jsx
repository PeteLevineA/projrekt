"use strict";

var React = require('react');

var TimerText = React.createClass({
	propTypes: {
		duration: React.PropTypes.number,
		interval: React.PropTypes.string
	},
	render: function() {
		return <div className="timerText">
					<div className="time">{this.props.duration}</div>
					<div className="interval">{this.props.interval}</div>
				</div>;
	}
});

module.exports = TimerText;