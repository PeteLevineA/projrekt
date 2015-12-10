"use strict";

var React = require("react");
var ReactDOM = require("react-dom");
var GradientText = require('./gradientText.jsx');
var DropdownList = require('./dropdownList.jsx');
var FullScreenImageBlur = require('./fullscreenImageBlur.jsx');
var DataLoader = require('../lib/dataLoader.js');
var JsonResultsParser = require('../lib/jsonResultParser.js');
var ProjectApiParser = require('../lib/projectApiParser.js');
var ProjectHandler = require('./projectHandler.jsx');
var config = require('../../../config/config.json');
var ReactRouter = require('react-router');
var createHistory = require('history').createHistory;
var useBasename = require('history').useBasename;
var CircleTimer = require('./circleTimer.jsx');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;

var history = createHistory();

var App = React.createClass({
    componentDidUpdate: function() {
        
    },
    render:function() {    
		return <FullScreenImageBlur imageUrl={config.urls.unsplashUrl}>
                <div className="title">
                    <GradientText text="proj[rekt]" fontPixelSize={64} />
                </div>
                {this.props.children}
            </FullScreenImageBlur>;
    }
});

var Search = React.createClass({
    getInitialState: function() {
        return {
            items: [
                { key: "loading", value: "loading projects..." }
            ],
            showList: true
        }
    },
    componentDidMount: function() {
        this.loadProjects();
    },
    projectItemSelected: function(item) {
        if( item.key !== 'add' ) {
            history.push({ pathname: '/project/'+item.key });
        }
    },
    addProjectClicked: function(item) {
        this.addProject(item);
    },
    onEnter: function(nextState) {
        this.setState({
            showList: true
        });
    },
    onLeave: function() {
        this.setState({
            showList: false
        });
    },
    render: function() {
        var projectListClass = "projectList verticalCenter";
        if( !this.state.showList) {
            projectListClass += " opaque";
        }
        return <div className={projectListClass}>
                    <DropdownList items={this.state.items} 
                        handleProjectSelected={this.projectItemSelected}
                            />
                </div>;
    },
    loadProjects: function() {        
        var projects = new DataLoader();
        var self = this;
        projects.load(function(projectData, error) {
            if( !error ) {
                var projectItems = projectData.map(function(project) {
                    var proj = {
                        key: project.id,
                        value: project.name
                    };
                    return proj;
                });
                self.setState({
                    items: projectItems
                });
            }
        }, config.urls.projectApiUrl + config.urls.projectsUrl, null, ProjectApiParser);
    },
    addProject: function(item) {
        var project = new DataLoader();
        var self = this;
        project.load(function(projectData, error) {
            if( !error ) {
                createBrowserHistory.push('/project', { id: item.key });
                this.setState({
                    projectListVisible: false,
                    projectTitleVisible: true,
                    projectTitle: item.value
                });
            }
        }, config.urls.projectApiUrl + config.urls.projectsUrl + config.urls.addProjectUrl + '/' + item.value, null, ProjectApiParser);
    }
});

function render() {    
    ReactDOM.render(
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRoute component={Search} />
                <Route path="project/:id" component={ProjectHandler} />
            </Route>
        </Router>, document.getElementById('app'));
}

render();