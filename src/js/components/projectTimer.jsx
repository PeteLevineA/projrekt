"use strict";

var React = require('react');
var TimerText = require('./timerText.jsx');
var RaisedButton = require('material-ui/lib/raised-button');

var ProjectTimer = React.createClass({
	propTypes: {
		handleTimerClicked: React.PropTypes.func
	},
	getInitialState: function() {
		return {
			started: false,
			timerButtonLabel: 'start'
		};
	},
	handleTouchTap: function() {
		if(this.props.handleTimerClicked && 
			typeof this.props.handleTimerClicked === 'function') {
				this.props.handleTimerClicked.call(null, 
					!this.state.started, this.durationElapsed);
		}
		if(this.state.started) {			
			if(this.durationTimer) {
				clearInterval(this.durationTimer);
			}
			this.setState({
				started: false,
				timerButtonLabel: 'start'
			});
		}
		else {
			this.setState({
				started: true,
				timerButtonLabel: 'stop'
			});
			if(this.durationTimer) {
				clearInterval(this.durationTimer);
			}
			this.durationTimer = setInterval(this.durationTimerTick, 1000);
			this.durationElapsed = 0;
			this.durationTimerStarted = new Date();
		}
	},
	durationTimerTick: function() {
		this.durationElapsed = (new Date()) - this.durationTimerStarted;
		// if greater than a minute switch to every 30 seconds
		// if greater than a half hour switch to every 5 minutes
		if(this.durationElapsed > 60000) {
			if(this.durationTimer) {
				clearInterval(this.durationTimer);
			}
			this.durationTimer = setInterval(this.durationTimerTick, 30000);
		}
		else if( this.durationElapsed > (30 * 60 * 1000 ) ) {
			if(this.durationTimer) {
				clearInterval(this.durationTimer);
			}
			this.durationTimer = setInterval(this.durationTimerTick, 5 * 60 * 1000);
		}
		if( this.durationElapsed < 60000) {
			this.setState({
				duration: Math.round(this.durationElapsed / 1000),
				interval: 'sec'
			});
		}
		else if( this.durationElapsed >= 60 * 1000 && this.durationElapsed < 60 * 60 * 1000) {
			this.setState({
				duration: Math.round(this.durationElapsed / 1000 / 60),
				interval: 'min'
			});
		}
		else if( this.durationElapsed >= 60 * 60 * 1000 ) {
			this.setState({
				duration: Math.round(this.durationElapsed / 1000 / 60 / 60),
				interval: 'hour'
			});
		}
	},
	render: function() {
		return <div>
				<TimerText duration={this.state.duration} interval={this.state.interval} />
					<div className="projectStart centerFlex">
						<RaisedButton label={this.state.timerButtonLabel}
							onTouchTap={this.handleTouchTap}
							primary={this.state.started}
							secondary={!this.state.started}
							onClick={this.handleTouchTap} />
					</div>
				</div>;
	}
});

module.exports = ProjectTimer;