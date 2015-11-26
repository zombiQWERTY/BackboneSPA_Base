(function() {
	"use strict"

	var base, paths, files;

	base = {
		src          : "../app/",
		dest         : "../public/"
	};

	paths = {
		scripts: {
			src      : base.src                  + "assets/scripts/",
			dest     : base.dest                 + "javascripts/",
			vendor   : base.src                  + "assets/scripts/libs/",
			vendorDst: base.dest                 + "javascripts/libs"
		},

		styles : {
			src      : base.src                  + "assets/styles/",
			dest     : base.dest                 + "stylesheets/"
		},

		views  : {
			src      : base.src                  + "views/",
			dest     : base.dest,
			tplSrc   : base.src                  + "templates/",
			tplDest  : base.dest                 + "views/",
			layout   : base.src                  + "templates/layout/",
			templates: base.src                  + "templates/pages/"
		},

		images : {
			stylistic: {
				src  : base.src                   + "images/",
				dest : base.dest                  + "images/"
			},

			uploads  : {
				src  : base.src                   + "uploads/",
				dest : base.dest                  + "uploads/"
			}
		}
	};

	files = {
		scripts: {
			public   : paths.scripts.src          + "**/*.coffee",
			vendor   : paths.scripts.src          + "libs/**/*.js"
		},
		styles : {
			src      : paths.styles.src           + "Application.sass",
			files    : [
						paths.styles.src          + "**/*.sass",
						paths.styles.src          + "**/*.scss"
			]
		},
		views  : {
			views    : paths.views.src            + "**/*.html",
			layout   : paths.views.layout         + "**/*.html",
			templates: paths.views.templates      + "**/*.html"
		},
		images : {
			images   : paths.images.stylistic.src + "**/*",
			uploads  : paths.images.uploads.src   + "**/*"
		}
	};

	module.exports = {
		base         : base,
		paths        : paths,
		files        : files
	};
})();
