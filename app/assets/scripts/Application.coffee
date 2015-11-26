"use strict"

requirejs.config
	baseUrl: "javascripts/"
	paths  :
		text      : "libs/text"
		jquery    : "libs/jquery"
		underscore: "libs/underscore"
		Backbone  : "libs/backbone"
		Fastclick : "libs/fastclick"

		templates : "../views"
		Router    : "common/router"


define [
		"jquery"
		"Backbone"
		"Router"
	], (
		$
		Backbone
		Router
	) ->
		new Router

		hasPushstate = !!(window.history && history.pushState)
		if hasPushstate
			Backbone.history.start
				pushState: true
				root     : "/"
		else
			Backbone.history.start()
		return
