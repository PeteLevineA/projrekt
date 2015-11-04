"use strict";

var ImgLoader = require('../src/js/components/imgLoader.jsx');
var ResponsiveImage = require('../src/js/components/responsiveImage.jsx');
var chai = require('chai');
var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var expect = chai.expect;

chai.should();

var TEST_NEWS = [
	{ title: 'test', abstract: 'abstract' },
	{ title: 'test2', abstract: 'abstract' }	
];

describe('Image Components', function() {
	
});