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
var createBrowserHistory = require('history/lib/createBrowserHistory');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;

var App = React.createClass({
    getInitialState: function() {
        return {
            items: [
                { key: "loading", value: "loading projects..." }
            ],
            projectListVisible: true,
            projectTitleVisible: false
        }
    },
    componentDidMount: function() {
        this.loadProjects();
    },
    projectItemSelected: function(item) {
        if( item.key !== 'add' ) {
            createBrowserHistory.push('/project', { id: item.key });
            this.setState({
                projectListVisible: false,
                projectTitleVisible: true,
                projectTitle: item.value
            });
        }
    },
    addProjectClicked: function(item) {
        this.addProject(item);
    },
    render:function() {    
		var projectListClass = "projectList verticalCenter";
        var projectTitleClass = "projectTitle";
        if( !this.state.projectListVisible ) {
			projectListClass += " reverse";
		}
        if( !this.state.projectTitleVisible ) {
            projectTitleClass += " opaque"; 
        }
        return <FullScreenImageBlur>
                <div className="title">
                    <GradientText text="proj[rekt]" fontPixelSize={64} />
                </div>
                <div className={projectListClass}>
                    <DropdownList items={this.state.items} 
                        handleProjectSelected={this.projectItemSelected}
                         />
                </div>
                {this.props.children}
            </FullScreenImageBlur>;
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
        }, config.urls.projectsUrl, null, ProjectApiParser);
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
        }, config.urls.addProjectUrl + '/' + item.value, null, ProjectApiParser);
    }
});

function render() {    
    ReactDOM.render(
        <Router history={createBrowserHistory()}>
            <Route path="/" component={App}>
                <Route path="project/:id" component={ProjectHandler} />
            </Route>
        </Router>, document.getElementById('app'));
}

render();