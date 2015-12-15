var express = require('express');
var router = express.Router();
var path = require('path');

// Get the static transpiled files for the front-end
router.get('/*', function( req, res ) {
	res.sendFile(path.join(__dirname, '../bin/'));
});
module.exports = router;