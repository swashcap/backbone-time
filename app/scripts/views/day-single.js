/* global define */
define([
  'underscore',
  'backbone',
  'text!templates/day-single.html',
  'helpers/helpers'
], function(_, Backbone, DayTemplate, DateHelper) {
  'use strict';

  var DayView = Backbone.View.extend({
    tagName: 'tr',
    template: _.template(DayTemplate),

    render: function() {
      var modelJSON = _.extend(
        this.model.toJSON(),
        { date: DateHelper.formatDate(this.model.get('date'), '<strong>%A</strong> %B %d') }
      );

      this.$el.append(this.template(modelJSON));

      return this;
    }
  });

  return DayView;
});