(function() {
  var github = function($http) {
    var getUser = function(username) {
      return $http.get("https://api.github.com/users/" + username)
        .then(function(response) {
          return response.data;
        });
    };
    
    var getRepos = function(user){
      return $http.get(user.repos_url)
        .then(function(response) {
          return response.data;
        });
    };
    
    var getRepoDetails = function(repo, user) {
      return $http.get("https://api.github.com/repos/" + user + "/" + repo)
        .then(function(response) {
          return response.data;
        });
    };
    
    var getContributors = function(data){
      return $http.get(data.contributors_url)
        .then(function(response) {
          return response.data;
        });
    };
    
    return {
      getUser: getUser,
      getRepos: getRepos,
      getRepoDetails: getRepoDetails,
      getContributors: getContributors
    };
  };

  var module = angular.module("githubViewer");
  module.factory("github", github);
})();