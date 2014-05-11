/* global define */
define([
  'underscore',
  'backbone',
  'text!templates/day-single.html',
  'helpers/helpers'
], function(_, Backbone, DayTemplate, Helpers) {
  var DayView = Backbone.View.extend({
    tagName: 'tr',
    template: _.template(DayTemplate),

    render: function() {
      var modelJSON = _.extend(
        this.model.toJSON(),
        { date: Helpers.formatDate(this.model.get('date')) }
      );

      this.$el.append(this.template(modelJSON));

      return this;
    }
  });

  return DayView;
});