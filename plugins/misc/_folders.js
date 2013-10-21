misc = {

category: "Misc &amp; Random",

dir: 'misc',

folders: [
"browzr",
"flickr.loading",
"google.image.search",
"intelligist",
"jreject",
"noisy",
"peity",
"pretty.loader",
"snake",
"spin.js",
"timeago",
"toc"
],
    
url: function(){return function(text,render){text=render(text);var url=plugins;return'<a class="btn btn-primary btn-large btn-warning sub-menu" href="'+url+''+text+'">'+capitaliseFirstLetter(text)+'</a>'}}

};