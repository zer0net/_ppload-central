app.directive('gameList', ['$location',
	function($location) {

		var controller = function($scope,$element) {

		};

		var template =  '<md-grid-list md-cols-xs="2" md-cols-sm="3" md-cols-md="4" md-cols-gt-md="5" ' +
						    'sm-row-height="3:4" md-row-height="3:3" ' +
						    'md-gutter="12px" md-gutter-gt-sm="8px">' +
						    '<!-- grid item -->' +
							'<md-grid-tile class="list-item" ng-repeat="game in games | orderBy:\'-date_added\' track by game.uid">' +
								'<div class="inner-wrap md-whiteframe-1dp">' +
									'<!-- img -->' +
									'<div class="item-img md-whiteframe-1dp" style="background-image:url(\'{{game.img}}\');">' +
										'<a href="/{{site_address}}/view.html?c={{game.channel.address}}g={{game.game_id}}"><span ng-bind="game.genre" class="game-genre {{game.genre}}"></span></a>' +
									'</div>' +
									'<!-- img -->' +
									'<!-- info -->' +
									'<md-grid-tile-footer>' +
										'<h3><a href="/{{site_address}}/view.html?c={{game.channel.address}}g={{game.game_id}}z={{game.zip_name}}f={{game.file_name}}">{{game.title}}</a></h3>' +
										'<ul class="video-info">' +
						    				'<li><span>{{game.channel.content.title}}</span></li>' +
						    				'<li><span><i am-time-ago="game.date_added"></i></span></li>' +
						    				'<li class="votes-count" votes ng-init="getVotes(game)">' +
												'<span class="up-vote">' +
													'<span class="glyphicon glyphicon-thumbs-up"></span>' +
													'<span class="number">{{game.upVotes}}</span>' +
												'</span>' +
												'<span class="down-vote">' +
													'<span class="glyphicon glyphicon-thumbs-down"></span>' +
													'<span class="number">{{game.downVotes}}</span>' +
												'</span>' +
						    				'</li>' +
						    				'<li class="comments-count" comments ng-init="countComments(game)">' +
												'<span class="glyphicon glyphicon-comment"></span>' +
												'<span>{{commentCount}}</span>' +
						    				'</li>' +
						    				'<li class="views-count" views ng-init="getViews(game)">' +
						    					'<span>{{game.views.length}} views</span>' +
						    				'</li>' +
						    				'<li class="peers-count"><span> {{game.channel.peers}} peers</span></li>' +
										'</ul>' +
									'</md-grid-tile-footer>' +
									'<!-- /info -->' +
								'</div>' +
							'</md-grid-tile>' +
							'<!-- grid item -->' +
						'</md-grid-list>';

		return {
			restrict: 'AE',
			replace:true,
			controller: controller,
			template:template
		}

	}
]);