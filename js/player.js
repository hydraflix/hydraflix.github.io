function f_play(id,id2,id3) {
	api_number1 = Math.round(Math.random()*(8-0)+0); // The lefty number is the total quantity of element-1
	api_number2 = api_number1+1;
	api_list = ["93979e5200c4e0c9f75a516dec8dfe0180a785b2", "fae4a7c8bc2dd28f7d505a67f6b6efd33869733d", "35221d40fb165ebe1bcb2fd0af6e102b563dd906", "d925f3c996b41ad878a0b592d4dacc579db0e2ba", "bf5a6aff46a86d36779d3af00d004f4fd19368c0", "369cb28d46df42881bd2aa1373544e3dc46ec062", "5b3018cd4332f3783cd6a8e32c461cf425ed3759", "2cd13aee728654ab34407cf2c6669fb57d954b1e", "6bfa3dcea2a98224182cd3f146603b24685d8de0"];
	api_key_var = api_list.slice(api_number1,api_number2);
	var num_aleatorio = Math.floor(Math.random() * 51) + 25;
	jsonp_var = ";jsonp=?";
	var id2 = id2;
	var urlZipSrt;
	$.getJSON("http://api.furk.net/api/dl/add?info_hash=" + id + "&t_files=1&api_key=" + api_key_var + jsonp_var, function(data){
		var dl_status = data.torrent.dl_status;
		if (dl_status == "active") {
			$("#fullscreen_player").attr('class','fullscreen_player_in');			
			$("#images").html('<div class="row"><p id="dl_status_active-error" class="btn btn-primary btn-lg" onclick="closeThis()" role="button" title="Click for close this.">Sorry!, but it is not yet available. Please try again in a few hours.</p>'+'<div id="close" style="background: url(http://i.imgur.com/P7Svq.png);position: absolute; top: 50%; left: 50%; margin-top: -250px; margin-left: 400px;" onclick="closeThis()"></div></div>');
			$.getJSON("http://api.furk.net/api/dl/add?info_hash=" + id + "&t_files=1&api_key=6bfa3dcea2a98224182cd3f146603b24685d8de0" + jsonp_var, function(data){});
		}
		else {
			$.each(data.files, function(i,file){
				$.each(file.t_files, function(i,t_file){
					var loadedUrl = "";
					$.getJSON("http://api.yifysubtitles.com/subs/"+id2, function(data){
						var ttID = id2;
						if (data === undefined || data === null || data === "" || data.subs === undefined || data.subs === null || data.subs === "" || data.subs[ttID].spanish === undefined || data.subs[ttID].spanish === null || data.subs[ttID].spanish === "" ) {
							var loaded;
							loaded = "1\n00:00:00,000 --> 01:00:00,000\nNo hay subtitulos disponibles.";
							var blob = new Blob( [ loaded ], { type: "text/srt" });
							var urlCreator = window.URL || window.webkitURL;
							loadedUrl = urlCreator.createObjectURL( blob );
							$("track#hydraflix-es").attr("src", loadedUrl);
						}
						else {
							urlZipSrt = data.subs[ttID].spanish[0].url;
							var loader = new ZipLoader('http://yifysubtitles.com'+urlZipSrt);
							var loaded;
							loader.getEntries('http://yifysubtitles.com'+urlZipSrt).forEach(function(entry) {
								loaded = loader.load('http://yifysubtitles.com'+urlZipSrt+"://"+entry.name());
							});
							var blob = new Blob( [ loaded ], { type: "text/srt" });
							var urlCreator = window.URL || window.webkitURL;
							loadedUrl = urlCreator.createObjectURL( blob );
							$("track#hydraflix-es").attr("src", loadedUrl);
						}
					
						$("#images").html("<video id='example_video_" + id + num_aleatorio +"'  class='video-js vjs-default-skin' width='800' height='400' data-setup='{}'><source src='" + t_file.url_player + "' type='video/mp4' ><track id='hydraflix-es' kind='subtitles' src='"+loadedUrl+"' srclang='es' label='ES' charset='utf-8' type='text/srt'></track></video><br><div id='close' style='background: url(http://i.imgur.com/P7Svq.png);position: absolute; top: 50%; left: 50%; margin-top: -250px; margin-left: 400px;' onclick='closeThis(); unscrollDetails();'></div>"); // http://crossorigin.me/ ?
						_V_(
							('example_video_' + id + num_aleatorio),
							{
								'autoplay': true,
								'controls': true,
								'preload': 'auto'
							}  
						);	
						$("#fullscreen_player").attr('class','fullscreen_player_in');
					});
					if ( i == 0 ) return false;
				}); 
			}); 
		}
	});
};
function closeThis() {
	document.getElementById("images").innerHTML = "";
	$("#fullscreen_player").attr('class','fullscreen_detail_out');
};
