"use strict"

define [
		"jquery"
		"Backbone"
	], (
		$
		Backbone
	) ->
		Backbone.View.extend
			el    : "#APPNAME"

			events:
				"click a[href]:not([data-bypass])": "linksHandler"

			initialize: ->
				@hover()
				return

			render: ->
				return

			linksHandler: (event) ->
				$target = $ event.currentTarget
				href    =
					prop: $target.prop "href"
					attr: $target.attr "href"
				root = "#{location.protocol}//#{location.host}/"
				if href.prop.slice(0, root.length) == root
					event.preventDefault()
					Backbone.history.navigate href.attr, true
				return

			hover: ->
				timer = 0
				$body = $ "body"
				$(window).on "scroll", ->
					clearTimeout timer
					$body.addClass "no-hover"  unless $body.hasClass "no-hover"
					timer = setTimeout ->
						$body.removeClass "no-hover"
						return
					, 500
					return
				return
