var app = angular.module('RestaurantApp', []);

app.controller('FoodController', ['$http', function($http){ // brought in $http as a dependency
    console.log('Food Controller has been loaded');
    var self = this;
    self.message = 'Zip zap partner!';
    self.foodArray = []; //setting an initial array

    self.newFood = {is_hot: false};


    self.getFood = function () { //$http instead of $.ajax
        $http({
            method: 'GET',
            url: '/food',

        }).then(function(response){ //.then instead of success
            console.log('response', response.data); // .data just to get the array back
            self.foodArray = response.data; //part of getting it on the dom (see foodArray in index)
        });   
    };


    self.addNewFood = function(newFood){
        $http({
            method: 'POST',
            url: '/food',
            data: newFood
        }).then(function(response){
            console.log('response', response);
            self.newFood = {is_hot: false};
            self.getFood();
            
        })
    }

    self.deleteFood = function(id){
        $http({
            method: 'DELETE',
            url: '/food/' + id,
        }).then(function(response){
            console.log('response', response);
            self.getFood();
            
        })
    }

    self.updateFood = function(id){
        $http({
            method: 'PUT',
            url: '/food/' + id,
        }).then(function(response){
            console.log('response', response);
            self.getFood();
            
        })
    }


    // self.updateFood = function(){
    //     $http({
    //         method: 'PUT',
    //         url: '/food',
    //         data:
    //     })
    // }

    self.getFood(); // have to do it down here because it does not exist until above line of code runs
  
    
    
}]);