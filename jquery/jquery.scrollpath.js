(function($,window,document,undefined){var PREFIX="-"+getVendorPrefix().toLowerCase()+"-",HAS_TRANSFORM_SUPPORT=supportsTransforms(),HAS_CANVAS_SUPPORT=supportsCanvas(),FPS=30,STEP_SIZE=10,isInitiated=false,isDragging=false,isAnimating=false,step,pathObject,pathList,element,scrollBar,scrollHandle,speeds={scrollSpeed:50,rotationSpeed:Math.PI/15},settings={wrapAround:false,drawPath:false,scrollBar:true},methods={init:function(options){if(this.length>1||isInitiated){$.error("jQuery.scrollPath can only initialized on *one* element *once*")}$.extend(settings,options);isInitiated=true;element=this;pathList=pathObject.getPath();initCanvas();initScrollBar();scrollToStep(0);element.css("position","relative");$(document).on({mousewheel:scrollHandler,DOMMouseScroll:scrollHandler,keydown:keyHandler});$(window).on("resize",function(){scrollToStep(step)});return this},getPath:function(options){$.extend(speeds,options);return pathObject||(pathObject=new Path(speeds.scrollSpeed,speeds.rotationSpeed))},scrollTo:function(name,duration,easing,callback){var destination=findStep(name);if(destination===null){$.error("jQuery.scrollPath could not find scroll target with name '"+name+"'")}var distance=destination-step;if(settings.wrapAround&&Math.abs(distance)>pathList.length/2){if(destination>step){distance=-step-pathList.length+destination}else{distance=pathList.length-step+destination}}animateSteps(distance,duration,easing,callback)}};function Path(scrollS,rotateS){var PADDING=40,scrollSpeed=scrollS,rotationSpeed=rotateS,xPos=0,yPos=0,rotation=0,width=0,height=0,offsetX=0,offsetY=0,canvasPath=[{method:"moveTo",args:[0,0]}],path=[],defaults={rotate:null,callback:null,name:null};this.rotate=function(radians,options){var settings=$.extend({},defaults,options),rotDistance=Math.abs(radians-rotation),steps=Math.round(rotDistance/rotationSpeed)*STEP_SIZE,rotStep=(radians-rotation)/steps,i=1;if(!HAS_TRANSFORM_SUPPORT){if(settings.name||settings.callback){this.moveTo(xPos,yPos,{callback:settings.callback,name:settings.name})}return}for(;i<=steps;i++){path.push({x:xPos,y:yPos,rotate:rotation+rotStep*i,callback:i===steps?settings.callback:null,name:i===steps?settings.name:null})}rotation=radians%(Math.PI*2)};this.moveTo=function(x,y,options){var settings=$.extend({},defaults,options),steps=path.length?STEP_SIZE:1;i=0;for(;i<steps;i++){path.push({x:x,y:y,rotate:settings.rotate!==null?settings.rotate:rotation,callback:i===steps-1?settings.callback:null,name:i===steps-1?settings.name:null})}setPos(x,y);updateCanvas(x,y);canvasPath.push({method:"moveTo",args:arguments})};this.lineTo=function(x,y,options){var settings=$.extend({},defaults,options),relX=x-xPos,relY=y-yPos,distance=hypotenuse(relX,relY),steps=Math.round(distance/scrollSpeed)*STEP_SIZE,xStep=relX/steps,yStep=relY/steps,canRotate=settings.rotate!==null&&HAS_TRANSFORM_SUPPORT,rotStep=(canRotate?(settings.rotate-rotation)/steps:0),i=1;for(;i<=steps;i++){path.push({x:xPos+xStep*i,y:yPos+yStep*i,rotate:rotation+rotStep*i,callback:i===steps?settings.callback:null,name:i===steps?settings.name:null})}rotation=(canRotate?settings.rotate:rotation);setPos(x,y);updateCanvas(x,y);canvasPath.push({method:"lineTo",args:arguments})};this.arc=function(centerX,centerY,radius,startAngle,endAngle,counterclockwise,options){var settings=$.extend({},defaults,options),startX=centerX+Math.cos(startAngle)*radius,startY=centerY+Math.sin(startAngle)*radius,endX=centerX+Math.cos(endAngle)*radius,endY=centerY+Math.sin(endAngle)*radius,angleDistance=sectorAngle(startAngle,endAngle,counterclockwise),distance=radius*angleDistance,steps=Math.round(distance/scrollSpeed)*STEP_SIZE,radStep=angleDistance/steps*(counterclockwise?-1:1),canRotate=settings.rotate!==null&&HAS_TRANSFORM_SUPPORT,rotStep=(canRotate?(settings.rotate-rotation)/steps:0),i=1;if(xPos!==startX||yPos!==startY){this.lineTo(startX,startY)}for(;i<=steps;i++){path.push({x:centerX+radius*Math.cos(startAngle+radStep*i),y:centerY+radius*Math.sin(startAngle+radStep*i),rotate:rotation+rotStep*i,callback:i===steps?settings.callback:null,name:i===steps?settings.name:null})}rotation=(canRotate?settings.rotate:rotation);setPos(endX,endY);updateCanvas(centerX+radius,centerY+radius);updateCanvas(centerX-radius,centerY-radius);canvasPath.push({method:"arc",args:arguments})};this.getPath=function(){return path};this.getCanvasPath=function(){var i=0;for(;i<canvasPath.length;i++){canvasPath[i].args[0]-=this.getPathOffsetX();canvasPath[i].args[1]-=this.getPathOffsetY()}return canvasPath};this.getPathWidth=function(){return width-offsetX+PADDING};this.getPathHeight=function(){return height-offsetY+PADDING};this.getPathOffsetX=function(){return offsetX-PADDING/2};this.getPathOffsetY=function(){return offsetY-PADDING/2};function setPos(x,y){xPos=x;yPos=y}function updateCanvas(x,y){offsetX=Math.min(x,offsetX);offsetY=Math.min(y,offsetY);width=Math.max(x,width);height=Math.max(y,height)}}$.fn.scrollPath=function(method){if(methods[method]){return methods[method].apply(this,Array.prototype.slice.call(arguments,1))}else{if(typeof method==="object"||!method){return methods.init.apply(this,arguments)}else{$.error("Method "+method+" does not exist on jQuery.scrollPath")}}};function initScrollBar(){if(!settings.scrollBar){return}scrollBar=$("<div>").addClass("sp-scroll-bar").on("click",function(e){var clickStep=Math.round(e.offsetY/scrollBar.height()*(pathList.length-1));if(Math.abs(clickStep-step)>5){clickStep=step+(5*STEP_SIZE*(clickStep>step?1:-1))}scrollToStep(clickStep);e.preventDefault();return false});scrollHandle=$("<div>").addClass("sp-scroll-handle").on({click:function(e){e.preventDefault();return false},mousedown:function(e){isDragging=true;e.preventDefault();return false}});$(document).on({mouseup:function(e){isDragging=false},mousemove:function(e){if(isDragging){dragScrollHandler(e)}}});$("body").prepend(scrollBar.append(scrollHandle))}function initCanvas(){if(!settings.drawPath||!HAS_CANVAS_SUPPORT){return}var canvas,style={position:"absolute","z-index":9998,left:pathObject.getPathOffsetX(),top:pathObject.getPathOffsetY(),"pointer-events":"none"};applyPrefix(style,"user-select","none");applyPrefix(style,"user-drag","none");canvas=$("<canvas>").addClass("sp-canvas").css(style).prependTo(element);canvas[0].width=pathObject.getPathWidth();canvas[0].height=pathObject.getPathHeight();drawCanvasPath(canvas[0].getContext("2d"),pathObject.getCanvasPath())}function drawCanvasPath(context,path){var i=0;context.shadowBlur=15;context.shadowColor="black";context.strokeStyle="white";context.lineJoin="round";context.lineCap="round";context.lineWidth=10;for(;i<path.length;i++){context[path[i].method].apply(context,path[i].args)}context.stroke()}function scrollHandler(e){var scrollDelta=e.originalEvent.wheelDelta||-e.originalEvent.detail,dir=scrollDelta/(Math.abs(scrollDelta));e.preventDefault();$(window).scrollTop(0).scrollLeft(0);scrollSteps(-dir*STEP_SIZE)}function keyHandler(e){if(/^text/.test(e.target.type)){return}switch(e.keyCode){case 40:scrollSteps(STEP_SIZE);break;case 38:scrollSteps(-STEP_SIZE);break;case 32:scrollSteps(5*STEP_SIZE*(e.shiftKey?-1:1));break}}function dragScrollHandler(e){var dragStep,y=e.clientY-scrollBar.offset().top;dragStep=limitWithin(Math.round(y/scrollBar.height()*(pathList.length-1)),0,pathList.length-1);scrollToStep(snap(dragStep,STEP_SIZE))}function scrollSteps(steps){scrollToStep(wrapStep(step+steps))}function animateSteps(steps,duration,easing,callback){if(steps===0||isAnimating){return}if(!duration||typeof duration!=="number"){if(typeof duration==="function"){duration()}return scrollSteps(steps)}isAnimating=true;var frames=(duration/1000)*FPS,startStep=step,currentFrame=0,easedSteps,interval=setInterval(function(){easedSteps=Math.round(($.easing[easing]||$.easing.swing)(++currentFrame/frames,duration/frames*currentFrame,0,steps,duration));scrollToStep(wrapStep(startStep+easedSteps),true);if(currentFrame===frames){clearInterval(interval);if(typeof easing==="function"){easing()}else{if(callback){callback()}}isAnimating=false}},duration/frames)}function scrollToStep(stepParam,fromAnimation){if(isAnimating&&!fromAnimation){return}var cb=pathList[stepParam].callback;element.css(makeCSS(pathList[stepParam]));if(scrollHandle){scrollHandle.css("top",stepParam/(pathList.length-1)*(scrollBar.height()-scrollHandle.height())+"px")}if(cb&&stepParam!==step){cb()}step=stepParam}function findStep(name){var i=0;for(;i<pathList.length;i++){if(pathList[i].name===name){return i}}return null}function wrapStep(wStep){if(settings.wrapAround){if(isAnimating){while(wStep<0){wStep+=pathList.length}while(wStep>=pathList.length){wStep-=pathList.length}}else{if(wStep<0){wStep=pathList.length-1}if(wStep>=pathList.length){wStep=0}}}else{wStep=limitWithin(wStep,0,pathList.length-1)}return wStep}function makeCSS(node){var centeredX=node.x-$(window).width()/2,centeredY=node.y-$(window).height()/2,style={};if(normalizeAngle(node.rotate)===0){style.left=-centeredX;style.top=-centeredY;applyPrefix(style,"transform-origin","");applyPrefix(style,"transform","")}else{style.left=style.top="";applyPrefix(style,"transform-origin",node.x+"px "+node.y+"px");applyPrefix(style,"transform","translate("+-centeredX+"px, "+-centeredY+"px) rotate("+node.rotate+"rad)")}return style}function getVendorPrefix(){var regex=/^(Moz|Webkit|Khtml|O|ms|Icab)(?=[A-Z])/,someScript=document.getElementsByTagName("script")[0];for(var prop in someScript.style){if(regex.test(prop)){return prop.match(regex)[0]}}if("WebkitOpacity" in someScript.style){return"Webkit"}if("KhtmlOpacity" in someScript.style){return"Khtml"}return""}function applyPrefix(style,prop,value){style[PREFIX+prop]=style[prop]=value}function supportsTransforms(){var testStyle=document.createElement("dummy").style,testProps=["transform","WebkitTransform","MozTransform","OTransform","msTransform","KhtmlTransform"],i=0;for(;i<testProps.length;i++){if(testStyle[testProps[i]]!==undefined){return true}}return false}function supportsCanvas(){return !!document.createElement("canvas").getContext}function sectorAngle(start,end,ccw){var nStart=normalizeAngle(start),nEnd=normalizeAngle(end),diff=Math.abs(nStart-nEnd),invDiff=Math.PI*2-diff;if((ccw&&nStart<nEnd)||(!ccw&&nStart>nEnd)||(nStart===nEnd&&start!==end)){return invDiff}return diff}function limitWithin(value,lowerLimit,upperLimit){if(value>upperLimit){return upperLimit}else{if(value<lowerLimit){return lowerLimit}}return value}function snap(value,snapValue){var mod=value%snapValue;if(mod>snapValue/2){return value+snapValue-mod}return value-mod}function normalizeAngle(angle){while(angle<0){angle+=Math.PI*2}return angle%(Math.PI*2)}function hypotenuse(x,y){return Math.sqrt(x*x+y*y)}})(jQuery,window,document);