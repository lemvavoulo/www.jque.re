social = {

category: "Social Media",

dir: 'social',

folders: [
"50c1al",
"autopin",
"feed.menu",
"googleplusone.shiney",
"ishare.widget",
"jquery.social.flair",
"lifestream",
"sharethis",
"social.share.cards",
"social.share.privacy",
"video.poster.image",
"youtube.background"
],
    
url: function(){return function(text,render){text=render(text);var url=plugins;return'<a class="btn btn-primary btn-large btn-warning sub-menu" href="'+url+''+text+'">'+capitaliseFirstLetter(text)+'</a>'}}

};