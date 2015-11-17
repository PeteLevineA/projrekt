"use strict";

var React = require('react');
var ReactDOM = require('react-dom');

var ScrollContainer = React.createClass({
	propTypes: {
		viewOffset: React.PropTypes.number
	}
	componentDidMount: function() {
		var win = typeof window !== 'undefined' ? window : false;
		var doc = typeof document !== 'undefined' ? document : false;
		if( win ) {
			this.viewportHeight = Math.max(doc.documentElement.clientHeight, win.innerHeight || 0);
			win.addEventListener('scroll', this.handleScroll.bind(this, win));			
		}
	},
	render: function() {
		return <div className={this.state.className}>
				{this.props.children}
			</div>;
	},
	scrollY: null,
	scrollReady: false,
	viewportHeight: null,
	handleScroll: function(win) {
		if(win) {
			this.scrollY = win.pageYOffset;
			this.requestAnimationFrameWhenReady();
		}
	},
	requestAnimationFrameWhenReady: function() {
		if( !this.scrollReady ) {
			requestAnimationFrame(this.handleScrollCheck);
			this.scrollReady = true;
		}
	},
	handleScrollCheck: function() {
		var elem = ReactDOM.findDOMNode(this);
		var elemTop = elem.offsetTop;
		var elemHeight = elem.offsetHeight;
		var elemBot = elemTop + elemHeight;
		var viewportBot = (this.scrollY + this.viewportHeight) - this.props.viewOffset;
	}
});

module.exports = ScrollContainer;