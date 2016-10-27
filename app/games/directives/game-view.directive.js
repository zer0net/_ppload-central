angular.module('Zer0DOS').directive('gameView', ['$location',
	function($location) {

		var controller = function($scope,$element) {

			// init game view
			$scope.initGameView = function(){
				// get channels & game id from url
				var channelId = window.location.href.split('&')[0].split('=')[1].split('g')[0];
				var gameId = parseInt(window.location.href.split('&')[0].split('=')[2].split('z')[0]);
				// loop through games array
				$scope.games.forEach(function(game,index){
					// if game id & channel exist in array
					if (game.game_id === gameId && game.channel.address === channelId){
						// apply game to scope
						$scope.game = game;
						$scope.game.imgSrc = "/"+$scope.site_address+"/merged-"+$scope.merger_name+"/"+game.channel.address+"/"+game.img;
						$scope.dosboxSize = 'normal';
						// dosbox
						dosbox.onload = function (dosbox) {
							console.log($scope.game.title + ' running...');
							dosbox.run("/"+$scope.site_address+"/merged-"+$scope.merger_name+"/"+game.channel.address+"/uploads/games/"+game.zip_name, "./"+game.file_name);
						}
					}
				});

			};

		};

		return {
			restrict: 'AE',
			replace:false,
			controller: controller,
		}

	}
]);