"use strict";

var React = require('react');
var RaisedButton = require("material-ui/lib/raised-button");

var DropDownItem = React.createClass({
	propTypes: {
		itemSelected: React.PropTypes.func,
		identifier: React.PropTypes.string,
		value: React.PropTypes.string,
		typedValue: React.PropTypes.string,
		addItem: React.PropTypes.bool,
		addItemClicked: React.PropTypes.func
	},
	getDefaultProps: function() {
		return {
			addItem: false
		};
	},
	handleClick: function(e) {
		this.props.itemSelected.call(null, this.props.identifier);
		e.bubbles = false;
		e.stopPropagation();
		e.preventDefault();
	},
	handleAddItem: function(e) {
		this.props.addItemClicked.call(null, this.props.identifier);
		e.stopPropagation();
	},
	render: function() {
		var startOfString = '',
			boldString = '',
			endOfString = this.props.value,
			valToCompare = this.props.value.toLowerCase(),
			typedVal = this.props.typedValue.toLowerCase(),
			instOfTypedVal = valToCompare.indexOf(typedVal);
		var addButtonClass = "addButton";
		if( !this.props.addItem ) {
			addButtonClass += " hidden";
		}
		if( instOfTypedVal > -1 ) {
			boldString = this.props.value.substr(instOfTypedVal, this.props.typedValue.length);
			startOfString = this.props.value.substr(0, instOfTypedVal);
			var typedValLen = this.props.typedValue.length;
			var restOfStringLen = this.props.value.length - typedValLen - startOfString.length;
			endOfString = this.props.value.substr(instOfTypedVal+this.props.typedValue.length, restOfStringLen);
		}
		return <div className="dropDownItem" ref="dropDownItem" onClick={this.handleClick}>
				{startOfString}<span className="bold">{boldString}</span>{endOfString}
				<div className={addButtonClass}>
					<RaisedButton primary={true} style={{
						minWidth: "60px"
					}}> 
						<span className="addButtonLabel">+</span>
					</RaisedButton>
				</div>
			</div>;
	}
});

module.exports = DropDownItem;