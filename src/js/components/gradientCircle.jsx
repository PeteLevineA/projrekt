"use strict";

var React = require('react');

var GradientCircle = React.createClass({
	propTypes: {
		strokeWidth: React.PropTypes.number,
		percentage: React.PropTypes.number,
		radius: React.PropTypes.number,
        showShadow: React.PropTypes.bool,
		interval: React.PropTypes.number
	},
	getDefaultProps: function() {
        return {
            radius: 100,
            percentage: 0,
            strokeWidth: 6,
            showShadow: false,
			interval: 200
        };
    },
	render: function() {
        var cX = this.props.radius + ( this.props.strokeWidth / 2 );
        var cY = this.props.radius + ( this.props.strokeWidth / 2 );
        var width = this.props.radius * 2;
        var height = this.props.radius * 2;
		var widthViewPort = width + this.props.strokeWidth;
        var heightViewPort = height + this.props.strokeWidth;
        var viewBox = "0 0 " + widthViewPort + " " + heightViewPort;
        var dashArray = 2 * Math.PI * this.props.radius;
        var dashOffset =  ( ( 100 - this.props.percentage ) / 100 ) * dashArray;
		var intervalSeconds = this.props.interval / 1000;
		var transitionCss = 'stroke-dashoffset ' + intervalSeconds + 's linear';
		return <div className="circleTimers" style={{
                width: width,
                height: height
                }}>
					<div className="circleShadow"
						style={{
							width: width + this.props.strokeWidth,
							height: height + this.props.strokeWidth,
							display: this.props.showShadow ? "block" : "none"
						}}>
					</div>
					<div className="circleInset"
						style={{
							width: width - this.props.strokeWidth,
							height: height - this.props.strokeWidth,
							left: this.props.strokeWidth,
							top: this.props.strokeWidth,
							display: this.props.showShadow ? "block" : "none"
						}}>
					</div>
					<svg className="circleSvg" width={widthViewPort} height={heightViewPort} viewport={viewBox} version="1.1" xmlns="http://www.w3.org/2000/svg">
						<defs>
							<linearGradient id="circleTimeGradient" y1="0" y2="1">
								<stop stopColor="#C47FCF" offset="0"/>
								<stop stopColor="#837CCF" offset=".5"/>
								<stop stopColor="#1E69E5" offset="1"/>
							</linearGradient>
						</defs>
						<circle 
							r={this.props.radius} 
							cx={cX} 
							cy={cY} 
							fill="transparent" 
							transform={"rotate(90,"+cX+","+cY+")"}
							stroke="url(#circleTimeGradient)"
							strokeWidth={this.props.strokeWidth + "px"}
							style={{
								strokeDasharray: dashArray,
								strokeDashoffset: dashOffset,
								transition: transitionCss
							}} />
					</svg>
				</div>;
	}
});

module.exports = GradientCircle;