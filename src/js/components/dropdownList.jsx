"use strict";

var React = require('react');
var DropDownItem = require('./dropDownItem.jsx');
var TextField = require("material-ui/lib/text-field");

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
			items: this.props.items,
			itemsVisible: false
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
		this.setState({
			itemsVisible: false
		});
	},
	handleFocus: function(e) {
		this.setState({
			itemsVisible: true
		});
	},
	searchForValues: function(value) {
		var filteredItemList = this.props.items.filter(function(obj, i){
			if( obj.value.toLowerCase().indexOf(value.toLowerCase()) > -1 ){
				return true;
			}
			return false;
		});
		filteredItemList.splice(0,0, { key: 'add', value: value });
		this.setState({
			items: filteredItemList
		});
	},
	itemSelected: function(item) {
	
	},
	render: function(){
		var self = this;
		var itemsListClass = "dropDownItemList";
		var addItem = false;
		if( !this.state.itemsVisible ) {
			itemsListClass += " hidden";
		}
		return <div className="dropDownList">
				<div className="dropDownInput">
					<TextField floatingLabelText="enter project name..."
					onChange={this.handleChange}
					onBlur={this.handleBlur}
					onFocus={this.handleFocus}
					fullWidth={true}
					inputStyle={{
						color: "#fff",
						fontSize: "24px"
					}}
					floatingLabelStyle={{
						color: "#fff",
						fontSize: "20px"
					}} />
				</div>
				<div className={itemsListClass}>
				{this.state.items.map(function(item, i) {
					if( item.key === "add" ) {
						addItem = true;
					}
					else {
						addItem = false;
					}
					return <DropDownItem itemSelected={self.itemSelected} 
							key={item.key} identifier={item.key} 
							value={item.value} typedValue={self.state.typedValue}
							addItem={addItem}>
						</DropDownItem>;
				})}
				</div>
			</div>;
	}
});

module.exports = DropDownList;