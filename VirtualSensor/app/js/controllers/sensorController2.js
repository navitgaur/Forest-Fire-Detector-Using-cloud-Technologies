var facebook = angular.module('virtualSensorApp', []);
//defining the login controller
facebook.controller('sensorController', function($scope, $http, $timeout) {

    var temperatures = [ 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 64,
        66, 68, 70, 72, 74, 76, 78, 80 ];

    $scope.sentData = [];

    $scope.counter = 0;
    $scope.isDoneOnce = false;
    $scope.onTimeout = function()
    {
        // $scope.counter++;

        var randomTemperature = temperatures[Math.floor(Math.random() * temperatures.length)];
        var randomCO= parseInt((Math.random() * ( 200 - 1 )));
        var randomHumidity=  parseInt((Math.random() * ( 86 - 35 )));
        var randomCO2 = parseInt((Math.random() * ( 700 - 250 )));

        $scope.sentData.push({"temperature" : randomTemperature, "co2" : randomCO2, "co" : randomCO, "humidity" : randomHumidity});

        $http({
            method : "POST",
            url : 'http://localhost:3000/sensorData',
            data : {
                "temperature" : randomTemperature,
                "co" : randomCO,
                "co2" : randomCO2,
                "humidity" : randomHumidity,
                "id" : 7
            }
        }).success(
            function(data)
            {



            });

        mytimeout = $timeout($scope.onTimeout, 10000);
    }
    var mytimeout = $timeout($scope.onTimeout, 10000);

    $scope.signup = function() {

        var randomTemperature = temperatures[Math.floor(Math.random() * temperatures.length)];
        var randomCO= parseInt((Math.random() * ( 200 - 1 )));
        var randomHumidity=  parseInt((Math.random() * ( 100 - 1 )));
        var randomCO2 = parseInt((Math.random() * ( 700 - 250 )));


        $http({
            method : "POST",
            url : 'http://localhost:3000/sensorData',
            data : {
                "temperature" : randomTemperature,
                "co" : randomCO,
                "co2" : randomCO2,
                "humidity" : randomHumidity
            }
        }).success(function(data) {

            if (data.statusCode == 401) {

                if (data.errorCode == 11000)
                {
                    alert("This email already exists");
                }
            }
            else if (data.statusCode == 200) {
                window.location.assign("/homepage");
            }

        }).error(function(error) {
//			$scope.unexpected_error = false;
//			$scope.invalid_login = true;
        });
    };
})
