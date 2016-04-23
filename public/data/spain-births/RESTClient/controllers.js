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
		$http.get('../../../api/v1/spain-births/loadInitialData?apikey=write').success(function(){
			refresh();
		});
	}	
	$scope.search = function(region,year,limit){
		//búsqueda de región
		if(region!=undefined && year==undefined && limit==undefined){
		$http.get('../../../api/v1/spain-births/'+region+'?apikey=read').success(function (birth){
			console.log('Data received successfully');
			$scope.birthlist = birth;
		});			
		}
		//búsqueda de año
		else if(year!=undefined && region==undefined && limit==undefined){
		$http.get('../../../api/v1/spain-births/'+year+'?apikey=read').success(function (birth){
			console.log('Data received successfully');
			$scope.birthlist = birth;
		});
		}
		//búsqueda de región y año
		else if(region!=undefined && year!=undefined && limit==undefined){
		$http.get('../../../api/v1/spain-births/'+region+'/'+year+'?apikey=read').success(function (birth){
			console.log('Data received successfully');
			$scope.birthlist = birth;
		});
		}
		//búsqueda de región y límite		
		else if(region!=undefined && limit!=undefined && year==undefined){
		$http.get('../../../api/v1/spain-births/'+region+'?apikey=read&limit='+limit).success(function (birth){
			console.log('Data received successfully');
			$scope.birthlist = birth;
		});
		}
		//búsqueda con límite		
		else if(limit!=undefined && region==undefined && year==undefined){
		$http.get('../../../api/v1/spain-births/?apikey=read&limit='+limit).success(function (birth){
			console.log('Data received successfully');
			$scope.birthlist = birth;
		});
		}		
		//búsqueda de año y límite
		else if(year!=undefined && limit!=undefined && region==undefined){
		$http.get('../../../api/v1/spain-births/'+year+'?apikey=read&limit='+limit).success(function (birth){
			console.log('Data received successfully');
			$scope.birthlist = birth;
		});
		}				
		//búsqueda de región, año y límite
		else if(region!=undefined && year!=undefined && limit!=undefined){
		$http.get('../../../api/v1/spain-births/'+region+'/'+year+'?apikey=read&limit='+limit).success(function (birth){
			console.log('Data received successfully');
			$scope.birthlist = birth;
		});
		}
		//no hay búsqueda
		else{
			$http.get('../../../api/v1/spain-births?apikey=read').success(function (births){			
				$scope.birthlist=births;
			});
		}	
	}		
	$scope.getAll = function(){
		refresh();
	}
}]);