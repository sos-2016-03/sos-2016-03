var myApp = angular.module("BirthListApp",[]);

myApp.controller('AppCtrl',['$scope','$http',function($scope,$http){
	console.log("Controller initialized");

	var refresh = function (){
		$http.get('../../../api/v1/spain-births?apikey=read').success(function (births){
			console.log('Data received successfully');
			$scope.birthlist = births;
			$scope.myValue=false;
		});
	}


	refresh();

	$scope.addBirth = function(){
		console.log("Inserting birth...");
		$http.post('../../../api/v1/spain-births?apikey=write',$scope.birth).then(function successCallback(){
			$scope.myValue=false;
			refresh();
		}, function errorCallback(response, data, status, headers, config){
			$scope.myValue=true;
			$scope.error=response.status + " " + response.statusText;
		});
	}
	$scope.updateBirth = function(region,year){
		console.log("Updating birth...");
		$http.put('../../../api/v1/spain-births/'+region+'/'+year+'?apikey=write',$scope.birth).then(function successCallback(){
			$scope.myValue=false;
			refresh();
		},function errorCallback(response, data, status, headers, config){
			$scope.myValue=true;
			$scope.error=response.status + " " + response.statusText;
		});
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
	$scope.search = function(region,year,limit,offset,from,to){
		//búsqueda de región
		if(region!=undefined && year==undefined && limit==undefined && offset==undefined && from==undefined && to==undefined){
		$http.get('../../../api/v1/spain-births/'+region+'?apikey=read').then(function successCallback(response){
			console.log('Data received successfully');
			$scope.myValue=false;
			$scope.birthlist = response.data;
		},function errorCallback(response, data, status, headers, config){
			$scope.myValue=true;
			$scope.birthlist = [];
			$scope.error=response.status + " " + response.statusText;
		});				
		}
		//búsqueda de región y límite		
		else if(region!=undefined && limit!=undefined && year==undefined && from==undefined && to==undefined && offset==undefined){
		$http.get('../../../api/v1/spain-births/'+region+'?apikey=read&limit='+limit).then(function successCallback(response){
			console.log('Data received successfully');
			$scope.myValue=false;
			$scope.birthlist = response.data;
		},function errorCallback(response, data, status, headers, config){
			$scope.myValue=true;
			$scope.birthlist = [];
			$scope.error=response.status + " " + response.statusText;
		});				
		}
		//búsqueda de región y from		
		else if(region!=undefined && from!=undefined && year==undefined && limit==undefined && to==undefined && offset==undefined){
		$http.get('../../../api/v1/spain-births/'+region+'?apikey=read&from='+from).then(function successCallback(response){
			console.log('Data received successfully');
			$scope.myValue=false;
			$scope.birthlist = response.data;
		},function errorCallback(response, data, status, headers, config){
			$scope.myValue=true;
			$scope.birthlist = [];
			$scope.error=response.status + " " + response.statusText;
		});				
		}
		//búsqueda de región, limite y from		
		else if(region!=undefined && from!=undefined && year==undefined && limit!=undefined && to==undefined && offset==undefined){
		$http.get('../../../api/v1/spain-births/'+region+'?apikey=read&from='+from+'&limit='+limit).then(function successCallback(response){
			console.log('Data received successfully');
			$scope.myValue=false;
			$scope.birthlist = response.data;
		},function errorCallback(response, data, status, headers, config){
			$scope.myValue=true;
			$scope.birthlist = [];
			$scope.error=response.status + " " + response.statusText;
		});				
		}		
		//búsqueda de región y to
		else if(region!=undefined && to!=undefined && year==undefined && from==undefined && limit==undefined && offset==undefined){
		$http.get('../../../api/v1/spain-births/'+region+'?apikey=read&to='+to).then(function successCallback(response){
			console.log('Data received successfully');
			$scope.myValue=false;
			$scope.birthlist = response.data;
		},function errorCallback(response, data, status, headers, config){
			$scope.myValue=true;
			$scope.birthlist = [];
			$scope.error=response.status + " " + response.statusText;
		});				
		}
		//búsqueda de región, to y limit
		else if(region!=undefined && to!=undefined && year==undefined && from==undefined && limit!=undefined && offset==undefined){
		$http.get('../../../api/v1/spain-births/'+region+'?apikey=read&to='+to+'&limit='+limit).then(function successCallback(response){
			console.log('Data received successfully');
			$scope.myValue=false;
			$scope.birthlist = response.data;
		},function errorCallback(response, data, status, headers, config){
			$scope.myValue=true;
			$scope.birthlist = [];
			$scope.error=response.status + " " + response.statusText;
		});				
		}
		//búsqueda de región, from y to		
		else if(region!=undefined && from!=undefined && to!=undefined && limit==undefined && year==undefined && offset==undefined){
		$http.get('../../../api/v1/spain-births/'+region+'?apikey=read&from='+from+'&to='+to).then(function successCallback(response){
			console.log('Data received successfully');
			$scope.myValue=false;
			$scope.birthlist = response.data;
		},function errorCallback(response, data, status, headers, config){
			$scope.myValue=true;
			$scope.birthlist = [];
			$scope.error=response.status + " " + response.statusText;
		});				
		}
		//búsqueda de región, from, to y limit
		else if(region!=undefined && from!=undefined && to!=undefined && limit!=undefined && year==undefined && offset==undefined){
		$http.get('../../../api/v1/spain-births/'+region+'?apikey=read&from='+from+'&to='+to+'&limit='+limit).then(function successCallback(response){
			console.log('Data received successfully');
			$scope.myValue=false;
			$scope.birthlist = response.data;
		},function errorCallback(response, data, status, headers, config){
			$scope.myValue=true;
			$scope.birthlist = [];
			$scope.error=response.status + " " + response.statusText;
		});				
		}										
		//búsqueda de año
		else if(year!=undefined && region==undefined && limit==undefined && from==undefined && to==undefined && offset==undefined){
		$http.get('../../../api/v1/spain-births/'+region+'?apikey=read').then(function successCallback(response){
			console.log('Data received successfully');
			$scope.myValue=false;
			$scope.birthlist = response.data;
		},function errorCallback(response, data, status, headers, config){
			$scope.myValue=true;
			$scope.birthlist = [];
			$scope.error=response.status + " " + response.statusText;
		});				
		}
		//búsqueda de año y límite		
		else if(year!=undefined && limit!=undefined && region==undefined && from==undefined && to==undefined && offset==undefined){
		$http.get('../../../api/v1/spain-births/'+region+'?apikey=read&limit='+limit).then(function successCallback(response){
			console.log('Data received successfully');
			$scope.myValue=false;
			$scope.birthlist = response.data;
		},function errorCallback(response, data, status, headers, config){
			$scope.myValue=true;
			$scope.birthlist = [];
			$scope.error=response.status + " " + response.statusText;
		});				
		}
		//búsqueda de año y from		
		else if(year!=undefined && from!=undefined && region==undefined && limit==undefined && to==undefined && offset==undefined){
		$http.get('../../../api/v1/spain-births/'+region+'?apikey=read&from='+from).then(function successCallback(response){
			console.log('Data received successfully');
			$scope.myValue=false;
			$scope.birthlist = response.data;
		},function errorCallback(response, data, status, headers, config){
			$scope.myValue=true;
			$scope.birthlist = [];
			$scope.error=response.status + " " + response.statusText;
		});				
		}
		//búsqueda de año, from y limit	
		else if(year!=undefined && from!=undefined && region==undefined && limit!=undefined && to==undefined && offset==undefined){
		$http.get('../../../api/v1/spain-births/'+region+'?apikey=read&from='+from+'&limit='+limit).then(function successCallback(response){
			console.log('Data received successfully');
			$scope.myValue=false;
			$scope.birthlist = response.data;
		},function errorCallback(response, data, status, headers, config){
			$scope.myValue=true;
			$scope.birthlist = [];
			$scope.error=response.status + " " + response.statusText;
		});				
		}		
		//búsqueda de año y to
		else if(year!=undefined && to!=undefined && region==undefined && from==undefined && limit==undefined && offset==undefined){
		$http.get('../../../api/v1/spain-births/'+region+'?apikey=read&to='+to).then(function successCallback(response){
			console.log('Data received successfully');
			$scope.myValue=false;
			$scope.birthlist = response.data;
		},function errorCallback(response, data, status, headers, config){
			$scope.myValue=true;
			$scope.birthlist = [];
			$scope.error=response.status + " " + response.statusText;
		});				
		}
		//búsqueda de año, to y limit
		else if(year!=undefined && to!=undefined && region==undefined && from==undefined && limit!=undefined && offset==undefined){
		$http.get('../../../api/v1/spain-births/'+region+'?apikey=read&to='+to+'&limit='+limit).then(function successCallback(response){
			console.log('Data received successfully');
			$scope.myValue=false;
			$scope.birthlist = response.data;
		},function errorCallback(response, data, status, headers, config){
			$scope.myValue=true;
			$scope.birthlist = [];
			$scope.error=response.status + " " + response.statusText;
		});				
		}		
		//búsqueda de año, from y to		
		else if(year!=undefined && from!=undefined && to!=undefined && limit==undefined && region==undefined && offset==undefined){
		$http.get('../../../api/v1/spain-births/'+region+'?apikey=read&from='+from+'&to='+to).then(function successCallback(response){
			console.log('Data received successfully');
			$scope.myValue=false;
			$scope.birthlist = response.data;
		},function errorCallback(response, data, status, headers, config){
			$scope.myValue=true;
			$scope.birthlist = [];
			$scope.error=response.status + " " + response.statusText;
		});				
		}
		//búsqueda de año, from, to y limit		
		else if(year!=undefined && from!=undefined && to!=undefined && limit!=undefined && region==undefined && offset==undefined){
		$http.get('../../../api/v1/spain-births/'+region+'?apikey=read&from='+from+'&to='+to+'&limit='+limit).then(function successCallback(response){
			console.log('Data received successfully');
			$scope.myValue=false;
			$scope.birthlist = response.data;
		},function errorCallback(response, data, status, headers, config){
			$scope.myValue=true;
			$scope.birthlist = [];
			$scope.error=response.status + " " + response.statusText;
		});				
		}		
		//búsqueda de región y año
		else if(region!=undefined && year!=undefined && limit==undefined && from==undefined && to==undefined && offset==undefined){
		$http.get('../../../api/v1/spain-births/'+region+'/'+year+'?apikey=read').then(function successCallback(response){
			console.log('Data received successfully');
			$scope.myValue=false;
			$scope.birthlist = response.data;
		},function errorCallback(response, data, status, headers, config){
			$scope.myValue=true;
			$scope.birthlist = [];
			$scope.error=response.status + " " + response.statusText;
		});				
		}
		//búsqueda de región, año, límite
		else if(region!=undefined && year!=undefined && limit!=undefined && from==undefined && to==undefined && offset==undefined){
		$http.get('../../../api/v1/spain-births/'+region+'/'+year+'?apikey=read&limit='+limit).then(function successCallback(response){
			console.log('Data received successfully');
			$scope.myValue=false;
			$scope.birthlist = response.data;
		},function errorCallback(response, data, status, headers, config){
			$scope.myValue=true;
			$scope.birthlist = [];
			$scope.error=response.status + " " + response.statusText;
		});				
		}
		//búsqueda de región, año, from
		else if(region!=undefined && year!=undefined && limit==undefined && from!=undefined && to==undefined && offset==undefined){
		$http.get('../../../api/v1/spain-births/'+region+'/'+year+'?apikey=read&from='+from).then(function successCallback(response){
			console.log('Data received successfully');
			$scope.myValue=false;
			$scope.birthlist = response.data;
		},function errorCallback(response, data, status, headers, config){
			$scope.myValue=true;
			$scope.birthlist = [];
			$scope.error=response.status + " " + response.statusText;
		});				
		}	
		//búsqueda de región, año, from y limit
		else if(region!=undefined && year!=undefined && limit!=undefined && from!=undefined && to==undefined && offset==undefined){
		$http.get('../../../api/v1/spain-births/'+region+'/'+year+'?apikey=read&from='+from+'&limit='+limit).then(function successCallback(response){
			console.log('Data received successfully');
			$scope.myValue=false;
			$scope.birthlist = response.data;
		},function errorCallback(response, data, status, headers, config){
			$scope.myValue=true;
			$scope.birthlist = [];
			$scope.error=response.status + " " + response.statusText;
		});				
		}
		//búsqueda de región, año, to
		else if(region!=undefined && year!=undefined && limit==undefined && from==undefined && to!=undefined && offset==undefined){
		$http.get('../../../api/v1/spain-births/'+region+'/'+year+'?apikey=read&to='+to).then(function successCallback(response){
			console.log('Data received successfully');
			$scope.myValue=false;
			$scope.birthlist = response.data;
		},function errorCallback(response, data, status, headers, config){
			$scope.myValue=true;
			$scope.birthlist = [];
			$scope.error=response.status + " " + response.statusText;
		});				
		}
		//búsqueda de región, año, to y limit
		else if(region!=undefined && year!=undefined && limit!=undefined && from==undefined && to!=undefined && offset==undefined){
		$http.get('../../../api/v1/spain-births/'+region+'/'+year+'?apikey=read&to='+to+'&limit='+limit).then(function successCallback(response){
			console.log('Data received successfully');
			$scope.myValue=false;
			$scope.birthlist = response.data;
		},function errorCallback(response, data, status, headers, config){
			$scope.myValue=true;
			$scope.birthlist = [];
			$scope.error=response.status + " " + response.statusText;
		});				
		}
		//búsqueda de región, año, from y to
		else if(region!=undefined && year!=undefined && limit==undefined && from!=undefined && to!=undefined && offset==undefined){
		$http.get('../../../api/v1/spain-births/'+region+'/'+year+'?apikey=read&from='+from+'&to='+to).then(function successCallback(response){
			console.log('Data received successfully');
			$scope.myValue=false;
			$scope.birthlist = response.data;
		},function errorCallback(response, data, status, headers, config){
			$scope.myValue=true;
			$scope.birthlist = [];
			$scope.error=response.status + " " + response.statusText;
		});				
		}													
		//búsqueda de región, año, from, to y limit
		else if(region!=undefined && year!=undefined && limit!=undefined && from!=undefined && to!=undefined && offset==undefined){
		$http.get('../../../api/v1/spain-births/'+region+'/'+year+'?apikey=read&from='+from+'&to='+to+'&limit='+limit).then(function successCallback(response){
			console.log('Data received successfully');
			$scope.myValue=false;
			$scope.birthlist = response.data;
		},function errorCallback(response, data, status, headers, config){
			$scope.myValue=true;
			$scope.birthlist = [];
			$scope.error=response.status + " " + response.statusText;
		});				
		}															
		//búsqueda con límite		
		else if(limit!=undefined && region==undefined && year==undefined && from==undefined && to==undefined && offset==undefined){
		$http.get('../../../api/v1/spain-births?apikey=read&limit='+limit).then(function successCallback(response){
			console.log('Data received successfully');
			$scope.myValue=false;
			$scope.birthlist = response.data;
		},function errorCallback(response, data, status, headers, config){
			$scope.myValue=true;
			$scope.birthlist = [];
			$scope.error=response.status + " " + response.statusText;
		});				
		}
		//búsqueda con límite y from
		else if(limit!=undefined && region==undefined && year==undefined && from!=undefined && to==undefined && offset==undefined){
		$http.get('../../../api/v1/spain-births?apikey=read&from='+from+'&limit='+limit).then(function successCallback(response){
			console.log('Data received successfully');
			$scope.myValue=false;
			$scope.birthlist = response.data;
		},function errorCallback(response, data, status, headers, config){
			$scope.myValue=true;
			$scope.birthlist = [];
			$scope.error=response.status + " " + response.statusText;
		});				
		}
		//búsqueda con límite y to
		else if(limit!=undefined && region==undefined && year==undefined && from==undefined && to!=undefined && offset==undefined){
		$http.get('../../../api/v1/spain-births?apikey=read&to='+to+'&limit='+limit).then(function successCallback(response){
			console.log('Data received successfully');
			$scope.myValue=false;
			$scope.birthlist = response.data;
		},function errorCallback(response, data, status, headers, config){
			$scope.myValue=true;
			$scope.birthlist = [];
			$scope.error=response.status + " " + response.statusText;
		});				
		}
		//búsqueda con límite, from y to
		else if(limit!=undefined && region==undefined && year==undefined && from!=undefined && to!=undefined && offset==undefined){
		$http.get('../../../api/v1/spain-births?apikey=read&from='+from+'&to='+to+'&limit='+limit).then(function successCallback(response){
			console.log('Data received successfully');
			$scope.myValue=false;
			$scope.birthlist = response.data;
		},function errorCallback(response, data, status, headers, config){
			$scope.myValue=true;
			$scope.birthlist = [];
			$scope.error=response.status + " " + response.statusText;
		});				
		}						
		//búsqueda con from
		else if(from!=undefined && region==undefined && year==undefined && limit==undefined && to==undefined && offset==undefined){
		$http.get('../../../api/v1/spain-births?apikey=read&from='+from).then(function successCallback(response){
			console.log('Data received successfully');
			$scope.myValue=false;
			$scope.birthlist = response.data;
		},function errorCallback(response, data, status, headers, config){
			$scope.myValue=true;
			$scope.birthlist = [];
			$scope.error=response.status + " " + response.statusText;
		});				
		}
		//búsqueda con to
		else if(limit==undefined && region==undefined && year==undefined && from==undefined && to!=undefined && offset==undefined){
		$http.get('../../../api/v1/spain-births?apikey=read&to='+to).then(function successCallback(response){
			console.log('Data received successfully');
			$scope.myValue=false;
			$scope.birthlist = response.data;
		},function errorCallback(response, data, status, headers, config){
			$scope.myValue=true;
			$scope.birthlist = [];
			$scope.error=response.status + " " + response.statusText;
		});				
		}
		//búsqueda con from y to
		else if(limit==undefined && region==undefined && year==undefined && from!=undefined && to!=undefined && offset==undefined){
		$http.get('../../../api/v1/spain-births?apikey=read&from='+from+'&to='+to).then(function successCallback(response){
			console.log('Data received successfully');
			$scope.myValue=false;
			$scope.birthlist = response.data;
		},function errorCallback(response, data, status, headers, config){
			$scope.myValue=true;
			$scope.birthlist = [];
			$scope.error=response.status + " " + response.statusText;
		});				
		}	
		//búsqueda con offset
		else if(limit==undefined && region==undefined && year==undefined && from==undefined && to==undefined && offset!=undefined){
		$http.get('../../../api/v1/spain-births?apikey=read&offset='+offset).then(function successCallback(response){
			console.log('Data received successfully');
			$scope.myValue=false;
			$scope.birthlist = response.data;
		},function errorCallback(response, data, status, headers, config){
			$scope.myValue=true;
			$scope.birthlist = [];
			$scope.error=response.status + " " + response.statusText;
		});				
		}				
		//no hay búsqueda
		else{
			$http.get('../../../api/v1/spain-births?apikey=read').success(function (response){			
				$scope.birthlist=response.data;
			});
		}	
	}		
	$scope.getAll = function(){
		refresh();
	}
	
}]);