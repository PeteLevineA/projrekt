"use strict";

var fetch = require('node-fetch');

var Project = function(id, name, title, entries, date) {
	this.id = id;
	this.name = name;
	this.title = title;
	this.entries = entries;
	this.date = date;
}

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
	var dayCount = 0;
	var curDay;
	var sortedEntries = this.entries.sort(sortDays);
	var dayList = new Array();
	sortedEntries.forEach(function(entry, index) {
		if(!curDay) {
			curDay = new Date(entry.date.getFullYear(), 
						entry.date.getMonth()+1, entry.date.getDate());
			dayList[dayCount] = {
				hours: entry.timeSpent * 1000 * 60 * 60,
				date: curDay 
			};
				
			dayCount++;
		}
		else if( curDay.getDate() !== entry.date.getDate() ||
				curDay.getMonth() !== entry.date.getMonth() ||
				curDay.getFullYear() !== entry.date.getFullYear() ) {
			dayCount++;
			dayList[dayCount] = {
				hours: entry.timeSpent * 1000 * 60 * 60,
				date: curDay 
			};
			curDay = new Date(entry.getFullYear(), entry.getMonth()+1, entry.getDate());
		}
		else if( curDay.getDate() !== entry.date.getDate() ||
				curDay.getMonth() !== entry.date.getMonth() ||
				curDay.getFullYear() !== entry.date.getFullYear() ) {
			var curHours = dayList[dayCount].hours;
			dayList[dayCount] = {
				hours: curHours + (entry.timeSpent * 1000 * 60 * 60),
				date: curDay 
			};
		}
	});
	return dayList;
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
	dayList.foreach(function(day) {
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