// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('canningApp', ['ionic', 'starter.controllers', 'starter.services', 'timer', 'ngAudio'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  /*  .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })
*/

  // Each tab has its own nav history stack:

  .state('home', {
    url: '/home',      
        templateUrl: 'templates/home.html',
        controller: 'HomeCtrl'    
  })
  .state('foods', {
      url: '/foods/:type',
          templateUrl: 'templates/foods.html',
          controller: 'FoodsCtrl'
    })
    .state('jar', {
      url: '/jar/:food',
      templateUrl: 'templates/jar.html',
      controller: 'JarCtrl'
    })
    .state('pack', {
      url: '/pack/:jar',
          templateUrl: 'templates/pack.html',
          controller: 'PackCtrl'
    })
    .state('elevation', {
      url: '/elevation/:pack',
          templateUrl: 'templates/elevation.html',
          controller: 'ElevationCtrl'
    })
    .state('canning', {
      url: '/canning/:elevation',
          templateUrl: 'templates/canning.html',
          controller: 'CanningCtrl'
    })
    .state('precheck', {
      url: '/precheck/:canning',
          templateUrl: 'templates/precheck.html',
          controller: 'PrecheckCtrl'
    })
    .state('checklist', {
      url: '/checklist',
          templateUrl: 'templates/checklist.html',
          controller: 'ChecklistCtrl'
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/home');

});
