forms = {

category: "Forms & Controls",

dir: 'forms-controls',

folders: [
"addclear",
"charcount",
"chosen",
"contactable",
"default.text",
"dropkick",
"fancy.form",
"field.labels",
"fontselect",
"formalize",
"formidable",
"input.notes",
"jquery.numeric",
"jquery.percentageloader",
"jquery.selectable",
"jquery-knob",
"living.forms",
"long.press",
"markitup",
"pickadate",
"plumform",
"quick.tag",
"redactor",
"searchabledropdown",
"select2Buttons",
"selectmenu",
"simple-edit",
"spinner",
"superlabels",
"tabselect",
"tags.input",
"timepicker",
"uniform"
],
    
url: function(){return function(text,render){text=render(text);var url=plugins;return'<a class="btn btn-primary btn-large btn-warning sub-menu" href="'+url+''+text+'">'+capitaliseFirstLetter(text)+'</a>'}}

};