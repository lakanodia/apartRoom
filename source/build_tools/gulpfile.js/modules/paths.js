"use strict";
/*
    define paths object, containing all paths used.
*/
module.exports = {
    javascript: {
        config: "./.eslintrc",
        input: "../assets/js/app.js",
        lint: "../assets/js/**/*.js",
        output: "../../docs/assets/js/",
        transpiled: "../../docs/assets/js/app.js",
        uglified: "../../docs/assets/js/app.min.js",
        watch: "../assets/js/**/*.js",
    },
    images: {
        input: "../assets/images/**/*.{png,jpg,jpeg}",
        output: "../../docs/assets/img/",
        signature_file: "../assets/images/.tinypng-sigs",
        watch: "../assets/images/**/*.{png,jpg,jpeg}",
    },
    server: {
        root: "../../docs",
    },
    scss: {
        input: "../assets/scss/app.scss",
        lint: "../assets/scss/**/*.scss",
        output: "../../docs/assets/css/",
        transpiled: "../../docs/assets/css/app.css",
        uglified: "../../docs/assets/css/app.min.css",
        watch: "../assets/scss/**/*.scss",

    },
    templates: {
        input_file: "../templates/index.njk",
        input_folder: "../templates/",
        output: "../../docs",
        watch: "../templates/**/*.njk",
    },
};
