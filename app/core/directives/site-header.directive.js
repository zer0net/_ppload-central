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
					fullscreen: useFullScreen,
			    });
			};

			// open site config dialog
			$scope.openSiteConfigDialog = function(ev){
				console.log($scope.config);
				// dialog vars
				$scope.status = '';
				$scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
			    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
			    // dialog template
			    var dialogTemplate = 
			    	'<md-dialog aria-label="Configuration">' +
					    '<md-toolbar>' +
					    	'<div class="md-toolbar-tools">' +
						        '<h2>Configuration</h2>' +
						        '<span flex></span>' +
						        '<md-button class="md-icon-button" ng-click="cancel()">' +
						            '<md-icon md-svg-src="img/icons/ic_close_24px.svg" aria-label="Close dialog"></md-icon>' +
						        '</md-button>' +
					    	'</div>' +
					    '</md-toolbar>' +
					    '<md-dialog-content site-config ng-init="initSiteConfig(items.config)" layout-padding style="width:400px" layout="column">' +
			    			'<label style="margin: 0;padding: 0 8px;">media type</label>' +
							'<md-input-container style="margin:0;" flex>' +
								'<md-checkbox ng-repeat="mediaType in mediaTypes" ng-model="config[mediaType]" aria-label="{{mediaType}}" ng-click="updateMediaTypes(config,mediaType)">{{mediaType}}</md-checkbox>' +
			    			'</md-input-container>' +
				            '<md-button flex="100" class="md-primary md-raised edgePadding pull-right" ng-click="updateConfig(config)">' +
				            	'<label>Update Configuration</label>' +
				            '</md-button>' +
					    '</md-dialog-content>' +				    
					'</md-dialog>';
				// show dialog
			    $mdDialog.show({
					controller: DialogController,
					template: dialogTemplate,
					parent: angular.element(document.body),
					target:ev,
					clickOutsideToClose:true,
					fullscreen: useFullScreen,
					locals:{
						items:{
							config:$scope.config
						}
					}					
			    });
			}

		};

		// dialog controller
		var DialogController = function($scope, $mdDialog,items) {
			// items
			$scope.items = items;			
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
					'<small ng-if="owner">' + 
						'<a ng- ng-click="openSiteConfigDialog()">' + 
							'<span class="glyphicon glyphicon-pencil"></span>' + 
						'</a>' + 
					'</small>' + 				
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