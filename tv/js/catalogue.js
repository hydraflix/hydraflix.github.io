$(function () {
	var limit_items = 24; // 12, 24, 48 (bootstrap friendly query must be divisible for 1, 2, 3 and 4)
	var page = 0;
	var pageToSave = JSON.stringify(page);
	localStorage.setItem("pagina", pageToSave);
	function loadMore() {
		var page = localStorage.getItem("pagina");
		page = parseInt(page);
		page = page+1;
		var pageToSave = JSON.stringify(page)
		localStorage.setItem("pagina", pageToSave);			
		$.get("http://crossorigin.me/http://eztvapi.re/shows/"+page, function (data) {
			yify = data;
			i = 0;
			var html = "";
			//var movie = "";
			//var hash = "";
			$.each(data, function (i, movie) {
				// console.log(movie.genres[0]);
				// furk_hash = movie.torrents[0].hash;
				// furk_imdb = movie.imdb_code;
				//movie_rating = Math.round(movie.rating);
				//var repeat = function (s, n, d) {
				//	return --n ? s + (d || "") + repeat(s, n, d) : "" + s;
				//};
				//hash = movie.torrents[0].hash;
				movie_rating_star = '<span class="glyphicon glyphicon-star" aria-hidden="true"></span>';
				movie_rating_star_empty = '<span class="glyphicon glyphicon-star" aria-hidden="true" style="color:#000;"></span>';
				html+='<div id="movie-box-'+'" class="movie-box movie-box-'+' col-lg-3 col-md-4 col-sm-6 col-xs-12" style="background-image:url(http://crossorigin.me/'+movie.images.fanart+');background-position:center;background-size:cover;background-repeat:no-repeat;position:relative;float:left;"><img id="img-movie-box-'+'" class="hover-luz" title="'+'" alt="'+'" src="http://crossorigin.me/'+movie.images.poster+'" style="width: 100%; max-width: 180px; height: 270px; position: relative;" onmouseover="hoverHash(&#39;'+'&#39;)" onmouseout="outHash(&#39;'+'&#39;)" onclick="f_play_detalle(&#39;'+'&#39;,&#39;'+'&#39;,&#39;'+'&#39;,&#39;'+'&#39;,&#39;'+'&#39;); scrollDetails(&#39;'+'&#39;);"/><div id="movie-rating-star-'+'" class="movie_rating_star">'+'</div></div>';
				// html+='<div id="movie-box-'+movie.torrents[0].hash+'" class="movie-box movie-box-'+movie.genres[0]+' col-lg-3 col-md-4 col-sm-6 col-xs-12" style="background-image:url('+movie.background_image+');background-position:center;background-size:cover;background-repeat:no-repeat;position:relative;float:left;"><img id="img-movie-box-'+movie.torrents[0].hash+'" class="hover-luz" title="'+movie.title+'" alt="'+movie.title+'" src="'+movie.medium_cover_image+'" style="width: 100%; max-width: 180px; position: relative;" onmouseover="hoverHash(&#39;'+hash+'&#39;)" onmouseout="outHash(&#39;'+hash+'&#39;)" onclick="f_play_detalle(&#39;'+movie.torrents[0].hash+'&#39;,&#39;'+movie.id+'&#39;,&#39;'+movie.medium_cover_image+'&#39;,&#39;'+movie.background_image+'&#39;,&#39;'+movie.rating+'&#39;); scrollDetails(&#39;'+hash+'&#39;);"/><div id="movie-rating-star-'+movie.torrents[0].hash+'" class="movie_rating_star">'+repeat(movie_rating_star, movie_rating)+repeat(movie_rating_star_empty, (10 - movie_rating))+'</div></div>';
				i++;
			});	
			page=page++;
			$('#movies').append(html);
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