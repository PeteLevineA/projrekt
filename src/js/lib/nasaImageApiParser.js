"use strict";

module.exports = function(imageData) {
	var imageUrl = imageData.url;
	if( imageData.media_type != "image" ) {
		imageUrl = '';
	}
	return imageUrl;
};