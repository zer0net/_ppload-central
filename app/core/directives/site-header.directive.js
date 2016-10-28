app.directive('siteHeader', ['$mdDialog', '$mdMedia',
	function($mdDialog,$mdMedia) {

		// header directive controller
		var controller = function($scope,$element) {

		    // show info modal
			$scope.showInfoModal = function(ev) {
				// dialog vars
				$scope.status = '';
				$scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
			    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
			    // dialog template
			    var dialogTemplate = 
			    	'<md-dialog aria-label="Mango (Fruit)">' +
					    '<md-toolbar>' +
					    	'<div class="md-toolbar-tools">' +
						        '<h2>How to upload?</h2>' +
						        '<span flex></span>' +
						        '<md-button class="md-icon-button" ng-click="cancel()">' +
						            '<md-icon md-svg-src="img/icons/ic_close_24px.svg" aria-label="Close dialog"></md-icon>' +
						        '</md-button>' +
					    	'</div>' +
					    '</md-toolbar>' +
					    '<md-dialog-content style="width:400px;height:100px; ">' +
							'<ol style="padding: 8px 24px;"><li>clone your own Video Channel from <a href="/'+$scope.channel_master_address+'">here</a></li>' +
							'<li>register your site <a href="/'+$scope.site_address+'/register.html">here</a></li>' +
							'<li>upload videos!</li></ol>' +
					    '</md-dialog-content>' +
					'</md-dialog>';
				// show dialog
			    $mdDialog.show({
					controller: DialogController,
					template: dialogTemplate,
					parent: angular.element(document.body),
					targetEvent: ev,
					clickOutsideToClose:true,
					fullscreen: useFullScreen
			    });
			};

		};

		// dialog controller
		var DialogController = function($scope, $mdDialog) {
			$scope.hide = function() {
				$mdDialog.hide();
			};
			$scope.cancel = function() {
				$mdDialog.cancel();
			};
			$scope.answer = function(answer) {
				$mdDialog.hide(answer);
			};
		};

		// html template
		var template = 	
		'<md-toolbar layout-padding class="header" layout="row">' +
			'<div class="col-xs-4">' +
				'<h3>' +
					'<a href="/{{site_address}}">{{merger_name}}</a>' +
				'</h3>' +
			'</div>' +
			'<div class="col-xs-4">' +
				'<div class="search-container" flex>' +
		            '<form>' +
						'<input placeholder="search..." />' +
		            '</form>' +
	            '</div>' +
			'</div>' +
			'<div class="col-xs-4">' +
				'<ul>' +
					'<li>' +
					    '<md-button class="md-primary md-raised" ng-click="showInfoModal($event)">' +
					    	'HOW TO UPLOAD?' +
					    '</md-button>' +
				    '</li>' +
				    '<li>' +
				    	'<a href="register.html">' +
				    		'<md-button class="md-primary md-raised">REGISTER</md-button>' +
				    	'</a>		    	' +
				    '</li>' +
				'</ul>' +
	        '</div>' +
		'</md-toolbar>';

		return {
			restrict: 'AE',
			replace:false,
			controller: controller,
			template:template
		}

	}
]);