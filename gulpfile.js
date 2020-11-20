const gulp = require("gulp");
const bs = require("browser-sync").create();
const fileInclude = require("gulp-file-include");
const fileDel = require("del");

const projectFolder = "dist";
const sourceFolder = "src";
const path = {
  build: {
    html: projectFolder + "/",
    css: projectFolder + "/css/",
    js: projectFolder + "/js/",
    img: projectFolder + "/img/",
    fonts: projectFolder + "/fonts/",
  },
  src: {
    html: sourceFolder + "/*.html",
    css: sourceFolder + "/css/**/*.css",
    js: sourceFolder + "/js/script.js",
    img: sourceFolder + "/img/**/*.{jpg, png, svg}",
    fonts: sourceFolder + "/fonts/*.ttf",
  },
  watch: {
    html: sourceFolder + "/*.html",
    css: sourceFolder + "/sass/**/*.sass",
    js: sourceFolder + "/js/**/*.js",
    img: sourceFolder + "/img/**/*.{jpg, png, svg}",
  },
  clean: "./" + projectFolder + "/",
};

function server(params) {
  bs.init({
    server: {
      baseDir: "./" + projectFolder + "/",
    },
    port: 8080,
    notify: false,
  });
}

function watch() {
  gulp.watch([path.watch.html], html);
}

function clean() {
  return fileDel(path.clean);
}

function html() {
  return gulp
    .src(path.src.html)
    .pipe(fileInclude())
    .pipe(gulp.dest(path.build.html))
    .pipe(bs.stream());
}

function css() {
  return gulp
    .src(path.src.css)
    .pipe(gulp.dest(path.build.css))
    .pipe(bs.stream());
}

const build = gulp.series(html, css);
const watch = gulp.parallel(clean, build, watch, server);

exports.build = build;
exports.default = watch;
