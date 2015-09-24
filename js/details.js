function scrollDetails(hash) {	
    $("html").css("overflow","hidden");
    $("#fullscreen_detail").css("overflow","scroll");
};	
function unscrollDetails() {	
    $("html").css("overflow","scroll");
    $("#fullscreen_detail").css("overflow","hidden");
};	
function f_play_detalle(id,id2,id3,id4,id5) {
    $.get("https://yts.to/api/v2/movie_details.json?movie_id="+id2, function (data) {
        movie = data;
        var repeat = function (s, n, d) {
            return --n ? s + (d || "") + repeat(s, n, d) : "" + s;
        };
        movie_rating_star = '<span class="glyphicon glyphicon-star" aria-hidden="true"></span>';
        movie_rating_star_empty = '<span class="glyphicon glyphicon-star" aria-hidden="true" style="color:#000;"></span>';
        movie_rating = Math.round(id5);
        var html = "";
        html += '<img id="close" src="http://i.imgur.com/P7Svq.png" style="position: fixed; z-index: 100000; top: 0%; right: 0%;" onclick="closeThis_detalle(); unscrollDetails();" />';
        html += '<div class="row title_movie_background" style="background-image: url('+id4+');"><div class="title_movie_background_black"><div class="title_movie">'+movie.data.title+'';
        html += '<div class="movie-rating-star-'+movie.data.torrents[0].hash+'" class="row movie_rating_star">'+repeat(movie_rating_star, movie_rating)+repeat(movie_rating_star_empty, (10 - movie_rating))+'</div>';
        html += '</div></div></div>';
        html += '<img title="'+movie.data.title+'" alt="'+movie.data.title+'" src="'+id3+'" style="width: 100%; max-width: 180px; position: relative;" onclick="f_play(&#39;'+movie.data.torrents[0].hash+'&#39;,&#39;'+movie.data.imdb_code+'&#39;)"/><p>'+movie.status+'</p><br><p>'+movie.status_message+'</p><br><p>'+movie.data.id+'</p><br><p>'+movie.data.url+'</p><br><p>'+movie.data.imdb_code+'</p><br><p>'+movie.data.title+'</p><br><p>'+movie.data.title_long+'</p><br><p>'+movie.data.slug+'</p><br><p>'+movie.data.year+'</p><br><p>'+movie.data.rating+'</p><br><p>'+movie.data.runtime+'</p><br><p>'+movie.data.genres[0]+'</p><br><p>'+movie.data.language+'</p><br><p>'+movie.data.mpa_rating+'</p><br><p>'+movie.data.download_count+'</p><br><p>'+movie.data.like_count+'</p><br><p>'+movie.data.rt_critics_score+'</p><br><p>'+movie.data.rt_critics_rating+'</p><br><p>'+movie.data.rt_audience_score+'</p><br><p>'+movie.data.rt_audience_rating+'</p><br><p>'+movie.data.description_intro+'</p><br><p>'+movie.data.description_full+'</p><br><p>'+movie.data.yt_trailer_code+'</p><br><p>'+movie.data.date_uploaded+'</p><br><p>'+movie.data.date_uploaded_unix+'</p><div class="movie-box movie-box-'+movie.data.genres[0]+'" style="background-image:url('+movie.data.background_image+');background-position:center;background-size:cover;background-repeat:no-repeat;position:relative;float:left;"></div>';
        html += movie.data.torrents[0];
        html += movie.data.torrents[0].url;
        html += movie.data.torrents[0].hash;
        html += movie.data.torrents[0].quality;
        html += movie.data.torrents[0].resolution;
        html += movie.data.torrents[0].framerate;
        html += movie.data.torrents[0].seeds;
        html += movie.data.torrents[0].peers;
        html += movie.data.torrents[0].size ;
        html += movie.data.torrents[0].size_bytes;
        html += movie.data.torrents[0].download_count;
        html += movie.data.torrents[0].date_uploaded;
        html += movie.data.torrents[0].date_uploaded_unix;
        html += movie.data.torrents[1];
        html += movie.data.torrents[1].url;
        html += movie.data.torrents[1].hash;
        html += movie.data.torrents[1].quality;
        html += movie.data.torrents[1].resolution;
        html += movie.data.torrents[1].framerate;
        html += movie.data.torrents[1].seeds;
        html += movie.data.torrents[1].peers;
        html += movie.data.torrents[1].size;
        html += movie.data.torrents[1].size_bytes;
        html += movie.data.torrents[1].download_count;
        html += movie.data.torrents[1].date_uploaded;
        html += movie.data.torrents[1].date_uploaded_unix;        
        $("#images_detalle").html(html);        
        $("#fullscreen_detail").attr('class','fullscreen_detail_in'); 
    });
};
function closeThis_detalle() {
    document.getElementById("images_detalle").innerHTML = "";
    $("#fullscreen_detail").attr('class','fullscreen_detail_out');
};	