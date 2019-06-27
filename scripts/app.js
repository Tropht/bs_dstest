var dsTestApp = angular.module('dsTestApp', []);

// //////////////
// Angular Filter
// //////////////
dsTestApp.filter('searchForClient', function(){

  return function(arr, searchClient){

    if(!searchClient){
      return arr;
    }

    var result = [];

    searchClient = searchClient.toLowerCase();

    angular.forEach(arr, function(item){
      if(
        item.name.toLowerCase().indexOf(searchClient) !== -1
        || item.username.toLowerCase().indexOf(searchClient) !== -1
        || item.email.toLowerCase().indexOf(searchClient) !== -1
        || item.website.toLowerCase().indexOf(searchClient) !== -1
        || item.phone.toLowerCase().indexOf(searchClient) !== -1
        || item.address.city.toLowerCase().indexOf(searchClient) !== -1
        || item.address.street.toLowerCase().indexOf(searchClient) !== -1
        || item.company.name.toLowerCase().indexOf(searchClient) !== -1
        )
      {
        result.push(item);
      }
    });

    return result;
  }
});

// ///////////////////
// Angular Controller
// ///////////////////
dsTestApp.controller('appCtlr', ['$scope', '$http', '$filter', function ($scope, $http, $filter, $q) {

    // Get Client Info JSON
    $scope.getData = function(){
    	$http({
	    	method: 'GET',
	        url: 'https://jsonplaceholder.typicode.com/users',
    	})
    	.then(function(clientData){
    		// console.log(clientData)
    		$scope.clientData = clientData.data;

        // console.log($scope.clientData);
    	})
    };

    $scope.getData();



    // Insert Client info into dialog
    $scope.getClientInfo = function(e){
      // console.log(e.data);
      var clientInfo = e.data;
      var clientCompany = e.data.company;
      var clientAddress = e.data.address;

      $('#clientName').val(clientInfo.name);
      $('#clientUsername').val(clientInfo.username);
      $('#clientEmail').val(clientInfo.email);
      $('#clientWebsite').val(clientInfo.website);

      $('#clientAddressStreet').val(clientAddress.street);
      $('#clientAddressSuite').val(clientAddress.suite);
      $('#clientAddressCity').val(clientAddress.city);
      $('#clientAddressZipcode').val(clientAddress.zipcode);
      openDialog(clientAddress);

      $('#clientCompanyName').val(clientCompany.name);
      $('#clientCompanyPhrase').val(clientCompany.catchPhrase);
      $('#clientCompanyBs').val(clientCompany.bs);

    };

    // Dialog Contols
    var openDialog = function(q){
      $('section').css('display','block');
      $('.sectionMain').scrollTop(0);
      $('section').animate({
        opacity: 1,
        top: "+=50"
      },500)
      $('#shade').css('display','block');
      $('#shade').animate({
        opacity: .5
      },500)

      var mapsURL = 'https://maps.google.com/maps?q=' + q.geo.lat + ',' + q.geo.lng + '&hl=es;z=14&amp;output=embed';
      $('#clientAddressGeo iframe').remove();
      $('#clientAddressGeo').append('<iframe src="' + mapsURL + '" width="100%"></iframe>');
      // console.log(mapsURL);

    };

     closeDialog = function(){
       $('section').animate({
         opacity: 0,
         top: "-=50"
       },500,function(){
         $('section').css('display','none');
       })
       $('#shade').animate({
         opacity: 0
       },500,function(){
         $('#shade').css('display','none');
       })

    }
}])
