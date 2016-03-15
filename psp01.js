// based on AngularJs
// on 3/Mar/2016

(function() {
    
    
var PerCollection = function () {
    "use strict";
    this.allMyPeople = [];
    this.totalHeight = 0;
    this.meanHeight = 0;
};

PerCollection.prototype.addPerson = function (newPerson) {
    "use strict";
    this.allMyPeople.push(newPerson);
};

var Person = function () {
    "use strict";
    this.firstName = "";
    this.lastName = "";
    this.height = "";
};

var pspApp = angular.module("pspApp", []);

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
    "use strict";
    $scope.perCollection = new PerCollection();
    $scope.person = new Person();

    $scope.addPerson = function () {
        $scope.perCollection.addPerson($scope.person);
        $scope.perCollection.totalHeight += $scope.person.height;
        $scope.perCollection.meanHeight = $scope.perCollection.totalHeight / $scope.perCollection.allMyPeople.length;

        $scope.person = new Person();
    };
};

pspApp.controller(controllers);

}());