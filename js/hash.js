$(document).ready(function(e) {
	LoadMovies();
	LoadSection();
	window.onhashchange =  function (event, data) {
		LoadSection();
	};
});
var containers = {MOVIES: 0}
var movies = null;
function Movie(_info_hash, _imdb_code) {
	var movie = {
		info_hash: _info_hash,
		imdb_code: _imdb_code
	}
	return movie;
}
function ShowContainer(tipo) {
	var template = null;
	template = "<div class='moviesContainer'></div> ";
	return template;
}
function DetailsMovie(movie) {
	var container = document.createElement('div');
	$(container).html(movie.info_hash+"detalle"+movie.imdb_code+"detalle");
	return container;
}
function LoadMovies() {
	movies = [
		Movie('F2A0F56A420906CC8B539C6AEB454992242A6712', 'tt2395427')
	];
}
function ShowMovie(modo, movie) {
	switch(modo)
	{
		case 0:
		{
			$("#"+movie.info_hash).click(function(){
				ShowMovie(1, movie)
			});
		}break;
		case 1:
		{
			var cont = $('.contentContainer');
			cont.stop(true, true).fadeOut('300ms', function() {
				$('.contentContainer').html('');
				cont.append(DetailsMovie(movie));
            }).fadeIn('300ms').animate({marginTop:'0px'},'300ms');
			TitleURL(1, movie);
		}break;
	}
}
function TitleURL(tipo, movie) {
	var title = '';
	var url= '';
	switch(tipo)
	{
		case 1:
		{
			title = movie.info_hash;
			url = window.location.origin + window.location.pathname + '#movie/'+(movie.info_hash.split(' ').join('-'));
		}break;
		case 3:
		{
			title = "index";
			url = window.location.origin + window.location.pathname;
		}break;
	}
	ChangeUrl(title, url);
}
function ChangeUrl(title, url) {
    if (typeof (history.pushState) != "undefined") 
	{
		document.title = title;
        var obj = { Title: title, Url: url };
        // Test this up in the cloud // history.pushState(obj, obj.Title, obj.Url);
    }
}
function StartLoad() {
	cont = $('.contentContainer');
	cont.stop(true, true).fadeOut('300ms', function() {
		cont.html('');
		cont.append(ShowContainer(containers.MOVIES));
		movies.forEach(function(cand) {ShowMovie(0, cand);});
    }).fadeIn('300ms').animate({marginTop:'0px'},'300ms').animate({scrollTop:200}, '300');
	TitleURL(3, null);
}
function LoadSection() {
	if(window.location.hash.split('/')[1] != undefined)
	{
		secciones = unescape(window.location.hash).split('/');
		var nombre = secciones[1].split('-').join(' ');
		if(window.location.hash.indexOf('movie') != -1) // else if(window.location.hash.indexOf('candidato') != -1)
		{
			var lista = movies.filter(function(e){ return e.imdb_code == nombre; });
			if(lista.length > 0) {
				ShowMovie(1, lista[0]);
				return true;
			}
		}
	}
	StartLoad();
}
function makeScrollID(element) {
	$('html, body').animate({ scrollTop: ($('#'+element).offset().top - 200) }, 1000);
	$('#'+element).effect("highlight", {},5000);
}