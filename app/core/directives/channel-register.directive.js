app.directive('channelRegister', [
	function() {

		var controller = function($scope,$element) {

			// get channel info
			$scope.getChannelInfo = function(channel){
				// get channel's content.json
				var inner_path = 'merged-'+$scope.merger_name+'/'+channel.channel_address+'/content.json';
				Page.cmd("fileGet",{"inner_path":inner_path},function(data){
					// check if site has content.json
					if (!data){
						console.log('No content.json found for '+$scope.channel_address+'!');
					} else {
						data = JSON.parse(data);
						// apply channel info
						channel.channel_name = data.title;
						channel.channel_description = data.description;
				    	// get channel's channel.json
				    	var inner_path = 'merged-'+$scope.merger_name+'/'+channel.channel_address+'/data/channel.json';
				    	Page.cmd("fileGet",{"inner_path":inner_path},function(data){
				    		// check if site has channel.json
				    		if (!data) {
				    			console.log('no channel.json found for '+$scope.channel_address+'!');
				    		} else {
								data = JSON.parse(data);
								// apply to scope
								$scope.$apply(function() {
									channel.items = data[$scope.media_type];
								});			    			
				    		}
				    	});
					}
				});
			};	

		    // show channel
		    $scope.showChannel = function() {
				if ($scope.channel_id.length === 34){
					$scope.nonValid = false;
					// get channel's content.json
			    	var inner_path = 'merged-'+$scope.merger_name+'/'+$scope.channel_id+'/content.json';
					Page.cmd("fileGet",{"inner_path":inner_path},function(data){
						// check if site has content.json
						if (!data){
							$scope.errorMsg = 'No content.json found for '+$scope.channel_id+'!';
						} else {
							data = JSON.parse(data);
							// create channel obj
							$scope.channel = {
								channel_name:data.title,
								channel_description:data.description
							};
							// get channel's channel.json
					    	var inner_path = 'merged-'+$scope.merger_name+'/'+$scope.channel_id+'/data/channel.json';
					    	Page.cmd("fileGet",{"inner_path":inner_path},function(data){
					    		if (!data) {
					    			$scope.errorMsg = 'no channel.json found for '+$scope.channel_id+'!';
					    		} else {
									data = JSON.parse(data);
									// apply to scope
									$scope.$apply(function() {
										// apply channel's items to channel
										$scope.channel.items = data[$scope.media_type];
									});			    			
					    		}
					    	});
						}
					});
				} else {
					// if address is non valid
					$scope.nonValid = true;
				}
		    };

			// add channel
			$scope.addChannel = function() {
				// get site info
				Page.cmd("siteInfo",{},function(site_info){
					Page.site_info = site_info;
					// if user has no cert user id
					if (!Page.site_info.cert_user_id){
						Page.cmd("wrapperNotification", ["info", $scope.merger_name+" currently supports posting content with zeroid.bit only!", 10000]);
						$scope.selectUser();
					} else {
						// check if channel exists in sites array
						var channelExists = false;
						if ($scope.channels.length > 0){
							// loop though channel array
							$scope.channels.forEach(function(channel,index){
								// if channel exists in channel array
								if (channel.channel_address === $scope.channel_id){
									channelExists = true;
									Page.cmd("wrapperNotification", ["info", "Channel "+$scope.channel.channel_name+" ("+$scope.channel_id+") already exists in database", 10000]);
								}
							});
						} else {
							channelExists = false;
						}
						// if channel does not exist
						if (!channelExists){
							// create channel
							$scope.createChannel();
						}
					}
				});
			};

			// create channel
			$scope.createChannel = function() {
				// get file
				var inner_path = "data/users/"+Page.site_info.auth_address+"/channel.json";
				Page.cmd("fileGet", { "inner_path": inner_path, "required": false },function(data) {
		        	// data
					if (data) { data = JSON.parse(data); }
					else { data = {"next_channel_id":1,"channel": [] }; }
					// channel db record
					var channel = {
						channel_id:data.next_channel_id,
						channel_address:$scope.channel_id,
						channel_name:$scope.channel.channel_name,
						date_added: +(new Date)
					};
					// update data
					data.channel.push(channel);
					data.next_channel_id += 1;
					// write to file
					var json_raw = unescape(encodeURIComponent(JSON.stringify(data, void 0, '\t')));
					Page.cmd("fileWrite", [inner_path, btoa(json_raw)], function(res) {
						// sign & publish site
						Page.cmd("sitePublish",{"inner_path":inner_path}, function(res) {
							// apply to scope
							$scope.$apply(function() {
								Page.cmd("wrapperNotification", ["done", "Channel Added!", 10000]);
								channel.new = true;
								// apply channel to channels array
								$scope.channels.push(channel);
							});
						});
					});
			    });
			};

			// delete channel
			$scope.deleteChannel = function(channel,cIndex){
				// get file
				var inner_path = "data/users/"+Page.site_info.auth_address+"/channel.json";			
				Page.cmd("fileGet", { "inner_path": inner_path, "required": false },function(data) {
					data = JSON.parse(data);
					// find channel's id in user's channels.json 
					var channelIndex;
					data.channels.forEach(function(ch,index){
						if (ch.channel_id === channel.channel_id){
							channelIndex = index;
						}
					});
					// remove channel from user's channels.json
					data.channels.splice(channelIndex,1);
					// write to file
					var json_raw = unescape(encodeURIComponent(JSON.stringify(data, void 0, '\t')));
					Page.cmd("fileWrite", [inner_path, btoa(json_raw)], function(res) {
						// sign & publish site
						Page.cmd("sitePublish",{"inner_path":inner_path}, function(res) {
							// apply to scope
							$scope.channels.splice(cIndex,1);
							$scope.$apply(function() {
								Page.cmd("wrapperNotification", ["done", "Channel Deleted!", 10000]);
							});
						});
					});
			    });
			};

		}

		return {
			restrict: 'AE',
			replace:false,
			controller: controller,
		}

	}
]);