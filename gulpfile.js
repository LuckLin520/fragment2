//！！随时看npm官网，插件更新,以及配置参数的更改！！
var gulp = require("gulp"),
	uglify = require("gulp-uglify"),
	sass = require("gulp-sass"),
	connect = require("gulp-connect"),
	htmlmin = require("gulp-htmlmin"),
	babel = require("gulp-babel"),
	plumber = require("gulp-plumber"),
	_root = "dist";

// 启动服务器
gulp.task("server", function(){
	connect.server({
		root : _root,
		livereload : true
	});
});

// 压缩JS
gulp.task("js", function(){
	gulp.src("src/js/**/*.js")
		.pipe(plumber())
		.pipe(babel({
            presets: ['@babel/env']
        }))
		.pipe(uglify())
		.pipe(gulp.dest("dist/js"))
		.pipe(connect.reload());
});

// 定义 gulp 任务，压缩 HTML
gulp.task("html", function(){
	gulp.src(["src/**/*.html"])
		.pipe(htmlmin({collapseWhitespace: true, minifyCSS:true, minifyJS:true}))
		.pipe(gulp.dest("dist"))
		.pipe(connect.reload());
});

// 定义任务，编译 sass
gulp.task("sass", function(){
	gulp.src("src/sass/**/*.scss")
		.pipe(plumber())
		.pipe(sass({outputStyle:"compressed"}))//选择编译后的压缩格式
		.pipe(gulp.dest(_root + "/css"))
		.pipe(connect.reload());
});

// 将图片、库、模拟的假数据复制到 dist 下
gulp.task("images", function(){
	gulp.src("src/images/**/*.*")
		.pipe(gulp.dest("dist/images"));
});
gulp.task("lib", function(){
	gulp.src("src/lib/**/*.*")
		.pipe(gulp.dest("dist/lib"));
});
gulp.task("mock", function(){
	gulp.src("src/mock/**/*.*")
		.pipe(gulp.dest("dist/mock"));
});
gulp.task("copyfile", ["images", "mock", "lib"]);

gulp.task("watch", function(){
	gulp.watch("src/sass/**/*.scss", ["sass"]);
	gulp.watch("src/js/**/*.js", ["js"]);
	gulp.watch(["src/**/*.html"], ["html"]);
});

gulp.task("default", ["html", "js", "sass", "copyfile", "server", "watch"]);