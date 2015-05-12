;function defineProperty(target,propertyName,params){params.enumerable=true;params.configurable=true;Object.defineProperty(target,propertyName,params);};function extendClass(parent){return $.extend(true,{},parent);};function extendProperty(target,parent,propertyName){Object.defineProperty(target,propertyName,Object.getOwnPropertyDescriptor(parent,propertyName));};function extendFunction(target,parent,propertyName){target[propertyName]=parent[propertyName];};var ASJS={};var includedScript={};function includeOnce(filename){if(includedScript[filename])return;includedScript[filename]=1;$.ajaxSetup({async:false});$.getScript(filename);$.ajaxSetup({async:true});};ASJS.inited;var stage;ASJS.startASJS=function(baseClass){if(ASJS.inited)return;ASJS.inited=true;$(document).ready(function(){stage=new ASJS.Stage().instance;new baseClass();});};ASJS.Point=function(tx,ty){var that={};var _x=tx||0;var _y=ty||0;defineProperty(that,"x",{get:function(){return _x;},set:function(value){_x=value;}});defineProperty(that,"y",{get:function(){return _y;},set:function(value){_y=value;}});return that;};ASJS.Mouse=function(){function MouseInstance(){var that={};var _mouseX=0;var _mouseY=0;defineProperty(that,"mouseX",{get:function(){return _mouseX;}});defineProperty(that,"mouseY",{get:function(){return _mouseY;}});that.show=function(){$("body").css("cursor","default");};that.hide=function(){$("body").css("cursor","none");};that.getRelativePosition=function(value){if(!value)throw new Error("Mouse.getRelativePosition: Value is null");return value.globalToLocal(new ASJS.Point(that.mouseX,that.mouseY));};(function(){$(window).on("mousemove",function(event){_mouseX=event.pageX;_mouseY=event.pageY;});})();return that;};defineProperty(this,"instance",{get:function(){if(!ASJS.Mouse.$)ASJS.Mouse.$=new MouseInstance();return ASJS.Mouse.$;}});};ASJS.DisplayObject=function(domElement){var that={};var _rotation=0;var _parent=null;var _cssDisplay="block";defineProperty(that,"id",{get:function(){return that.getAttr("id");},set:function(value){that.setAttr("id",value);}});defineProperty(that,"enabled",{get:function(){return that.getAttr("disabled")!="disabled";},set:function(value){if(value){that.domObject.removeAttr("disabled");that.setCSS("pointer-events","auto");}else{that.setAttr("disabled","disabled");that.setCSS("pointer-events","none");}}});defineProperty(that,"display",{get:function(){return _cssDisplay;},set:function(value){_cssDisplay=value;that.setCSS("display",_cssDisplay);}});defineProperty(that,"html",{get:function(){return that.domObject.html();},set:function(value){that.domObject.html(value);}});defineProperty(that,"text",{get:function(){return that.domObject.text();},set:function(value){that.domObject.text(value);}});defineProperty(that,"visible",{get:function(){return that.getCSS("display")!="none";},set:function(value){that.setCSS("display",value?_cssDisplay:"none");}});defineProperty(that,"alpha",{get:function(){return parseFloat(that.getCSS("opacity"));},set:function(value){that.setCSS("opacity",value);}});defineProperty(that,"x",{get:function(){return parseFloat(that.getCSS("left"));},set:function(value){that.setCSS("left",value);}});defineProperty(that,"y",{get:function(){return parseFloat(that.getCSS("top"));},set:function(value){that.setCSS("top",value);}});defineProperty(that,"calcX",{get:function(){return that.x+parseFloat(that.getCSS("marginLeft"));}});defineProperty(that,"calcY",{get:function(){return that.y+parseFloat(that.getCSS("marginTop"));}});defineProperty(that,"right",{get:function(){return parseFloat(that.getCSS("right"));},set:function(value){that.setCSS("right",value);}});defineProperty(that,"bottom",{get:function(){return parseFloat(that.getCSS("bottom"));},set:function(value){that.setCSS("bottom",value);}});defineProperty(that,"width",{get:function(){return that.domObject.width();},set:function(value){that.setCSS("width",value);}});defineProperty(that,"height",{get:function(){return that.domObject.height();},set:function(value){that.setCSS("height",value);}});defineProperty(that,"calcWidth",{get:function(){return that.width+parseFloat(that.getCSS("paddingLeft"))+parseFloat(that.getCSS("paddingRight"));}});defineProperty(that,"calcHeight",{get:function(){return that.height+parseFloat(that.getCSS("paddingTop"))+parseFloat(that.getCSS("paddingBottom"));}});defineProperty(that,"rotation",{get:function(){return _rotation;},set:function(value){_rotation=parseFloat(value);that.setCSS("transform",'rotate('+_rotation+'deg)');}});defineProperty(that,"parent",{get:function(){return _parent;},set:function(value){var prevParent=_parent;_parent=value;if(_parent&&!prevParent)that.addedToStage();else if(!_parent&&prevParent)that.removedFromStage();}});defineProperty(that,"mouseX",{get:function(){return new ASJS.Mouse().instance.getRelativePosition(that).x;}});defineProperty(that,"mouseY",{get:function(){return new ASJS.Mouse().instance.getRelativePosition(that).y;}});that.getCSS=function(key){return that.domObject.css(key);};that.setCSS=function(key,value){that.domObject.css(key,value);};that.addClass=function(value){return that.domObject.addClass(value);};that.removeClass=function(value){that.domObject.removeClass(value);};that.getAttr=function(key){return that.domObject.attr(key);};that.setAttr=function(key,value){that.domObject.attr(key,value);};that.hitTest=function(point){var rotationDeg=-that.rotation*ASJS.DisplayObject.THETA;var globalPos=that.localToGlobal(new ASJS.Point(0,0));var diffPoint=new ASJS.Point(point.x-(globalPos.x+that.calcWidth*0.5),point.y-(globalPos.y+that.calcHeight*0.5));var rotatedDiffPoint=new ASJS.Point(diffPoint.x*Math.cos(rotationDeg)-diffPoint.y*Math.sin(rotationDeg),diffPoint.x*Math.sin(rotationDeg)+diffPoint.y*Math.cos(rotationDeg));var recalcPoint=new ASJS.Point(point.x-(diffPoint.x-rotatedDiffPoint.x),point.y-(diffPoint.y-rotatedDiffPoint.y));var localPoint=that.globalToLocal(recalcPoint);return localPoint.x>=0&&localPoint.y>=0&&localPoint.x<=that.calcWidth&&localPoint.y<=that.calcHeight;};that.move=function(x,y){that.x=x;that.y=y;};that.setSize=function(w,h){that.width=w;that.height=h;};that.localToGlobal=function(point){if(!point)throw new Error("DisplayObject.localToGlobal: Point is null");var pos=new ASJS.Point(point.x,point.y);var i;var child=that;while(child){pos.x+=child.x||0;pos.y+=child.y||0;child=child.parent;};return pos;};that.globalToLocal=function(point){if(!point)throw new Error("DisplayObject.globalToLocal: Point is null");var pos=new ASJS.Point(point.x,point.y);var i;var child=that;while(child){pos.x-=child.x||0;pos.y-=child.y||0;child=child.parent;};return pos;};that.addedToStage=function(){};that.removedFromStage=function(){};that.dispatchEvent=function(type,data){that.domObject.trigger(type,data);};that.addEventListener=function(type,callback){that.domObject.on(type,callback);};that.removeEventListeners=function(){that.domObject.off();};that.removeEventListener=function(type){that.domObject.off(type);};that.domObject=$(domElement||"<div />",{tabindex:"-1",style:("pointer-events: auto; position: absolute; display: "+_cssDisplay+"; width: 0px; height: 0px; top: 0px; left: 0px;")});return that;};ASJS.DisplayObject.THETA=Math.PI/180;ASJS.Sprite=function(domElement){var that=new ASJS.DisplayObject(domElement);var _children=[];defineProperty(that,"numChildren",{get:function(){return _children.length;}});that.contains=function(child){return that.getChildIndex(child)>-1;};that.addChild=function(child){return that.addChildAt(child,that.numChildren);};that.addChildAt=function(child,index){if(!child)return null;if(child.parent)child.parent.removeChild(child);that.domObject.append(child.domObject);child.parent=that;_children.push(child);that.setChildIndex(child,index);return child;};that.removeChild=function(child){if(!child)return null;child.domObject.detach();var index=that.getChildIndex(child);if(index>-1)_children.splice(index,1);child.parent=null;return child;};that.removeChildAt=function(index){return that.removeChild(that.getChildAt(index));};that.getChildAt=function(index){if(index<0||index>that.numChildren-1)return null;return _children[index];};that.setChildIndex=function(child,index){if(!child||index<0)return null;var childActualIndex=that.getChildIndex(child);if(childActualIndex>-1)_children.splice(childActualIndex,1);var afterChild=that.getChildAt(index);if(afterChild)child.domObject.insertBefore(afterChild.domObject);_children.splice(index,0,child);return child;};that.getChildIndex=function(child){if(!child)return-1;return _children.indexOf(child);};that.swapChildren=function(childA,childB){var childAIndex=that.getChildIndex(childA);var childBIndex=that.getChildIndex(childB);if(childAIndex==-1||childBIndex==-1)return false;that.setChildIndex(childA,childBIndex);that.setChildIndex(childB,childAIndex);return true;};that.getChildByDOMObject=function(domObject){if(!domObject)return null;var i;var child;for(i=0;i<that.numChildren;i++){child=that.getChildAt(i);if(domObject==child.domObject[0])return child;};return null;};return that;};ASJS.Stage=function(){function StageInstance(){var that=new ASJS.Sprite();var _window=$(window);var _head=$("head");that.domObject=$("body");var _stageWidth=0;var _stageHeight=0;defineProperty(that,"stageWidth",{get:function(){return _stageWidth;}});defineProperty(that,"stageHeight",{get:function(){return _stageHeight;}});defineProperty(that,"window",{get:function(){return _window;}});defineProperty(that,"head",{get:function(){return _head;}});function recalcStageSize(){var overflowX=that.getCSS("overflow-x");var overflowY=that.getCSS("overflow-y");that.setCSS("overflow-x","hidden");that.setCSS("overflow-y","hidden");_stageWidth=_window.width();_stageHeight=_window.height();that.setCSS("overflow-x",overflowX);that.setCSS("overflow-y",overflowY);that.dispatchEvent(ASJS.Stage.RESIZE);};(function(){that.setSize("100%","100%");_window.resize(function(event){recalcStageSize();});recalcStageSize();})();return that;};defineProperty(this,"instance",{get:function(){if(!ASJS.Stage.$)ASJS.Stage.$=new StageInstance();return ASJS.Stage.$;}});};ASJS.Stage.RESIZE="Stage-resize";function AbstractCommand(){var that=new ASJS.NotificationDispatcher();that.execute=function(){};return that;};ASJS.NotificationHandler=function(){function NotificationHandlerInstance(){var that={};var _notificationHandlers={};that.register=function(notificationDispatcher){if(!notificationDispatcher.handlers)return;var i;var l=notificationDispatcher.handlers.length;var notificationType;for(i=0;i<l;i++){notificationType=notificationDispatcher.handlers[i];if(!_notificationHandlers[notificationType])_notificationHandlers[notificationType]=[];_notificationHandlers[notificationType].push(notificationDispatcher);}};that.remove=function(notificationDispatcher){if(!notificationDispatcher.handlers)return;var i;var l=notificationDispatcher.handlers?notificationDispatcher.handlers.length:0;var notificationType;for(i=0;i<l;i++){notificationType=notificationDispatcher.handlers[i];if(_notificationHandlers[notificationType]){var index=_notificationHandlers[notificationType].indexOf(notificationDispatcher);if(index>-1)_notificationHandlers[notificationType].splice(index,1);}}};that.sendNotification=function(notificationType,data){var i;var l=_notificationHandlers[notificationType]?_notificationHandlers[notificationType].length:0;var removeHandlers=[];for(i=0;i<l;i++){if(_notificationHandlers[notificationType][i]){_notificationHandlers[notificationType][i].reciveNotification(notificationType,data);}else{_notificationHandlers[notificationType].splice(i,1);l--;}}};return that;};defineProperty(this,"instance",{get:function(){if(!ASJS.NotificationHandler.$)ASJS.NotificationHandler.$=new NotificationHandlerInstance();return ASJS.NotificationHandler.$;}});};ASJS.NotificationDispatcher=function(){var that={};that.handlers=[];that.destruct=function(){that.removeNotificationHandlers();that=null;};that.sendNotification=function(notificationType,data){new ASJS.NotificationHandler().instance.sendNotification(notificationType,data);};that.reciveNotification=function(notificationType,data){};that.registerNotificationHandlers=function(){new ASJS.NotificationHandler().instance.register(that);};that.removeNotificationHandlers=function(){new ASJS.NotificationHandler().instance.remove(that);};return that;};function AbstractMediator(view){var that=new ASJS.NotificationDispatcher();(function(){that.view=view;})();return that;};function PreloaderView(){var that=new ASJS.Sprite();(function(){that.setSize("100%","100%");that.setCSS("position","fixed");that.setCSS("background-color","rgba( 0, 0, 0, 0.5 )");})();return that;};function PreloaderMediator(view){var that=new AbstractMediator(view);var _counter=0;var _preloaderView=new PreloaderView();that.handlers=[PreloaderMediator.SHOW,PreloaderMediator.HIDE];that.reciveNotification=function(notificationType,data){switch(notificationType){case PreloaderMediator.SHOW:onShow();break;case PreloaderMediator.HIDE:onHide();break;}};function onShow(){_counter++;if(_counter==1&&!that.view.contains(_preloaderView)){$(".flash-content").css("visibility","hidden");_preloaderView.alpha=0;that.view.addChild(_preloaderView);$(_preloaderView).stop().animate({alpha:1},{duration:500});}};function onHide(){_counter--;if(_counter<0)_counter=0;if(_counter==0&&that.view.contains(_preloaderView)){$(_preloaderView).stop().animate({alpha:0},{duration:500,complete:function(){that.view.removeChild(_preloaderView);$(".flash-content").css("visibility","visible");}});}};(function(){that.registerNotificationHandlers();})();return that;};PreloaderMediator.SHOW="PreloaderMediator-show";PreloaderMediator.HIDE="PreloaderMediator-hide";ASJS.FormElement=function(domElement){var that=new ASJS.Sprite(domElement);defineProperty(that,"name",{get:function(){return that.getAttr("name");},set:function(value){that.setAttr("name",value);}});(function(){that.setAttr("tabindex","auto");})();return that;};ASJS.Button=function(){var that=new ASJS.FormElement("<input />");defineProperty(that,"label",{get:function(){return that.getAttr("value");},set:function(value){that.setAttr("value",value);}});defineProperty(that,"submit",{get:function(){return that.getAttr("type")=="submit";},set:function(value){that.setAttr("type",value?"submit":"button");}});(function(){that.setAttr("type","button");})();return that;};ASJS.Rectangle=function(tx,ty,twidth,theight){var that=new ASJS.Point(tx,ty);var _width=twidth||0;var _height=theight||0;defineProperty(that,"width",{get:function(){return _width;},set:function(value){_width=value;}});defineProperty(that,"height",{get:function(){return _height;},set:function(value){_height=value;}});return that;};ASJS.Scale9Grid=function(){var that=new ASJS.Sprite();var _size=new ASJS.Point();var _rectangle=new ASJS.Rectangle();var _blocks=[];var _super={};extendProperty(_super,that,"x");defineProperty(that,"x",{set:function(value){_super.x=value;that.drawNow();}});extendProperty(_super,that,"y");defineProperty(that,"y",{set:function(value){_super.y=value;that.drawNow();}});extendProperty(_super,that,"right");defineProperty(that,"right",{set:function(value){_super.right=value;that.drawNow();}});extendProperty(_super,that,"bottom");defineProperty(that,"bottom",{set:function(value){_super.bottom=value;that.drawNow();}});extendProperty(_super,that,"width");defineProperty(that,"width",{set:function(value){_super.width=value;that.drawNow();}});extendProperty(_super,that,"height");defineProperty(that,"height",{set:function(value){_super.height=value;that.drawNow();}});defineProperty(that,"size",{get:function(){return _size;},set:function(value){_size=value;that.drawNow();}});defineProperty(that,"rect",{get:function(){return _rectangle;},set:function(value){_rectangle=value;that.drawNow();}});extendFunction(_super,that,"setSize");that.setSize=function(w,h){_super.setSize(w,h);that.drawNow();};that.drawNow=function(){var rightSize=_size.x-(_rectangle.x+_rectangle.width);var bottomSize=_size.y-(_rectangle.y+_rectangle.height);var percent=new ASJS.Point((that.width-_rectangle.x-rightSize)/_rectangle.width,(that.height-_rectangle.y-bottomSize)/_rectangle.height);var centerPercent=new ASJS.Point(percent.x*_rectangle.width,percent.y*_rectangle.height);var tlPercent=new ASJS.Point(percent.x*_rectangle.x,percent.y*_rectangle.y);var brPercent=new ASJS.Point(percent.x*rightSize,percent.y*bottomSize);var percentSize=new ASJS.Point(tlPercent.x+centerPercent.x+brPercent.x,tlPercent.y+centerPercent.y+brPercent.y);_blocks[0].setSize(_rectangle.x,_rectangle.y);_blocks[1].setSize(that.width-_rectangle.x-rightSize,_rectangle.y);_blocks[2].setSize(that.width-_blocks[0].width-_blocks[1].width,_rectangle.y);_blocks[3].setSize(_rectangle.x,that.height-_rectangle.y-bottomSize);_blocks[4].setSize(_blocks[1].width,_blocks[3].height);_blocks[5].setSize(_blocks[2].width,_blocks[3].height);_blocks[6].setSize(_rectangle.x,that.height-_blocks[0].height-_blocks[3].height);_blocks[7].setSize(_blocks[1].width,_blocks[6].height);_blocks[8].setSize(_blocks[2].width,_blocks[6].height);_blocks[1].x=_blocks[0].width;_blocks[2].x=_blocks[1].x+_blocks[1].width;_blocks[3].y=_blocks[0].height;_blocks[4].move(_blocks[3].width,_blocks[1].height);_blocks[5].move(_blocks[4].x+_blocks[4].width,_blocks[1].height);_blocks[6].y=_blocks[3].y+_blocks[3].height;_blocks[7].move(_blocks[6].width,_blocks[6].y);_blocks[8].move(_blocks[7].x+_blocks[7].width,_blocks[6].y);_blocks[1].setCSS("background-position",(-tlPercent.x*2)+"px top");_blocks[1].setCSS("background-size",(percentSize.x*2)+"px "+_size.y+"px");_blocks[3].setCSS("background-position","left "+(-tlPercent.y*2)+"px");_blocks[3].setCSS("background-size",_size.x+"px "+(percentSize.y*2)+"px");_blocks[4].setCSS("background-position",(-tlPercent.x*2)+"px "+(-tlPercent.y*2)+"px");_blocks[4].setCSS("background-size",(percentSize.x*2)+"px "+(percentSize.y*2)+"px");_blocks[5].setCSS("background-position","right "+(-tlPercent.y*2)+"px");_blocks[5].setCSS("background-size",_size.x+"px "+(percentSize.y*2)+"px");_blocks[7].setCSS("background-position",(-tlPercent.x*2)+"px bottom");_blocks[7].setCSS("background-size",(percentSize.x*2)+"px "+_size.y+"px");};defineProperty(that,"backgroundImage",{set:function(value){for(var i=0;i<9;i++)_blocks[i].setCSS("background-image","url("+value+")");that.drawNow();}});(function(){for(var i=0;i<9;i++){_blocks[i]=new ASJS.Sprite();_blocks[i].setCSS("background-repeat","no-repeat");that.addChild(_blocks[i]);};_blocks[0].setCSS("background-position","left top");_blocks[2].setCSS("background-position","right top");_blocks[6].setCSS("background-position","left bottom");_blocks[8].setCSS("background-position","right bottom");})();return that;};function NotificationView(){var that=new ASJS.Sprite();var _notificationItem={};var _window=new ASJS.Scale9Grid();var _title=new ASJS.Sprite();var _content=new ASJS.Sprite();var _okButton=new ASJS.Button();var _cancelButton=new ASJS.Button();that.hideWindow=function(){_title.html="";_content.html="";if(that.contains(_okButton))that.removeChild(_okButton);_okButton.label="";if(that.contains(_cancelButton))that.removeChild(_cancelButton);_cancelButton.label="";};that.showWindow=function(notificationItem){_notificationItem=notificationItem;_title.html=_notificationItem.title;_content.html=_notificationItem.content;if(_notificationItem['showOk']){_okButton.label=_notificationItem['okLabel'];if(!that.contains(_okButton))that.addChild(_okButton);}else if(that.contains(_okButton))that.removeChild(_okButton);if(_notificationItem['showCancel']){_cancelButton.label=_notificationItem['cancelLabel'];if(!that.contains(_cancelButton))that.addChild(_cancelButton);}else if(that.contains(_cancelButton))that.removeChild(_cancelButton);};that.drawNow=function(){_window.setSize(Math.min(that.width,_notificationItem.width),Math.min(that.height,_notificationItem.height));_window.move((that.width-_window.width)*0.5,Math.max(0,(that.height-_window.height)*0.5));_title.move(_window.x+25,_window.y+10);_title.width=_window.width-50;_content.move(_title.x,_title.y+_title.height+25);_content.setSize(_title.width,_window.height-_title.height-55-(that.contains(_okButton)||that.contains(_cancelButton)?40:0));if(_content.drawNow)_content.drawNow();_okButton.width=_window.width*0.5-20;if(that.contains(_okButton)){_okButton.x=_window.x+(that.contains(_cancelButton)?_window.width*0.5-10-_okButton.width:((_window.width-_okButton.width)*0.5));_okButton.y=_window.y+_window.height-_okButton.height-30;};_cancelButton.width=_okButton.width;if(that.contains(_cancelButton)){_cancelButton.x=_window.x+(that.contains(_okButton)?_window.width*0.5+10:((_window.width-_cancelButton.width)*0.5));_cancelButton.y=_window.y+_window.height-_cancelButton.height-30;}};function drawButtonStyle(target){target.addClass("notification_button");target.height=42;};(function(){that.setCSS("background-color","rgba( 0, 0, 0, 0.4 )");that.setSize("100%","100%");that.setCSS("position","fixed");_window.size=new ASJS.Point(30,80);_window.rect=new ASJS.Rectangle(13,60,4,7);_window.backgroundImage="images/window.png";that.addChild(_window);_title.height=50;that.addChild(_title);_title.setCSS("line-height",_title.height+"px");_title.addClass("notification_title");_content.addClass("notification_content");that.addChild(_content);_okButton.addEventListener("click",function(event){that.dispatchEvent(NotificationMediator.HIDE);if(_notificationItem['okCallback']!=undefined)_notificationItem['okCallback']();});drawButtonStyle(_okButton);_cancelButton.addEventListener("click",function(event){that.dispatchEvent(NotificationMediator.HIDE);if(_notificationItem['cancelCallback']!=undefined)_notificationItem['cancelCallback']();});drawButtonStyle(_cancelButton);})();return that;};function NotificationMediator(view){var that=new AbstractMediator(view);var _notificationPool=[];var _showed=false;var _defaultOkLabel="";var _defaultCancelLabel="";var _notificationView=new NotificationView();that.handlers=[ASJS.Stage.RESIZE,NotificationMediator.SHOW];that.reciveNotification=function(notificationType,data){switch(notificationType){case ASJS.Stage.RESIZE:onResize();break;case NotificationMediator.SHOW:show(data);break;}};that.setDefault=function(okLabel,cancelLabel){_defaultOkLabel=okLabel;_defaultCancelLabel=cancelLabel;};function onResize(){if(that.view.contains(_notificationView))_notificationView.drawNow();};function show(data){if(data==undefined)data={};_notificationPool.push({title:data.title||"",content:data.content||"",showOk:data['showOk']!=undefined?data['showOk']:true,showCancel:data['showCancel']!=undefined?data['showCancel']:false,okCallback:data['okCallback'],cancelCallback:data['cancelCallback'],okLabel:data['okLabel']||_defaultOkLabel,cancelLabel:data['cancelLabel']||_defaultCancelLabel,width:data['width']||500,height:data['height']||200});if(!_showed)showWindow();};function hide(){if(_notificationPool.length>0)showWindow();else hideWindow();};function hideWindow(){$(_notificationView).stop().animate({alpha:0},{duration:500,complete:function(){_notificationView.hideWindow();that.view.removeChild(_notificationView);_showed=false;$(".flash-content").css("visibility","visible");}});};function showWindow(){$(".flash-content").css("visibility","hidden");var notificationItem=_notificationPool[0];_notificationPool.shift();_showed=true;_notificationView.showWindow(notificationItem);_notificationView.alpha=0;if(!that.view.contains(_notificationView))that.view.addChild(_notificationView);onResize();$(_notificationView).stop().animate({alpha:1},{duration:500});};(function(){_notificationView.addEventListener(NotificationMediator.HIDE,function(event){hide();});that.registerNotificationHandlers();})();return that;};NotificationMediator.SHOW="NotificationMediator-show";NotificationMediator.HIDE="NotificationMediator-hide";ASJS.Label=function(){var that=new ASJS.DisplayObject();return that;};ASJS.AnimationDescriptor=function(name,spriteSheet,size,sequenceList){var that={};var _name=name||"";var _spriteSheet=spriteSheet||"";var _size=size||new ASJS.Point();var _sequenceList=sequenceList||[];defineProperty(that,"name",{get:function(){return _name;},set:function(value){_name=value;}});defineProperty(that,"sequenceList",{get:function(){return _sequenceList;},set:function(value){_sequenceList=value;}});defineProperty(that,"size",{get:function(){return _size;},set:function(value){_size=value;}});defineProperty(that,"spriteSheet",{get:function(){return _spriteSheet;},set:function(value){_spriteSheet=value;}});return that;};ASJS.AnimatedSprite=function(){var that=new ASJS.DisplayObject();var _animations={};var _isPlaying=false;var _selectedAnimation="";var _step=0;that.addAnimationDescriptorList=function(animationDescriptorList){var i;for(i=0;i<animationDescriptorList.length;i++)that.addAnimationDescriptor(animationDescriptorList[i]);};that.addAnimationDescriptor=function(animationDescriptor){_animations[animationDescriptor.name]=animationDescriptor;};that.removeAnimationDescriptor=function(name){_animations[name]=null;delete _animations[name];};that.play=function(name){if(!_animations[name])return;_selectedAnimation=name;_step=0;that.setCSS("background-image","url("+_animations[_selectedAnimation].spriteSheet+")");_isPlaying=true;};that.stop=function(){_isPlaying=false;};that.update=function(){if(!_isPlaying)return;var rect=_animations[_selectedAnimation].sequenceList[_step];var size=_animations[_selectedAnimation].size;var percentW=that.width/rect.width;var percentH=that.height/rect.height;that.setCSS("background-position",(-rect.x*percentW)+"px "+(-rect.y*percentH)+"px");that.setCSS("background-size",(size.x*percentW)+"px "+(size.y*percentH)+"px");that.setSize(rect.width*percentW,rect.height*percentH);_step++;if(_step>=_animations[_selectedAnimation].sequenceList.length)_step=0;};return that;};ASJS.Cycler=function(){function CyclerInstance(){var that={};var _isPlaying=false;var _fps=24;var _interval=getIntervalByFps();var _callbacks=[];var _timeoutId;defineProperty(that,"isPlaying",{get:function(){return _isPlaying;}});defineProperty(that,"fps",{get:function(){return _fps;},set:function(value){_fps=value;_interval=getIntervalByFps();that.start();}});that.addCallback=function(callback){if(that.callbackExists(callback))return;_callbacks.push(callback);};that.removeCallback=function(callback){if(!that.callbackExists(callback))return;var i;var l=_callbacks.length;var index;for(i=0;i<l;i++){if(_callbacks[i]==callback)index=i;};_callbacks.splice(index,1);};that.callbackExists=function(callback){var i;var l=_callbacks.length;for(i=0;i<l;i++){if(_callbacks[i]==callback)return true;};return false;};that.start=function(){_isPlaying=true;tick();};that.stop=function(){_isPlaying=false;window.clearTimeout(_timeoutId);};function tick(){window.clearTimeout(_timeoutId);var i;var l=_callbacks.length;for(i=0;i<l;i++){if(_callbacks[i])_callbacks[i]();};_timeoutId=window.setTimeout(function(){tick();},_interval);};function getIntervalByFps(){return 1000/_fps;};return that;};defineProperty(this,"instance",{get:function(){if(!ASJS.Cycler.$)ASJS.Cycler.$=new CyclerInstance();return ASJS.Cycler.$;}});};function Tools(){function ToolsInstance(){var that={};var _urlParams={};that.elementExists=function(element){return $(element).length;};that.replaceText=function(text,data){for(var key in data)text=text.split("{{"+key+"}}").join(data[key]);return text;};that.isValidEmailAddress=function(email){var re=/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;return re.test(email);};that.getURLParams=function(param){var url=decodeURIComponent($(location).attr('href')).split("#");if(url[1]==''||url[1]==undefined)return[];var params=url[1].split('&');for(var i=0;i<params.length;i++){line=params[i].split('=');_urlParams[line[0]]=line[1];};return _urlParams[param];};that.createUrlParams=function(params){var url="";for(var key in params){if(url!="")url+="&";url+=key+"="+params[key];};document.location.href='#'+url;that.reload();};that.reload=function(){window.location.reload(true);};return that;};defineProperty(this,"instance",{get:function(){if(!Tools.$)Tools.$=new ToolsInstance();return Tools.$;}});};function Cookies(){function CookiesInstance(){var that={};that.createCookie=function(name,value,days){if(days){var date=new Date();date.setTime(date.getTime()+(days*86400000));var expires="; expires="+date.toGMTString();}else var expires="";document.cookie=name+"="+value+expires+"; path=/";try{if(typeof(Storage)!=="undefined")localStorage[name]=value;}catch(event){console.log(event);}};that.readCookie=function(name){var nameEQ=name+"=";var ca=document.cookie.split(';');for(var i=0;i<ca.length;i++){var c=ca[i];while(c.charAt(0)==' ')c=c.substring(1,c.length);if(c.indexOf(nameEQ)==0)return c.substring(nameEQ.length,c.length);};try{if(typeof(Storage)!=="undefined")return localStorage[name];}catch(event){console.log(event);};return null;};that.eraseCookie=function(name){that.createCookie(name,"",-1);try{if(typeof(Storage)!=="undefined")delete localStorage[name];}catch(event){console.log(event);}};return that;};defineProperty(this,"instance",{get:function(){if(!Cookies.$)Cookies.$=new CookiesInstance();return Cookies.$;}});};function Language(){function LanguageInstance(){var that={};var _tools=new Tools().instance;var _cookies=new Cookies().instance;var _languageItems={};var _supportedLanguages=['en'];var _defaultLanguage=_supportedLanguages[0];var _selectedLanguage;defineProperty(that,"data",{get:function(){return _languageItems;},set:function(value){_languageItems=value;}});defineProperty(that,"supportedLanguages",{get:function(){return _supportedLanguages;}});defineProperty(that,"selectedLanguage",{get:function(){if(!_selectedLanguage){_selectedLanguage=_tools.getURLParams('lang');if(_selectedLanguage==undefined||_supportedLanguages.indexOf(_selectedLanguage)==-1)_selectedLanguage=_cookies.readCookie('language');if(_selectedLanguage==undefined||_supportedLanguages.indexOf(_selectedLanguage)==-1)_selectedLanguage=_defaultLanguage;};return _selectedLanguage;},set:function(value){_selectedLanguage=value;}});that.getText=function(key){return _languageItems[key]!=undefined&&_languageItems[key][that.selectedLanguage]!=undefined?_languageItems[key][that.selectedLanguage]:"";};that.genText=function(str){for(var key in _languageItems)str=str.split("{{"+key+"}}").join(that.getText(key));return str;};return that;};defineProperty(this,"instance",{get:function(){if(!Language.$)Language.$=new LanguageInstance();return Language.$;}});};function ContentView(){var that=new ASJS.Sprite();var _language=new Language().instance;var _cycler=new ASJS.Cycler().instance;var _background=new ASJS.Sprite();var _box=new ASJS.Sprite();var _label=new ASJS.Label();var _button=new ASJS.Button();var _animatedSprite=new ASJS.AnimatedSprite();that.drawNow=function(){_box.x=(that.width-_box.width)*0.5;};(function(){_background.addClass("background");_background.setCSS("position","fixed");_background.setSize("100%","100%");_background.alpha=0.5;that.addChild(_background);_box.addClass("box");_box.setSize(320,130);_box.y=100;that.addChild(_box);_label.text=_language.getText("new_asjs_base_site");_label.addClass("box_label");_label.setSize(320,30);_label.move(0,34);_box.addChild(_label);_button.label=_language.getText("show_notification_window");_button.addClass("box_button");_button.setSize(320,40);_button.move(0,_box.height-_button.height);_button.addEventListener("click",function(event){that.dispatchEvent(ContentMediator.ON_SHOW_NOTIFICATION_WINDOW_CLICK);});_box.addChild(_button);_animatedSprite.addAnimationDescriptorList([new ASJS.AnimationDescriptor("explode","images/explosion.png",new ASJS.Point(768,512),[new ASJS.Rectangle(0,0,256,128),new ASJS.Rectangle(256,0,256,128),new ASJS.Rectangle(512,0,256,128),new ASJS.Rectangle(0,128,256,128),new ASJS.Rectangle(256,128,256,128),new ASJS.Rectangle(512,128,256,128),new ASJS.Rectangle(0,256,256,128),new ASJS.Rectangle(256,256,256,128),new ASJS.Rectangle(512,256,256,128),new ASJS.Rectangle(0,384,256,128),new ASJS.Rectangle(256,384,256,128),new ASJS.Rectangle(512,384,256,128)]),new ASJS.AnimationDescriptor("fireworks","images/triple03_sheet.png",new ASJS.Point(1600,600),[new ASJS.Rectangle(0,0,200,200),new ASJS.Rectangle(200,0,200,200),new ASJS.Rectangle(400,0,200,200),new ASJS.Rectangle(600,0,200,200),new ASJS.Rectangle(800,0,200,200),new ASJS.Rectangle(1000,0,200,200),new ASJS.Rectangle(1200,0,200,200),new ASJS.Rectangle(1400,0,200,200),new ASJS.Rectangle(0,200,200,200),new ASJS.Rectangle(200,200,200,200),new ASJS.Rectangle(400,200,200,200),new ASJS.Rectangle(600,200,200,200),new ASJS.Rectangle(800,200,200,200),new ASJS.Rectangle(1000,200,200,200),new ASJS.Rectangle(1200,200,200,200),new ASJS.Rectangle(1400,200,200,200),new ASJS.Rectangle(0,400,200,200),new ASJS.Rectangle(200,400,200,200),new ASJS.Rectangle(400,400,200,200),new ASJS.Rectangle(600,400,200,200),new ASJS.Rectangle(800,400,200,200),new ASJS.Rectangle(1000,400,200,200),new ASJS.Rectangle(1200,400,200,200),new ASJS.Rectangle(1400,400,200,200)])]);_animatedSprite.move(10,10);that.addChild(_animatedSprite);_animatedSprite.setSize(200,200);_animatedSprite.play("fireworks");_animatedSprite.addEventListener("click",function(event){if(Math.round(Math.random()*1)==0){_animatedSprite.setSize(256,128);_animatedSprite.play("explode");}else{_animatedSprite.setSize(200,200);_animatedSprite.play("fireworks");}});that.addEventListener("click",function(event){var mouse=new ASJS.Mouse().instance;console.log("_box.hitTest: "+_box.hitTest(new ASJS.Point(mouse.mouseX,mouse.mouseY)));});_cycler.addCallback(_animatedSprite.update);})();return that;};function ContentMediator(view){var that=new AbstractMediator(view);var _language=new Language().instance;var _contentView=new ContentView();that.handlers=[ASJS.Stage.RESIZE,ContentMediator.SHOW];that.reciveNotification=function(notificationType,data){switch(notificationType){case ASJS.Stage.RESIZE:onResize();break;case ContentMediator.SHOW:onShow();break;}};function onResize(){_contentView.setSize(stage.stageWidth,stage.stageHeight);_contentView.drawNow();};function onShow(){_contentView.addEventListener(ContentMediator.ON_SHOW_NOTIFICATION_WINDOW_CLICK,function(){that.sendNotification(NotificationMediator.SHOW,{title:_language.getText("notification_title"),content:_language.getText("notification_content")});});that.view.addChild(_contentView);onResize();};(function(){that.registerNotificationHandlers();})();return that;};ContentMediator.SHOW="ContentMediator-show";ContentMediator.ON_SHOW_NOTIFICATION_WINDOW_CLICK="ContentMediator-onShowNotificationWindowClick";function StartupCommand(){var that=new AbstractCommand();var _language=new Language().instance;var _cookies=new Cookies().instance;var _cycler=new ASJS.Cycler().instance;var _sleepToResizeId;that.execute=function(){that.sendNotification(PreloaderMediator.SHOW);_cookies.createCookie('language',_language.selectedLanguage);document.title=_language.getText("title");var cycler=new ASJS.Cycler().instance;cycler.fps=24;cycler.start();that.sendNotification(ContentMediator.SHOW);stage.addEventListener(ASJS.Stage.RESIZE,function(event){window.clearTimeout(_sleepToResizeId);_sleepToResizeId=window.setTimeout(function(){that.sendNotification(ASJS.Stage.RESIZE);window.clearTimeout(_sleepToResizeId);},100);});that.sendNotification(PreloaderMediator.HIDE);};return that;};function Application(){var that={};var _language=new Language().instance;var _contentView=new ASJS.Sprite();var _preloaderView=new ASJS.Sprite();var _notificationView=new ASJS.Sprite();(function(){$.get("json/language.json",function(response){_language.data=response;stage.addChild(_contentView);stage.addChild(_preloaderView);stage.addChild(_notificationView);new ContentMediator(_contentView);new PreloaderMediator(_preloaderView);var notificationMediator=new NotificationMediator(_notificationView);notificationMediator.setDefault(_language.getText('notification_ok_button'),_language.getText('notification_cancel_button'));(new StartupCommand()).execute();});})();return that;};ASJS.startASJS(Application);