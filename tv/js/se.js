$.get("http://crossorigin.me/http://eztvapi.re/show/tt0903747", function (data) {
	i = 0;
	var html = "";
    var episodes = [];
    console.log(data.episodes);
    $.each(data.episodes, function (i, movie) {
    	// if 720 is undefinied search 480 if undefinied 0
        //console.log(movie.torrents[0].url);
        episodes.push("S"+movie.season+"E"+movie.episode);
        //console.log("S"+movie.season+"E"+movie.episode);
        //console.log(movie.episode);
    });
    console.log(episodes.sort());
});