angular.module('starter.services', [])

.factory('Selection', function($ionicPopup, $location) {

  // Array to store/retrieve canning choices
  // type, food, jar size, pack, elevation, and canning type
  var choose = [];
  var alertDone = false;

  return {
    add: function(item,i) {
      //alert(item);
      choose[i] = item;
    },
    get: function(itemId) {
      //alert(choose[itemId]);
      return choose[itemId];
    },
    all: function() {
      return choose;
    },
    init: function() {
      choose = [];
      choose.length = 0;
    },
    alertUser: function() {
      if (!alertDone){
        var alertPopup = $ionicPopup.alert({
         title: '<h5>Check volume & notifications</h5>',
         template: '<p><i class="icon ion-android-alarm"></i>  This app uses alarm sounds to alert you when a timer is complete. <b>TURN SOUND/ALERTS UP</b></p><p><i class="icon ion-alert-circled"></i>  <b>Allow notifications</b> for this app so that you can be alerted when the timers are complete when the screen is off.</p>'
       });

       alertPopup.then(function(res) {
          alertDone = true;
         console.log('alertDone');
       });
      }
      /*if (!alertDone) {
        return true;
      } else {
        return false;
      }*/
    },
    homeAlert: function() {
       var confirmPopup = $ionicPopup.confirm({
         title: 'Are you sure?',
         template: 'Going home will reset your progress.'
       });

       confirmPopup.then(function(res) {
         if(res) {
            $location.path("#/home");
           console.log('You are sure, going home');
         } else {
           console.log('You are not sure, staying on page');
         }
         return res;
       });
    }
  }
})

.factory('Json', function($http) {
  // used to get Json data 
  var myJson = {};
  //var myTest = 'simple';
  return {
    get: function(item) {
      return $http.get(item)
        .then(function(res){
          myJson = res.data;
          return res.data;
        });
    },
    find: function(food,list) {
      //var quantity = [];
        // find matching item from json
        switch(list) {
          case 'simple':
            for (var i = myJson.canning[list].length - 1; i >= 0; i--) {
              if (myJson.canning[list][i].food == food) {
                return myJson.canning[list][i];
              }
            }
            break;
          case 'weighted':
            var quantity = [];
            for (var i = myJson.canning.pressure.length - 1; i >= 0; i--) {
              if (myJson.canning.pressure[i].id == food[6]) {
                if (myJson.canning.pressure[i].jar == food[2]) {
                  quantity[0] = myJson.canning.pressure[i].time;
                  //find out pressure by checking elevation - under 1K is 10, above is 15
                  if (food[5] == 'e1') {
                    quantity[1] = 10;
                  } else {
                    quantity[1] = 15;
                  }
                  return quantity;
                } 
              }
            }
            if (quantity.length = 0) {
                //alert("Matching Error");
                quantity = ["Error","Error"];
            }
            break;
          case 'dial':
            var quantity = [];
            for (var i = myJson.canning.pressure.length - 1; i >= 0; i--) {
              if (myJson.canning.pressure[i].id == food[6]) {
                if (myJson.canning.pressure[i].jar == food[2]) {
                  quantity[0] = myJson.canning.pressure[i].time;
                  //find out pressure by checking elevation - under 1-2k=11,2-4k=12,4-6k=13,6-8k=14
                  switch(food[5]) {
                    case 'e1':
                      quantity[1] = 11;
                      break;
                    case 'e2':
                      quantity[1] = 11;
                      break;
                    case 'e3':
                      quantity[1] = 12;
                      break;
                    case 'e4':
                      quantity[1] = 12;
                      break;
                    case 'e5':
                      quantity[1] = 13;
                      break;
                    case 'e6':
                      quantity[1] = 14;
                      break;
                  }
                  return quantity;
                }
              }
            }
            /*if (quantity.length = 0) {
                alert("Matching Error");
                quantity = [0,0];
            }*/
            break;
          case 'bath':
            var quantity = [];
            for (var i = myJson.canning.water.length - 1; i >= 0; i--) {
              // find matching item in Json by food, jar size, and pack type
              if (myJson.canning.water[i].id == food[6]) {
                if (myJson.canning.water[i].jar == food[2]) { 
                  if (myJson.canning.water[i].pack == food[3]) {
                    // get time from Json based on elevation
                    switch(food[5]) {
                      case 'e1':
                        quantity[0] = myJson.canning.water[i].e1;
                        break;
                      case 'e2':
                        quantity[0] = myJson.canning.water[i].e2;
                        break;
                      case 'e3':
                        quantity[0] = myJson.canning.water[i].e3;
                        break;
                      case 'e4':
                        quantity[0] = myJson.canning.water[i].e4;
                        break;
                      case 'e5':
                        quantity[0] = myJson.canning.water[i].e5;
                        break;
                      case 'e6':
                        quantity[0] = myJson.canning.water[i].e6;
                        break;
                    }
                    // assign 0 because no pressure
                    quantity[1] = 0;
                    
                  }
                }
              }
            }
            /*if (quantity.length = 0) {
                alert("Matching Error");
                quantity = [0,0];
            }*/
            return quantity;
            break;
          }
        /*if (list == 'simple') {
          if (myJson.canning[list][i].food == food) {
            return myJson.canning[list][i];
          }
        } else if (list)*/
    },
    test: function() {
      return myJson.canning.simple[0].jar;
    }
  }
})

// checking if app is in background or foreground
.factory('BackgroundCheck', function($ionicPlatform){
    var service = {};
    var inBackground = false;

    $ionicPlatform.ready(function() {        
        document.addEventListener("resume", function(){inBackground = false;}, false);
        document.addEventListener("pause", function(){inBackground = true;}, false);
    });

    service.isActive = function(){
        return inBackground == false;
    }
    return service;    
})

// I don't think I need this
/*.factory('TimerSrv', function() {
  var steps = 0;
  function getSteps() {
    steps++;
    return steps;
  }
  function resetSteps() {
    steps = 0;
  }
})*/

.filter('minutesToDateTime', [function() {
  return function(seconds) {
    return new Date(1970, 0, 0, 0).setSeconds(seconds);
  };
}]);