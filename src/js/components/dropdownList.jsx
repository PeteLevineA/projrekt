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
	getInitialState: function() {
		return {
			typedValue: '',
			items: this.props.items
		}	
	},
	handleChange:function(e) {
		var value = e.target.value;
		this.setState({
			typedValue: value
		});
		this.searchForValues(value);
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
	itemSelected: function(item) {
	
	},
	render: function(){
		var self = this;
		return <div className="dropDownList">
				<div className="dropDownInput">
					<input type="text" ref="input" 
					autoComplete="on" placeholder="start typing to begin..."
					onChange={this.handleChange}
					onBlur={this.handleBlur} />
				</div>
				<div className="dropDownItemList">
				{this.state.items.map(function(item, i) {
					return <DropDownItem itemSelected={self.itemSelected} key={item.key} identifier={item.key} value={item.value} typedValue={self.state.typedValue}>
						</DropDownItem>;
				})}
				</div>
			</div>;
	}
});

module.exports = DropDownList;