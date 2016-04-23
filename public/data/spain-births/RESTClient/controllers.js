var myApp = angular.module("BirthListApp",[]);

myApp.controller('AppCtrl',['$scope','$http',function($scope,$http){
	console.log("Controller initialized");

	var refresh = function (){
		$http.get('../../../api/v1/spain-births?apikey=read').success(function (births){
			console.log('Data received successfully');
			$scope.birthlist = births;
		});
	}

	refresh();

	$scope.addBirth = function(){
		console.log("Inserting birth...");
		$http.post('../../../api/v1/spain-births?apikey=write',$scope.birth);
		refresh();
	}
	$scope.updateBirth = function(region,year){
		console.log("Updating birth...");
		$http.put('../../../api/v1/spain-births/'+region+'/'+year+'?apikey=write',$scope.birth);
		refresh();
	}	

	$scope.deleteBirth = function(region,year){
		console.log("Deleting birth with "+region+" "+year);
		$http.delete('../../../api/v1/spain-births/'+region+'/'+year+'?apikey=write');
		refresh();
	}
	$scope.deleteAll = function(region,year){
		console.log("Deleting births");
		$http.delete('../../../api/v1/spain-births?apikey=write');
		refresh();
	}	
	$scope.loadBirth = function(){
		console.log("Loading initial list");
		$http.get('../../../api/v1/spain-births/loadInitialData?apikey=write');
		refresh();
	}	
	$scope.search = function(region,year){
		if(region!="" && (year=="" || year==null)){
		$http.get('../../../api/v1/spain-births/'+region+'?apikey=read').success(function (birth){
			console.log('Data received successfully');
			$scope.birthlist = birth;
		});			
		}
		else if(year!="" && (region=="" || region==null)){
		$http.get('../../../api/v1/spain-births/'+year+'?apikey=read').success(function (birth){
			console.log('Data received successfully');
			$scope.birthlist = birth;
		});
		}
		else if(region!="" && year!=""){
		$http.get('../../../api/v1/spain-births/'+region+'/'+year+'?apikey=read').success(function (birth){
			console.log('Data received successfully');
			$scope.birthlist = birth;
		});
		}else if((region=="" || region==null) && (year=="" || year==null)){
			refresh();
		}	
	}		
	$scope.getAll = function(){
		refresh();
	}
}]);