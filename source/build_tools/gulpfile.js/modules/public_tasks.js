"use strict";
/*
    require constants used by Gulp.
*/
const { series, watch } = require("gulp");
/*
    require NPM packages.
*/
const sync = require("browser-sync").create(); // serve files over lan, and synchronise file changes with the browser
/*
    require paths object, containing all paths used.
*/
const PATHS = require("./paths");
/*
    require all private tasks.
*/
const PRIVATE_TASKS = require("./private_tasks");
/*
    public task for local development.
*/
function develop () {
    // start a development browser
    sync.init({
        notify: false,
        open: false,
        reloadOnRestart: true,
        server: PATHS.server.root,
        tunnel: true,
    });
    // watch JS files for changes
    watch(
        PATHS.javascript.watch,
        // run when function is initialised
        { ignoreInitial: false },
        // run all JS tasks in sequence
        series(
            PRIVATE_TASKS.lint_javascript,
            PRIVATE_TASKS.transpile_javascript,
        )
    );
    // watch Scss files for changes
    watch(
        PATHS.scss.watch,
        // run when function is initialised
        { ignoreInitial: false },
        // run all scss tasks in sequence
        series(
            PRIVATE_TASKS.lint_scss,
            PRIVATE_TASKS.transpile_scss,
        )
    );
    // watch image files for changes
    watch(
        PATHS.images.watch,
        // run when function is initialised
        { ignoreInitial: false },
        // run image minification task
        series(
            PRIVATE_TASKS.minify_images,
        )
    );
}
function reference () {
    // watch Nunjucks files for changes
    watch(
        PATHS.templates.watch,
        // run when function is initialised
        { ignoreInitial: false },
        PRIVATE_TASKS.transpile_templates,
    );
}



/*
    export private tasks.
*/
exports.develop   = develop;
exports.reference = reference;
exports.minify_images = PRIVATE_TASKS.minify_images;
