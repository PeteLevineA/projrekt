"use strict";

var React = require('react');

var DropDownItem = React.createClass({
	propTypes: {
		itemSelected: React.PropTypes.func,
		identifier: React.PropTypes.string,
		value: React.PropTypes.string,
		typedValue: React.PropTypes.string
	},
	handleClick: function(e) {
		this.itemSelected.call(null, this.props.identifier);
	},
	render: function() {
		var instOfTypedVal = this.props.value.indexOf(this.props.typedValue);
		var typedValHtml = '<span className="bold">' + this.props.value.subString(instOfTypedVal, this.props.typedValue.length) + '</span>';
		var startOfString = this.props.value.subString(0, instOfTypedVal);
		var typedValLen = this.props.typedValue.length;
		var restOfStringLen = this.props.value.length - typedValLen - startOfString.length;
		var endOfString = this.props.value.subString(instOfTypedVal+this.props.typedValue.length, restOfStringLen);
		var finalTypedValue = startOfString + typedValHtml + endOfString;
		return <div className="dropDownItem" ref="dropDownItem" onClick={this.handleClick}>
				{finalTypedValue}
			</div>;
	}
});

module.exports = DropDownItem;