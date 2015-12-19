"use strict";

var fetch = require('node-fetch');
var config = require('../../../config/config.json');

var Project = function(id, name, title, entries, date) {
	this.id = id;
	this.name = name;
	this.title = title;
	this.entries = entries;
	this.date = date;
    if( this.entries instanceof Array ) {
        var self = this;
        this.entries.forEach(function(entry, index) {
             if(!(entry.date instanceof Date)) {
                 var newDateObj = new Date(entry.date);
                 self.entries[index].date = newDateObj;
             }
        });
    }
}

Project.prototype.addEntry = function(timeSpentOnProject) {
    var postData = {
        date: Date.now(),
        timeSpent: timeSpentOnProject
    };
    var projectUrl = config.urls.projectApiUrl + config.urls.projectsUrl + 
        config.urls.projectAddEntry + this.id;
    fetch(projectUrl, {method: 'POST', body: postData})
            .then(function(res) {
                return res.json();
            })
            .then(function(json) {
                if( json.error ) {
                    console.log(json.error);
                }
                else {
                    this.entries.add(postData);
                }
            });
};

Project.prototype.totalHours = function(date) {
	var totalTime = 0;
	this.entries.forEach(function(entry, index) {
		if( !date ) {
			totalTime += entry.timeSpent;
		}
		else if( date
			&& ( date.getDate() === entry.date.getDate())
			&& ( date.getMonth() === entry.date.getMonth())
			&& ( date.getFullYear() === entry.date.getFullYear()) )
			{
				totalTime += entry.timeSpent;
			}
	});
	return ( ( totalTime / 1000 ) / 60 ) / 60;
};
Project.prototype.getDays = function() {
    if(!this.dayList) {
        var dayCount = 0;
        var curDay;
        var sortedEntries = this.entries.sort(sortDays);
        this.dayList = new Array();
        var self = this;
        sortedEntries.forEach(function(entry, index) {
            if(!curDay) {
                curDay = new Date(entry.date.getFullYear(), 
                            entry.date.getMonth()+1, entry.date.getDate());
                self.dayList[dayCount] = {
                    hours: entry.timeSpent * 1000 * 60 * 60,
                    date: curDay 
                };
                    
                dayCount++;
            }
            else if( curDay.getDate() !== entry.date.getDate() ||
                    curDay.getMonth() !== entry.date.getMonth() ||
                    curDay.getFullYear() !== entry.date.getFullYear() ) {
                self.dayList[dayCount] = {
                    hours: entry.timeSpent * 1000 * 60 * 60,
                    date: curDay 
                };
                dayCount++;
                curDay = new Date(entry.date.getFullYear(), entry.date.getMonth()+1, entry.date.getDate());
            }
            else if( curDay.getDate() !== entry.date.getDate() ||
                    curDay.getMonth() !== entry.date.getMonth() ||
                    curDay.getFullYear() !== entry.date.getFullYear() ) {
                var curHours = self.dayList[dayCount].hours;
                self.dayList[dayCount-1] = {
                    hours: curHours + (entry.timeSpent * 1000 * 60 * 60),
                    date: curDay 
                };
            }
        });
    }
	return this.dayList;
};

Project.prototype.barChartData = function() {
	var dayList = this.getDays();
	if(dayList.length < 7) {
		return dayChartData(dayList);
	}
	else if(dayList.length >=7) {
		lastXDayChartData(dayList, 7);
	}
};
Project.prototype.dayOfWeekChartData = function() {
    var dayList = this.getDays();
    return DayOfWeekAverageChartData(dayList);
};

function dayChartData(dayList) {
	var labels = dayList.map(function(entry) {
		return entry.date.getFullYear() + '/' + 
			(entry.date.getMonth()+1) + '/' + entry.date.getDate();
	});
	var datasets = [
		{
			label: "Daily Hours",
			fillColor: "rgba(30,105,229,.8)",
			strokeColor: "rgba(170,170,170,.8)",
			highlightFill: "rgba(30,105,229,1)",
			highlightStroke: "rgba(60,60,60,.8)",
			data: dayList.map(function(entry) {
				return entry.hours
			})
		}
	];
	var data = {
		labels: labels,
		datasets: datasets
	};
	return data;
}
function lastXDayChartData(dayList, dayLength) {
	var filteredDays = dayList.filter(function(day, index) {
		if( index < dayLength) {
			return true;
		}
	});
	return dayChartData(filteredDays);
}
function DayOfWeekAverageChartData(dayList) {
	var labels = [
		'Mon', 'Tue', 'Wed',
		'Thu', 'Fri', 'Sat',
		'Sun'
	];
	var datasetData = [
		0,0,0,0,0,0,0
	];
	var dayOfWeekHours = [
		{ hours: 0, days: 0 },
		{ hours: 0, days: 0 },
		{ hours: 0, days: 0 },
		{ hours: 0, days: 0 },
		{ hours: 0, days: 0 },
		{ hours: 0, days: 0 },
		{ hours: 0, days: 0 }	
	];
	dayList.forEach(function(day) {
		var hourTrack = dayOfWeekHours[day.date.getDay()];
		hourTrack.hours += day.hours;
		hourTrack.days++;
		datasetData[day.date.getDay()] = hourTrack.hours / hourTrack.days;
	});
	var datasets = [
		{
			label: "Daily Hours",
			fillColor: "rgba(30,105,229,.8)",
			strokeColor: "rgba(170,170,170,.8)",
			highlightFill: "rgba(30,105,229,1)",
			highlightStroke: "rgba(60,60,60,.8)",
			data: datasetData
		}
	];
	var data = {
		labels: labels,
		datasets: datasets
	};
	return data;
}
function sortDays(entry1, entry2) {
	if( entry1.date > entry2.date ) {
		return 1;
	}
	else if( entry2.date > entry1.date ) {
		return -1;
	}
	else {
		return 0;
	}
}

module.exports = Project;