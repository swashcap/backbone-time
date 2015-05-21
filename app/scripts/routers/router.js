/* global define */
define([
  'backbone',
  'sample-data',
  'views/app',
  'views/day',
  'views/week',
  'views/month'
], function(Backbone, sampleData, AppView, DayView, WeekView, MonthView) {
  'use strict';

  /**
   * Router pattern borrowed from Backbone boilerplate:
   *
   * @link https://github.com/thomasdavis/backboneboilerplate
   * @link https://www.captechconsulting.com/blog/philip-kedy/modularizing-your-backbone-router-using-requirejs
   */
  var AppRouter = Backbone.Router.extend({
    routes: {
      'day': 'showDay',
      'week': 'showWeek',
      'month': 'showMonth',
      'settings': 'showSettings',
      'logout': 'logout',

      // Default
      '*actions': 'defaultAction'
    }
  });

  /**
   * Initialize the application's router.
   *
   * It is stored in `router` so it may be returned to RequireJS.
   */
  var initialize = function(options) {
    var router = new AppRouter(options);

    /**
     * Initialize the AppView, the application's outermost view. All
     * other views are added to this view.
     */
    var appView = new AppView();

    /**
     * Manage the application's routes.
     *
     * This is like part of the controller in traditional MVC.
     */
    router.on('route:defaultAction', function() {
      console.log('defaultAction fired.');
    });
    router.on('route:showDay', function() {
      console.log('showDay fired.');

      var dayView = new DayView(sampleData.entries);
    });
    router.on('route:showWeek', function() {
      console.log('showWeek fired.');

      var weekView = new WeekView(sampleData.days);
    });
    router.on('route:showMonth', function() {
      console.log('showMonth fired.');

      var monthView = new MonthView(new Date());
    });

    /**
     * Attach the application's router to `window`.
     *
     * @todo Figure out a better way to manage the router.
     */
    window.router = router;

    //Start the thing.
    Backbone.history.start();
  };

  return {
    initialize: initialize
  };
});