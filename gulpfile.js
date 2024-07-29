const gulp = require("gulp")
const sass = require("gulp-sass")(require("sass"))
const imagens = require("gulp-imagemin")
const uglify = require("gulp-uglify")

function styles() {
    return gulp
        .src("./src/styles/*.scss")
        .pipe(sass({outputStyle:"compressed"}))
        .pipe(gulp.dest("./dist/styles"))
}

function imagen() {
    return gulp.src("./src/imagens/**/*")
    .pipe(
        imagens([
            imagens.gifsicle({ interlaced:true }),
            imagens.mozjpeg({ quality: 75, progressive: true}),
            imagens.optipng({ optimizaonLevel: 5}),
            imagens.svgo({
                plugins:[
                    { removeViewBox: false},
                    {cleanupIDs: false},
                ]
            })
        ])
    )
    .pipe(gulp.dest("./dist/imagens"))

}

function scripts(){
    return gulp.src("./src/scripts/*.js")
    .pipe(uglify())
    .pipe(gulp.dest("./dist/scripts"))
}


exports.default = gulp.parallel(styles,imagen,scripts);

exports.watch = function () {
    gulp.watch("./src/styles/*.scss", gulp.parallel(styles))
    gulp.watch("./src/scripts/*.js", gulp.parallel(scripts))
}