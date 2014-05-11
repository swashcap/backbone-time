/* global define */
define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/entry.html'
], function($, _, Backbone, Template) {
  'use strict';

  var EntryView = Backbone.View.extend({
    tagName: 'tr',
    template: _.template(Template),

    initialize: function() {

    },

    render: function() {
      var modelJSON = _.extend(
        this.model.toJSON(),
        {project: 'test'}
      );

      this.$el.html(this.template(modelJSON));

      return this;
    }
  });

  return EntryView;
});