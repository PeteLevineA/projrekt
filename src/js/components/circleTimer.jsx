"use strict";

var React = require('react');

var CircleTimer = React.createClass({
    getDefaultProps: function() {
        return {
            r: 100,
            percentage: 0,
            strokeWidth: 6,
            interval: 200,
            timeRequiredInMs: 8 * 60 * 60 * 1000,
            showShadow: false
        };
    },
    getInitialState: function() {
        return {
            r: this.props.r, 
            percentage: this.props.percentage
        };
    },
    componentDidMount: function() {
        // Update the Circle Timer Every prop.interval amount
        this.timer = setInterval(this.timerTick, this.props.interval);
        this.elapsedTime = 0;
        this.timeStarted = new Date();
    },
    componentWillUnmount: function() {
        clearInterval(this.timer);
    },
    timerTick: function() {
        this.elapsedTime = (new Date()) - this.timeStarted;
        var percentage = ( this.elapsedTime / this.props.timeRequiredInMs ) * 100;
        this.setState({
            r: this.state.r,
            percentage: percentage
        });
    },
    pauseTimer: function() {
        clearInterval(this.timer);
    },
    restartTimer: function() {
        this.timer = setInterval(this.timerTick, this.props.interval);
        this.timeStarted = new Date();
    },
    render: function () {
        var width = this.state.r * 2;
        var height = this.state.r * 2;
        var cX = this.state.r + ( this.props.strokeWidth / 2 );
        var cY = this.state.r + ( this.props.strokeWidth / 2 );
        var widthViewPort = width + this.props.strokeWidth;
        var heightViewPort = height + this.props.strokeWidth;
        var viewBox = "0 0 " + widthViewPort + " " + heightViewPort;
        var dashArray = 2 * Math.PI * this.state.r;
        var dashOffset =  ( ( 100 - this.state.percentage ) / 100 ) * dashArray;
        var hoursRemaining = Math.floor((this.props.timeRequiredInMs - this.elapsedTime) / 1000 / 60 / 60);
        return <div className="circleTimer" style={{
                width: width,
                height: height
                }}>
                <div id="circleShadow"
                    style={{
                        width: width + this.props.strokeWidth,
                        height: height + this.props.strokeWidth,
                        display: this.props.showShadow ? "block" : "none"
                    }}>
                </div>
                <div id="circleInset"
                    style={{
                        width: width - this.props.strokeWidth,
                        height: height - this.props.strokeWidth,
                        left: this.props.strokeWidth,
                        top: this.props.strokeWidth,
                        display: this.props.showShadow ? "block" : "none"
                    }}>
                </div>
                <svg id="circleSvg" width={widthViewPort} height={heightViewPort} viewPort={viewBox} version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="circleTimeGradient" y1="0" y2="1">
                            <stop stopColor="#C47FCF" offset="0"/>
                            <stop stopColor="#837CCF" offset=".5"/>
                            <stop stopColor="#1E69E5" offset="1"/>
                        </linearGradient>
                    </defs>
                    <circle 
                        r={this.state.r} 
                        cx={cX} 
                        cy={cY} 
                        fill="transparent" 
                        transform={"rotate(90,"+cX+","+cY+")"}
                        stroke="url(#circleTimeGradient)"
                        strokeWidth={this.props.strokeWidth + "px"}
                        style={{
                            strokeDasharray: dashArray,
                            strokeDashoffset: dashOffset
                        }} />                    
                      
                </svg>
            </div>;
    }
});

module.exports = CircleTimer;