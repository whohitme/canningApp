angular.module('starter.controllers', [])

.controller('HomeCtrl', function($scope) {})

.controller('FoodsCtrl', function($scope, $stateParams, Selection, Json) {
  Selection.init();
  //$scope.itemType = $stateParams.type;
  $scope.customFilter = {};
  Json.get('canning.json').then(function(data) {
     $scope.foods = data.canning.simple;
  });
  $scope.customFilter.type = $stateParams.type;
  Selection.add($stateParams.type,0);
})

.controller('JarCtrl', function($scope, $stateParams, Selection, Json) {
  $scope.food = $stateParams.food;
  Selection.add($stateParams.food,1);
  //check which jar sizes are used for the food chosen
  var myJar = Json.find($stateParams.food,'simple');
  Selection.add(myJar.id, 6);
  switch (myJar.jar) {
    case 'both':
      $scope.pint = true;
      $scope.quart = true;
      break;
    case 'pint':
      $scope.pint = true;
      $scope.quart = false;
      break;
    case 'quart':
      $scope.pint = false;
      $scope.quart = true;
      break;
  }
})

.controller('PackCtrl', function($scope, $stateParams, Selection, Json) {
  $scope.foodType = Selection.get(1);
  Selection.add($stateParams.jar,2);
  var myPack = Json.find($scope.foodType,'simple');
  switch (myPack.pack) {
    case 'both':
      $scope.hot = true;
      $scope.raw = true;
      break;
    case 'hot':
      $scope.hot = true;
      $scope.raw = false;
      break;
    case 'raw':
      $scope.hot = false;
      $scope.raw = true;
      break;
  }
})

.controller('CanningCtrl', function($scope, $stateParams, Selection, Json) {
  $scope.foodType = Selection.get(1);
  Selection.add($stateParams.pack,3);
  var myCan = Json.find($scope.foodType,'simple');
  switch (myCan.can) {
    case 'bath':
      $scope.dial = false;
      $scope.weighted = false;
      $scope.bath = true;
      break;
    case 'pressure':
      $scope.dial = true;
      $scope.weighted = true;
      $scope.bath = false;
      break;
  }
})

.controller('ElevationCtrl', function($stateParams, Selection) {
  /*$scope.elevation = $stateParams;
  $scope.foodType = Selection.get(1);
  $scope.jarType = Selection.get(2);
  $scope.packType = Selection.get(3);*/
  Selection.add($stateParams.canning,4);
})

.controller('PrecheckCtrl', function($scope, $stateParams, Selection) {
  //$scope.precheck = $stateParams;
  $scope.foodType = Selection.get(1);
  $scope.jarType = Selection.get(2);
  $scope.packType = Selection.get(3);
  $scope.canType = Selection.get(4);
  Selection.add($stateParams.elevation,5);
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
})

.controller('ChecklistCtrl', function($scope, $filter, Selection) {
  $scope.foodType = Selection.get(1);
  $scope.jarType = Selection.get(2);
  $scope.packType = Selection.get(3);
  $scope.canType = Selection.get(4);
  /*$scope.goNext = function(){
    $state.go('ptimer1');
  }*/
  //$scope.buttonText = 'Start Timer';
  //$scope.timerDone = false;
  /*$scope.callbackTimer = {};
  $scope.callbackTimer.status = 'Start';
  $scope.callbackTimer.counter = false;
  $scope.isRunning = false;
    // add time from json to the timer once 'start timer' is clicked
  $scope.addTime = function () {
    //check if button clicked first or paused
    if ($scope.callbackTimer.counter) {
      if ($scope.isRunning) {
        $scope.$broadcast('timer-stop');
        $scope.buttonText = 'Start Timer';
      } else {
        $scope.$broadcast('timer-resume');
        $scope.buttonText = 'Pause Timer';
      }
    } else {
      $scope.$broadcast('timer-start');
      $scope.callbackTimer.counter = true;
      $scope.buttonText = 'Pause Timer';
    }
    $scope.isRunning = !$scope.isRunning;
  }
  // using hack right now with a counter because can't start timer at 0
  $scope.callbackTimer.finished = function () {
      $scope.timerDone = true;
      $scope.callbackTimer.status = 'DONE!';
      $scope.buttonText = 'DONE!';
      // play alarm sound, need to add stop button
      MediaSrv.loadMedia('img/test.mp3').then(function(media) {
        media.setVolume('1.0');
        media.play();
      });
      $state.transitionTo($state.current, $stateParams, {
        reload: true,
        inherit: false,
        notify: true
      });
  }*/
})

.controller('TimerCtrl', function($scope, Selection, Json, $timeout, $stateParams, ngAudio) {
  var chosen = Selection.all();
  $scope.canType = Selection.get(4);
  $scope.myID = Selection.get(6);
  var myNums = Json.find(chosen,$scope.canType);
  //var myNums = [0,0];
  $scope.isRunning = false;
  $scope.timerDone = false;
  $scope.myPressure = myNums[1];
  var steps = $stateParams.steps;
  getTimerData();
  //$scope.myState = 'home';
  // ngAudio attempt - working on emulator and android
  $scope.audio = ngAudio.load('img/test.mp3');
  // MediaSrv code
  /*var myMedia = null;
  MediaSrv.loadMedia('img/test.mp3').then(function(media) {
        //media.setVolume('1.0');
        myMedia = media;
  });*/
  //native audio preload sound file
      /*
      $ionicPlatform.ready(function() {
        $cordovaNativeAudio.preloadSimple('alarm', 'img/test.mp3')
          .then(function(msg) {console.log(msg); })
          .catch(function(error) {console.error(error); });
      });*/
  //
  function getTimerData() {
    if ($scope.canType == 'bath') {
      // if using the water bath checklist
      switch (steps) {
        case '1':
          $scope.message = "Adjust heat to maintain boil";
          $scope.counter = myNums[0];
          $scope.myState = 'bchecklist2';
          break;
        case '2':
          $scope.message = "Wait for 5 minutes";
          $scope.counter = 5;
          $scope.myState = 'bchecklist3';
          break;
        case '3':
          $scope.message = "All done!";
          break;
      }
    } else {
      // if using pressure canning checklist
        switch (steps) {
        case '1':
          $scope.message = "Exhaust:\nLet steam flow 10 minutes";
          $scope.counter = 10;
          $scope.myState = 'pchecklist2';
          break;
        case '2':
          $scope.message = "Start timing at desired pressure: "+$scope.myPressure;
          $scope.submessage = "Adjust heat to keep stable pressure";
          $scope.counter = myNums[0];
          $scope.myState = 'pchecklist3';
          break;
        case '3':
          $scope.message = "Wait for 10 minutes";
          $scope.counter = 10;
          $scope.myState = 'pchecklist4';
          break;
        case '4':
          $scope.message = "All done!";
          break;
      }
    }
  }
  $scope.startTimer = function() {
    $scope.isRunning = true;
    var mytimeout = $timeout($scope.onTimeout,1000);
      /*mytimeout.then(function() {
        console.log("Timer resolved", Date.now());
      },
      function() {
        console.log("Timer rejected", Date.now());
      });*/
  }
  $scope.onTimeout = function(){
    $scope.counter--;
    if ($scope.counter > 0) {
      mytimeout = $timeout($scope.onTimeout,1000);
    }
    else {
      $scope.audio.play();
      $timeout.cancel(mytimeout);
      if ($scope.message != "All done!") {
        $scope.timerDone = true;
      }
      //playAudio('img/test.mp3')
      //Native audio play
        //$cordovaNativeAudio.play('alarm')
          //.then(function(msg) {console.log(msg); })
          //.catch(function(error) {console.error(error); });
      //
    }
  }
  $scope.resetTimer = function() {
    $timeout.cancel(mytimeout);
    $scope.isRunning = false;
    getTimerData();
  }
  $scope.nextList = function() {
    //console.log("Next clicked", myState);
    //$scope.message = $scope.myState;
    $scope.audio.stop();
    //$state.go('pchecklist2');
  }
  /*function playAudio(url) {
    // Play the audio file at url
    var my_media = new Media(url,
        // success callback
        function () {
            console.log("playAudio():Audio Success");
        },
        // error callback
        function (err) {
            console.log("playAudio():Audio Error: " + err);
        }
    );
    // Play audio
    my_media.play();
}*/
});
