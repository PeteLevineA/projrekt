"use strict";

var gulp = require('gulp');
var nodemon = require('gulp-nodemon'); // Local Node Server
var open = require('gulp-open'); // Open URL in a browser
var browserify = require('browserify'); // Bundles the JS
var reactify = require('reactify'); // Transforms React JSX to JS
var source = require('vinyl-source-stream'); // Use Conventional text streams with gulp
var concat = require('gulp-concat');
var lint = require('gulp-eslint'); // Lint JS Files, including JSX
var path = require('path');
var less = require('gulp-less');

var config = {
    port: 9005,
    devBaseUrl: 'http://localhost',
    paths: {
        html: './views/*.html',
        bin: './bin',
        appJs: [
            './src/js/components/app.jsx'
        ],
        js: [
            './src/js/**/*.js'
        ],
        jsx: [
            './src/js/**/*.jsx'
        ],
        less: [
            './src/less/**/*.less'
        ]
    }
};

// Start a local dev server
gulp.task('connect', function () {
    nodemon({
        script: 'app.js',
        ext: 'js html',
        env: { "PORT": '3000' }
    });
});

// Open Given Folder
gulp.task('open', ['connect'], function () {
    gulp.src('bin/index.html')
        .pipe(open({
            uri: config.devBaseUrl + ':' + config.port + '/'
        }));
});

// Move Html to Dist
gulp.task('html', function () {
    gulp.src(config.paths.html)
        .pipe(gulp.dest(config.paths.bin));
});

// Transpile JSX to JS and move to Dist
gulp.task('js', function () {
    browserify(config.paths.appJs)
        .transform(reactify)
        .bundle()
        .on('error', console.error.bind(console))
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(config.paths.bin + '/scripts'));
});
// Compile Less Files to a bundled Css File
gulp.task('less', function() {
	return gulp.src(config.paths.less)
		.pipe(less({
			paths: [ path.join(__dirname, 'less', 'includes') ]
		}))
		.pipe(concat('site.css'))
		.pipe(gulp.dest(config.paths.bin + '/css'));
});

// Compile Less files whenever a css file is changed
gulp.task('watchcss', function() {
	gulp.watch(config.paths.less, ['less']);
});

// Watch Files
gulp.task('watch', function () {
    gulp.watch(config.paths.html, ['html']);
});

// LINT
gulp.task('lint', function () {
    return gulp.src(config.paths.js)
        //.pipe(lint({ config: 'eslint.config.json' }))
        .pipe(lint.format());
});

gulp.task('watchjsx', function () {
    gulp.watch(config.paths.jsx, ['js', 'lint']);
});

gulp.task('watchjs', function() {
    gulp.watch(config.paths.js, ['js', 'lint']);
});

// Default
gulp.task('default', ['html', 'js', 'less', 'lint', 'watch', 'watchjs', 'watchjsx', 'watchcss']);