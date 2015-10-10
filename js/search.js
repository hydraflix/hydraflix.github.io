
        var api_key_var = "6bfa3dcea2a98224182cd3f146603b24685d8de0";
        var myParam = location.search.split('q=')[1];
        $.getJSON("http://crossorigin.me/https://zzlbox.com/api/plugins/metasearch?q=" + myParam + "&api_key=" + api_key_var + "&jsonp;", function(data){
          var data_url_pls = data.files[0].url_pls;
           $.get('http://crossorigin.me/'+data_url_pls, function(xml){ var json = $.xml2json(xml); 
            console.log(json.trackList.track[0].location); 
           }); // json.trackList.track.location

        });
