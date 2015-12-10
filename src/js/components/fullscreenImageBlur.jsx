"use strict";

var React = require("react");
var ImgLoader = require('./imgLoader.jsx');
var ResponsiveImage = require('./responsiveImage.jsx');

var FullScreenImageBlur = React.createClass({
    propTypes: {
        imageUrl: React.PropTypes.string
    },
    getDefaultProps: function() {
        return {
            containerFullSizeOfImage: false,
            thumbnailWidth: 100,
            
        };
    },
    getInitialState: function() {
        return {
            displayOverlay: false, 
            image: this.props.imageUrl,
            previewImage: false
        };
    },
    componentDidMount: function() {
        this.setState({
            displayOverlay: true
        })
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
        var patternCssClasses = "patternOverlay";
        if( !this.state.displayOverlay ) {
            overlayCssClasses += " hidden";
        }
        if( this.state.previewImage ) {
            blurCssClasses += " transparent";
            colorCssClasses += " transparent";
            patternCssClasses += " transparent";
        }
        return <div className="fullScreenPicBlur">
                <ResponsiveImage cssClasses="fastFadeIn" imageUrl={this.state.image} />
                <div className={overlayCssClasses}>
                    <ResponsiveImage cssClasses={blurCssClasses} imageUrl={this.state.image}>
                    </ResponsiveImage>
                    <div className={colorCssClasses}></div>
                    <div className={patternCssClasses}></div>
                </div>
                <div className="blurHoverPreview" onMouseEnter={this.previewHover} onMouseLeave={this.previewEnd}> 
                    <img src={this.state.image} title="blurImage" />
                </div>
                {this.props.children}
            </div>;
    }
});

module.exports = FullScreenImageBlur;