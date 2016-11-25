app.directive('itemView', [
	function() {

		var controller = function($scope,$element) {

			$scope.initItemView = function(){
				$scope.item_type = window.location.href.split('&')[0].split('type=')[1].split('-')[0];
				console.log($scope.itemType);
			};

		};

		return {
			restrict: 'AE',
			replace:false,
			controller: controller,
		}

	}
]);