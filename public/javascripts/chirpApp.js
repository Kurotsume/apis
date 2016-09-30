var app = angular.module('chirpApp', ['ngRoute', 'ngResource']).run(function($http, $rootScope){
	//RootScopes can be accessed from anywhere
	$rootScope.authenticated = false;
	$rootScope.current_user = "Guest";

	$rootScope.signout = function(){
		$http.get("/auth/signout").success(function(){
			return $location.path("/");
		});
		$rootScope.authenticated = false;
		$rootScope.current_user = "Guest";
	}
});

app.config(function($routeProvider){
  $routeProvider
    //the timeline display
    .when('/', {
      templateUrl: 'main.html',
      controller: 'mainController'
    })
    //the login display
    .when('/login', {
      templateUrl: 'login.html',
      controller: 'authController'
    })
    //the signup display
    .when('/register', {
      templateUrl: 'register.html',
      controller: 'authController'
    });
});

//This works like the factory programmin model
//accessible from any controller as son as you include it as a dependency
//Using this factory's pretty awesome because it's reusable, and you access
//all posts from anywhere you want, only by requiring it on the controller
app.factory('postService', function($resource){
	return $resource("/api/posts/:id");
});

app.controller('mainController', function($scope, $rootScope, $http,  postService){
	$scope.posts = postService.query();
	$scope.newPost = { created_by: '', text: '', created_at: ''};

	$scope.post = function(){
		$scope.newPost.created_at = Date.now();
		$scope.newPost.username = $rootScope.current_user;

		var parameters = JSON.stringify({username: $scope.newPost.username, text: $scope.newPost.text});

		postService.save($scope.newPost, function(){
			$scope.posts = postService.query();
			$scope.newPost = { created_by: '', text: '', created_at: ''};
		});
	};
});

app.controller('authController', function($scope, $rootScope, $http, $location){
	$scope.users = [];
	$scope.user = { username: '', password: ''};
	$scope.error_message = '';

	$scope.register = function (){
		$http.post("/auth/signup", $scope.user).success(function(data){
			if(data.state === "success"){
				$rootScope.authenticated = true;
				$rootScope.current_user = data.user.username;
				$location.path("/");
			} else {
				$scope.error_message = data.message;
			}



		});
	}

	$scope.login = function(){
		//The success function is called only if the server responds with a 
		//success state. which is also called in the auth success api
		$http.post("/auth/login", $scope.user).success(function(data){
			if(data.state === "success"){
				$rootScope.authenticated = true;
				//Passed back from the authenticate, success api
				//This is res...req.user
				$rootScope.current_user = data.user.username;
				$location.path("/");
			} else {
				$scope.error_message = data.message
			}
			
		});
	}
});