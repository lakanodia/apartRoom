"use strict";
/*
    define paths object, containing all paths used.
*/
module.exports = {
    javascript: {
        config: "./.eslintrc",
        input: "../assets/js/app.js",
        lint: "../assets/js/**/*.js",
        output: "../../distribution/assets/js/",
        transpiled: "../../distribution/assets/js/app.js",
        uglified: "../../distribution/assets/js/app.min.js",
        watch: "../assets/js/**/*.js",
    },
    images: {
        input: "../assets/images/**/*.{png,jpg,jpeg}",
        output: "../../distribution/assets/img/",
        signature_file: "../assets/images/.tinypng-sigs",
        watch: "../assets/images/**/*.{png,jpg,jpeg}",
    },
    server: {
        root: "../../distribution/assets",
    },
    stylus: {
        config: ".stylintrc",
        input: "../assets/stylus/app.styl",
        lint: "../assets/stylus/**/*.styl",
        output: "../../distribution/assets/css/",
        transpiled: "../../distribution/assets/css/app.css",
        uglified: "../../distribution/assets/css/app.min.css",
        watch: "../assets/stylus/**/*.styl",
    },
    scss: {
        input: "../assets/scss/app.scss",
        lint: "../assets/scss/**/*.scss",
        output: "../../distribution/assets/css/",
        transpiled: "../../distribution/assets/css/app.css",
        uglified: "../../distribution/assets/css/app.min.css",
        watch: "../assets/scss/**/*.scss",

    },
    templates: {
        input_file: "../reference/templates/index.njk",
        input_folder: "../reference/templates/",
        output: "../../distribution/assets/reference",
        watch: "../reference/templates/**/*.njk",
    },
};
