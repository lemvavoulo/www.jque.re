/*!

Huge on Facebook: a script to attach the number of Facebook likes to any list of arbitrary links.
http://gfscott.com/hof/
Copyright (c) 2012 Graham F. Scott
Licensed under the MIT License: http://opensource.org/licenses/mit-license
Requires: jQuery 1.3.0+ or Zepto 0.8+ 
Version: 1.3.1
No hotlinking scripts please!
*/
(function($){$.fn.hugeOnFacebook=function(options){var defaults={linkClass:"",addData:false,minLikes:10,hugeLikes:50,popClass:"popular",hugeClass:"hugeonfacebook",likesVisible:false,likesVisibleClass:"likesVisible"};var settings=$.extend({},defaults,options);if(this.attr("id")){var targetID="#"+this.attr("id")+" ";}else{if(this.attr("class")){var targetClass="."+this.attr("class");}else{}}if(settings.linkClass){var theLinks="."+settings.linkClass;}else{if(targetClass){var theLinks=targetClass;}else{var theLinks="";}}if(targetID){var theContainer=targetID;}else{var theContainer="";}$(theContainer+"a"+theLinks).each(function(){var self=$(this),href=self.attr("href"),url="http://graph.facebook.com/"+href;$.getJSON(url,function(data){var count=data.shares;if(count>=settings.minLikes){self.addClass(settings.popClass);if(count>=settings.hugeLikes){self.addClass(settings.hugeClass);}if(settings.likesVisible){self.append('<span class="'+settings.likesVisibleClass+'">'+count+" Likes</span>");}if(settings.addData){self.attr("data-likes",count);}}});});};})(window.jQuery||window.Zepto);