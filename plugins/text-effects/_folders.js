text = {

category: "Text Effects",

dir: 'text-effects',

folders: [
"ascensor",
"backgrounder",
"bgstretcher",
"content.carousel",
"fullscreenr",
"FullscreenSlitSlider",
"galleria",
"greyscale",
"imageloader",
"jquery-screen",
"minimit",
"photobox",
"photofy",
"sequence",
"sideways",
"supersized",
"tiler",
"vegas",
"zoomer"
],
    
url: function(){return function(text,render){text=render(text);var url=plugins;return'<a class="btn btn-primary btn-large btn-warning sub-menu" href="'+url+''+text+'">'+capitaliseFirstLetter(text)+'</a>'}}

};