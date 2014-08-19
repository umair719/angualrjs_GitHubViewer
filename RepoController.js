(function() {

  var app = angular.module("githubViewer");

  var RepoController = function($scope, github, $routeParams, $location) {

    var onRepoComplete = function(data) {
      $scope.repoDetails = data;
      github.getContributors($scope.repoDetails)
        .then(onContributorsComplete, onError);
    };

    var onContributorsComplete = function(data) {
      $scope.contributors = data;
      for (var i = 0; i < $scope.contributors.length; i++) {
        github.getUser($scope.contributors[i]['login'])
          .then(function(data) {
            //console.log(data);
            console.log($scope.contributors[i]);
            //['details'] = data;
          }, onError);
      }
    };

    var onError = function(reason) {
      $scope.error = "Could not fetch the user";
    };

    $scope.onUserClick = function(user) {
      console.log(user);
      $location.path("user/" + user.login);
    };

    $scope.reponame = $routeParams.repo;
    $scope.username = $routeParams.username;
    github.getRepoDetails($scope.reponame, $scope.username).then(onRepoComplete, onError);

  };

  app.controller("RepoController", RepoController);

}());