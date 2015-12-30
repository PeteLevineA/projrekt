"use strict";
var Project = require('../src/js/lib/project.js');
var chai = require("chai");
var expect = chai.expect;

chai.should();

var TEST_PROJECT = {
    id: 'test',
    name: 'test proj',
    title: 'this is a test',
    entries: [
        { date: Date.now(), timeSpent: 1 * 60 * 60 * 1000 },
        { date: Date.now(), timeSpent: 2 * 60 * 60 * 1000 },
        { date: Date.now(), timeSpent: 3 * 60 * 60 * 1000 }        
    ], 
    date: Date.now()
};

// suite: analogous to describe
// test: analogous to it
// setup: analogous to before
// teardown: analogous to after
// suiteSetup: analogous to beforeEach
// suiteTeardown: analogous to afterEach

describe('Project Data', function() {
    beforeEach(function() {
       this.project = new Project(TEST_PROJECT.id, TEST_PROJECT.name,
                        TEST_PROJECT.title, TEST_PROJECT.entries,
                        TEST_PROJECT.date); 
    });
    it('should be an object', function() {
        expect( typeof this.project ).to.equal( 'object' );
    });
    it('should have three entries', function() {
        expect(this.project.entries.length).to.equal(3);
    });
    it('should have an id of test', function() {
        expect(this.project.id).to.equal('test');
    });
});

describe('Project Helper Functions', function() {
    before(function() {
       this.project = new Project(TEST_PROJECT.id, TEST_PROJECT.name,
                        TEST_PROJECT.title, TEST_PROJECT.entries,
                        TEST_PROJECT.date); 
    });
    it('should have 6 total hours', function() {
       expect(this.project.totalHours()).to.equal(6); 
    });
    it('should have entries for only one day', function () {
       expect(this.project.getDays().length).to.equal(1);
    });
    it('should have 6 hours for today\'s data', function() {
        expect(this.project.getDays()[0].hours).to.equal(6);
    });
    it('should have bar chart data for one day', function() {
       expect(this.project.barChartData().labels.length).to.equal(1); 
    });
    
    it('should have hours for only today\'s date', function() {
        var todaysDate = new Date(Date.now());
        var todaysDayOfWeek = todaysDate.getDay();
        expect(this.project.dayOfWeekChartData()
                .datasets[0].data[todaysDayOfWeek])
                .to.equal(6);
    });
});