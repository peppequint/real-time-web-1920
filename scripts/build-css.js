const gulp = require('gulp');
const concat = require('gulp-concat');

return gulp.src(['./src/css/index.css']).pipe(concat('index.css')).pipe(gulp.dest('./static/'));
