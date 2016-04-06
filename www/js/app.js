// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('canningApp', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova', 'ngAudio'])

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
    cache: false,     
        templateUrl: 'templates/home.html',
        controller: 'HomeCtrl'    
  })
  .state('foods', {
      url: '/foods/:type',
      cache: false,
          templateUrl: 'templates/foods.html',
          controller: 'FoodsCtrl'
    })
    .state('jar', {
      url: '/jar/:food',
      cache: false,
      templateUrl: 'templates/jar.html',
      controller: 'JarCtrl'
    })
    .state('pack', {
      url: '/pack/:jar',
      cache: false,
          templateUrl: 'templates/pack.html',
          controller: 'PackCtrl'
    })
    .state('canning', {
      url: '/canning/:pack',
      cache: false,
          templateUrl: 'templates/canning.html',
          controller: 'CanningCtrl'
    })
    .state('elevation', {
      url: '/elevation/:canning',
      cache: false,
          templateUrl: 'templates/elevation.html',
          controller: 'ElevationCtrl'
    })
    .state('precheck', {
      url: '/precheck/:elevation',
      cache: false,
          templateUrl: 'templates/precheck.html',
          controller: 'PrecheckCtrl'
    })
    .state('pchecklist1', {
      url: '/pchecklist1',
      cache: false,
          templateUrl: 'templates/pchecklist1.html',
          controller: 'ChecklistCtrl'
    })
    .state('pchecklist2', {
      url: '/pchecklist2',
      cache: false,
          templateUrl: 'templates/pchecklist2.html',
          controller: 'ChecklistCtrl'
    })
    .state('pchecklist3', {
      url: '/pchecklist3',
      cache: false,
          templateUrl: 'templates/pchecklist3.html',
          controller: 'ChecklistCtrl'
    })
    .state('pchecklist4', {
      url: '/pchecklist4',
      cache: false,
          templateUrl: 'templates/pchecklist4.html',
          controller: 'ChecklistCtrl'
    })
    .state('bchecklist1', {
      url: '/bchecklist1',
      cache: false,
          templateUrl: 'templates/bchecklist1.html',
          controller: 'ChecklistCtrl'
    })
    .state('bchecklist2', {
      url: '/bchecklist2',
      cache: false,
          templateUrl: 'templates/bchecklist2.html',
          controller: 'ChecklistCtrl'
    })
    .state('bchecklist3', {
      url: '/bchecklist3',
      cache: false,
          templateUrl: 'templates/bchecklist3.html',
          controller: 'ChecklistCtrl'
    })
    .state('timer', {
      url: '/timer/:steps',
      cache: false,
          templateUrl: 'templates/timer.html',
          controller: 'TimerCtrl'
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/home');

});
