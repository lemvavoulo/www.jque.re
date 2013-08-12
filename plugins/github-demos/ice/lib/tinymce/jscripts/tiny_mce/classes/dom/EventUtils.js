(function(tinymce){var each=tinymce.each,DOM=tinymce.DOM,isIE=tinymce.isIE,isWebKit=tinymce.isWebKit,Event;tinymce.create("tinymce.dom.EventUtils",{EventUtils:function(){this.inits=[];this.events=[]},add:function(o,n,f,s){var cb,t=this,el=t.events,r;if(n instanceof Array){r=[];each(n,function(n){r.push(t.add(o,n,f,s))});return r}if(o&&o.hasOwnProperty&&o instanceof Array){r=[];each(o,function(o){o=DOM.get(o);r.push(t.add(o,n,f,s))});return r}o=DOM.get(o);if(!o){return}cb=function(e){if(t.disabled){return}e=e||window.event;if(e&&isIE){if(!e.target){e.target=e.srcElement}tinymce.extend(e,t._stoppers)}if(!s){return f(e)}return f.call(s,e)};if(n=="unload"){tinymce.unloads.unshift({func:cb});return cb}if(n=="init"){if(t.domLoaded){cb()}else{t.inits.push(cb)}return cb}el.push({obj:o,name:n,func:f,cfunc:cb,scope:s});t._add(o,n,cb);return f},remove:function(o,n,f){var t=this,a=t.events,s=false,r;if(o&&o.hasOwnProperty&&o instanceof Array){r=[];each(o,function(o){o=DOM.get(o);r.push(t.remove(o,n,f))});return r}o=DOM.get(o);each(a,function(e,i){if(e.obj==o&&e.name==n&&(!f||(e.func==f||e.cfunc==f))){a.splice(i,1);t._remove(o,n,e.cfunc);s=true;return false}});return s},clear:function(o){var t=this,a=t.events,i,e;if(o){o=DOM.get(o);for(i=a.length-1;i>=0;i--){e=a[i];if(e.obj===o){t._remove(e.obj,e.name,e.cfunc);e.obj=e.cfunc=null;a.splice(i,1)}}}},cancel:function(e){if(!e){return false}this.stop(e);return this.prevent(e)},stop:function(e){if(e.stopPropagation){e.stopPropagation()}else{e.cancelBubble=true}return false},prevent:function(e){if(e.preventDefault){e.preventDefault()}else{e.returnValue=false}return false},destroy:function(){var t=this;each(t.events,function(e,i){t._remove(e.obj,e.name,e.cfunc);e.obj=e.cfunc=null});t.events=[];t=null},_add:function(o,n,f){if(o.attachEvent){o.attachEvent("on"+n,f)}else{if(o.addEventListener){o.addEventListener(n,f,false)}else{o["on"+n]=f}}},_remove:function(o,n,f){if(o){try{if(o.detachEvent){o.detachEvent("on"+n,f)}else{if(o.removeEventListener){o.removeEventListener(n,f,false)}else{o["on"+n]=null}}}catch(ex){}}},_pageInit:function(win){var t=this;if(t.domLoaded){return}t.domLoaded=true;each(t.inits,function(c){c()});t.inits=[]},_wait:function(win){var t=this,doc=win.document;if(win.tinyMCE_GZ&&tinyMCE_GZ.loaded){t.domLoaded=1;return}if(doc.attachEvent){doc.attachEvent("onreadystatechange",function(){if(doc.readyState==="complete"){doc.detachEvent("onreadystatechange",arguments.callee);t._pageInit(win)}});if(doc.documentElement.doScroll&&win==win.top){(function(){if(t.domLoaded){return}try{doc.documentElement.doScroll("left")}catch(ex){setTimeout(arguments.callee,0);return}t._pageInit(win)})()}}else{if(doc.addEventListener){t._add(win,"DOMContentLoaded",function(){t._pageInit(win)})}}t._add(win,"load",function(){t._pageInit(win)})},_stoppers:{preventDefault:function(){this.returnValue=false},stopPropagation:function(){this.cancelBubble=true}}});Event=tinymce.dom.Event=new tinymce.dom.EventUtils();Event._wait(window);tinymce.addUnload(function(){Event.destroy()})})(tinymce);