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
		$.get("http://crossorigin.me/https://yts.to/api/v2/list_movies.json?limit="+limit_items+"&page="+page+"&order_by=desc&sort_by=year", function (data) {
			yify = data;
			console.log(data);
			if (yify === undefined || yify === null || yify === "") {
				console.log("YTS LCDTM!!!");
				$.getJSON("http://crossorigin.me/http://api.torrentsapi.com/list?sort=seeds&quality=720p&page="+page, function (data) {
					//console.log(data);
					
					//yify = data;
					i = 0;
					var html = "";
					var movie = "";
					var hash = "";		
					$.each(data.MovieList, function (i, item) {
						if (item.items[0] === undefined) {
							console.log("null");
						}
						else {
							hash = item.items[0].id;
							furk_hash = item.items[0].id;
							furk_imdb = item.imdb;
							console.log("IMDB A VER QUE ONDA: "+furk_imdb);
							html+='<div id="movie-box-'+'" class="movie-box movie-box-'+item.genres[0]+' col-lg-3 col-md-4 col-sm-6 col-xs-12" style="position:relative;float:left;">';
							html+='<div style="width: 100%; height: 330px; position: absolute;left: 0px; top: 0px; -webkit-filter: blur(3px); -moz-filter: blur(3px); -o-filter: blur(3px); -ms-filter: blur(3px); filter: blur(3px); background-image:url(http://crossorigin.me/'+item.poster_big+'); background-position: center; background-size: cover;  background-repeat: no-repeat; -webkit-box-shadow: inset 0px 0px 30px 30px rgba(0, 0, 0, 1); -moz-box-shadow: inset 0px 0px 30px 30px rgba(0, 0, 0, 1); box-shadow: inset 0px 0px 30px 30px rgba(0, 0, 0, 1);"></div>';
							html+='<img id="img-movie-box-'+furk_hash+'" class="hover-luz" title="'+item.title+'" alt="'+item.title+'" src="'+item.poster_med+'" style="width: 100%; max-width: 180px; height: 270px; position: relative;" onmouseover="hoverHash(&#39;'+furk_imdb+'&#39;)" onmouseout="outHash(&#39;'+furk_imdb+'&#39;)" onclick="f_play(&#39;'+furk_hash+'&#39;,&#39;'+furk_imdb+'&#39;,&#39;'+item.poster_med+'&#39;,&#39;'+item.poster_big+'&#39;,&#39;'+item.rating+'&#39;); scrollDetails(&#39;'+hash+'&#39;);"/><div id="movie-rating-star-'+furk_imdb+'" class="movie_rating_star"></div></div>';
							$.get("http://www.omdbapi.com/?i="+furk_imdb+"&plot=full&r=json", function (data) {
								console.log("imdb: "+data.imdbID);
								movie_rating = Math.round(data.imdbRating);
								movie_rating_star = '<span class="glyphicon glyphicon-star" aria-hidden="true"></span>';
								movie_rating_star_empty = '<span class="glyphicon glyphicon-star" aria-hidden="true" style="color:#000;"></span>';
								html_rating = movie_rating_star.repeat(movie_rating)+movie_rating_star_empty.repeat(10 - movie_rating);
								$("#movie-rating-star-"+data.imdbID).html(html_rating);
								console.log("#movie-rating-star-+imdb: "+"#movie-rating-star-"+data.imdbID);
							});	
						}													
						i++;				
					});	
					page=page++;
					$('#movies').append(html);
				});
			}			
			else {
				//yify = data;
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
			}		
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
