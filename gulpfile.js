const { src, dest, watch, series } = require("gulp");
const browserSync = require("browser-sync").create();
const del = require("del");

const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const pug = require("gulp-pug");

function serve() {
  browserSync.init({
    server: "./dist",
  });

  watch("src/**/*.mixins", html);
  watch("src/**/*.sass", css);
}

function clear() {
  return del("dist");
}

function html() {
  return src(["src/**/*.mixins", "!src/layouts/**/*.mixins"])
    .pipe(pug())
    .pipe(dest("dist"))
    .pipe(browserSync.stream());
}

function css() {
  return src(["src/**/*.sass", "!src/layouts/**/*.sass", "!src/sass/*.sass"])
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(dest("dist"))
    .pipe(browserSync.stream());
}

function fonts() {
  return src("src/fonts/**")
    .pipe(dest("dist/fonts"))
    .pipe(browserSync.stream());
}

function icons() {
  return src("src/icons/**")
    .pipe(dest("dist/icons"))
    .pipe(browserSync.stream());
}

function img() {
  return src("src/img/**").pipe(dest("dist/img")).pipe(browserSync.stream());
}

exports.build = build = series(clear, html, css, fonts, icons, img);

exports.dev = series(build, serve);
