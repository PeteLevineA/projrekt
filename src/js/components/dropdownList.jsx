"use strict";

var React = require('react');
var DropDownItem = require('./dropDownItem.jsx');

var DropDownList = React.createClass({
	propTypes: {
		items: React.PropTypes.array
	},
	getDefaultProps: function() {
		return {
			items: [
				{ key: "1", value: "loading" }
			]
		}
	},
	handleChange:function(e) {
		var value = e.target.value;
		this.searchForValue(value);
	},
	handleBlur: function(e) {
		var value = e.target.value;
	},
	searchForValues: function(value) {
		var filteredItemList = this.props.items.filter(function(obj, i){
			if( obj.value.toLowerCase().indexOf(value.toLowerCase()) > -1 ){
				return true;
			}
			return false;
		});
		this.setState({
			items: filteredItemList
		});
	},
	createItemForValue: function(value) {
		this.setState({
			items: [
				{ key: "1", value: value }
			]
		});
	},
	render: function(){
		return <div className="dropDownList">
				<div className="dropDownInput">
					<input type="text" ref="input" 
					autocomplete="on" placeholder="start typing to begin..."
					onChange={this.handleChange}
					onBlur={this.handleBlur} />
				</div>
				{this.props.items.map(function(item, i) {
					return <DropDownItem identifier={item.key} value={item.value} typedValue={this.state.typedValue}>
						</DropDownItem>;
				})}
			</div>;
	}
});

module.exports = DropDownList;