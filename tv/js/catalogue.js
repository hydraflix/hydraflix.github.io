$(function () {
	var limit_items = 24; // 12, 24, 48 (bootstrap friendly query must be divisible for 1, 2, 3 and 4)
	var page = 0;
	var pageToSave = JSON.stringify(page);
	localStorage.setItem("pagina", pageToSave);
	function loadMore() {
		var api_key = "c57ec9f21a63536bfc1faf3a8897b3bde8fab719546650e6870eceaa96b26634";
		var api_version = 2;
		var page = localStorage.getItem("pagina");
		page = parseInt(page);
		page = page+1;
		var pageToSave = JSON.stringify(page)
		localStorage.setItem("pagina", pageToSave);	
		// obtener la lista de shows populares, hacerle un endless scrolling
            // https://api-v2launch.trakt.tv/shows/popular
            // docs: http://docs.trakt.apiary.io/#reference/shows/popular/get-popular-shows		
		
		var request = new XMLHttpRequest();

		request.open('GET', 'https://api-v2launch.trakt.tv/shows/popular', false);

		request.setRequestHeader('Content-Type', 'application/json');
		request.setRequestHeader('trakt-api-version', '2');
		request.setRequestHeader('trakt-api-key', api_key);

		request.onreadystatechange = function () {
		  if (this.readyState === 4) {
		    console.log('Status:', this.status);
		    console.log('Headers:', this.getAllResponseHeaders());
		    console.log('Body:', this.responseText);
		    console.log(request.responseText)
		  }
		};

		request.send();
		
		 $.get("https://api-v2launch.trakt.tv/shows/popular/?trakt-api-key="+api_key+"&trakt-api-version="+api_version, function (data) {
		console.log(data);
			/*
			yify = data;
			i = 0;
			var html = "";
			var movie = "";
			var hash = "";
			$.each(yify.data.movies, function (i, movie) {
				console.log(movie.genres[0]);
				furk_hash = movie.torrents[0].hash;
				furk_imdb = movie.imdb_code;
				movie_rating = Math.round(movie.rating);
				var repeat = function (s, n, d) {
					return --n ? s + (d || "") + repeat(s, n, d) : "" + s;
				};
				hash = movie.torrents[0].hash;
				movie_rating_star = '<span class="glyphicon glyphicon-star" aria-hidden="true"></span>';
				movie_rating_star_empty = '<span class="glyphicon glyphicon-star" aria-hidden="true" style="color:#000;"></span>';
				html+='<div id="movie-box-'+movie.torrents[0].hash+'" class="movie-box movie-box-'+movie.genres[0]+' col-lg-3 col-md-4 col-sm-6 col-xs-12" style="background-image:url('+movie.background_image+');background-position:center;background-size:cover;background-repeat:no-repeat;position:relative;float:left;"><img id="img-movie-box-'+movie.torrents[0].hash+'" class="hover-luz" title="'+movie.title+'" alt="'+movie.title+'" src="'+movie.medium_cover_image+'" style="width: 100%; max-width: 180px; position: relative;" onmouseover="hoverHash(&#39;'+hash+'&#39;)" onmouseout="outHash(&#39;'+hash+'&#39;)" onclick="f_play_detalle(&#39;'+movie.torrents[0].hash+'&#39;,&#39;'+movie.id+'&#39;,&#39;'+movie.medium_cover_image+'&#39;,&#39;'+movie.background_image+'&#39;,&#39;'+movie.rating+'&#39;); scrollDetails(&#39;'+hash+'&#39;);"/><div id="movie-rating-star-'+movie.torrents[0].hash+'" class="movie_rating_star">'+repeat(movie_rating_star, movie_rating)+repeat(movie_rating_star_empty, (10 - movie_rating))+'</div></div>';
				i++;				
			});	
			page=page++;
			$('#movies').append(html);
			*/
		});
	};				
	$(window).scroll(function() {
		if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
		loadMore();
		}
	});
	$(document).ready(function() {
		loadMore();
	});
});
function hoverHash(hash) {
	$("#movie-rating-star-"+hash).css("visibility", "visible");
}	
function outHash(hash) {
	$("#movie-rating-star-"+hash).css("visibility", "hidden");
}