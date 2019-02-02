var App = angular.module('app', [ 'ui.router' ]);

App
		.config(
				[ '$stateProvider', '$urlRouterProvider',
						function($stateProvider, $urlRouterProvider) {
					 
					$urlRouterProvider.otherwise("/login")
					 
							$stateProvider.state('login', { // state for login
								url : "/login",
								templateUrl : "views/login.html",
								controller : "LoginController"
							}).state('dashboard', { // state for dashboard
								url : "/dashboard",
								templateUrl : "views/dashboard.html",
								controller : "DashboardController"
							}).state('meetinginfo', {
								url : "/meetinfo/:id",
								templateUrl : "views/meetinfo.html",
								controller : "meetinfocontroller"
							}).state('signup', { // state for signup
								url : "/signup",
								templateUrl : "views/signup.html",
								controller : "signcontroller"
							}).state('allusers', { // state for login
								url : "/allusers",
								templateUrl : "views/allusers.html",
								controller : "AllUserController"
							}).state('userprofile',{
								url : "/userprofile",
								templateUrl : "views/userprofile.html",
								controller : "userprofilecontroller"
							}).state('contactus',{
								url : "/contactus",
								templateUrl : "views/contactus.html",
								controller : "contactuscontroller"
							})

						} ])
		.controller(
				"signcontroller",
				function($window, $rootScope, $scope, $location, $http) {
					
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
							$scope.addcredential($scope.newuser.id);

						}

						function _error1(response) {
							// document.getElementById("business-button-fail").style.display="block";
							// document.getElementById("business-button-sending").style.display="none";
							alert("somethng went wrong");
						}

					}, $rootScope.changeit = function() {
						alert("");
					}

							$scope.addcredential = function(uid) {

								$http(
										{

											method : "POST",
											url : "http://localhost:1234/rest/addcreden/"
													+ uid,
											data : angular
													.toJson($scope.credential),
											headers : {
												'Content-Type' : 'application/json'
											}
										}).then(_success1, _error1);
								function _success1(response) {
									alert("Sign Up Successfull.Please Login To Continue");
									$location.url("/login");

								}

								function _error1(response) {
									// document.getElementById("business-button-fail").style.display="block";
									// document.getElementById("business-button-sending").style.display="none";
									alert("somethng went wrong");
								}

							}, $scope.login = function() {
								$location.url("/login");

							}

				})
		.controller(
				"LoginController",
				function($window, $rootScope, $scope,$location,$http) {
					
					$rootScope.display = "true",

					$scope.signup = function() {
						$location.url("/signup");

					},

					$scope.checkuser = function() {

						$http({
							method : "GET",
							url : "http://localhost:1234/rest/login",
							headers : {
								"username" : $scope.username,
								"password" : $scope.password
							}
						}).then(_success, _error);

						function _success(response) {
							$rootScope.user = response.data;
							alert("Login Successfull");
							console.log($rootScope.user);
							$window.localStorage.setItem("user", angular
									.toJson($scope.user));

							$window.location.href = "#!/dashboard";

						}
						function _error(response) {
							// console.log($scope.user);
							$scope.msg = "Invalid Username/Password";
						}

					}
				})
		.controller(
				"DashboardController",
				function($scope, $window, $rootScope, $http,$location) {
					alert("home");
					document.getElementById("one").style.display = "block";
							$scope.m = {};
					$rootScope.user = JSON.parse($window.localStorage
							.getItem("user"));
							$rootScope.allmeetsdiv = true;
							$rootScope.updatediv = false;
							$rootScope.showcreatemeet = true;
							$rootScope.showaddtask = false;

							
							$http({
								method : "GET",
								url : "http://localhost:1234/rest/meetings",
								headers : {
									'Content-Type' : 'application/json'
								}

							}).then(_success, _error);

					function _success(response) {
						$scope.meeting = response.data;
						console.log($scope.meeting);
					}
					function _error(response) {
						
						$scope.msg = "Unable to load Meetings Data";
					}
					;
					

							$scope.addmeet = function() {

								$http(
										{

											method : "POST",
											url : "http://localhost:1234/rest/meeting/"
													+ $scope.user.id,
											data : angular.toJson($scope.m),
											headers : {
												'Content-Type' : 'application/json'
											}
										}).then(_success1, _error1);
								function _success1(response) {
									$scope.newmeet = response.data;
									$scope.meeting.push($scope.newmeet);
									document.getElementById("meetcreate").style.display="none";
									document.getElementById("aftercreate").style.display="block";
									document.getElementById("link").style.display="block";
									$scope.m={};
								}

								function _error1(response) {
									// document.getElementById("business-button-fail").style.display="block";
									// document.getElementById("business-button-sending").style.display="none";
									alert("somethng went wrong");
								}

							},
							
							$scope.changeit=function(){
								document.getElementById("meetcreate").style.display="block";
								document.getElementById("aftercreate").style.display="none";
								document.getElementById("link").style.display="none";
								
							},
							
							$scope.deletemeet = function(id) {
								var really = confirm("Are you sure you want to delete the meet?");
								if (really) {
									$http(
											{
												method : "DELETE",
												url : "http://localhost:1234/rest/meeting/"
														+ id,
												headers : {
													'Content-Type' : 'application/json'
												}
											}).then(_success2, _error2);
									function _success2(response) {
										for (var i = 0; i < $scope.meeting.length; i++) { // 3
											if (!($scope.meeting[i] == undefined))
												if ($scope.meeting[i].id == id) {
													delete $scope.meeting[i];
													$scope.meeting.splice(i, 1);
												}
										}

									}
									function _error2(response) {
										// document.getElementById("business-button-fail").style.display="block";
										// document.getElementById("business-button-sending").style.display="none";

										alert("somethng went wrong");
									}
								}

							},
							$scope.updatemeet = function(meet) {

								$rootScope.allmeetsdiv = false;
								$rootScope.updatediv = true;
								$scope.nm = meet;

							},
							$scope.confirmupdate = function(newmeet) {
								var value = confirm("Are you sure you want to update this meet");
								$scope.upmeet = newmeet;
								if (value) {
									$http(
											{

												method : "PUT",
												url : "http://localhost:1234/rest/meeting/"
														+ $scope.upmeet.id,
												data : angular
														.toJson($scope.upmeet),
												headers : {
													'Content-Type' : 'application/json'
												}
											}).then(_success1, _error1);
									function _success1(response) {
										$scope.allmeetsdiv = true;
										$scope.updatediv = false;
										alert("Update Successfull");

									}

									function _error1(response) {
										// document.getElementById("business-button-fail").style.display="block";
										// document.getElementById("business-button-sending").style.display="none";
										alert("somethng went wrong");
									}
								}

							},
							$scope.addtask = function(meet) {
								alert("hello");
								
								$scope.showcreatemeet = false;
								$scope.showaddtask = true;
								$rootScope.ameet = meet;

							},
							$scope.posttask = function(task, ameet) {
								
								$scope.ameet = ameet;
								$rootScope.task = task;
								$http({

									method : "POST",
									url : "http://localhost:1234/rest/addtask",
									data : angular.toJson($rootScope.task),
									headers : {
										'Content-Type' : 'application/json'
									}
								}).then(_success1, _error1);
								function _success1(response) {
									$rootScope.task = response.data;
									alert("Task Has Been Successfully Created");
									alert("Linking The Task With Meeting Having Title "
											+ $scope.ameet.title);
									linktask($scope.ameet, $scope.task.id);
									

								}

								function _error1(response) {
									// document.getElementById("business-button-fail").style.display="block";
									// document.getElementById("business-button-sending").style.display="none";
									alert("somethng went wrong");
								}

							}

					var linktask = function(meet, tid) {
						
						

						$http(
								{

									method : "POST",
									url : "http://localhost:1234/rest/assigntasktomeeting/"
											+ meet.id + "/" + tid,

									headers : {
										'Content-Type' : 'application/json'
									}
								}).then(_success1, _error1);
						function _success1(response) {
                           
							alert("Task Linked Successfully");
							document.getElementById("addedtask").style.display = "block";
							document.getElementById("addtask").style.display = "none";
							document.getElementById("addothertask").style.display = "block";
							document.getElementById("home").style.display = "block";
							document.getElementById("ta").value = "";
						
						}

						function _error1(response) {
							// document.getElementById("business-button-fail").style.display="block";
							// document.getElementById("business-button-sending").style.display="none";
							alert("somethng went wrong");
						}

					}
					
					$scope.addnewtask = function(meet) {
						
					document.getElementById("addedtask").style.display = "none";
						document.getElementById("addtask").style.display = "block";
						document.getElementById("addothertask").style.display = "none";
						 document.getElementById("ta").value = "";
						 $scope.showcreatemeet = false;
						 $scope.showaddtask = true;
						
						$rootScope.ameet = meet;

					}
					$scope.gohome=function(){
						$scope.showaddtask=false;
						$scope.showcreatemeet = true;
						 document.getElementById("ta").value = "";
						
					};
$rootScope.logout=function(){
						
						alert("Logout Successfull");
						$window.localStorage.setItem("user", angular
								.toJson(null));
						$window.location.reload();
						$location.url("/login");
					}
					

				})
		.controller(
				"meetinfocontroller",
				function($stateParams, $window, $rootScope, $scope, $location,
						$http) {
					document.getElementById("one").style.display = "block";
					$rootScope.user = JSON.parse($window.localStorage
							.getItem("user"));
					$scope.mid = $stateParams.id;
					$rootScope.logout=function(){
						
						alert("Logout Successfull");
						$window.localStorage.setItem("user", angular
								.toJson(null));
						$window.location.reload();
						$location.url("/login");
					}
					$http(
							{
								method : "GET",
								url : "http://localhost:1234/rest/meeting/"
										+ $scope.mid,
								headers : {
									'Content-Type' : 'application/json'
								}

							}).then(_success, _error);

					function _success(response) {
						$scope.meettodisplay = response.data;

					}
					function _error(response) {
						// console.log($scope.user);
						$scope.msg = "Unable to load Meetings Data";
					}

							$scope.deletetask = function(tid) {
								var really = confirm("Are you sure you want to delete the task?");
								if (really) {
									$http(
											{
												method : "DELETE",
												url : "http://localhost:1234/rest/deltask/"
														+ tid,
												headers : {
													'Content-Type' : 'application/json'
												}
											}).then(_success2, _error2);
									function _success2(response) {
										for (var i = 0; i < $scope.meettodisplay.tasks.length; i++) { // 3
											if (!($scope.meettodisplay.tasks[i] == undefined))
												if ($scope.meettodisplay.tasks[i].id == tid) {
													delete $scope.meettodisplay.tasks[i];
													$scope.meettodisplay.tasks
															.splice(i, 1);
												}
										}

									}
									function _error2(response) {
										// document.getElementById("business-button-fail").style.display="block";
										// document.getElementById("business-button-sending").style.display="none";

										alert("somethng went wrong");
									}
								}

							},
							$scope.updatetask = function(task) {

								$scope.uptask = task;
								var value = confirm("Are you sure you want to update this task");

								if (value) {
									$http(
											{

												method : "PUT",
												url : "http://localhost:1234/rest/updatetask/"
														+ $scope.uptask.id,
												data : angular
														.toJson($scope.uptask),
												headers : {
													'Content-Type' : 'application/json'
												}
											}).then(_success1, _error1);
									function _success1(response) {

										alert("Update Successfull");

									}

									function _error1(response) {
										// document.getElementById("business-button-fail").style.display="block";
										// document.getElementById("business-button-sending").style.display="none";
										alert("somethng went wrong");
									}
								}

							},
							$scope.printDiv = function(divName) {
								var printContents = document
										.getElementById(divName).innerHTML;
								var popupWin = window.open('', '_blank',
										'width=300,height=300');
								popupWin.document.open();
								popupWin.document
										.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">'
												+ printContents
												+ '</body></html>');
								popupWin.document.close();
							}

				}).controller("AllUserController",
				function($window, $rootScope, $scope, $location, $http) {
					document.getElementById("one").style.display = "block",
					$rootScope.user = JSON.parse($window.localStorage
							.getItem("user")),
				    $scope.itsu=function(name){
						if(name==$rootScope.user.name){
							return true;
						}
						return false;
						
					}
					$rootScope.logout=function(){
						
						alert("Logout Successfull");
						$window.localStorage.setItem("user", angular
								.toJson(null));
						$window.location.reload();
						$location.url("/login");
					}
					,
					$http({

						method : "GET",

						url : "http://localhost:1234/rest/users",

					}).then(_success, _error);

					function _success(response) {

						$scope.users = response.data;
						

					}

					function _error(response) {

							
						$scope.error_msg = "Problem in loading data. please check your internet connection";

					}
					
					
				}).controller(
						"userprofilecontroller",
						function($window, $rootScope, $scope, $location, $http) {
							document.getElementById("one").style.display = "block";
							$scope.user = JSON.parse($window.localStorage
									.getItem("user"))		;
	
							$rootScope.logout=function(){
								
								alert("Logout Successfull");
								$window.localStorage.setItem("user", angular
										.toJson(null));
								$window.location.reload();
								$location.url("/login");
							}
									
								$scope.updateuser=function(){
								
								
								$http({

										method : "PUT",

										url : "http://localhost:1234/rest/user/"+$scope.user.id,
										data : angular
										.toJson($scope.user),
								headers : {
									'Content-Type' : 'application/json'
								}

									}).then(_success, _error);

									function _success(response) {

										alert("update successfully");
										$scope.user = response.data;
										$window.localStorage.setItem("user", angular
												.toJson($scope.user));
											
									}

									function _error(response) {

											
										$scope.error_msg = "Problem in loading data. please check your internet connection";

									}
								}
						
							
							
						}).controller(
								"contactuscontroller",
								function($window, $rootScope, $scope, $location, $http) {
									alert("im here");
									document.getElementById("one").style.display = "block";
									$rootScope.user = JSON.parse($window.localStorage
											.getItem("user"))	;
								$scope.loader=function(){
									document.getElementById("sender").style.display = "none";
									document.getElementById("loader").style.display = "block";
									$scope.sendmessage();
								}
									
								$scope.sendmessage=function(){
									$http(
											{

												method : "POST",
												url : "http://localhost:1234/rest/sendmail",
												data : angular
												.toJson($rootScope.user),	

												headers : {
													'Content-Type' : 'application/json',
													'fromAddress' : $rootScope.user.email,
													'subject' : 'feedback from '+'name:'+$rootScope.user.name+' phno: '+$scope.phno,
													'content':$scope.content
													
												}
											}).then(_success1, _error1);
									
									function _success1(response) {
										
									alert("Thankyou for your feedback");

									document.getElementById("sender").style.display = "block";
									document.getElementById("loader").style.display = "none";	
									}

									function _error1(response) {
										alert("oops");
									}
									
								}
								$rootScope.logout=function(){
										
										alert("Logout Successfull");
										$window.localStorage.setItem("user", angular
												.toJson(null));
										$window.location.reload();
										$location.url("/login");
									}
									
								});
