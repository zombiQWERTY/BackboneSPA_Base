(function() {
	"use strict";

	var VARS               = require("./GulpVariables.js"),
		gulp               = require("gulp"),
		coffee             = require("gulp-coffee"),
		compass            = require("gulp-compass"),
		minifyCss          = require("gulp-minify-css"),
		uglify             = require("gulp-uglify"),
		imagemin           = require("gulp-imagemin"),
		pngquant           = require("imagemin-pngquant"),
		streamify          = require("gulp-streamify"),
		historyApiFallback = require("connect-history-api-fallback"),
		browserSync        = require("browser-sync"),
		source             = require("vinyl-source-stream"),
		fileinclude        = require("gulp-file-include"),
		tasks,
		watcher;

	gulp.task("compass", function() {
		return gulp.src(VARS.files.styles.src)
			.pipe(streamify(compass({
				css : __dirname + "/" + VARS.paths.styles.dest,
				sass: __dirname + "/" + VARS.paths.styles.src
			})))
			.pipe(streamify(minifyCss()))
			.on("error", console.log)
			.pipe(gulp.dest(VARS.paths.styles.dest))
			.pipe(browserSync.stream());
	});

	gulp.task("coffee", function() {
		return gulp.src(VARS.files.scripts.public)
			.pipe(streamify(coffee({bare: false}))
			.on("error", console.log))
			.pipe(streamify(uglify()))
			.pipe(gulp.dest(VARS.paths.scripts.dest))
			.pipe(browserSync.stream());
	});

	gulp.task("vendor", function() {
		return gulp.src(VARS.files.scripts.vendor)
			.on("error", console.log)
			.pipe(gulp.dest(VARS.paths.scripts.vendorDst))
			.pipe(browserSync.stream());
	});

	gulp.task("views", function() {
		return gulp.src(VARS.files.views.views)
			.pipe(streamify(fileinclude({
				prefix  : "@@",
				basepath: VARS.paths.views.tplSrc
			})))
			.pipe(gulp.dest(VARS.paths.views.dest))
			.pipe(browserSync.stream());
	});

	gulp.task("layout", function() {
		return gulp.src(VARS.files.views.layout)
			.pipe(streamify(fileinclude({
				prefix  : "@@",
				basepath: VARS.paths.views.tplSrc
			})))
			.pipe(browserSync.stream());
	});

	gulp.task("templates", function() {
		return gulp.src(VARS.files.views.templates)
			.pipe(streamify(fileinclude({
				prefix  : "@@",
				basepath: VARS.paths.views.templates
			})))
			.pipe(gulp.dest(VARS.paths.views.tplDest))
			.pipe(browserSync.stream());
	});

	gulp.task("images", function() {
		return gulp.src(VARS.files.images.images)
			.pipe(imagemin({
				progressive: true,
				svgoPlugins: [{removeViewBox: false}],
				use: [pngquant()]
			}))
			.pipe(gulp.dest(VARS.paths.images.stylistic.dest))
			.pipe(browserSync.stream());
	});

	gulp.task("uploads", function() {
		return gulp.src(VARS.files.images.uploads)
			.pipe(imagemin({
				progressive: true,
				svgoPlugins: [{removeViewBox: false}],
				use: [pngquant()]
			}))
			.pipe(gulp.dest(VARS.paths.images.uploads.dest))
			.pipe(browserSync.stream());
	});

	watcher = {
		styles : {
			tasks: ["compass"],
			watch: function() {
				gulp.watch(VARS.files.styles.files,    ["compass"]);
			},
		},
		scripts: {
			tasks: ["coffee", "vendor"],
			watch: function() {
				gulp.watch(VARS.files.scripts.public,  ["coffee"]);
				gulp.watch(VARS.files.scripts.vendor,  ["vendor"]);
			},
		},
		images : {
			tasks: ["images", "uploads"],
			watch: function() {
				gulp.watch(VARS.files.images.images,   ["images"]);
				gulp.watch(VARS.files.images.uploads,  ["uploads"]);
			},
		},
		views  : {
			tasks: ["views", "layout", "templates"],
			watch: function() {
				gulp.watch(VARS.files.views.views,     ["views"]);
				gulp.watch(VARS.files.views.layout,    ["layout"]);
				gulp.watch(VARS.files.views.templates, ["templates"]);
			}
		}
	};

	tasks = watcher.styles.tasks.concat(watcher.scripts.tasks, watcher.images.tasks, watcher.views.tasks);

	gulp.task("serve", tasks, function() {

		browserSync = browserSync.create();
		browserSync.init({
			server: {
				baseDir   : VARS.base.dest,
				middleware: [historyApiFallback()]
			}
		});

		watcher.styles.watch();
		watcher.scripts.watch();
		watcher.images.watch();
		watcher.views.watch();

	});

	gulp.task("default",     ["serve"]);
	gulp.task("run-styles",  ["compass"]);
	gulp.task("run-scripts", ["coffee", "vendor"]);
	gulp.task("run-images",  ["images", "uploads"]);
	gulp.task("run-views",   ["views", "layout", "templates"]);
})();
