/* global define */
define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/app.html'], function($, _, Backbone, AppTemplate) {
  'use strict';

  var AppView = Backbone.View.extend({
    /**
     * Use the existing DOM element `div#app` as the base of the
     * application. Everything related to the app is rendered
     * inside it.
     */
    el: '#app',
    template: _.template(AppTemplate),

    initialize: function() {
      this.render();
    },

    events: {
      'click .navbar a': 'navigation'
    },

    render: function() {
      this.$el.append(this.template());
    },

    /**
     * Control application navigation.
     *
     * This controller handles all click's from the view's header
     * navigation, or 'navbar' in Bootstrap parlance. It fires of
     * navigation to the router.
     *
     * @return void
     */
    navigation: function(e) {
      e.preventDefault();

      if (e.target.href) {
        window.router.navigate(e.target.getAttribute('href'), true);
      }
    }
  });

  return AppView;
});