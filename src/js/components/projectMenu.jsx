"use strict";

var React = require('react');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var ProjectMenu = React.createClass({
	render: function() {
		return <ReactCSSTransitionGroup transitionName="projectMenu" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
        	<div key="projectMenu">
				
			</div>
        </ReactCSSTransitionGroup>;
	}
});

module.exports = ProjectMenu;