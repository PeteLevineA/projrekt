var express = require('express');
var router = express.Router();
var path = require('path');

// Get the static transpiled files for the front-end
router.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, '../bin/index.html'));
});
router.get('/css/site.css', function(req,res) {
	res.sendFile(path.join(__dirname, '../bin/css/site.css'));
});
router.get('/scripts/bundle.js', function(req,res) {
	res.sendFile(path.join(__dirname, '../bin/scripts/bundle.js'));
});
module.exports = router;