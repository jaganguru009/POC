'use strict';

function getRandomString(text) {
	return text + Math.floor((Math.random() * 100000) + 1);
}

function getRandomInt() {
	return Math.floor((Math.random() * 100000) + 1);
}

function getRandomAmount() {
	return ((Math.random() * 100) + 1).toFixed(2);
}

function getDate() {
	return (new Date()).toISOString().substring(0, 10);
}

function getShortId() {
	var shortid = require('shortid');
	// console.log(shortid.generate());
	return shortid.generate();
}

function getSixDigitRandomNumber() {
	var Random = require("random-js");
	var random = new Random(Random.engines.mt19937().autoSeed());
	var value = random.integer(100000, 999999);
	return value;
}
  
 
module.exports.getRandomString = getRandomString;
module.exports.getRandomInt = getRandomInt;
module.exports.getRandomAmount = getRandomAmount;
module.exports.getDate = getDate;
module.exports.getShortId = getShortId;
module.exports.getSixDigitRandomNumber = getSixDigitRandomNumber; 
