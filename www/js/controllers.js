angular.module('starter.controllers', [])

.controller('HomeCtrl', function($scope) {})

.controller('FoodsCtrl', function($scope, $http, $stateParams, Selection) {
  $scope.itemType = $stateParams.type;
  $scope.customFilter = {};
  $http.get('canning.json')
    .then(function(res){
      $scope.foods = res.data;
    })
  $scope.customFilter.type = $stateParams.type;
  Selection.add($stateParams.type,0);
})

.controller('JarCtrl', function($scope, $stateParams, Selection) {
  $scope.jar = $stateParams;
  $scope.itemType = Selection.get(0);
  Selection.add($stateParams.food,1);
})

.controller('PackCtrl', function($scope, $stateParams, Selection) {
  $scope.pack = $stateParams;
  $scope.itemType = Selection.get(0);
  $scope.foodType = Selection.get(1);
  Selection.add($stateParams.jar,2);
})

.controller('ElevationCtrl', function($scope, $stateParams, Selection) {
  $scope.elevation = $stateParams;
  $scope.itemType = Selection.get(0);
  $scope.foodType = Selection.get(1);
  $scope.jarType = Selection.get(2);
  Selection.add($stateParams.pack,3);
})

.controller('CanningCtrl', function($scope, $stateParams, Selection) {
  //$scope.canning = $stateParams;
  $scope.itemType = Selection.get(0);
  $scope.foodType = Selection.get(1);
  $scope.jarType = Selection.get(2);
  $scope.packType = Selection.get(3);
  switch ($stateParams.elevation) {
    case 'e1':
      $scope.eType = '0-1K';
      break;
    case 'e2':
      $scope.eType = '1K-2K';
      break;
    case 'e3':
      $scope.eType = '2K-3K';
      break;
    case 'e4':
      $scope.eType = '3K-4K';
      break;
    case 'e5':
      $scope.eType = '4K-6K';
      break;
    case 'e6':
      $scope.eType = '6K-8K';
      break;
  }
  Selection.add($stateParams.elevation,4);
})

.controller('PrecheckCtrl', function($scope, $stateParams, Selection) {
  $scope.precheck = $stateParams;
  $scope.itemType = Selection.get(0);
  $scope.foodType = Selection.get(1);
  $scope.jarType = Selection.get(2);
  $scope.packType = Selection.get(3);
  switch (Selection.get(4)) {
    case 'e1':
      $scope.eType = '0-1K';
      break;
    case 'e2':
      $scope.eType = '1K-2K';
      break;
    case 'e3':
      $scope.eType = '2K-3K';
      break;
    case 'e4':
      $scope.eType = '3K-4K';
      break;
    case 'e5':
      $scope.eType = '4K-6K';
      break;
    case 'e6':
      $scope.eType = '6K-8K';
      break;
  }
  Selection.add($stateParams.canning,5);
})

.controller('ChecklistCtrl', function($scope, $http, $filter, Selection, ngAudio) {
  $scope.foodType = Selection.get(1);
  $scope.callbackTimer = {};
  $scope.callbackTimer.status = '';
  $scope.callbackTimer.counter = 0;
  $scope.isRunning = false;
  $http.get('canning.json')
    .then(function(res){
      for (var i = res.data.length - 1; i >= 0; i--) {
        // find matching food from json
        if (res.data[i].food == $scope.foodType) {
          var myFood = res.data[i];
            // find matching elevation and pull pressure/time
            switch (Selection.get(4)) {
              case 'e1':
                $scope.myValue = myFood.e1;
                break;
              case 'e2':
                $scope.myValue = myFood.e2;
                break;
              case 'e3':
                $scope.myValue = myFood.e3;
                break;
              case 'e4':
                $scope.eType = 10;
                break;
              case 'e5':
                $scope.eType = 10;
                break;
              case 'e6':
                $scope.eType = 10;
                break;
            }
        }
      }
    })
    // add time from json to the timer once 'start timer' is clicked
  $scope.addTime = function () {
    // something is calling this function twice. hack to check if button clicked
    //if ($scope.isRunning) {
      $scope.$broadcast('timer-add-cd-seconds', $scope.myValue);
    //}
    $scope.isRunning = true;
  }
  // using hack right now with a counter because can't start timer at 0
  $scope.callbackTimer.finished = function () {
    $scope.callbackTimer.counter++;
    if ($scope.callbackTimer.counter > 1) {
      $scope.callbackTimer.status = 'DONE!';
      // play alarm sound, need to add stop button
      $scope.audio = ngAudio.play('img/test.mp3');
      $scope.$apply();
    };
  }
});
