"use strict";

// Зависимости проекта

let gulp = require('gulp');
let sass = require('gulp-sass');
let plumber = require('gulp-plumber');
let postcss = require('gulp-postcss');
let mqpacker = require('css-mqpacker');
let autoprefixer = require('autoprefixer');
let rename = require('gulp-rename');
let del = require('del');
let minify = require('gulp-csso');
let cheerio = require('gulp-cheerio');
let svgmin = require('gulp-svgmin');
let svgstore = require('gulp-svgstore');
let imagemin = require('gulp-imagemin');
let run = require('run-sequence'); //Run a series of gulp tasks
let server = require('browser-sync').create();
let ghPages = require('gulp-gh-pages');
// let reload      = server.reload;

gulp.task('style', function () {
  console.log('---------- Компиляция SASS');
  gulp.src('sass/style.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer({
        browsers: [
          'last 2 versions'
        ]
      }),
      mqpacker({
        sort: true
      })

    ]))
    .pipe(gulp.dest('build/css'))
    .pipe(minify())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css'))
    .pipe(server.stream());
});

gulp.task('normalize', function () {
  console.log('---------- Компиляция SASS. Normalize');
  gulp.src('sass/normalize.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer({
        browsers: [
          'last 2 versions'
        ]
      }),
      mqpacker({
        sort: true
      })
    ]))
    .pipe(gulp.dest('build/css'))
    .pipe(server.stream());
});

gulp.task("images", function () {
  console.log('---------- Сжатие Images');
  return gulp.src('build/img/**/*.{png,jpg,gif}')
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true})
    ]))

    .pipe(gulp.dest('build/img'));
});

gulp.task('symbols', function () {
  console.log('---------- Сборка SVG-спрайта');
  return gulp.src('build/img/*.svg')
    .pipe(svgmin())
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(cheerio(function ($) {
      $('svg').attr('style', 'display:none');
    }))
    .pipe(rename('symbols.svg'))
    .pipe(gulp.dest('build/img'));
});

gulp.task('copy', function () {
  console.log('---------- Копирование src в build');
  return gulp.src([
    'fonts/**/*.{woff,woff2}',
    '_design/*.jpg',
    'img/**',
    'js/**',
    '*.html'
  ], {
    base: '.'
  })
    .pipe(gulp.dest("build"));
});

gulp.task('clean', function () {
  console.log('---------- Очистка папки сборки');
  return del('build');
});

gulp.task('html:copy', function () {
  return gulp.src('*.html')
    .pipe(gulp.dest('build'))
});

gulp.task('html:update', ['html:copy'], function (done) {
  server.reload();
  done();
});


gulp.task('js:copy', function () {
  return gulp.src('js/**')
    .pipe(gulp.dest('build'))
});

gulp.task('js:update', ['js:copy'], function (done) {
  server.reload();
  done();
});


gulp.task('serve', ['style', 'html:update', 'js:update'], function () {
  console.log('---------- Запуск локального сервера browser-sync');
  server.init({
    server: 'build',
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch('sass/**/*.scss', ['style']);
  gulp.watch('*.html', ['html:update']);
  gulp.watch('js/**', ['js:update']);
});

gulp.task('build', function (fn) {
  console.log('---------- Сборка проекта в продакшн');
  run(
    'clean',
    'copy',
    'style',
    // "images",
    'symbols',
    fn
  );
});

// Отправка в GH pages (ветку gh-pages репозитория)

let ghPagesUrl = 'https://sheffcer.github.io/start-project-SASS/';

gulp.task('deploy', function () {
  console.log('---------- Публикация ./build/ на GH pages');
  console.log('---------- ' + ghPagesUrl);
  return gulp.src('./build/**/*')
    .pipe(ghPages());
});

// Перезагрузка браузера

function reload(done) {
  browserSync.reload();
  done();
}


