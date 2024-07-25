const gulp = require("gulp")
const sass = require("gulp-sass")(require("sass"))
const imagens = require("gulp-imagemin")

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



exports.default = gulp.parallel(styles,imagen);

exports.watch = function () {
    gulp.watch("./src/styles/*.scss", gulp.parallel(styles))
}