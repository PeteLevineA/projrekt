"use strict";

var React = require("react");
var ReactDOM = require("react-dom");
var FullScreenImageBlur = require('./fullScreenImageBlur.jsx');
var GradientText = require('./gradientText.jsx');

var App = React.createClass({
    render:function() {
        return (
            <FullScreenImageBlur>
                <div className="title">
                <GradientText text="proj[rekt]" fontPixelSize={64} />
                </div>
            </FullScreenImageBlur>
       );
    }
});

function render() {    
    ReactDOM.render(<App />, document.getElementById('app'));
}

render();