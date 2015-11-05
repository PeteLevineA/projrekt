"use strict";

var React = require("react");
var ReactDOM = require("react-dom");
var GradientText = require('./gradientText.jsx');
var DropdownList = require('./dropdownList.jsx');

var App = React.createClass({
    getInitialState: function() {
        return {
            items: [
                { key: "test1", value: "This is a test" },
                { key: "test2", value: "super awesome item" },
                { key: "test3", value: "lorem ipsum item" },
                { key: "test4", value: "testing some more items" }
            ]
        }
    },
    render:function() {
        return <div>
                <div className="title">
                    <GradientText text="proj[rekt]" fontPixelSize={64} />
                </div>
                <DropdownList items={this.state.items} />
            </div>;
    }
});

function render() {    
    ReactDOM.render(<App />, document.getElementById('app'));
}

render();