"use strict";

var React = require('react');
var fetch = require('node-fetch');
var ResponsiveImage = require('./responsiveImage.jsx');

var ImgLoader = React.createClass({
	propTypes: {
		imageUrl: React.PropTypes.string,
		defaultImageUrl: React.PropTypes.string,
		OnImageRetrieved: React.PropTypes.func,
		imageDataParser: React.PropTypes.func
	},
	getInitialState: function() {
		return {
			image: ''
		};
	},
	componentDidMount: function() {
		var self = this;
		fetch(this.props.imageUrl)
			.then(function(response) {
				return response.json();
			})
			.then(function(json) {
				if( self.props.imageDataParser ) {
					var imageUrl = self.props.imageDataParser.call(this, json);
					if( imageUrl == '') {
						imageUrl = self.props.defaultImageUrl;
					}
					self.setState({
						image: imageUrl
					});
					self.props.OnImageRetrieved.call(this, imageUrl);
				}
			})
			.catch(function(response) {
				console.log(response);
				self.setState({
					image: self.props.defaultImageUrl
				});
			});
	},
	render: function() {
		return <ResponsiveImage cssClasses="fastFadeIn" imageUrl={this.state.image} />
	}
});

module.exports = ImgLoader;