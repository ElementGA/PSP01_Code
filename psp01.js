// based on AngularJs
// on 3/Mar/2016
(function () {
  "use strict";
  var PerCollection = function () {
    this.allMyPeople = [];
    this.totalHeight = 0;
    this.meanHeight = 0;
  };

  PerCollection.prototype.addPerson = function (newPerson) {
    this.allMyPeople.push(newPerson);
  };

  var Person = function () {
    this.firstName = "";
    this.lastName = "";
    this.height = "";
  };

  var pspApp = window.angular.module("pspApp", []);

  /*
  pspApp.controller("pspCtrl", function ($scope) {
    "use strict";
    $scope.perCollection = new PerCollection();
    $scope.person = new Person();

    $scope.addPerson = function () {
        $scope.perCollection.addPerson($scope.person);
        $scope.perCollection.totalHeight += $scope.person.height;
        $scope.perCollection.meanHeight = $scope.perCollection.totalHeight / $scope.perCollection.allMyPeople.length;

        $scope.person = new Person();
    };
  });
  */

  var controllers = {};
  controllers.pspCtrl = function ($scope) {
    $scope.perCollection = new PerCollection();
    $scope.person = new Person();

    $scope.addPerson = function () {
      $scope.perCollection.addPerson($scope.person);
      $scope.perCollection.totalHeight += $scope.person.height;
      $scope.perCollection.meanHeight = $scope.perCollection.totalHeight /
        $scope.perCollection.allMyPeople.length;

      $scope.person = new Person();
    };

    var isEmptyLine = function (line) {
      return line !== "";
    };

    var calculateMean = function () {
      $scope.mean = $scope.fileData.reduce(function (a, b) {
        return a + b;
      }) / $scope.fileData.length;
    };

    var calculateStd = function () {
      var i;
      var sum = 0;
      for (i = 0; i < $scope.fileData.length; ++i) {
        sum += Math.pow($scope.fileData[i] - $scope.mean, 2);
      }
      $scope.std = Math.sqrt(sum / ($scope.fileData.length - 1));
    };

    $scope.loadData = function ($fileContent) {
      console.log(7);
      var i;

      $scope.fileData = $fileContent.split("\r\n");
      for (i = 0; i < $scope.fileData.length; ++i) {
        $scope.fileData[i] = $scope.fileData[i].trim();
      }

      $scope.fileData = $scope.fileData.filter(isEmptyLine);

      for (i = 0; i < $scope.fileData.length; ++i) {
        $scope.fileData[i] = Number($scope.fileData[i]);
      }

      calculateMean();
      calculateStd();
    };
  };

  pspApp.controller(controllers);

  // https://veamospues.wordpress.com/2014/01/27/reading-files-with-angularjs/
  var directives = {};
  directives.onReadFile = function ($parse) {
    console.log(2);

    return {
      restrict: 'A',
      // no scope will be used here
      scope: false,
      link: function (scope, element, attrs) {
        console.log(3);

        var fn = $parse(attrs.onReadFile);

        element.on('change', function (onChangeEvent) {
          console.log(4);

          var reader = new window.FileReader();

          reader.onload = function (onLoadEvent) {
            console.log(5);

            scope.$apply(function () {
              console.log(6);

              fn(scope, {
                $fileContent: onLoadEvent.target.result
              });
            });
          };

          reader.readAsText((onChangeEvent.srcElement ||
            onChangeEvent.target).files[0]);
        });
      }
    };
  };

  pspApp.directive(directives);
}());