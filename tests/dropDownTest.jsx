"use strict";

var DropdownList = require('../src/js/components/dropdownList.jsx');
var DropdownItem = require('../src/js/components/dropdownItem.jsx');
var TextField = require('material-ui/lib/text-field');
var chai = require('chai');
var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var expect = chai.expect;

chai.should();

var TEST_ITEMS = [
	{ key: 'test', value: 'abc123' },
	{ key: 'test2', value: 'lorem ipsum' },
	{ key: 'test3', value: 'this is a test' }	
];

describe('Dropdown Components', function() {
	beforeEach(function() {
		this.testItems = TEST_ITEMS;
		this.item = TestUtils.renderIntoDocument(
			<DropdownList items={this.testItems} />
		);
	});
	it('drop down should have all items', function() {
		var items = TestUtils.scryRenderedComponentsWithType(this.item, DropdownItem);
		expect(items.length).to.equal(this.testItems.length);
	});
	it('should limit items when typed', function() {
		var textField = TestUtils.scryRenderedComponentsWithType(this.item, TextField);
		var node = textField[0].refs.input;
		node.value = 'test';
		TestUtils.Simulate.change(node);
		var items = TestUtils.scryRenderedComponentsWithType(this.item, DropdownItem);
		// this will be 2 since anything typed will also have an add item.
		expect(items.length).to.equal(2);
	}); 
});