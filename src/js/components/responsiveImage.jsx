"use strict";

var React = require('react');

var ResponsiveImage = React.createClass({
	propTypes: {
		imageUrl: React.PropTypes.string,
		cssClasses: React.PropTypes.string
	},
	render: function() {
		return <div className={ 'responsiveImage ' + this.props.cssClasses }
					style={{ 
						backgroundImage: 'url(' + this.props.imageUrl + ')',
						filter: 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'+this.props.imageUrl+'", sizingMethod="scale")',
						msFilter: 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'+this.props.imageUrl+'", sizingMethod="scale")'
						}}
					>{this.props.children}</div>
	}
});

module.exports = ResponsiveImage;