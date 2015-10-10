        // obtener srt
        
            //  opensubtitles
            //  probar con mimic.js
            //  
            //  XML-RPC
            //  https://github.com/timheap/jquery-xmlrpc
            //  https://github.com/stac47/js-xml-rpc
            //  http://userscripts-mirror.org/topics/212719.html
            //  https://github.com/search?l=JavaScript&p=2&q=XML-RPC&type=Repositories&utf8=%E2%9C%93
            var loginRequest= new XmlRpcRequest("http://crossorigin.me/http://api.opensubtitles.org/xml-rpc", "LogIn");
loginRequest.params = (['hydraflix', 'apestan1985', 'eng', 'Mozilla/5.0 (Windows NT 5.1)']);
var response1= loginRequest.send();
var token=String(response1.parseXML().token);
console.log(token);

var searchRequest = new XmlRpcRequest("http://crossorigin.me/http://api.opensubtitles.org/xml-rpc", "SearchSubtitles");
searchRequest.addParam(token);
searchRequest.addParam([{query: 'South Park'}]);
var results = searchRequest.send();
console.log(results.parseXML());
            //  http://www.chinabtp.com/opensubtitles-api-searchsubtitles-returns-no-data/
            //  http://trac.opensubtitles.org/projects/opensubtitles/wiki/HashSourceCodes        
        // 
        // 
            // http://api.getsubtitle.com/#
                // http://www.subtitles4free.net/search-subtitles-Mr.+Robot+%282015%29+S01E05-0-spa-all-1.htm
                    // <div class="divBigBtn"><a href="Mr-Robot-2015-9762453-subtitles.htm" style="color:#fff;text-decoration:none;font-size:13px;">Download Subtitle</a></div>
                        // title:39158514
                            // http://www.getsubtitle.com/webService/download_subtitle.php?cod_bsplayer=39158514
            
            $.get("http://alloworigin.com/get?url=" + encodeURIComponent("http://www.subtitles4free.net/search-subtitles-Mr.+Robot+%282015%29+S01E05-0-spa-all-1.htm") + "&callback=?", function(data){
                alert(data.contents);
            });

            $('.div_class').load('http://alloworigin.com/get?url='+encodeURIComponent('http://www.subtitles4free.net/search-subtitles-Mr.+Robot+%282015%29+S01E05-0-spa-all-1.htm'));

            // http://alloworigin.com/get?url=" + encodeURIComponent("http://www.subtitles4free.net/search-subtitles-Mr.+Robot+%282015%29+S01E05-0-spa-all-1.htm") + "&callback=?            
            
            // https://www.tv-subs.com/tv/mr-robot/season-1/episode-4/
            // http://es.tvsubtitles.net/download-167745.html
            // http://www.tvsubs.net/tvshow-1776-1.html
            // http://subsmax.com/subtitles-api/
            // http://subsmax.com/api/50/new-girl-spanish
            // http://api.subtitleseeker.com/search/?api_key=API_KEY&q=True Blood s03&search_in=tv_episodes&return_type=json 
            // http://api.subtitleseeker.com/get/title_subtitles/?api_key=24430affe80bea1edf0e8413c3abf372a64afff2&imdb=0247082&season=14&episode=11&language=English&return_type=json
            // http://dl.opensubtitles.org/es/download/sub/5337747
            // http://www.opensubtitles.org/es/subtitles/5337747/csi-crime-scene-investigation-the-lost-reindeer-en