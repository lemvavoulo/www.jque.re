slide = {

category: "Sliders",

dir: 'sliders',

folders: [
"coin.slider",
"elastislide",
"jquery.glideto",
"pristine.slider",
"responsive.slides",
"scrollpath",
"showcase",
"slides.js"
],
    
url: function(){return function(text,render){text=render(text);var url=plugins;return'<a class="btn btn-primary btn-large btn-warning sub-menu" href="'+url+''+text+'">'+capitaliseFirstLetter(text)+'</a>'}}

};