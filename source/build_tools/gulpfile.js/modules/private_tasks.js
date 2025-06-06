"use strict";
/*
    require constants used by Gulp.
*/
const { dest, src } = require("gulp");
/*
    require npm packages.
*/
// autoprefix CSS for browser compatability
const autoprefix = require("gulp-autoprefixer");
// transpile JS for browser compatability
const babelify = require("babelify");
// allows use of commonjs when targeting the browser
const browserify = require("browserify");
// configurably optimize generated CSS
const clean_css = require("gulp-clean-css");
// combine rules within duplicate media queries in css
const combine_media_queries = require("gulp-join-media-queries");
// replace native CSS imports with the imported file's contents
const css_import = require("gulp-cssimport");
// allow Gulp to delete files
const del = require("delete");
// lint JS
const eslint = require("gulp-eslint");
// allow Gulp to rename files
const rename = require("gulp-rename");
// allow the browser to map minified code back to a readable source
const sourcemaps = require("gulp-sourcemaps");
// lint sass
const postcss = require('gulp-postcss');
const stylelint = require('stylelint');
// serve files over LAN, and synchronise file changes with the browser
const sync = require("browser-sync").create();
// minify JS & replace variable names, for efficiency
const uglify = require("gulp-uglify");
// convert Gulp's vinyl virtual file format into a buffer
const vinyl_buffer = require("vinyl-buffer");
// loads browserify's output into a vinyl object
const vinyl_source = require("vinyl-source-stream");
// transpiles Nunjucks templates into HTML
const nunjucks = require("gulp-nunjucks-render");
// scss
const sass = require('gulp-sass')(require('sass'));
// minify images
const tinypng = require("gulp-tinypng-compress");
const path = require('path');

/*
    require paths object, containing all paths used.
*/
const PATHS = require("./paths");
/*
    private task to delete all compiled files.
*/
function clean(cb) {
    del(
        // delete the following files
        [
            PATHS.javascript.transpiled,
            PATHS.javascript.uglified,
            PATHS.scss.transpiled,
            PATHS.scss.uglified,
        ],
        // allow deletion of files outside of the working directory
        { force: true },
    ),
    // callback to signal task completion
    cb();
}
/*
    private task to transpile Nunjucks templates into HTML.
*/
function transpile_templates(cb) {
    return src(PATHS.templates.input_file)
        .pipe(nunjucks({ path: PATHS.templates.input_folder }))
        .pipe(dest(PATHS.templates.output))
        // reflect updated code in the browser
        .pipe(sync.stream())
        // callback to signal task completion
        .on("end", function() {
            cb();
        });
}
/*
    private task to lint JS.
*/
function lint_javascript(cb) {
    return src(PATHS.javascript.lint)
        // pass in location of `.eslint` config file
        .pipe(eslint(PATHS.javascript.config))
        .pipe(eslint.format())
        // callback to signal task completion
        .on("end", function() {
            cb();
        });
}
/*
    private task to transpile, bundle, and uglify JS, and create a sourcemap.
*/
function transpile_javascript(cb) {
    // bundle commonjs modules into one file
    const bundler = browserify(PATHS.javascript.input, { debug: true })
        // transpile modern JS to ES5 using Babel
        .transform("babelify", { presets: ["@babel/preset-env"] });
    return bundler.bundle()
        // write transpiled JS to the destination folder
        .pipe(vinyl_source("app.js"))
        .pipe(vinyl_buffer())
        .pipe(dest(PATHS.javascript.output))
        // add a suffix to minified file name
        .pipe(rename({extname: ".min.js"}))
        .pipe(sourcemaps.init({ loadMaps: true }))
        // minify JS & replace variable names
        .pipe(uglify())
        .pipe(sourcemaps.write("./"))
        // write minified JS to the destination folder
        .pipe(dest(PATHS.javascript.output))
        // reflect updated code in the browser
        .pipe(sync.stream())
        // callback to signal task completion
        .on("end", function() {
            cb();
        });
}

/*
    private task to lint Sass.
*/
function lint_scss(cb) {
      const plugins = [
        stylelint(),
      ];

    return src(PATHS.scss.lint) // Assuming PATHS.scss.lint is the path to your SCSS files        
        .pipe(postcss(plugins, { syntax: require('postcss-scss') }))
        .on('end', function() {
            cb();
        });
}

/*
    private task to transpile Scss, make CSS more efficient, and create a sourcemap.
*/
function transpile_scss(cb) {
    return src(PATHS.scss.input)
        .pipe(sourcemaps.init())        
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(css_import())
        .pipe(autoprefix())
        .pipe(combine_media_queries())
        .pipe(dest(PATHS.scss.output))
        .pipe(clean_css({ level: 1 }))
        .pipe(rename({ extname: ".min.css" }))
        .pipe(sourcemaps.write('./'))
        .pipe(dest(PATHS.scss.output))
        .pipe(sync.stream())
        .on('end', function() {
            cb();
        });
}


/*
    private task to minify images
*/
function minify_images (cb) {
    return src(PATHS.images.input)
        .pipe(tinypng({
            key: process.env.API_KEY_TINYPNG,
            log: !(process.argv.includes("--silent") || process.argv.includes("-S")),
            sigFile: PATHS.images.signature_file,
        }))
        .pipe(dest(function(file) {
            // Get just the filename without the directory structure
            const filename = path.basename(file.path);
            return PATHS.images.output;
        }))
        .on("end", function () {
            cb();
        });
}

function clean_images(cb) {
    del(
        [
            PATHS.images.output + "**/*",  // Clean all optimized images
            PATHS.images.signature_file,   // Clean TinyPNG signature file
        ],
        { force: true },
    ),
    cb();
}

/*
    export private tasks.
*/
exports.clean                = clean;
exports.transpile_templates  = transpile_templates;
exports.lint_javascript      = lint_javascript;
exports.transpile_javascript = transpile_javascript;
exports.transpile_scss       = transpile_scss;
exports.lint_scss            = lint_scss;
exports.clean_images         = clean_images;
exports.minify_images        = minify_images;