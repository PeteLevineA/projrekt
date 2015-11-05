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
		var startOfString = '',
			boldString = '',
			endOfString = this.props.value,
			valToCompare = this.props.value.toLowerCase(),
			typedVal = this.props.typedValue.toLowerCase(),
			instOfTypedVal = valToCompare.indexOf(typedVal);
		
		if( instOfTypedVal > -1 )
		{
			boldString = this.props.value.substr(instOfTypedVal, this.props.typedValue.length);
			startOfString = this.props.value.substr(0, instOfTypedVal);
			var typedValLen = this.props.typedValue.length;
			var restOfStringLen = this.props.value.length - typedValLen - startOfString.length;
			endOfString = this.props.value.substr(instOfTypedVal+this.props.typedValue.length, restOfStringLen);
		}
		return <div className="dropDownItem" ref="dropDownItem" onClick={this.handleClick}>
				{startOfString}<span className="bold">{boldString}</span>{endOfString}
			</div>;
	}
});

module.exports = DropDownItem;