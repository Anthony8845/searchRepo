export const script = () => {
    return app.gulp.src(app.path.src.script)
        .pipe(app.gulp.dest(app.path.build.script))
        .pipe(app.plugins.browserSync.stream())
}