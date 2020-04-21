const gulp = require('gulp');
const concat = require('gulp-concat');

return gulp.src('./src/img/**.*').pipe(gulp.dest('./static/'));
