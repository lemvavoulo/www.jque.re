modal = {

category: "Modals & Lightboxes",

dir: 'modals-lightboxes',

folders: [
"colorbox",
"facebox",
"jnotice",
"jquery.msgbox",
"jquery.popeye",
"leanmodal",
"modaldialog",
"notification",
"reveal",
"sexy.lightbox",
"smoke.js",
"ulightbox",
"zebra-dialog"
],
    
url: function(){return function(text,render){text=render(text);var url=plugins;return'<a class="btn btn-primary btn-large btn-warning sub-menu" href="'+url+''+text+'">'+capitaliseFirstLetter(text)+'</a>'}}

};