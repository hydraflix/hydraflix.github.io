jQuery(function() {
	window.btapp = new Btapp;
	btapp.connect();

	var url = 'http://featuredcontent.utorrent.com/torrents/Kumare-BitTorrent.torrent';
	btapp.on('add:add', function() {
		btapp.get('add').torrent(url);
	});

	// Lets display the main video in the torrent
	var hash = 'EDC368812EC54125DEFC17B2E21CBB76C9CB3A95';
	var name = escape('Kumare - Exclusive Movie Clip.mkv');
	btapp.live(
		'torrent ' + hash + ' file ' + name + ' properties streaming_url', 
		function(src, properties, file, files, torrent, torrents) {
			// Lets show a nice progress bar...torrents don't download sequentially,
			// so its nice to have some other way of knowing that its actually downloading.
			var update_progress = function() {
				var progress = 100.0 * properties.get('downloaded') / properties.get('size');
				$('.progress .bar').css('width', progress + '%');
			};
			update_progress();
			properties.on('change:downloaded', update_progress);

			_V_("kumare_video").ready(function(){
				this.src(src);
				this.play();
			});
		}
	);

	// Lets display the images in the torrent
	btapp.live(
		'torrent ' + hash + ' file * properties',
		function(properties, file, files, torrent, torrents) {
			// Lets not show the images immediately. If they're not downloaded yet
			// they will be displayed as dead links...very sad indeed.
			var show_image = function() {
				if(properties.get('downloaded') === properties.get('size')) {
					var name = properties.get('name');
					var src = properties.get('streaming_url');
					if(name.indexOf('jpg', name.length - 3) !== -1) {
						//var img = $('<img src="' + src + '" />');
						//$('#kumare_images').append(img);
					}
				}
			};
			if(properties.get('downloaded') === properties.get('size')) {
				show_image();
			} else {
				properties.on('change:downloaded', show_image);
			}
		}
	);
});