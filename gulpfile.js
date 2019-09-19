// "use strict";
//
// var gulp = require("gulp");
// var sass = require("gulp-sass");
// var plumber = require("gulp-plumber");
// var postcss = require("gulp-postcss");
// var autoprefixer = require("autoprefixer");
// var server = require("browser-sync").create();
//
// gulp.task("style", function() {
//   gulp.src("sass/style.scss")
//     .pipe(plumber())
//     .pipe(sass())
//     .pipe(postcss([
//       autoprefixer({browsers: [
//         "last 2 versions"
//       ]})
//     ]))
//     .pipe(gulp.dest("css"))
//     .pipe(server.stream());
// });
//
// gulp.task("serve", ["style"], function() {
//   server.init({
//     server: ".",
//     notify: false,
//     open: true,
//     cors: true,
//     ui: false
//   });
//
//   gulp.watch("sass/**/*.{scss,sass}", ["style"]);
//   gulp.watch("*.html").on("change", server.reload);
// });


"use strict";

// Получение настроек папок из package.json
// var pjson = require('./package.json');
// var dirs = pjson.config.directories;
// var ghPagesUrl = pjson.config.ghPages;

// Зависимости проекта
var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var mqpacker = require('css-mqpacker');
var autoprefixer = require("autoprefixer");
var rename = require('gulp-rename');
var del = require('del');
var minify = require("gulp-csso");
var cheerio = require('gulp-cheerio');
var svgmin = require("gulp-svgmin");
var svgstore = require("gulp-svgstore");
var imagemin = require("gulp-imagemin");
var run = require("run-sequence"); //Run a series of gulp tasks
var server = require("browser-sync").create();
var ghPages = require('gulp-gh-pages');
// var reload      = server.reload;

gulp.task("style", function() {
  console.log('---------- Компиляция SASS');
  gulp.src("sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer({browsers: [
          "last 2 versions"
        ]}),
      mqpacker({
        sort: true
      })

    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("normalize", function() {
  console.log('---------- Компиляция SASS. Normalize');
  gulp.src("sass/normalize.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer({browsers: [
          "last 2 versions"
        ]}),
      mqpacker({
        sort: true
      })
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("images", function () {
  console.log('---------- Сжатие Images');
  return gulp.src("build/img/**/*.{png,jpg,gif}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true})
    ]))

    .pipe(gulp.dest("build/img"));
});

gulp.task("symbols", function () {
  console.log('---------- Сборка SVG-спрайта');
  return gulp.src("build/img/*.svg")
    .pipe(svgmin())
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(cheerio(function ($) {
      $('svg').attr('style',  'display:none');
    }))
    .pipe(rename("symbols.svg"))
    .pipe(gulp.dest("build/img"));
});

gulp.task("copy", function () {
  console.log('---------- Копирование src в build');
  return gulp.src([
    "fonts/**/*.{woff,woff2}",
    "_design/*.jpg",
    "img/**",
    "js/**",
    "*.html"
  ], {
    base: "."
  })
    .pipe(gulp.dest("build"));
});

gulp.task("clean", function () {
  console.log('---------- Очистка папки сборки');
  return del("build");
});

gulp.task("html:copy", function () {
  return gulp.src("*.html")
    .pipe(gulp.dest("build"))
});

gulp.task("html:update", ["html:copy"], function (done) {
  server.reload();
  done();
});


gulp.task("js:copy", function () {
  return gulp.src("js/**")
    .pipe(gulp.dest("build"))
});

gulp.task("js:update", ["js:copy"], function (done) {
  server.reload();
  done();
});


gulp.task("serve", ["style", "html:update", "js:update"], function() {
  console.log('---------- Запуск локального сервера browser-sync');
  server.init({
    server: "build",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("sass/**/*.scss", ["style"]);
  gulp.watch("*.html", ["html:update"]);
  gulp.watch("js/**", ["js:update"]);
});

gulp.task("build", function (fn) {
  console.log('---------- Сборка проекта в продакшн');
  run(
    "clean",
    "copy",
    "style",
    // "images",
    "symbols",
    fn
  );
});

// Отправка в GH pages (ветку gh-pages репозитория)
var ghPagesUrl = 'https://sheffcer.github.io/cat-energy/';

gulp.task('deploy', function() {
  console.log('---------- Публикация ./build/ на GH pages');
  console.log('---------- '+ ghPagesUrl);
  return gulp.src('./build/**/*')
    .pipe(ghPages());
});

// Перезагрузка браузера
function reload (done) {
  browserSync.reload();
  done();
}

// gulp.task('watch:js', ['js'], reload);
//
// if(lists.js.length) {
//   gulp.watch(lists.js, ['watch:js']);
// }

var repoUrl = require('./package.json').repository.url.replace(/\.git$/g, '');
// console.log(repoUrl);

// Отправка в GH pages (ветку gh-pages репозитория)

// gulp.task('deploy', function() {
//   const ghPages = require('gulp-gh-pages');
//   console.log('---------- Публикация содержимого ./build/ на GH pages');
//   var ghPagesUrl;
//   if (repoUrl) {
//     var urlParts = repoUrl.split('/');
//     if (urlParts[2] == 'github.com') {
//       ghPagesUrl = 'http://' + urlParts[3] + '.github.io/' + urlParts[4] + '/';
//     }
//     console.log('---------- ' + ghPagesUrl);
//
//   }
//   return gulp.src(dirs.buildPath + '**/*')
//     .pipe(ghPages());
// });
