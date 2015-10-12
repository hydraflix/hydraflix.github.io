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
			i = 0;
			var html = "";
			var imdb = "";
			$.each(data, function (i, movie) {
				imdb = movie.imdb_id;
				
				html+='<div id="movie-box-'+'" class="movie-box movie-box-'+' col-lg-3 col-md-4 col-sm-6 col-xs-12" style="position:relative;float:left;">';
				html+='<div style="width: 100%; height: 330px; position: absolute;left: 0px; top: 0px; -webkit-filter: blur(3px); -moz-filter: blur(3px); -o-filter: blur(3px); -ms-filter: blur(3px); filter: blur(3px);; background-image:url(http://crossorigin.me/'+movie.images.fanart+'); background-position: center; background-size: cover;  background-repeat: no-repeat; -webkit-box-shadow: inset 0px 0px 30px 30px rgba(0, 0, 0, 1); -moz-box-shadow: inset 0px 0px 30px 30px rgba(0, 0, 0, 1); box-shadow: inset 0px 0px 30px 30px rgba(0, 0, 0, 1);"></div>';
				html+='<img id="img-movie-box-'+'" class="hover-luz" title="'+'" alt="'+'" src="http://crossorigin.me/'+movie.images.poster+'" style="width: 100%; max-width: 180px; height: 270px; position: relative;" onmouseover="hoverHash(&#39;'+imdb+'&#39;)" onmouseout="outHash(&#39;'+imdb+'&#39;)" onclick="f_play_detalle(&#39;'+'&#39;,&#39;'+'&#39;,&#39;'+'&#39;,&#39;'+'&#39;,&#39;'+'&#39;); scrollDetails(&#39;'+'&#39;);"/><div id="movie-rating-star-'+imdb+'" class="movie_rating_star"></div></div>';
				// html+='<div id="movie-box-'+movie.torrents[0].hash+'" class="movie-box movie-box-'+movie.genres[0]+' col-lg-3 col-md-4 col-sm-6 col-xs-12" style="background-image:url('+movie.background_image+');background-position:center;background-size:cover;background-repeat:no-repeat;position:relative;float:left;"><img id="img-movie-box-'+movie.torrents[0].hash+'" class="hover-luz" title="'+movie.title+'" alt="'+movie.title+'" src="'+movie.medium_cover_image+'" style="width: 100%; max-width: 180px; position: relative;" onmouseover="hoverHash(&#39;'+hash+'&#39;)" onmouseout="outHash(&#39;'+hash+'&#39;)" onclick="f_play_detalle(&#39;'+movie.torrents[0].hash+'&#39;,&#39;'+movie.id+'&#39;,&#39;'+movie.medium_cover_image+'&#39;,&#39;'+movie.background_image+'&#39;,&#39;'+movie.rating+'&#39;); scrollDetails(&#39;'+hash+'&#39;);"/><div id="movie-rating-star-'+movie.torrents[0].hash+'" class="movie_rating_star">'+repeat(movie_rating_star, movie_rating)+repeat(movie_rating_star_empty, (10 - movie_rating))+'</div></div>';
				$.get("http://www.omdbapi.com/?i="+imdb+"&plot=full&r=json", function (data) {
					console.log("imdb: "+imdb);
					movie_rating = Math.round(data.imdbRating);
					movie_rating_star = '<span class="glyphicon glyphicon-star" aria-hidden="true"></span>';
					movie_rating_star_empty = '<span class="glyphicon glyphicon-star" aria-hidden="true" style="color:#000;"></span>';
					html_rating = movie_rating_star.repeat(movie_rating)+movie_rating_star_empty.repeat(10 - movie_rating);
					$("#movie-rating-star-"+imdb).html(html_rating);
					console.log("#movie-rating-star-+imdb: "+"#movie-rating-star-"+imdb);
				});				
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
function hoverHash(imdb) {
	$("#movie-rating-star-"+imdb).css("visibility", "visible");
}	
function outHash(imdb) {
	$("#movie-rating-star-"+imdb).css("visibility", "hidden");
}