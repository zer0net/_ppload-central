angular.module('Zer0DOS').controller('MainCtrl', ['$scope','$location',
	function($scope,$location) {

		/* CONFIG */
			
			$scope.site_address = $location.$$absUrl.split('0/')[1].split('/')[0];
			$scope.channel_master_address = '14mwR7A8Jje4htQDwjrDAbBYPjdLbAGCSj';
			$scope.merger_name = 'Zer0DOS';
			$scope.media_type = 'games';
			$scope.item_id_name = 'game_id';

		/* /CONFIG */

		/* INIT SITE */

			// init
			$scope.init = function(){
				// loading
				$scope.showLoadingMessage('Loading');
				// update site
				Page.cmd('siteUpdate',{"address":$scope.site_address});
				// get site info
				Page.cmd("siteInfo", {}, function(site_info) {
					// apply site info to Page obj
					Page.site_info = site_info;
					// apply auth address to scope
					if (Page.site_info.cert_user_id) { $scope.user = Page.site_info.cert_user_id; } 
					else { $scope.user = Page.site_info.auth_address; }
					// merger site permission
					$scope.getMergerPermission();
		    	});
			};

			// get merger site permission
			$scope.getMergerPermission = function(){
				// if user allready has permission for merger type
		    	if (Page.site_info.settings.permissions.indexOf("Merger:"+$scope.merger_name) > -1){
		    		$scope.$apply(function(){
		    			// get merged sites
		    			$scope.getMergedSites();
		    		});
		    	} else {
		    		// if not, ask user for permission
					Page.cmd("wrapperPermissionAdd", "Merger:"+$scope.merger_name, function() {
						$scope.$apply(function(){
			    			// get merged sites
			    			$scope.getMergedSites();
						});
					});
		    	}
			};

		    // get merged sites
		    $scope.getMergedSites = function(){
		    	// loading
				$scope.showLoadingMessage('Listing merged sites');
				// merged sites array		    	
		    	$scope.sites = [];
				Page.cmd("mergerSiteList", {query_site_info: true}, function(sites) {
					// for every site in sites obj
					for (var site in sites) {
					    if (!sites.hasOwnProperty(site)) continue;
					    var site = sites[site];
					    // push site to sites array
					    $scope.sites.push(site);
					}
					$scope.$apply(function(){
						// get channels
						$scope.getChannels();
					});
				});
		    };

			// get channels
			$scope.getChannels = function(){
				// loading
				$scope.showLoadingMessage('Loading Channels');
				// get channels				
				var query = ["SELECT * FROM channel ORDER BY date_added"];
				Page.cmd("dbQuery", query, function(channels) {
					if (channels.length > 0){
						$scope.channels = channels;
						// render channels
						$scope.renderChannels();
					} else {
						$scope.$apply(function(){
							$scope.finishedLoading();
						});
					}
				});
			};

			// render channels
			$scope.renderChannels = function(){
				// items array, named ny media type var
				$scope[$scope.media_type] = [];
				// for each channel
				$scope.channels.forEach(function(channel,cIndex){
	 				// check if site exists
					var siteExists = false;
					// loop through sites array
					$scope.sites.forEach(function(site,sIndex){
						// if channel's id exists in merged sites array
						if (site.address === channel.channel_address){
							siteExists = true;
							channel = site;
						}
					});
					// if site exists get channel, if not add merged site
					if (siteExists === true){
						// get channel
						$scope.getChannel(channel,cIndex);
					} else {
						console.log('site ' + channel.channel_address + ' doesnt exists! adding site...');
						// add merger site
						$scope.addSite(cIndex);
					}
				});
			};

			// add merger site
			$scope.addSite = function(cIndex){
				Page.cmd("mergerSiteAdd",{"addresses":channel.channel_address},function(data){
					// list merger sites
					Page.cmd("mergerSiteList", {query_site_info: true}, function(sites) {
						// for each site in merger site list
						for (var site in sites) {
						    var site = sites[site];
						    var siteFound = false;
							// if channel's id exists in merged sites array
						    if (site.address === channel.channel_address){
						    	siteFound = true;
						    	// info prompt
								Page.cmd("wrapperNotification", ["info", "Refresh this page to view new content", 10000]);
						    	// push site to sites array
								$scope.sites.push(site);
								// get channel
								$scope.getChannel(site,cIndex);
						    }
						}
						// if no matching site found in merger site list after adding
						if (siteFound === false){
						// finish loading				    	
						    $scope.finishLoadingChannels(cIndex);								
						}
					});
				});
			};

			// get channel
			$scope.getChannel = function(channel,cIndex){
				// get channel.json
				var inner_path = 'merged-'+$scope.merger_name+'/'+channel.address+'/data/channel.json';
				Page.cmd("fileGet",{"inner_path":inner_path},function(data){
					// assign games
					data = JSON.parse(data);
					// if channel has data
					if (data){
						// get channel items
						$scope.addChannelItems(data,channel,cIndex);
					} else {
						// finish loading
						$scope.finishLoadingChannels(cIndex);
					}
				});
			};

			// get channels items
			$scope.addChannelItems = function(data,channel,cIndex){
				// loop through items in data
				data[$scope.media_type].forEach(function(item,itemIndex){
					// assign channel obj
					item.channel = channel;
					// genereate unique item id
					item.uid = item.channel.address + item.game_id;
					// apply to scope items array						
					$scope[$scope.media_type].push(item);
					// if last item in channels items array
					if ((itemIndex + 1) === data[$scope.media_type].length){
						// finish loading
						$scope.finishLoadingChannels(cIndex);
					}
				});
			};

			// finish loading channels
			$scope.finishLoadingChannels = function(cIndex){
				// if channel index + 1 equals number of channels
				if ((cIndex + 1) === $scope.channels.length){
					// finished loading & apply to scope
					$scope.$apply(function(){
						$scope.finishedLoading();
					});
				}
			};

		/* /INIT SITE */

		/* UI */

			// show loading msg
			$scope.showLoadingMessage = function(msg) {
		    	$scope.loading = true;
		    	$scope.msg = msg;
			};

			// finished loading 
			$scope.finishedLoading = function(){
				$scope.loading = false;
				$scope.msg = '';
			};

		    // select user
		    $scope.selectUser = function(){
		    	Page.cmd("certSelect", [["zeroid.bit"]]);
		    };

	    /* /UI */
	}
]);