"use strict";

var React = require("react");
var ImgLoader = require('./imgLoader.jsx');
var ResponsiveImage = require('./responsiveImage.jsx');
var config = require('../../../config/config.json');
var NasaImageApiParser = require('../lib/nasaImageApiParser.js');

var FullScreenImageBlur = React.createClass({
    getDefaultProps: function() {
        return {
            containerFullSizeOfImage: false,
            thumbnailWidth: 100
        };
    },
    getInitialState: function() {
        return {
            displayOverlay: false, 
            image: '',
            previewImage: false
        };
    },
    componentDidMount: function() {
    },
    componentWillUnmount: function() {
        
    },
    imageRetrieved: function(image) {
        this.setState({
            displayOverlay: true,
            image: image
        });
    },
    previewHover: function(e) {
        this.setState({
            previewImage: true
        });
    },
    previewEnd: function(e) {
        this.setState({
            previewImage: false
        });
    },
    render: function () {
        var overlayCssClasses = "animatedFadeIn";
        var blurCssClasses = "blur";
        var colorCssClasses = "blurColorOverlay";
        var patterCssClasses = "patternOverlay";
        if( !this.state.displayOverlay ) {
            overlayCssClasses += " hidden";
        }
        if( this.state.previewImage ) {
            blurCssClasses += " transparent";
            colorCssClasses += " transparent";
            patterCssClasses += " transparent";
        }
        return <div className="fullScreenPicBlur">
                <ImgLoader imageUrl={config.urls.imageApiUrl}
                    defaultImageUrl={config.urls.defaultImageUrl}
                    OnImageRetrieved={this.imageRetrieved}
                    imageDataParser={NasaImageApiParser} />
                <div className={overlayCssClasses}>
                    <ResponsiveImage cssClasses={blurCssClasses} imageUrl={this.state.image}>
                    </ResponsiveImage>
                    <div className={colorCssClasses}></div>
                    <div className={patterCssClasses}></div>
                </div>
                <div className="blurHoverPreview" onMouseEnter={this.previewHover} onMouseLeave={this.previewEnd}> 
                    <img src={this.state.image} title="blurImage" />
                </div>
                <div>
                {this.props.children}
                </div>
            </div>;
    }
});

module.exports = FullScreenImageBlur;