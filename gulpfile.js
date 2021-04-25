const gulp = require('gulp')
const sass = require('gulp-sass')
const concat = require('gulp-concat')
const uglify = require('gulp-uglify')
const babel = require('gulp-babel')
const imagemin = require('gulp-imagemin')
const html = require('gulp-htmlmin')
const rename = require('gulp-rename')
const cachebust = require('gulp-cache-bust')
const browserSync = require('browser-sync').create()

gulp.task('default', [
  'min_css',
  'min_js',
  'min_img',
  'min_html',
  'min_html_pages',
])

gulp.task('serve', () => {
  browserSync.init({
    server: './build/',
  })

  gulp.watch('./src/**', ['default']).on('change', browserSync.reload)
})

gulp.task('min_html', () => {
  return gulp
    .src(['./src/index.html'])
    .pipe(
      html({
        collapseWhitespace: true,
        removeComments: true,
      })
    )
    .pipe(
      cachebust({
        type: 'timestamp',
      })
    )
    .pipe(gulp.dest('./build/'))
})

gulp.task('min_html_pages', () => {
  return gulp
    .src('./src/pages/curriculum.html')
    .pipe(
      html({
        collapseWhitespace: true,
        removeComments: true,
      })
    )
    .pipe(rename('index.html'))
    .pipe(
      cachebust({
        type: 'timestamp',
      })
    )
    .pipe(gulp.dest('./build/cv/'))
})

gulp.task('min_css', () => {
  return gulp
    .src([
      './src/assets/sass/helpers.scss',
      './src/assets/sass/reset.scss',
      './src/assets/sass/estilo.scss',
      './src/assets/sass/cv.scss',
    ])
    .pipe(concat('./estilo.scss'))
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(gulp.dest('./build/css/'))
})

gulp.task('min_js', () => {
  return gulp
    .src('./src/assets/js/script.js')
    .pipe(
      babel({
        presets: ['env'],
      })
    )
    .pipe(uglify())
    .pipe(gulp.dest('./build/js/'))
})

gulp.task('min_img', () => {
  return gulp
    .src('./src/assets/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./build/img/'))
})
