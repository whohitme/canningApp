angular.module('starter.services', [])

.factory('Selection', function() {

  // Array to store/retrieve canning choices
  // type, food, jar size, pack, elevation, and canning type
  var choose = [];

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

.factory('TimerSrv', function() {
  var steps = 0;
  function getSteps() {
    steps++;
    return steps;
  }
  function resetSteps() {
    steps = 0;
  }
})

.filter('minutesToDateTime', [function() {
  return function(seconds) {
    return new Date(1970, 1, 0).setSeconds(seconds);
  };
}]);

// for media plugin : http://plugins.cordova.io/#/package/org.apache.cordova.media
/*.factory('MediaSrv', function($q, $ionicPlatform, $window) {
  var service = {
    loadMedia: loadMedia,
    getStatusMessage: getStatusMessage,
    getErrorMessage: getErrorMessage
  };

  function loadMedia(src, onStop, onError, onStatus){
    var defer = $q.defer();
    $ionicPlatform.ready(function(){
      var mediaStatus = {
        code: 0,
        text: getStatusMessage(0)
      };
      var mediaSuccess = function(){
        mediaStatus.code = 4;
        mediaStatus.text = getStatusMessage(4);
        if(onStop){onStop();}
      };
      var mediaError = function(err){
        _logError(src, err);
        if(onError){onError(err);}
      };
      var mediaStatus = function(status){
        mediaStatus.code = status;
        mediaStatus.text = getStatusMessage(status);
        if(onStatus){onStatus(status);}
      };

      if($ionicPlatform.is('android')){src = '/android_asset/www/' + src;}
      var media = new $window.Media(src, mediaSuccess, mediaError, mediaStatus);
      media.status = mediaStatus;
      defer.resolve(media);
    });
    return defer.promise;
  }

  function _logError(src, err){
    console.error('MediaSrv error', {
      code: err.code,
      text: getErrorMessage(err.code)
    });
  }

  function getStatusMessage(status){
    if(status === 0){return 'Media.MEDIA_NONE';}
    else if(status === 1){return 'Media.MEDIA_STARTING';}
    else if(status === 2){return 'Media.MEDIA_RUNNING';}
    else if(status === 3){return 'Media.MEDIA_PAUSED';}
    else if(status === 4){return 'Media.MEDIA_STOPPED';}
    else {return 'Unknown status <'+status+'>';}
  }

  function getErrorMessage(code){
    if(code === 1){return 'MediaError.MEDIA_ERR_ABORTED';}
    else if(code === 2){return 'MediaError.MEDIA_ERR_NETWORK';}
    else if(code === 3){return 'MediaError.MEDIA_ERR_DECODE';}
    else if(code === 4){return 'MediaError.MEDIA_ERR_NONE_SUPPORTED';}
    else {return 'Unknown code <'+code+'>';}
  }

  return service;
});*/