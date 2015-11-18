"use strict";

var DropdownList = require('../src/js/components/dropdownList.jsx');
var DropdownItem = require('../src/js/components/dropdownItem.jsx');
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
		this.items = TestUtils.scryRenderedComponentsWithType(this.item, DropdownItem);
		
	});
	it('should contain all items', function() {
		expect(items.length).to.equal(TEST_ITEMS.length);
	});
	it('should limit items when typed', function() {
		var node = this.refs.input;
		node.value = 'test'
		TestUtils.Simulate.change(node);
		this.items = TestUtils.scryRenderedComponentsWithType(this.item, DropdownItem);
		expect(items.length).to.equal(1);
	}); 
});