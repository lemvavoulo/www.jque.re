menu = {

category: "Menu & Navigation",

dir: 'menu-nav',

folders: [
"accordion",
"activebar",
"circle.menu",
"curtain",
"drill.down",
"drillable.menu",
"drop.menu",
"extremes",
"flickr.tooltip",
"foobar",
"google.play.tabs",
"homescreen",
"horizontal.dropdown",
"hover.menu",
"image.tabs",
"info.grid",
"jbar",
"jbreadcrumb",
"list.js",
"mean.menu",
"menu",
"nice.menu",
"pageslide",
"pushup.slider",
"random.list",
"ribbon-menu",
"site.feature",
"slideout.menu",
"slideout.side",
"smart.menu",
"sticklr.panel",
"tiny.nav",
"toolbar"
],
    
url: function(){return function(text,render){text=render(text);var url=plugins;return'<a class="btn btn-primary btn-large btn-warning sub-menu" href="'+url+''+text+'">'+capitaliseFirstLetter(text)+'</a>'}}

};