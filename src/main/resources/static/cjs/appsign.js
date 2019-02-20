var App = angular.module('appsign', [])
.controller('signup', function($scope, $http,$location) {
    $scope.name="asasas";
  
    $scope.addnewuser = function() {
		$http({

			method : "POST",
			url : "http://localhost:1234/rest/user",
			data : angular.toJson($scope.newuser),
			headers : {
				'Content-Type' : 'application/json'
			}
		}).then(_success1, _error1);
		function _success1(response) {
			$scope.newuser = response.data;
			alert("account created. setting up your credentials");
			$scope.addcredential($scope.newuser.id);

		}

		function _error1(response) {
			// document.getElementById("business-button-fail").style.display="block";
			// document.getElementById("business-button-sending").style.display="none";
			alert("somethng went wrong");
		}

	}

			$scope.addcredential = function(uid) {
alert($scope.credential+uid);

				$http(
						{

							method : "POST",
							url : "http://localhost:1234/rest/addcreden/"+uid,
							data : angular.toJson($scope.credential),
							headers : {
								'Content-Type' : 'application/json'
							}
						}).then(_success1, _error1);
				function _success1(response) {
					alert("Sign Up Successfull.Please Login To Continue");
					window.location = "http://localhost:1234/login";

				}

				function _error1(response) {
					// document.getElementById("business-button-fail").style.display="block";
					// document.getElementById("business-button-sending").style.display="none";
					alert("somethng went wrong");
				}

			}
});


