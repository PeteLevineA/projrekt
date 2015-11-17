"use strict";

var React = require('react');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var ProjectMenu = React.createClass({
	propTypes: {
		project: React.PropTypes.object
	},
	handleHover: function() {
		
	},
	render: function() {
		return <ReactCSSTransitionGroup transitionName="projectMenu" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
        	<div key="projectMenu" onHover={this.handleHover}>
				<span className="title">{this.props.project.name}</span>
			</div>
        </ReactCSSTransitionGroup>;
	}
});

module.exports = ProjectMenu;