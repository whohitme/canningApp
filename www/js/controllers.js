angular.module('starter.controllers', [])

.controller('HomeCtrl', function($scope, Selection, $ionicPopup) {
  Selection.init();
  // Alert user to turn sound on and accept notifications
  Selection.alertUser();
})

.controller('FoodsCtrl', function($scope, $stateParams, Selection, Json) {
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
  var myJar = Json.find($scope.food,'simple');
  Selection.add(myJar.id, 6);
  switch (myJar.jar) {
    case 'both':
      $scope.pint = true;
      $scope.quart = true;
      break;
    case 'pint':
      $scope.pint = true;
      //$scope.quart = false;
      break;
    case 'quart':
      //$scope.pint = false;
      $scope.quart = true;
      break;
    case 'halfGallon':
      $scope.pint = true;
      $scope.quart = true;
      $scope.halfGallon = true;
      break;
    case 'seafood':
      $scope.halfPint = true;
      $scope.pint = true;
  }
  /*if (myJar.id == 23) {
    $scope.halfGallon = true;
  }*/
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
  $scope.bChecklist = false;
  $scope.pChecklist = false;
  if ($scope.canType == 'bath') {
    $scope.bChecklist = true;
    $scope.canning = "boiling water canner"
  } else {
    $scope.pChecklist = true;
    $scope.canning = $scope.canType + " pressure canner";
  }
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

.controller('ChecklistCtrl', function($scope, $filter, Selection, Json) {
  $scope.foodType = Selection.get(1);
  $scope.jarType = Selection.get(2);
  $scope.packType = Selection.get(3);
  $scope.canType = Selection.get(4);
  var chosen = Selection.all();
  var myNums = Json.find(chosen,$scope.canType);
  $scope.myPressure = myNums[1];
  // check that the user really wants to go home
    $scope.showAlert = function() {
      Selection.homeAlert();
    };
  /*$scope.myPopup = function() {
    var nextPopup = $ionicPopup.show({
      title:'Go to next step',
      buttons: [
        {text: 'Next',
        type: 'button-positive'}]
    });
    nextPopup.then(function(res) {
      console.log('Going to next timer');
    });
  }
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

.controller('TimerCtrl', function($scope, Selection, Json, $stateParams, ngAudio, $interval, BackgroundCheck) {
  var chosen = Selection.all();
  $scope.canType = Selection.get(4);
  $scope.myID = Selection.get(6);
  var myNums = Json.find(chosen,$scope.canType);
  //var myNums = [0,0];
  $scope.isRunning = false;
  $scope.timerDone = false;
  $scope.myPressure = myNums[1];
  $scope.timerTitle = "Timer";
  var steps = $stateParams.steps;
  var intervalId;
  getTimerData();
  
  // ngAudio is currently working on ios and android
  $scope.audio = ngAudio.load('img/beep.mp3');
  // sound for notifications
  var sound = device.platform == 'Android' ? 'file://notification.mp3' : 'file://notification.caf';

  function getTimerData() {
    if ($scope.canType == 'bath') {
      // if using the water bath checklist
      switch (steps) {
        case '1':
          $scope.message = "Start timing when water boils. Adjust heat to maintain boil for "+myNums[0]+" minutes.";
          $scope.counter = $scope.counter = myNums[0]*60;
          $scope.myState = 'bchecklist2';
          $scope.submessage = "Reset timer if boiling stops."
          $scope.timerTitle = "Step 2: Process jars";
          break;
        case '2':
          $scope.message = "Leave jars in the canner for 5 minutes.";
          $scope.counter = $scope.counter = 300;
          $scope.myState = 'bchecklist3';
          $scope.timerTitle = "Step 4: Wait";
          break;
        case '3':
          $scope.message = "All done!";
          break;
      }
    } else {
      // if using pressure canning checklist
        switch (steps) {
        case '1':
          $scope.message = "Wait for a steady stream of steam. Let steam flow for 10 minutes.";
          $scope.counter = $scope.counter = 600;
          $scope.myState = 'pchecklist2';
          $scope.timerTitle = "Step 2: Exhaust canner";
          break;
        case '2':
          $scope.message = "Adjust heat to keep pressure stable at "+$scope.myPressure+" PSI for "+myNums[0]+" minutes.";
          $scope.submessage = "Reset timer if pressure drops below recommended level";
          $scope.counter = $scope.counter = myNums[0]*60;
          $scope.myState = 'pchecklist3';
          $scope.timerTitle = "Step 4: Start timing";
          break;
        case '3':
          $scope.message = "Leave jars in the canner for 10 minutes.";
          $scope.counter = $scope.counter = 600;
          $scope.myState = 'pchecklist4';
          $scope.timerTitle = "Step 6: Wait";
          break;
        case '4':
          $scope.message = "All done!";
          break;
      }
    }
    $scope.countdown = $scope.counter;
  }
  /*document.addEventListener('deviceready', function() {
    // Enable background mode
    cordova.plugins.backgroundMode.setDefaults({
      title:'OSU Canning App',
      text:'Running...click to return'});
    cordova.plugins.backgroundMode.enable();*/
    //var backgroundStatus = cordova.plugins.backgroundMode.isActive();
    /*cordova.plugins.backgroundMode.onactivate = function () {
      cordova.plugins.backgroundMode.configure({
                  text:' Click to return'
              });
    }*/
    // start timer button clicked
    $scope.startTimer = function() {
      $scope.isRunning = true;
      // this is using the cordova plugin local notifications
          var now = new Date().getTime() + 5000;
          reminder0 = new Date(now + $scope.countdown * 1000);
              
          cordova.plugins.notification.local.schedule({
            id: 1,
            title: "Canning timer is complete",
            text: "Continue to next step",
            sound: sound,
            at: reminder0,
          });
          
      // interval timer working, updating ui per second
      var startTime = new Date();
      intervalId = $interval(function() {
        var actualTime = new Date();
        var myCounter = Math.floor((actualTime - startTime) / 1000);
        $scope.countdown = $scope.counter - myCounter;
        if ($scope.countdown < 1) {
          $scope.countdown = 0;
          //$scope.debugtext = BackgroundCheck.isActive();
          if (BackgroundCheck.isActive()){
            // app is in foreground so cancel notification and play local audio
              cordova.plugins.notification.local.cancel(1, function() {
              });
            $scope.audio.loop = true;
            $scope.audio.play();
          }
          
          $interval.cancel(intervalId);
          $scope.timerDone = true;
        }
      }, 1000);
      /*
      // listen for if the app goes to background or foreground
      document.addEventListener("pause", onPause, false);
      function onPause() {
          // this is using the cordova plugin local notifications
          var now = new Date().getTime();
          reminder0 = new Date(now + $scope.countdown * 1000);
              
          cordova.plugins.notification.local.schedule({
            id: 1,
            title: "Canning timer is complete",
            text: "Continue to next step",
            sound: sound,
            at: reminder0,
          });
      }
      document.addEventListener("resume", onResume, false);
      function onResume() {
        cordova.plugins.notification.local.is[Scheduled|Triggered](1, function (present) {
          cordova.plugins.notification.local.cancel(1, function() {
          });
        });
      }*/
    }
    /*$scope.$watch('countdown', function(countdown) {
      if (countdown === 0) {
        $scope.audio.play();
        $interval.cancel(intervalId);
        if ($scope.message != "All done!") {
          $scope.timerDone = true;
        }
        cordova.plugins.backgroundMode.configure({
          text:'Timer is done! Return to app'
        });
      }
    })*/
    /*$scope.onTimeout = function(){
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
    }*/
    // clicked reset button
    $scope.resetTimer = function() {
      //$timeout.cancel(mytimeout);
      $scope.countdown = $scope.counter;
      $interval.cancel(intervalId);
      $scope.isRunning = false;
      cordova.plugins.notification.local.is[Scheduled|Triggered](1, function (present) {
          cordova.plugins.notification.local.cancel(1, function() {
              });
        });
      //reset the display time?
      getTimerData();
    }
    // clicked the next button
    $scope.nextList = function() {
      //console.log("Next clicked", myState);
      //$scope.message = $scope.myState;
      $scope.audio.stop();
      $interval.cancel(intervalId);
      $scope.isRunning = false;
      cordova.plugins.notification.local.is[Scheduled|Triggered](1, function (present) {
          cordova.plugins.notification.local.cancel(1, function() {
              });
        });
      //cordova.plugins.backgroundMode.disable();
      //$state.go('pchecklist2');
    }
    $scope.$on("$destroy",
      function(event) {
        $interval.cancel(intervalId);
        cordova.plugins.notification.local.is[Scheduled|Triggered](1, function (present) {
          cordova.plugins.notification.local.cancel(1, function() {
              });
        });
      }
    );
    // check that the user really wants to go home
    $scope.showAlert = function() {
      Selection.homeAlert().then(function(result) {
        if (result) {
          $scope.audio.stop();
          $interval.cancel(intervalId);
          $scope.isRunning = false;
          cordova.plugins.notification.local.is[Scheduled|Triggered](1, function (present) {
              cordova.plugins.notification.local.cancel(1, function() {
                  });
            });
        }
      });
    };
  //}, false);
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
// Called when background mode has been activated
    /*cordova.plugins.backgroundMode.onactivate = function () {
        setTimeout(function () {
            // Modify the currently displayed notification
            cordova.plugins.backgroundMode.configure({
                text:$scope.countdown;
            });
        }, 1000);
    }*/
});
