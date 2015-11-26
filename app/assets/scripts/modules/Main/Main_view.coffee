"use strict"

define [
		"jquery"
		"underscore"
		"Backbone"
		"text!templates/Main.html"
	], (
		$
		_
		Backbone
		MainTpl
	) ->
		Backbone.View.extend
			el      : "#content"
			template: _.template MainTpl

			initialize: ->
				return

			render: ->
				@$el.html @template()
				return

