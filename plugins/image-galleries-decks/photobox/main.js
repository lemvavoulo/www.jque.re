!(function(){var numOfImages=window.location.search?parseInt(window.location.search.match(/\d+$/)[0]):80;$.ajax({url:"http://api.flickr.com/services/rest/",data:{format:"json",method:"flickr.interestingness.getList",per_page:numOfImages,api_key:"b51d3a7c3988ba6052e25cb152aecba2"},dataType:"jsonp",jsonp:"jsoncallback"}).done(function(data){var gallery=$("#gallery");$.each(data.photos.photo,function(index,photo){var url="http://farm"+photo.farm+".static.flickr.com/"+photo.server+"/"+photo.id+"_"+photo.secret,img=new Image();img.onload=function(e){console.log(this["largeUrl"]);var link=document.createElement("a"),li=document.createElement("li");link.href=this.largeUrl;link.appendChild(this);li.appendChild(link);gallery[0].appendChild(li);setTimeout(function(){li.className="loaded";},20*index);};img.largeUrl=url+"_b.jpg";img.src=url+"_t.jpg";img.title=photo.title;});$("#gallery").photobox("a",{thumbs:true},callback);function callback(){console.log("loaded!");}});})();