const gulp = require('gulp');
const concat = require('gulp-concat');

return gulp.src('./src/assets/**.*').pipe(gulp.dest('./static/'));
