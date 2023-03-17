import browserSync from "browser-sync";
import ifPlugin from "gulp-if"

export const plugins = {
    browserSync: browserSync,
    if: ifPlugin,
}
