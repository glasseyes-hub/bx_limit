const { src, dest, watch, series } = require("gulp");
const browserSync = require("browser-sync").create();
const del = require("del");

const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const pug = require("gulp-pug");

function serve() {
  browserSync.init({
    server: {
      baseDir: "./dist",
    },
  });

  watch("src/**/*.html", html);
  watch("src/css/**/*.sass", css);
}

function clear() {
  return del("dist");
}

function html() {
  return src("src/**/*.pug")
    .pipe(pug())
    .pipe(dest("dist"))
    .pipe(browserSync.stream());
}

function css() {
  return src("src/css/**/*.sass")
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(dest("dist/css"))
    .pipe(browserSync.stream());
}

function fonts() {
  return src("src/fonts/**/*.*")
    .pipe(dest("dist/fonts"))
    .pipe(browserSync.stream());
}

function img() {
  return src("src/img/**/*.*")
    .pipe(dest("dist/img"))
    .pipe(browserSync.stream());
}

function icons() {
  return src("src/icons/**/*.*")
    .pipe(dest("dist/icons"))
    .pipe(browserSync.stream());
}

exports.build = build = series(clear, html, css, fonts, img, icons);

exports.dev = series(build, serve);
