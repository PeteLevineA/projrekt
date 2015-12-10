"use strict";

var React = require('react');
var DropdownItem = require('./dropdownItem.jsx');
var TextField = require("material-ui/lib/text-field");

var DropDownList = React.createClass({
	propTypes: {
		items: React.PropTypes.array,
		handleProjectSelected: React.PropTypes.func,
		handleAddItem: React.PropTypes.func
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
	componentWillReceiveProps: function(nextProps) {
		this.setState({
			items: nextProps.items
		});
	},
	handleChange:function(e) {
		var value = e.target.value;
		this.setState({
			typedValue: value
		});
		this.searchForValues(value);
	},
	handleBlur: function(e) {
		if( this.isMounted() ) {
			this.setState({
				itemsVisible: false
			});
		}
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
		this.setState({
			itemsVisible: false
		});
		if( this.props.handleProjectSelected ) {
			this.props.handleProjectSelected.call(null, item);
		}
	},
	handleAddItem: function(item) {
		this.setState({
			itemsVisible: false
		});
		if( this.props.handleAddItem ) {
			this.props.handleAddItem.call(null, item);
		}
	},
	render: function(){
		var self = this;
		var itemsListClass = "dropDownItemList";
		var addItem = false;
		if( !this.state.itemsVisible ) {
			itemsListClass += " opaque";
		}		
		return <div className="dropDownList">
				<div className="dropDownInput">
					<TextField floatingLabelText="enter project name..."
					onChange={this.handleChange}
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
					return <DropdownItem itemSelected={self.itemSelected} 
							key={item.key} identifier={item.key} 
							value={item.value} typedValue={self.state.typedValue}
							addItem={addItem}
							addItemClicked={self.handleAddItem}>
						</DropdownItem>;
				})}
				</div>
			</div>;
	}
});

module.exports = DropDownList;