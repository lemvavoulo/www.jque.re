twitter = {

category: "Twitter",

dir: 'twitter',

folders: [
"livetwitter",
"tweet!",
"tweetable"
],
    
url: function(){return function(text,render){text=render(text);var url=plugins;return'<a class="btn btn-primary btn-large btn-warning sub-menu" href="'+url+''+text+'">'+capitaliseFirstLetter(text)+'</a>'}}

};