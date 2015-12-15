"use strict";

var React = require('react');
var GradientCircle = require('./gradientCircle.jsx');

var CircleTimer = React.createClass({
    propTypes: {
        radius: React.PropTypes.number,
        percentage: React.PropTypes.number,
        strokeWidth: React.PropTypes.number,
        interval: React.PropTypes.number,
        timerLengthInSeconds: React.PropTypes.number,
        timerStarted: React.PropTypes.bool
    },
    getDefaultProps: function() {
        return {
            radius: 100,
            percentage: 0,
            strokeWidth: 6,
            interval: 200,
            timerLengthInSeconds: 60*60
        };
    },
    getInitialState: function() {
        return {
            percentage: 0
        };
    },
    componentDidMount: function() {
        this.elapsedTime = 0;
        if( this.props.timerStarted ) {
            this.restartTimer();
        }
    },
    componentWillUnmount: function() {
        clearInterval(this.timer);
    },
    timerTick: function() {
        this.elapsedTime = (new Date()) - this.timeStarted;
        var timerMs = this.props.timerLengthInSeconds * 1000;
        var percentage = ( this.elapsedTime / timerMs ) * 100;
        this.setState({
            percentage: percentage
        });
    },
    componentWillReceiveProps: function(nextProps) {
        if(nextProps.timerStarted) {
            this.restartTimer();
        }
        else if(!nextProps.timerStarted) {
            this.pauseTimer();
        }
    },
    pauseTimer: function() {
        clearInterval(this.timer);
    },
    restartTimer: function() {
        this.timer = setInterval(this.timerTick, this.props.interval);
        this.timeStarted = new Date();
    },
    render: function () {
        return <GradientCircle percentage={this.state.percentage} radius={this.props.radius} />;
    }
});

module.exports = CircleTimer;