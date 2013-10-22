if(jQuery){(function($){var isFirefox=navigator.userAgent.toLowerCase().indexOf("firefox")>-1,isMobile=/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test((navigator.userAgent||navigator.vendor||window.opera));var options={callback:function(){},cover:false,customClass:"",defaultLabel:false,externalLinks:false,links:false,trimOptions:false};var guid=0;var pub={defaults:function(opts){options=$.extend(options,opts||{});return $(this);},disable:function(option){return $(this).each(function(i,input){var data=$(input).next(".selecter").data("selecter");if(typeof option!="undefined"){var index=data.$items.index(data.$items.filter("[data-value="+option+"]"));data.$items.eq(index).addClass("disabled");data.$optionEls.eq(index).prop("disabled",true);}else{if(data.$selecter.hasClass("open")){data.$selecter.find(".selecter-selected").trigger("click");}data.$selecter.addClass("disabled");data.$selectEl.prop("disabled",true);}});},enable:function(option){return $(this).each(function(i,input){var data=$(input).next(".selecter").data("selecter");if(typeof option!="undefined"){var index=data.$items.index(data.$items.filter("[data-value="+option+"]"));data.$items.eq(index).removeClass("disabled");data.$optionEls.eq(index).prop("disabled",false);}else{data.$selecter.removeClass("disabled");data.$selectEl.prop("disabled",false);}});},destroy:function(){return $(this).each(function(i,input){var $input=$(input),$selecter=$input.next(".selecter");if($selecter.hasClass("open")){$selecter.find(".selecter-selected").trigger("click");}if($.fn.scroller!=undefined){$selecter.find(".selecter-options").scroller("destroy");}$input.off(".selecter").removeClass("selecter-element").show();$selecter.off(".selecter").remove();});}};function _init(opts){opts=$.extend({},options,opts||{});var $items=$(this);for(var i=0,count=$items.length;i<count;i++){_build($items.eq(i),opts);}return $items;}function _build($selectEl,opts){if(!$selectEl.data("selecter")){if(opts.externalLinks){opts.links=true;}$.extend(opts,$selectEl.data("selecter-options"));var $allOptionEls=$selectEl.find("option, optgroup"),$optionEls=$allOptionEls.filter("option"),$originalOption=$optionEls.filter(":selected"),originalIndex=(opts.defaultLabel)?-1:$optionEls.index($originalOption),totalItems=$allOptionEls.length-1,wrapperTag=(opts.links)?"nav":"div",itemTag=(opts.links)?"a":"span";opts.multiple=$selectEl.prop("multiple");opts.disabled=$selectEl.is(":disabled");var html="<"+wrapperTag+' class="selecter '+opts.customClass;if(isMobile){html+=" mobile";}else{if(opts.cover){html+=" cover";}}if(opts.multiple){html+=" multiple";}else{html+=" closed";}if(opts.disabled){html+=" disabled";}html+='">';if(!opts.multiple){html+='<span class="selecter-selected">';html+=_checkLength(opts.trimOptions,((opts.defaultLabel!=false)?opts.defaultLabel:$originalOption.text()));html+="</span>";}html+='<div class="selecter-options">';var j=0,$op=null;for(var i=0,count=$allOptionEls.length;i<count;i++){$op=$($allOptionEls[i]);if($op[0].tagName=="OPTGROUP"){html+='<span class="selecter-group';if($op.is(":disabled")){html+=" disabled";}html+='">'+$op.attr("label")+"</span>";}else{html+="<"+itemTag+' class="selecter-item';if($op.is(":selected")&&!opts.defaultLabel){html+=" selected";}if($op.is(":disabled")){html+=" disabled";}if(i==0){html+=" first";}if(i==totalItems){html+=" last";}html+='" ';if(opts.links){html+='href="'+$op.val()+'"';}else{html+='data-value="'+$op.val()+'"';}html+=">"+_checkLength(opts.trimOptions,$op.text())+"</"+itemTag+">";j++;}}html+="</div>";html+="</"+wrapperTag+">";$selectEl.addClass("selecter-element").after(html);var $selecter=$selectEl.next(".selecter");opts=$.extend({$selectEl:$selectEl,$optionEls:$optionEls,$selecter:$selecter,$selected:$selecter.find(".selecter-selected"),$itemsWrapper:$selecter.find(".selecter-options"),$items:$selecter.find(".selecter-item"),index:originalIndex,guid:guid},opts);if($.fn.scroller!=undefined){opts.$itemsWrapper.scroller();}$selecter.on("click.selecter",".selecter-selected",opts,_handleClick).on("click.selecter",".selecter-item",opts,_select).on("selecter-close",opts,_close).data("selecter",opts);if((!opts.links&&!isMobile)||isMobile){$selectEl.on("change",opts,_change).on("blur.selecter",opts,_blur);if(!isMobile){$selectEl.on("focus.selecter",opts,_focus);}}else{$selectEl.hide();}guid++;}}function _handleClick(e){e.preventDefault();e.stopPropagation();var data=e.data;if(!data.$selectEl.is(":disabled")){$(".selecter").not(data.$selecter).trigger("selecter-close",[data]);if(isMobile){var el=data.$selectEl[0];if(document.createEvent){var evt=document.createEvent("MouseEvents");evt.initMouseEvent("mousedown",true,true,window,0,0,0,0,0,false,false,false,false,0,null);el.dispatchEvent(evt);}else{if(element.fireEvent){el.fireEvent("onmousedown");}}}else{if(data.$selecter.hasClass("closed")){_open(e);}else{if(data.$selecter.hasClass("open")){_close(e);}}}}}function _open(e){e.preventDefault();e.stopPropagation();var data=e.data;if(!data.$selecter.hasClass("open")){var selectOffset=data.$selecter.offset(),bodyHeight=$("body").outerHeight(),optionsHeight=data.$itemsWrapper.outerHeight(true);if(selectOffset.top+optionsHeight>bodyHeight&&isMobile){data.$selecter.addClass("bottom");}else{data.$selecter.removeClass("bottom");}data.$itemsWrapper.show();data.$selecter.removeClass("closed").addClass("open");$("body").on("click.selecter-"+data.guid,":not(.selecter-options)",data,_closeListener);var selectedOffset=(data.index>=0)?data.$items.eq(data.index).position():{left:0,top:0};if($.fn.scroller!=undefined){data.$itemsWrapper.scroller("scroll",(data.$itemsWrapper.find(".scroller-content").scrollTop()+selectedOffset.top),0).scroller("reset");}else{data.$itemsWrapper.scrollTop(data.$itemsWrapper.scrollTop()+selectedOffset.top);}}}function _close(e){e.preventDefault();e.stopPropagation();var data=e.data;if(data.$selecter.hasClass("open")){data.$itemsWrapper.hide();data.$selecter.removeClass("open").addClass("closed");$("body").off(".selecter-"+data.guid);}}function _closeListener(e){e.preventDefault();e.stopPropagation();if($(e.currentTarget).parents(".selecter").length==0){_close(e);}}function _select(e){e.preventDefault();e.stopPropagation();var $target=$(this),data=e.data;if(!data.$selectEl.is(":disabled")){if(data.$itemsWrapper.is(":visible")){var index=data.$items.index($target);_update(index,data,false);}if(!data.multiple){_close(e);}}}function _change(e,internal){if(!internal){var $target=$(this),data=e.data;if(data.links){if(isMobile){_launch($target.val(),data.externalLinks);}else{_launch($target.attr("href"),data.externalLinks);}}else{var index=data.$optionEls.index(data.$optionEls.filter("[value='"+_escape($target.val())+"']"));_update(index,data,false);}}}function _focus(e){e.preventDefault();e.stopPropagation();var data=e.data;if(!data.$selectEl.is(":disabled")&&!data.multiple){data.$selecter.addClass("focus");$(".selecter").not(data.$selecter).trigger("selecter-close",[data]);$("body").on("keydown.selecter-"+data.guid,data,_keypress);}}function _blur(e){e.preventDefault();e.stopPropagation();var data=e.data;data.$selecter.removeClass("focus");$(".selecter").not(data.$selecter).trigger("selecter-close",[data]);$("body").off(".selecter-"+data.guid);}function _keypress(e){var data=e.data;if(data.$selecter.hasClass("open")&&e.keyCode==13){_update(data.index,data,false);_close(e);}else{if(e.keyCode!=9&&(!e.metaKey&&!e.altKey&&!e.ctrlKey&&!e.shiftKey)){e.preventDefault();e.stopPropagation();var total=data.$items.length-1,index=-1;if($.inArray(e.keyCode,(isFirefox)?[38,40,37,39]:[38,40])>-1){index=data.index+((e.keyCode==38||(isFirefox&&e.keyCode==37))?-1:1);if(index<0){index=0;}if(index>total){index=total;}}else{var input=String.fromCharCode(e.keyCode).toUpperCase();for(i=data.index+1;i<=total;i++){var letter=data.$optionEls.eq(i).text().charAt(0).toUpperCase();if(letter==input){index=i;break;}}if(index<0){for(i=0;i<=total;i++){var letter=data.$optionEls.eq(i).text().charAt(0).toUpperCase();if(letter==input){index=i;break;}}}}if(index>=0){_update(index,data,true);}}}}function _update(index,data,keypress){var $item=data.$items.eq(index),isSelected=$item.hasClass("selected"),isDisabled=$item.hasClass("disabled");if(!isDisabled){if(!isSelected||data.links){var newLabel=$item.html(),newValue=$item.data("value");if(data.multiple){data.$optionEls.eq(index).prop("selected",true);}else{data.$selected.html(newLabel);data.$items.filter(".selected").removeClass("selected");if(!keypress){data.$selectEl[0].selectedIndex=index;}if(data.links&&!keypress){if(isMobile){_launch(data.$selectEl.val(),data.externalLinks);}else{_launch($item.attr("href"),data.externalLinks);}return;}}data.$selectEl.trigger("change",[true]);$item.addClass("selected");}else{if(data.multiple){data.$optionEls.eq(index).prop("selected",null);$item.removeClass("selected");}}if(!isSelected||data.multiple){data.callback.call(data.$selecter,data.$selectEl.val(),index);data.index=index;}}}function _checkLength(length,text){if(length===false){return text;}else{if(text.length>length){return text.substring(0,length)+"...";}else{return text;}}}function _launch(link,external){if(external){window.open(link);}else{window.location.href=link;}}function _escape(str){return str.replace(/([;&,\.\+\*\~':"\!\^#$%@\[\]\(\)=>\|])/g,"\\$1");}$.fn.selecter=function(method){if(pub[method]){return pub[method].apply(this,Array.prototype.slice.call(arguments,1));}else{if(typeof method==="object"||!method){return _init.apply(this,arguments);}}return this;};})(jQuery);}