const { src, dest, watch, series, parallel, task } = require("gulp");
const browserSync = require("browser-sync").create();
const del = require("del");

const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const pug = require("gulp-pug");

function serve() {
  browserSync.init({
    server: "./dist",
  });

  watch("src/index.pug", html);
  watch("src/styles.sass", css);
}

function clear() {
  return del("dist");
}

function html() {
  return src("src/index.pug")
    .pipe(pug())
    .pipe(dest("dist"))
    .pipe(browserSync.stream());
}

function css() {
  return src("src/styles.sass")
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(dest("dist/css"))
    .pipe(browserSync.stream());
}

exports.build = build = series(clear, html, css);

exports.dev = series(build, serve);
