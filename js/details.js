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
        html += '<div class="row" style="margin-top: -50px;">';
        html += '<div class="col-md-4"><img class="" title="'+movie.data.title+'" alt="'+movie.data.title+'" src="'+id3+'" style="height: 360px; position: relative; float: right;"/></div>';
        html += '<div id="html_bg_play" class="col-md-8 hover-pointer hover-luz" onclick="f_play(&#39;'+movie.data.torrents[0].hash+'&#39;,&#39;'+movie.data.imdb_code+'&#39;)" style="width: 100%; max-width: 640px; height: 360px; background-position: cover; background-size: cover;">';  
        html += '<img class="hover-pointer" src="http://i.imgur.com/3n9rl.png" onclick="f_play(&#39;'+movie.data.torrents[0].hash+'&#39;,&#39;'+movie.data.imdb_code+'&#39;)" style="position: relative; top:50%;left:50%;margin-top:-45px;margin-left:-45px;"/>';
        api_number1 = Math.round(Math.random()*(6-0)+0); // The lefty number is the total quantity of element-1
        api_number2 = api_number1+1;
        api_list = ["93979e5200c4e0c9f75a516dec8dfe0180a785b2", "fae4a7c8bc2dd28f7d505a67f6b6efd33869733d", "35221d40fb165ebe1bcb2fd0af6e102b563dd906", "d925f3c996b41ad878a0b592d4dacc579db0e2ba", "bf5a6aff46a86d36779d3af00d004f4fd19368c0", "369cb28d46df42881bd2aa1373544e3dc46ec062", "5b3018cd4332f3783cd6a8e32c461cf425ed3759"];
        api_key_var = api_list.slice(api_number1,api_number2);
        var num_aleatorio = Math.floor(Math.random() * 51) + 25;
        jsonp_var = ";jsonp=?";            
        $.getJSON("http://api.furk.net/api/dl/add?info_hash=" + movie.data.torrents[0].hash + "&t_files=1&api_key=" + api_key_var + jsonp_var, function(data){
            $("#html_bg_play").css('background-image', 'url(http://crossorigin.me/'+data.files[0].ss_urls[4]+')');
        });
        html += '</div>';
        html += '</div>';
        /*
        // features coming soon ! =)
        html += '<div class="col-md-12">'
        html += '<p>'+movie.status+'</p><br><p>'+movie.status_message+'</p><br><p>'+movie.data.id+'</p><br><p>'+movie.data.url+'</p><br><p>'+movie.data.imdb_code+'</p><br><p>'+movie.data.title+'</p><br><p>'+movie.data.title_long+'</p><br><p>'+movie.data.slug+'</p><br><p>'+movie.data.year+'</p><br><p>'+movie.data.rating+'</p><br><p>'+movie.data.runtime+'</p><br><p>'+movie.data.genres[0]+'</p><br><p>'+movie.data.language+'</p><br><p>'+movie.data.mpa_rating+'</p><br><p>'+movie.data.download_count+'</p><br><p>'+movie.data.like_count+'</p><br><p>'+movie.data.rt_critics_score+'</p><br><p>'+movie.data.rt_critics_rating+'</p><br><p>'+movie.data.rt_audience_score+'</p><br><p>'+movie.data.rt_audience_rating+'</p><br><p>'+movie.data.description_intro+'</p><br><p>'+movie.data.description_full+'</p><br><p>'+movie.data.yt_trailer_code+'</p><br><p>'+movie.data.date_uploaded+'</p><br><p>'+movie.data.date_uploaded_unix+'</p><div class="movie-box movie-box-'+movie.data.genres[0]+'" style="background-image:url('+movie.data.background_image+');background-position:center;background-size:cover;background-repeat:no-repeat;position:relative;float:left;"></div>';
        html += movie.data.torrents[0].url;
        html += '<br>';
        html += movie.data.torrents[0].hash;
        html += '<br>';
        html += movie.data.torrents[0].quality;
        html += '<br>';
        html += movie.data.torrents[0].resolution;
        html += '<br>';
        html += movie.data.torrents[0].framerate;
        html += '<br>';
        html += movie.data.torrents[0].seeds;
        html += '<br>';
        html += movie.data.torrents[0].peers;
        html += '<br>';
        html += movie.data.torrents[0].size ;
        html += '<br>';
        html += movie.data.torrents[0].size_bytes;
        html += '<br>';
        html += movie.data.torrents[0].download_count;
        html += '<br>';
        html += movie.data.torrents[0].date_uploaded;
        html += '<br>';
        html += movie.data.torrents[0].date_uploaded_unix;
        html += '<br>';
        html += movie.data.torrents[1];
        html += '<br>';
        html += movie.data.torrents[1].url;
        html += '<br>';
        html += movie.data.torrents[1].hash;
        html += '<br>';
        html += movie.data.torrents[1].quality;
        html += '<br>';
        html += movie.data.torrents[1].resolution;
        html += '<br>';
        html += movie.data.torrents[1].framerate;
        html += '<br>';
        html += movie.data.torrents[1].seeds;
        html += '<br>';
        html += movie.data.torrents[1].peers;
        html += '<br>';
        html += movie.data.torrents[1].size;
        html += '<br>';
        html += movie.data.torrents[1].size_bytes;
        html += '<br>';
        html += movie.data.torrents[1].download_count;
        html += '<br>';
        html += movie.data.torrents[1].date_uploaded;
        html += '<br>';
        html += movie.data.torrents[1].date_uploaded_unix;  
        html += '</div>'   
        */
        $("#images_detalle").html(html);        
        $("#fullscreen_detail").attr('class','fullscreen_detail_in');       
    });
};
function closeThis_detalle() {
    document.getElementById("images_detalle").innerHTML = "";
    $("#fullscreen_detail").attr('class','fullscreen_detail_out');
};