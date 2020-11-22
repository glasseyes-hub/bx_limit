const { src, dest, watch, series, parallel, task } = require("gulp");
const autoprefixer = require("gulp-autoprefixer");
const browserSync = require("browser-sync").create();
const fileInclude = require("gulp-file-include");
const del = require("del");

function serve() {
  browserSync.init({
    server: "./dist",
  });

  watch("src/**/*.html", html);
  watch("src/css/**/*.css", css);
}

function clear() {
  return del("dist");
}

function html() {
  return src("src/**/*.html")
    .pipe(fileInclude())
    .pipe(dest("dist"))
    .pipe(browserSync.stream());
}

function css() {
  return src("src/css/**/*.css")
    .pipe(autoprefixer())
    .pipe(dest("dist/css"))
    .pipe(browserSync.stream());
}

exports.build = build = series(clear, html, css);

exports.dev = series(build, serve);
