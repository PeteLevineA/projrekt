"use strict";

var React = require('react');

var GradientText = React.createClass({
	propTypes: {
		startColor: React.PropTypes.string,
		midColor: React.PropTypes.string,
		endColor: React.PropTypes.string,
		text: React.PropTypes.string,
		fontPixelSize: React.PropTypes.number
	}, 
	getDefaultProps: function() {
		return {
			startColor: '#C47FCF',
			midColor: '#837CCF',
			endColor: '#1E69E5',
			fontPixelHeight: 16
		};
	},
	render: function() {
		return <svg id="circleSvg" width="100%" height={this.props.fontPixelSize + 6} version="1.1" xmlns="http://www.w3.org/2000/svg">
				<defs>
					<linearGradient id="circleTextGradient" y1="0" y2="1">
						<stop stopColor={this.props.startColor} offset="0"/>
						<stop stopColor={this.props.midColor} offset=".5"/>
						<stop stopColor={this.props.endColor} offset="1"/>
					</linearGradient>
				</defs>
				<text  y={(this.props.fontPixelSize) / 2 + ( this.props.fontPixelSize / 4)} fill="url(#circleTextGradient)" style={{
						fontFamily: "Segoe UI, Roboto, 'Helvetica Neue', Helvetica, Arial, sans-serif",
						fontWeight: '100',
						fontSize: this.props.fontPixelSize + "px"
					}}>
					{this.props.text}
				</text>  
			</svg>;
	}
});

module.exports = GradientText;