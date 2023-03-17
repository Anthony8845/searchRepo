import gulp from 'gulp';
import { path } from './gulp/config/path.js';
import { plugins } from './gulp/config/plugins.js';

global.app = {
    isBuild: process.argv.includes('--build'),
    isDev: !process.argv.includes('--build'),
    path: path,
    gulp: gulp,
    plugins: plugins,
}


import { copy } from './gulp/task/copy.js';
import { reset } from './gulp/task/reset.js';
import { html } from './gulp/task/html.js';
import { server } from './gulp/task/server.js';
import { scss } from './gulp/task/scss.js';
import { script } from './gulp/task/script.js';


function watcher() {
    gulp.watch(path.watch.files, copy)
    gulp.watch(path.watch.html, html)
    gulp.watch(path.watch.scss, scss)
    gulp.watch(path.watch.script, script)
}

const mainTasks = gulp.parallel(copy, html, scss, script)

const dev = gulp.series(reset ,mainTasks, gulp.parallel(watcher, server))
const build = gulp.series(reset, mainTasks)

export { dev }
export { build }

gulp.task('default', dev)