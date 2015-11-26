"use strict"

define [
		"Backbone"
		"Fastclick"
		"modules/Layout/Layout_view"
	], (
		Backbone
		FastClick
		LayoutView
	) ->
		Backbone.Router.extend
			routes:
				""     : "Main"
				"*path": "Error"

			initialize: ->
				new FastClick document.body
				Layout = new LayoutView
				Layout.render()
				return

			Main: ->
				require ["modules/Main/Main_view"], (MainView) ->
					Main = new MainView
					Main.render()
					return
				return

			Error: ->
				alert "Страница не найдена"
				return
