/*!
 * Flickity PACKAGED v2.2.2
 * Touch, responsive, flickable carousels
 *
 * Licensed GPLv3 for open source use
 * or Flickity Commercial License for commercial use
 *
 * https://flickity.metafizzy.co
 * Copyright 2015-2021 Metafizzy
 */
(function(e,i){if(typeof define=="function"&&define.amd){define("jquery-bridget/jquery-bridget",["jquery"],function(t){return i(e,t)})}else if(typeof module=="object"&&module.exports){module.exports=i(e,require("jquery"))}else{e.jQueryBridget=i(e,e.jQuery)}})(window,function t(e,r){"use strict";var o=Array.prototype.slice;var i=e.console;var u=typeof i=="undefined"?function(){}:function(t){i.error(t)};function n(h,s,c){c=c||r||e.jQuery;if(!c){return}if(!s.prototype.option){s.prototype.option=function(t){if(!c.isPlainObject(t)){return}this.options=c.extend(true,this.options,t)}}c.fn[h]=function(t){if(typeof t=="string"){var e=o.call(arguments,1);return i(this,t,e)}n(this,t);return this};function i(t,r,o){var a;var l="$()."+h+'("'+r+'")';t.each(function(t,e){var i=c.data(e,h);if(!i){u(h+" not initialized. Cannot call methods, i.e. "+l);return}var n=i[r];if(!n||r.charAt(0)=="_"){u(l+" is not a valid method");return}var s=n.apply(i,o);a=a===undefined?s:a});return a!==undefined?a:t}function n(t,n){t.each(function(t,e){var i=c.data(e,h);if(i){i.option(n);i._init()}else{i=new s(e,n);c.data(e,h,i)}})}a(c)}function a(t){if(!t||t&&t.bridget){return}t.bridget=n}a(r||e.jQuery);return n});(function(t,e){if(typeof define=="function"&&define.amd){define("ev-emitter/ev-emitter",e)}else if(typeof module=="object"&&module.exports){module.exports=e()}else{t.EvEmitter=e()}})(typeof window!="undefined"?window:this,function(){function t(){}var e=t.prototype;e.on=function(t,e){if(!t||!e){return}var i=this._events=this._events||{};var n=i[t]=i[t]||[];if(n.indexOf(e)==-1){n.push(e)}return this};e.once=function(t,e){if(!t||!e){return}this.on(t,e);var i=this._onceEvents=this._onceEvents||{};var n=i[t]=i[t]||{};n[e]=true;return this};e.off=function(t,e){var i=this._events&&this._events[t];if(!i||!i.length){return}var n=i.indexOf(e);if(n!=-1){i.splice(n,1)}return this};e.emitEvent=function(t,e){var i=this._events&&this._events[t];if(!i||!i.length){return}i=i.slice(0);e=e||[];var n=this._onceEvents&&this._onceEvents[t];for(var s=0;s<i.length;s++){var r=i[s];var o=n&&n[r];if(o){this.off(t,r);delete n[r]}r.apply(this,e)}return this};e.allOff=function(){delete this._events;delete this._onceEvents};return t});
/*!
 * getSize v2.0.3
 * measure size of elements
 * MIT license
 */
(function(t,e){if(typeof define=="function"&&define.amd){define("get-size/get-size",e)}else if(typeof module=="object"&&module.exports){module.exports=e()}else{t.getSize=e()}})(window,function t(){"use strict";function m(t){var e=parseFloat(t);var i=t.indexOf("%")==-1&&!isNaN(e);return i&&e}function e(){}var i=typeof console=="undefined"?e:function(t){console.error(t)};var y=["paddingLeft","paddingRight","paddingTop","paddingBottom","marginLeft","marginRight","marginTop","marginBottom","borderLeftWidth","borderRightWidth","borderTopWidth","borderBottomWidth"];var b=y.length;function E(){var t={width:0,height:0,innerWidth:0,innerHeight:0,outerWidth:0,outerHeight:0};for(var e=0;e<b;e++){var i=y[e];t[i]=0}return t}function S(t){var e=getComputedStyle(t);if(!e){i("Style returned "+e+". Are you running this code in a hidden iframe on Firefox? "+"See https://bit.ly/getsizebug1")}return e}var n=false;var C;function x(){if(n){return}n=true;var t=document.createElement("div");t.style.width="200px";t.style.padding="1px 2px 3px 4px";t.style.borderStyle="solid";t.style.borderWidth="1px 2px 3px 4px";t.style.boxSizing="border-box";var e=document.body||document.documentElement;e.appendChild(t);var i=S(t);C=Math.round(m(i.width))==200;s.isBoxSizeOuter=C;e.removeChild(t)}function s(t){x();if(typeof t=="string"){t=document.querySelector(t)}if(!t||typeof t!="object"||!t.nodeType){return}var e=S(t);if(e.display=="none"){return E()}var i={};i.width=t.offsetWidth;i.height=t.offsetHeight;var n=i.isBorderBox=e.boxSizing=="border-box";for(var s=0;s<b;s++){var r=y[s];var o=e[r];var a=parseFloat(o);i[r]=!isNaN(a)?a:0}var l=i.paddingLeft+i.paddingRight;var h=i.paddingTop+i.paddingBottom;var c=i.marginLeft+i.marginRight;var u=i.marginTop+i.marginBottom;var d=i.borderLeftWidth+i.borderRightWidth;var f=i.borderTopWidth+i.borderBottomWidth;var p=n&&C;var v=m(e.width);if(v!==false){i.width=v+(p?0:l+d)}var g=m(e.height);if(g!==false){i.height=g+(p?0:h+f)}i.innerWidth=i.width-(l+d);i.innerHeight=i.height-(h+f);i.outerWidth=i.width+c;i.outerHeight=i.height+u;return i}return s});(function(t,e){"use strict";if(typeof define=="function"&&define.amd){define("desandro-matches-selector/matches-selector",e)}else if(typeof module=="object"&&module.exports){module.exports=e()}else{t.matchesSelector=e()}})(window,function t(){"use strict";var n=function(){var t=window.Element.prototype;if(t.matches){return"matches"}if(t.matchesSelector){return"matchesSelector"}var e=["webkit","moz","ms","o"];for(var i=0;i<e.length;i++){var n=e[i];var s=n+"MatchesSelector";if(t[s]){return s}}}();return function t(e,i){return e[n](i)}});(function(e,i){if(typeof define=="function"&&define.amd){define("fizzy-ui-utils/utils",["desandro-matches-selector/matches-selector"],function(t){return i(e,t)})}else if(typeof module=="object"&&module.exports){module.exports=i(e,require("desandro-matches-selector"))}else{e.fizzyUIUtils=i(e,e.matchesSelector)}})(window,function t(h,r){var c={};c.extend=function(t,e){for(var i in e){t[i]=e[i]}return t};c.modulo=function(t,e){return(t%e+e)%e};var i=Array.prototype.slice;c.makeArray=function(t){if(Array.isArray(t)){return t}if(t===null||t===undefined){return[]}var e=typeof t=="object"&&typeof t.length=="number";if(e){return i.call(t)}return[t]};c.removeFrom=function(t,e){var i=t.indexOf(e);if(i!=-1){t.splice(i,1)}};c.getParent=function(t,e){while(t.parentNode&&t!=document.body){t=t.parentNode;if(r(t,e)){return t}}};c.getQueryElement=function(t){if(typeof t=="string"){return document.querySelector(t)}return t};c.handleEvent=function(t){var e="on"+t.type;if(this[e]){this[e](t)}};c.filterFindElements=function(t,n){t=c.makeArray(t);var s=[];t.forEach(function(t){if(!(t instanceof HTMLElement)){return}if(!n){s.push(t);return}if(r(t,n)){s.push(t)}var e=t.querySelectorAll(n);for(var i=0;i<e.length;i++){s.push(e[i])}});return s};c.debounceMethod=function(t,e,n){n=n||100;var s=t.prototype[e];var r=e+"Timeout";t.prototype[e]=function(){var t=this[r];clearTimeout(t);var e=arguments;var i=this;this[r]=setTimeout(function(){s.apply(i,e);delete i[r]},n)}};c.docReady=function(t){var e=document.readyState;if(e=="complete"||e=="interactive"){setTimeout(t)}else{document.addEventListener("DOMContentLoaded",t)}};c.toDashed=function(t){return t.replace(/(.)([A-Z])/g,function(t,e,i){return e+"-"+i}).toLowerCase()};var u=h.console;c.htmlInit=function(a,l){c.docReady(function(){var t=c.toDashed(l);var s="data-"+t;var e=document.querySelectorAll("["+s+"]");var i=document.querySelectorAll(".js-"+t);var n=c.makeArray(e).concat(c.makeArray(i));var r=s+"-options";var o=h.jQuery;n.forEach(function(e){var t=e.getAttribute(s)||e.getAttribute(r);var i;try{i=t&&JSON.parse(t)}catch(t){if(u){u.error("Error parsing "+s+" on "+e.className+": "+t)}return}var n=new a(e,i);if(o){o.data(e,l,n)}})})};return c});(function(e,i){if(typeof define=="function"&&define.amd){define("flickity/js/cell",["get-size/get-size"],function(t){return i(e,t)})}else if(typeof module=="object"&&module.exports){module.exports=i(e,require("get-size"))}else{e.Flickity=e.Flickity||{};e.Flickity.Cell=i(e,e.getSize)}})(window,function t(e,i){function n(t,e){this.element=t;this.parent=e;this.create()}var s=n.prototype;s.create=function(){this.element.style.position="absolute";this.element.setAttribute("aria-hidden","true");this.x=0;this.shift=0};s.destroy=function(){this.unselect();this.element.style.position="";var t=this.parent.originSide;this.element.style[t]="";this.element.removeAttribute("aria-hidden")};s.getSize=function(){this.size=i(this.element)};s.setPosition=function(t){this.x=t;this.updateTarget();this.renderPosition(t)};s.updateTarget=s.setDefaultTarget=function(){var t=this.parent.originSide=="left"?"marginLeft":"marginRight";this.target=this.x+this.size[t]+this.size.width*this.parent.cellAlign};s.renderPosition=function(t){var e=this.parent.originSide;this.element.style[e]=this.parent.getPositionValue(t)};s.select=function(){this.element.classList.add("is-selected");this.element.removeAttribute("aria-hidden")};s.unselect=function(){this.element.classList.remove("is-selected");this.element.setAttribute("aria-hidden","true")};s.wrapShift=function(t){this.shift=t;this.renderPosition(this.x+this.parent.slideableWidth*t)};s.remove=function(){this.element.parentNode.removeChild(this.element)};return n});(function(t,e){if(typeof define=="function"&&define.amd){define("flickity/js/slide",e)}else if(typeof module=="object"&&module.exports){module.exports=e()}else{t.Flickity=t.Flickity||{};t.Flickity.Slide=e()}})(window,function t(){"use strict";function e(t){this.parent=t;this.isOriginLeft=t.originSide=="left";this.cells=[];this.outerWidth=0;this.height=0}var i=e.prototype;i.addCell=function(t){this.cells.push(t);this.outerWidth+=t.size.outerWidth;this.height=Math.max(t.size.outerHeight,this.height);if(this.cells.length==1){this.x=t.x;var e=this.isOriginLeft?"marginLeft":"marginRight";this.firstMargin=t.size[e]}};i.updateTarget=function(){var t=this.isOriginLeft?"marginRight":"marginLeft";var e=this.getLastCell();var i=e?e.size[t]:0;var n=this.outerWidth-(this.firstMargin+i);this.target=this.x+this.firstMargin+n*this.parent.cellAlign};i.getLastCell=function(){return this.cells[this.cells.length-1]};i.select=function(){this.cells.forEach(function(t){t.select()})};i.unselect=function(){this.cells.forEach(function(t){t.unselect()})};i.getCellElements=function(){return this.cells.map(function(t){return t.element})};return e});(function(e,i){if(typeof define=="function"&&define.amd){define("flickity/js/animate",["fizzy-ui-utils/utils"],function(t){return i(e,t)})}else if(typeof module=="object"&&module.exports){module.exports=i(e,require("fizzy-ui-utils"))}else{e.Flickity=e.Flickity||{};e.Flickity.animatePrototype=i(e,e.fizzyUIUtils)}})(window,function t(e,i){var n={};n.startAnimation=function(){if(this.isAnimating){return}this.isAnimating=true;this.restingFrames=0;this.animate()};n.animate=function(){this.applyDragForce();this.applySelectedAttraction();var t=this.x;this.integratePhysics();this.positionSlider();this.settle(t);if(this.isAnimating){var e=this;requestAnimationFrame(function t(){e.animate()})}};n.positionSlider=function(){var t=this.x;if(this.options.wrapAround&&this.cells.length>1){t=i.modulo(t,this.slideableWidth);t-=this.slideableWidth;this.shiftWrapCells(t)}this.setTranslateX(t,this.isAnimating);this.dispatchScrollEvent()};n.setTranslateX=function(t,e){t+=this.cursorPosition;t=this.options.rightToLeft?-t:t;var i=this.getPositionValue(t);this.slider.style.transform=e?"translate3d("+i+",0,0)":"translateX("+i+")"};n.dispatchScrollEvent=function(){var t=this.slides[0];if(!t){return}var e=-this.x-t.target;var i=e/this.slidesWidth;this.dispatchEvent("scroll",null,[i,e])};n.positionSliderAtSelected=function(){if(!this.cells.length){return}this.x=-this.selectedSlide.target;this.velocity=0;this.positionSlider()};n.getPositionValue=function(t){if(this.options.percentPosition){return Math.round(t/this.size.innerWidth*1e4)*.01+"%"}else{return Math.round(t)+"px"}};n.settle=function(t){var e=!this.isPointerDown&&Math.round(this.x*100)==Math.round(t*100);if(e){this.restingFrames++}if(this.restingFrames>2){this.isAnimating=false;delete this.isFreeScrolling;this.positionSlider();this.dispatchEvent("settle",null,[this.selectedIndex])}};n.shiftWrapCells=function(t){var e=this.cursorPosition+t;this._shiftCells(this.beforeShiftCells,e,-1);var i=this.size.innerWidth-(t+this.slideableWidth+this.cursorPosition);this._shiftCells(this.afterShiftCells,i,1)};n._shiftCells=function(t,e,i){for(var n=0;n<t.length;n++){var s=t[n];var r=e>0?i:0;s.wrapShift(r);e-=s.size.outerWidth}};n._unshiftCells=function(t){if(!t||!t.length){return}for(var e=0;e<t.length;e++){t[e].wrapShift(0)}};n.integratePhysics=function(){this.x+=this.velocity;this.velocity*=this.getFrictionFactor()};n.applyForce=function(t){this.velocity+=t};n.getFrictionFactor=function(){return 1-this.options[this.isFreeScrolling?"freeScrollFriction":"friction"]};n.getRestingPosition=function(){return this.x+this.velocity/(1-this.getFrictionFactor())};n.applyDragForce=function(){if(!this.isDraggable||!this.isPointerDown){return}var t=this.dragX-this.x;var e=t-this.velocity;this.applyForce(e)};n.applySelectedAttraction=function(){var t=this.isDraggable&&this.isPointerDown;if(t||this.isFreeScrolling||!this.slides.length){return}var e=this.selectedSlide.target*-1-this.x;var i=e*this.options.selectedAttraction;this.applyForce(i)};return n});(function(o,a){if(typeof define=="function"&&define.amd){define("flickity/js/flickity",["ev-emitter/ev-emitter","get-size/get-size","fizzy-ui-utils/utils","./cell","./slide","./animate"],function(t,e,i,n,s,r){return a(o,t,e,i,n,s,r)})}else if(typeof module=="object"&&module.exports){module.exports=a(o,require("ev-emitter"),require("get-size"),require("fizzy-ui-utils"),require("./cell"),require("./slide"),require("./animate"))}else{var t=o.Flickity;o.Flickity=a(o,o.EvEmitter,o.getSize,o.fizzyUIUtils,t.Cell,t.Slide,t.animatePrototype)}})(window,function t(n,e,i,a,s,o,r){var l=n.jQuery;var h=n.getComputedStyle;var c=n.console;function u(t,e){t=a.makeArray(t);while(t.length){e.appendChild(t.shift())}}var d=0;var f={};function p(t,e){var i=a.getQueryElement(t);if(!i){if(c){c.error("Bad element for Flickity: "+(i||t))}return}this.element=i;if(this.element.flickityGUID){var n=f[this.element.flickityGUID];if(n)n.option(e);return n}if(l){this.$element=l(this.element)}this.options=a.extend({},this.constructor.defaults);this.option(e);this._create()}p.defaults={accessibility:true,cellAlign:"center",freeScrollFriction:.075,friction:.28,namespaceJQueryEvents:true,percentPosition:true,resize:true,selectedAttraction:.025,setGallerySize:true};p.createMethods=[];var v=p.prototype;a.extend(v,e.prototype);v._create=function(){var t=this.guid=++d;this.element.flickityGUID=t;f[t]=this;this.selectedIndex=0;this.restingFrames=0;this.x=0;this.velocity=0;this.originSide=this.options.rightToLeft?"right":"left";this.viewport=document.createElement("div");this.viewport.className="flickity-viewport";this._createSlider();if(this.options.resize||this.options.watchCSS){n.addEventListener("resize",this)}for(var e in this.options.on){var i=this.options.on[e];this.on(e,i)}p.createMethods.forEach(function(t){this[t]()},this);if(this.options.watchCSS){this.watchCSS()}else{this.activate()}};v.option=function(t){a.extend(this.options,t)};v.activate=function(){if(this.isActive){return}this.isActive=true;this.element.classList.add("flickity-enabled");if(this.options.rightToLeft){this.element.classList.add("flickity-rtl")}this.getSize();var t=this._filterFindCellElements(this.element.children);u(t,this.slider);this.viewport.appendChild(this.slider);this.element.appendChild(this.viewport);this.reloadCells();if(this.options.accessibility){this.element.tabIndex=0;this.element.addEventListener("keydown",this)}this.emitEvent("activate");this.selectInitialIndex();this.isInitActivated=true;this.dispatchEvent("ready")};v._createSlider=function(){var t=document.createElement("div");t.className="flickity-slider";t.style[this.originSide]=0;this.slider=t};v._filterFindCellElements=function(t){return a.filterFindElements(t,this.options.cellSelector)};v.reloadCells=function(){this.cells=this._makeCells(this.slider.children);this.positionCells();this._getWrapShiftCells();this.setGallerySize()};v._makeCells=function(t){var e=this._filterFindCellElements(t);var i=e.map(function(t){return new s(t,this)},this);return i};v.getLastCell=function(){return this.cells[this.cells.length-1]};v.getLastSlide=function(){return this.slides[this.slides.length-1]};v.positionCells=function(){this._sizeCells(this.cells);this._positionCells(0)};v._positionCells=function(t){t=t||0;this.maxCellHeight=t?this.maxCellHeight||0:0;var e=0;if(t>0){var i=this.cells[t-1];e=i.x+i.size.outerWidth}var n=this.cells.length;for(var s=t;s<n;s++){var r=this.cells[s];r.setPosition(e);e+=r.size.outerWidth;this.maxCellHeight=Math.max(r.size.outerHeight,this.maxCellHeight)}this.slideableWidth=e;this.updateSlides();this._containSlides();this.slidesWidth=n?this.getLastSlide().target-this.slides[0].target:0};v._sizeCells=function(t){t.forEach(function(t){t.getSize()})};v.updateSlides=function(){this.slides=[];if(!this.cells.length){return}var n=new o(this);this.slides.push(n);var t=this.originSide=="left";var s=t?"marginRight":"marginLeft";var r=this._getCanCellFit();this.cells.forEach(function(t,e){if(!n.cells.length){n.addCell(t);return}var i=n.outerWidth-n.firstMargin+(t.size.outerWidth-t.size[s]);if(r.call(this,e,i)){n.addCell(t)}else{n.updateTarget();n=new o(this);this.slides.push(n);n.addCell(t)}},this);n.updateTarget();this.updateSelectedSlide()};v._getCanCellFit=function(){var t=this.options.groupCells;if(!t){return function(){return false}}else if(typeof t=="number"){var e=parseInt(t,10);return function(t){return t%e!==0}}var i=typeof t=="string"&&t.match(/^(\d+)%$/);var n=i?parseInt(i[1],10)/100:1;return function(t,e){return e<=(this.size.innerWidth+1)*n}};v._init=v.reposition=function(){this.positionCells();this.positionSliderAtSelected()};v.getSize=function(){this.size=i(this.element);this.setCellAlign();this.cursorPosition=this.size.innerWidth*this.cellAlign};var g={center:{left:.5,right:.5},left:{left:0,right:1},right:{right:0,left:1}};v.setCellAlign=function(){var t=g[this.options.cellAlign];this.cellAlign=t?t[this.originSide]:this.options.cellAlign};v.setGallerySize=function(){if(this.options.setGallerySize){var t=this.options.adaptiveHeight&&this.selectedSlide?this.selectedSlide.height:this.maxCellHeight;this.viewport.style.height=t+"px"}};v._getWrapShiftCells=function(){if(!this.options.wrapAround){return}this._unshiftCells(this.beforeShiftCells);this._unshiftCells(this.afterShiftCells);var t=this.cursorPosition;var e=this.cells.length-1;this.beforeShiftCells=this._getGapCells(t,e,-1);t=this.size.innerWidth-this.cursorPosition;this.afterShiftCells=this._getGapCells(t,0,1)};v._getGapCells=function(t,e,i){var n=[];while(t>0){var s=this.cells[e];if(!s){break}n.push(s);e+=i;t-=s.size.outerWidth}return n};v._containSlides=function(){if(!this.options.contain||this.options.wrapAround||!this.cells.length){return}var t=this.options.rightToLeft;var e=t?"marginRight":"marginLeft";var i=t?"marginLeft":"marginRight";var n=this.slideableWidth-this.getLastCell().size[i];var s=n<this.size.innerWidth;var r=this.cursorPosition+this.cells[0].size[e];var o=n-this.size.innerWidth*(1-this.cellAlign);this.slides.forEach(function(t){if(s){t.target=n*this.cellAlign}else{t.target=Math.max(t.target,r);t.target=Math.min(t.target,o)}},this)};v.dispatchEvent=function(t,e,i){var n=e?[e].concat(i):i;this.emitEvent(t,n);if(l&&this.$element){t+=this.options.namespaceJQueryEvents?".flickity":"";var s=t;if(e){var r=new l.Event(e);r.type=t;s=r}this.$element.trigger(s,i)}};v.select=function(t,e,i){if(!this.isActive){return}t=parseInt(t,10);this._wrapSelect(t);if(this.options.wrapAround||e){t=a.modulo(t,this.slides.length)}if(!this.slides[t]){return}var n=this.selectedIndex;this.selectedIndex=t;this.updateSelectedSlide();if(i){this.positionSliderAtSelected()}else{this.startAnimation()}if(this.options.adaptiveHeight){this.setGallerySize()}this.dispatchEvent("select",null,[t]);if(t!=n){this.dispatchEvent("change",null,[t])}this.dispatchEvent("cellSelect")};v._wrapSelect=function(t){var e=this.slides.length;var i=this.options.wrapAround&&e>1;if(!i){return t}var n=a.modulo(t,e);var s=Math.abs(n-this.selectedIndex);var r=Math.abs(n+e-this.selectedIndex);var o=Math.abs(n-e-this.selectedIndex);if(!this.isDragSelect&&r<s){t+=e}else if(!this.isDragSelect&&o<s){t-=e}if(t<0){this.x-=this.slideableWidth}else if(t>=e){this.x+=this.slideableWidth}};v.previous=function(t,e){this.select(this.selectedIndex-1,t,e)};v.next=function(t,e){this.select(this.selectedIndex+1,t,e)};v.updateSelectedSlide=function(){var t=this.slides[this.selectedIndex];if(!t){return}this.unselectSelectedSlide();this.selectedSlide=t;t.select();this.selectedCells=t.cells;this.selectedElements=t.getCellElements();this.selectedCell=t.cells[0];this.selectedElement=this.selectedElements[0]};v.unselectSelectedSlide=function(){if(this.selectedSlide){this.selectedSlide.unselect()}};v.selectInitialIndex=function(){var t=this.options.initialIndex;if(this.isInitActivated){this.select(this.selectedIndex,false,true);return}if(t&&typeof t=="string"){var e=this.queryCell(t);if(e){this.selectCell(t,false,true);return}}var i=0;if(t&&this.slides[t]){i=t}this.select(i,false,true)};v.selectCell=function(t,e,i){var n=this.queryCell(t);if(!n){return}var s=this.getCellSlideIndex(n);this.select(s,e,i)};v.getCellSlideIndex=function(t){for(var e=0;e<this.slides.length;e++){var i=this.slides[e];var n=i.cells.indexOf(t);if(n!=-1){return e}}};v.getCell=function(t){for(var e=0;e<this.cells.length;e++){var i=this.cells[e];if(i.element==t){return i}}};v.getCells=function(t){t=a.makeArray(t);var i=[];t.forEach(function(t){var e=this.getCell(t);if(e){i.push(e)}},this);return i};v.getCellElements=function(){return this.cells.map(function(t){return t.element})};v.getParentCell=function(t){var e=this.getCell(t);if(e){return e}t=a.getParent(t,".flickity-slider > *");return this.getCell(t)};v.getAdjacentCellElements=function(t,e){if(!t){return this.selectedSlide.getCellElements()}e=e===undefined?this.selectedIndex:e;var i=this.slides.length;if(1+t*2>=i){return this.getCellElements()}var n=[];for(var s=e-t;s<=e+t;s++){var r=this.options.wrapAround?a.modulo(s,i):s;var o=this.slides[r];if(o){n=n.concat(o.getCellElements())}}return n};v.queryCell=function(t){if(typeof t=="number"){return this.cells[t]}if(typeof t=="string"){if(t.match(/^[#.]?[\d/]/)){return}t=this.element.querySelector(t)}return this.getCell(t)};v.uiChange=function(){this.emitEvent("uiChange")};v.childUIPointerDown=function(t){if(t.type!="touchstart"){t.preventDefault()}this.focus()};v.onresize=function(){this.watchCSS();this.resize()};a.debounceMethod(p,"onresize",150);v.resize=function(){if(!this.isActive){return}this.getSize();if(this.options.wrapAround){this.x=a.modulo(this.x,this.slideableWidth)}this.positionCells();this._getWrapShiftCells();this.setGallerySize();this.emitEvent("resize");var t=this.selectedElements&&this.selectedElements[0];this.selectCell(t,false,true)};v.watchCSS=function(){var t=this.options.watchCSS;if(!t){return}var e=h(this.element,":after").content;if(e.indexOf("flickity")!=-1){this.activate()}else{this.deactivate()}};v.onkeydown=function(t){var e=document.activeElement&&document.activeElement!=this.element;if(!this.options.accessibility||e){return}var i=p.keyboardHandlers[t.keyCode];if(i){i.call(this)}};p.keyboardHandlers={37:function(){var t=this.options.rightToLeft?"next":"previous";this.uiChange();this[t]()},39:function(){var t=this.options.rightToLeft?"previous":"next";this.uiChange();this[t]()}};v.focus=function(){var t=n.pageYOffset;this.element.focus({preventScroll:true});if(n.pageYOffset!=t){n.scrollTo(n.pageXOffset,t)}};v.deactivate=function(){if(!this.isActive){return}this.element.classList.remove("flickity-enabled");this.element.classList.remove("flickity-rtl");this.unselectSelectedSlide();this.cells.forEach(function(t){t.destroy()});this.element.removeChild(this.viewport);u(this.slider.children,this.element);if(this.options.accessibility){this.element.removeAttribute("tabIndex");this.element.removeEventListener("keydown",this)}this.isActive=false;this.emitEvent("deactivate")};v.destroy=function(){this.deactivate();n.removeEventListener("resize",this);this.allOff();this.emitEvent("destroy");if(l&&this.$element){l.removeData(this.element,"flickity")}delete this.element.flickityGUID;delete f[this.guid]};a.extend(v,r);p.data=function(t){t=a.getQueryElement(t);var e=t&&t.flickityGUID;return e&&f[e]};a.htmlInit(p,"flickity");if(l&&l.bridget){l.bridget("flickity",p)}p.setJQuery=function(t){l=t};p.Cell=s;p.Slide=o;return p});
/*!
 * Unipointer v2.3.0
 * base class for doing one thing with pointer event
 * MIT license
 */
(function(e,i){if(typeof define=="function"&&define.amd){define("unipointer/unipointer",["ev-emitter/ev-emitter"],function(t){return i(e,t)})}else if(typeof module=="object"&&module.exports){module.exports=i(e,require("ev-emitter"))}else{e.Unipointer=i(e,e.EvEmitter)}})(window,function t(s,e){function i(){}function n(){}var r=n.prototype=Object.create(e.prototype);r.bindStartEvent=function(t){this._bindStartEvent(t,true)};r.unbindStartEvent=function(t){this._bindStartEvent(t,false)};r._bindStartEvent=function(t,e){e=e===undefined?true:e;var i=e?"addEventListener":"removeEventListener";var n="mousedown";if(s.PointerEvent){n="pointerdown"}else if("ontouchstart"in s){n="touchstart"}t[i](n,this)};r.handleEvent=function(t){var e="on"+t.type;if(this[e]){this[e](t)}};r.getTouch=function(t){for(var e=0;e<t.length;e++){var i=t[e];if(i.identifier==this.pointerIdentifier){return i}}};r.onmousedown=function(t){var e=t.button;if(e&&(e!==0&&e!==1)){return}this._pointerDown(t,t)};r.ontouchstart=function(t){this._pointerDown(t,t.changedTouches[0])};r.onpointerdown=function(t){this._pointerDown(t,t)};r._pointerDown=function(t,e){if(t.button||this.isPointerDown){return}this.isPointerDown=true;this.pointerIdentifier=e.pointerId!==undefined?e.pointerId:e.identifier;this.pointerDown(t,e)};r.pointerDown=function(t,e){this._bindPostStartEvents(t);this.emitEvent("pointerDown",[t,e])};var o={mousedown:["mousemove","mouseup"],touchstart:["touchmove","touchend","touchcancel"],pointerdown:["pointermove","pointerup","pointercancel"]};r._bindPostStartEvents=function(t){if(!t){return}var e=o[t.type];e.forEach(function(t){s.addEventListener(t,this)},this);this._boundPointerEvents=e};r._unbindPostStartEvents=function(){if(!this._boundPointerEvents){return}this._boundPointerEvents.forEach(function(t){s.removeEventListener(t,this)},this);delete this._boundPointerEvents};r.onmousemove=function(t){this._pointerMove(t,t)};r.onpointermove=function(t){if(t.pointerId==this.pointerIdentifier){this._pointerMove(t,t)}};r.ontouchmove=function(t){var e=this.getTouch(t.changedTouches);if(e){this._pointerMove(t,e)}};r._pointerMove=function(t,e){this.pointerMove(t,e)};r.pointerMove=function(t,e){this.emitEvent("pointerMove",[t,e])};r.onmouseup=function(t){this._pointerUp(t,t)};r.onpointerup=function(t){if(t.pointerId==this.pointerIdentifier){this._pointerUp(t,t)}};r.ontouchend=function(t){var e=this.getTouch(t.changedTouches);if(e){this._pointerUp(t,e)}};r._pointerUp=function(t,e){this._pointerDone();this.pointerUp(t,e)};r.pointerUp=function(t,e){this.emitEvent("pointerUp",[t,e])};r._pointerDone=function(){this._pointerReset();this._unbindPostStartEvents();this.pointerDone()};r._pointerReset=function(){this.isPointerDown=false;delete this.pointerIdentifier};r.pointerDone=i;r.onpointercancel=function(t){if(t.pointerId==this.pointerIdentifier){this._pointerCancel(t,t)}};r.ontouchcancel=function(t){var e=this.getTouch(t.changedTouches);if(e){this._pointerCancel(t,e)}};r._pointerCancel=function(t,e){this._pointerDone();this.pointerCancel(t,e)};r.pointerCancel=function(t,e){this.emitEvent("pointerCancel",[t,e])};n.getPointerPoint=function(t){return{x:t.pageX,y:t.pageY}};return n});
/*!
 * Unidragger v2.3.1
 * Draggable base class
 * MIT license
 */
(function(e,i){if(typeof define=="function"&&define.amd){define("unidragger/unidragger",["unipointer/unipointer"],function(t){return i(e,t)})}else if(typeof module=="object"&&module.exports){module.exports=i(e,require("unipointer"))}else{e.Unidragger=i(e,e.Unipointer)}})(window,function t(r,e){function i(){}var n=i.prototype=Object.create(e.prototype);n.bindHandles=function(){this._bindHandles(true)};n.unbindHandles=function(){this._bindHandles(false)};n._bindHandles=function(t){t=t===undefined?true:t;var e=t?"addEventListener":"removeEventListener";var i=t?this._touchActionValue:"";for(var n=0;n<this.handles.length;n++){var s=this.handles[n];this._bindStartEvent(s,t);s[e]("click",this);if(r.PointerEvent){s.style.touchAction=i}}};n._touchActionValue="none";n.pointerDown=function(t,e){var i=this.okayPointerDown(t);if(!i){return}this.pointerDownPointer={pageX:e.pageX,pageY:e.pageY};t.preventDefault();this.pointerDownBlur();this._bindPostStartEvents(t);this.emitEvent("pointerDown",[t,e])};var s={TEXTAREA:true,INPUT:true,SELECT:true,OPTION:true};var o={radio:true,checkbox:true,button:true,submit:true,image:true,file:true};n.okayPointerDown=function(t){var e=s[t.target.nodeName];var i=o[t.target.type];var n=!e||i;if(!n){this._pointerReset()}return n};n.pointerDownBlur=function(){var t=document.activeElement;var e=t&&t.blur&&t!=document.body;if(e){t.blur()}};n.pointerMove=function(t,e){var i=this._dragPointerMove(t,e);this.emitEvent("pointerMove",[t,e,i]);this._dragMove(t,e,i)};n._dragPointerMove=function(t,e){var i={x:e.pageX-this.pointerDownPointer.pageX,y:e.pageY-this.pointerDownPointer.pageY};if(!this.isDragging&&this.hasDragStarted(i)){this._dragStart(t,e)}return i};n.hasDragStarted=function(t){return Math.abs(t.x)>3||Math.abs(t.y)>3};n.pointerUp=function(t,e){this.emitEvent("pointerUp",[t,e]);this._dragPointerUp(t,e)};n._dragPointerUp=function(t,e){if(this.isDragging){this._dragEnd(t,e)}else{this._staticClick(t,e)}};n._dragStart=function(t,e){this.isDragging=true;this.isPreventingClicks=true;this.dragStart(t,e)};n.dragStart=function(t,e){this.emitEvent("dragStart",[t,e])};n._dragMove=function(t,e,i){if(!this.isDragging){return}this.dragMove(t,e,i)};n.dragMove=function(t,e,i){t.preventDefault();this.emitEvent("dragMove",[t,e,i])};n._dragEnd=function(t,e){this.isDragging=false;setTimeout(function(){delete this.isPreventingClicks}.bind(this));this.dragEnd(t,e)};n.dragEnd=function(t,e){this.emitEvent("dragEnd",[t,e])};n.onclick=function(t){if(this.isPreventingClicks){t.preventDefault()}};n._staticClick=function(t,e){if(this.isIgnoringMouseUp&&t.type=="mouseup"){return}this.staticClick(t,e);if(t.type!="mouseup"){this.isIgnoringMouseUp=true;setTimeout(function(){delete this.isIgnoringMouseUp}.bind(this),400)}};n.staticClick=function(t,e){this.emitEvent("staticClick",[t,e])};i.getPointerPoint=e.getPointerPoint;return i});(function(n,s){if(typeof define=="function"&&define.amd){define("flickity/js/drag",["./flickity","unidragger/unidragger","fizzy-ui-utils/utils"],function(t,e,i){return s(n,t,e,i)})}else if(typeof module=="object"&&module.exports){module.exports=s(n,require("./flickity"),require("unidragger"),require("fizzy-ui-utils"))}else{n.Flickity=s(n,n.Flickity,n.Unidragger,n.fizzyUIUtils)}})(window,function t(n,e,i,a){a.extend(e.defaults,{draggable:">1",dragThreshold:3});e.createMethods.push("_createDrag");var s=e.prototype;a.extend(s,i.prototype);s._touchActionValue="pan-y";var r="createTouch"in document;var o=false;s._createDrag=function(){this.on("activate",this.onActivateDrag);this.on("uiChange",this._uiChangeDrag);this.on("deactivate",this.onDeactivateDrag);this.on("cellChange",this.updateDraggable);if(r&&!o){n.addEventListener("touchmove",function(){});o=true}};s.onActivateDrag=function(){this.handles=[this.viewport];this.bindHandles();this.updateDraggable()};s.onDeactivateDrag=function(){this.unbindHandles();this.element.classList.remove("is-draggable")};s.updateDraggable=function(){if(this.options.draggable==">1"){this.isDraggable=this.slides.length>1}else{this.isDraggable=this.options.draggable}if(this.isDraggable){this.element.classList.add("is-draggable")}else{this.element.classList.remove("is-draggable")}};s.bindDrag=function(){this.options.draggable=true;this.updateDraggable()};s.unbindDrag=function(){this.options.draggable=false;this.updateDraggable()};s._uiChangeDrag=function(){delete this.isFreeScrolling};s.pointerDown=function(t,e){if(!this.isDraggable){this._pointerDownDefault(t,e);return}var i=this.okayPointerDown(t);if(!i){return}this._pointerDownPreventDefault(t);this.pointerDownFocus(t);if(document.activeElement!=this.element){this.pointerDownBlur()}this.dragX=this.x;this.viewport.classList.add("is-pointer-down");this.pointerDownScroll=h();n.addEventListener("scroll",this);this._pointerDownDefault(t,e)};s._pointerDownDefault=function(t,e){this.pointerDownPointer={pageX:e.pageX,pageY:e.pageY};this._bindPostStartEvents(t);this.dispatchEvent("pointerDown",t,[e])};var l={INPUT:true,TEXTAREA:true,SELECT:true};s.pointerDownFocus=function(t){var e=l[t.target.nodeName];if(!e){this.focus()}};s._pointerDownPreventDefault=function(t){var e=t.type=="touchstart";var i=t.pointerType=="touch";var n=l[t.target.nodeName];if(!e&&!i&&!n){t.preventDefault()}};s.hasDragStarted=function(t){return Math.abs(t.x)>this.options.dragThreshold};s.pointerUp=function(t,e){delete this.isTouchScrolling;this.viewport.classList.remove("is-pointer-down");this.dispatchEvent("pointerUp",t,[e]);this._dragPointerUp(t,e)};s.pointerDone=function(){n.removeEventListener("scroll",this);delete this.pointerDownScroll};s.dragStart=function(t,e){if(!this.isDraggable){return}this.dragStartPosition=this.x;this.startAnimation();n.removeEventListener("scroll",this);this.dispatchEvent("dragStart",t,[e])};s.pointerMove=function(t,e){var i=this._dragPointerMove(t,e);this.dispatchEvent("pointerMove",t,[e,i]);this._dragMove(t,e,i)};s.dragMove=function(t,e,i){if(!this.isDraggable){return}t.preventDefault();this.previousDragX=this.dragX;var n=this.options.rightToLeft?-1:1;if(this.options.wrapAround){i.x%=this.slideableWidth}var s=this.dragStartPosition+i.x*n;if(!this.options.wrapAround&&this.slides.length){var r=Math.max(-this.slides[0].target,this.dragStartPosition);s=s>r?(s+r)*.5:s;var o=Math.min(-this.getLastSlide().target,this.dragStartPosition);s=s<o?(s+o)*.5:s}this.dragX=s;this.dragMoveTime=new Date;this.dispatchEvent("dragMove",t,[e,i])};s.dragEnd=function(t,e){if(!this.isDraggable){return}if(this.options.freeScroll){this.isFreeScrolling=true}var i=this.dragEndRestingSelect();if(this.options.freeScroll&&!this.options.wrapAround){var n=this.getRestingPosition();this.isFreeScrolling=-n>this.slides[0].target&&-n<this.getLastSlide().target}else if(!this.options.freeScroll&&i==this.selectedIndex){i+=this.dragEndBoostSelect()}delete this.previousDragX;this.isDragSelect=this.options.wrapAround;this.select(i);delete this.isDragSelect;this.dispatchEvent("dragEnd",t,[e])};s.dragEndRestingSelect=function(){var t=this.getRestingPosition();var e=Math.abs(this.getSlideDistance(-t,this.selectedIndex));var i=this._getClosestResting(t,e,1);var n=this._getClosestResting(t,e,-1);var s=i.distance<n.distance?i.index:n.index;return s};s._getClosestResting=function(t,e,i){var n=this.selectedIndex;var s=Infinity;var r=this.options.contain&&!this.options.wrapAround?function(t,e){return t<=e}:function(t,e){return t<e};while(r(e,s)){n+=i;s=e;e=this.getSlideDistance(-t,n);if(e===null){break}e=Math.abs(e)}return{distance:s,index:n-i}};s.getSlideDistance=function(t,e){var i=this.slides.length;var n=this.options.wrapAround&&i>1;var s=n?a.modulo(e,i):e;var r=this.slides[s];if(!r){return null}var o=n?this.slideableWidth*Math.floor(e/i):0;return t-(r.target+o)};s.dragEndBoostSelect=function(){if(this.previousDragX===undefined||!this.dragMoveTime||new Date-this.dragMoveTime>100){return 0}var t=this.getSlideDistance(-this.dragX,this.selectedIndex);var e=this.previousDragX-this.dragX;if(t>0&&e>0){return 1}else if(t<0&&e<0){return-1}return 0};s.staticClick=function(t,e){var i=this.getParentCell(t.target);var n=i&&i.element;var s=i&&this.cells.indexOf(i);this.dispatchEvent("staticClick",t,[e,n,s])};s.onscroll=function(){var t=h();var e=this.pointerDownScroll.x-t.x;var i=this.pointerDownScroll.y-t.y;if(Math.abs(e)>3||Math.abs(i)>3){this._pointerDone()}};function h(){return{x:n.pageXOffset,y:n.pageYOffset}}return e});(function(n,s){if(typeof define=="function"&&define.amd){define("flickity/js/prev-next-button",["./flickity","unipointer/unipointer","fizzy-ui-utils/utils"],function(t,e,i){return s(n,t,e,i)})}else if(typeof module=="object"&&module.exports){module.exports=s(n,require("./flickity"),require("unipointer"),require("fizzy-ui-utils"))}else{s(n,n.Flickity,n.Unipointer,n.fizzyUIUtils)}})(window,function t(e,i,n,s){"use strict";var r="http://www.w3.org/2000/svg";function o(t,e){this.direction=t;this.parent=e;this._create()}o.prototype=Object.create(n.prototype);o.prototype._create=function(){this.isEnabled=true;this.isPrevious=this.direction==-1;var t=this.parent.options.rightToLeft?1:-1;this.isLeft=this.direction==t;var e=this.element=document.createElement("button");e.className="flickity-button flickity-prev-next-button";e.className+=this.isPrevious?" previous":" next";e.setAttribute("type","button");this.disable();e.setAttribute("aria-label",this.isPrevious?"Previous":"Next");var i=this.createSVG();e.appendChild(i);this.parent.on("select",this.update.bind(this));this.on("pointerDown",this.parent.childUIPointerDown.bind(this.parent))};o.prototype.activate=function(){this.bindStartEvent(this.element);this.element.addEventListener("click",this);this.parent.element.appendChild(this.element)};o.prototype.deactivate=function(){this.parent.element.removeChild(this.element);this.unbindStartEvent(this.element);this.element.removeEventListener("click",this)};o.prototype.createSVG=function(){var t=document.createElementNS(r,"svg");t.setAttribute("class","flickity-button-icon");t.setAttribute("viewBox","0 0 100 100");var e=document.createElementNS(r,"path");var i=a(this.parent.options.arrowShape);e.setAttribute("d",i);e.setAttribute("class","arrow");if(!this.isLeft){e.setAttribute("transform","translate(100, 100) rotate(180) ")}t.appendChild(e);return t};function a(t){if(typeof t=="string"){return t}return"M "+t.x0+",50"+" L "+t.x1+","+(t.y1+50)+" L "+t.x2+","+(t.y2+50)+" L "+t.x3+",50 "+" L "+t.x2+","+(50-t.y2)+" L "+t.x1+","+(50-t.y1)+" Z"}o.prototype.handleEvent=s.handleEvent;o.prototype.onclick=function(){if(!this.isEnabled){return}this.parent.uiChange();var t=this.isPrevious?"previous":"next";this.parent[t]()};o.prototype.enable=function(){if(this.isEnabled){return}this.element.disabled=false;this.isEnabled=true};o.prototype.disable=function(){if(!this.isEnabled){return}this.element.disabled=true;this.isEnabled=false};o.prototype.update=function(){var t=this.parent.slides;if(this.parent.options.wrapAround&&t.length>1){this.enable();return}var e=t.length?t.length-1:0;var i=this.isPrevious?0:e;var n=this.parent.selectedIndex==i?"disable":"enable";this[n]()};o.prototype.destroy=function(){this.deactivate();this.allOff()};s.extend(i.defaults,{prevNextButtons:true,arrowShape:{x0:10,x1:60,y1:50,x2:70,y2:40,x3:30}});i.createMethods.push("_createPrevNextButtons");var l=i.prototype;l._createPrevNextButtons=function(){if(!this.options.prevNextButtons){return}this.prevButton=new o(-1,this);this.nextButton=new o(1,this);this.on("activate",this.activatePrevNextButtons)};l.activatePrevNextButtons=function(){this.prevButton.activate();this.nextButton.activate();this.on("deactivate",this.deactivatePrevNextButtons)};l.deactivatePrevNextButtons=function(){this.prevButton.deactivate();this.nextButton.deactivate();this.off("deactivate",this.deactivatePrevNextButtons)};i.PrevNextButton=o;return i});(function(n,s){if(typeof define=="function"&&define.amd){define("flickity/js/page-dots",["./flickity","unipointer/unipointer","fizzy-ui-utils/utils"],function(t,e,i){return s(n,t,e,i)})}else if(typeof module=="object"&&module.exports){module.exports=s(n,require("./flickity"),require("unipointer"),require("fizzy-ui-utils"))}else{s(n,n.Flickity,n.Unipointer,n.fizzyUIUtils)}})(window,function t(e,i,n,s){function r(t){this.parent=t;this._create()}r.prototype=Object.create(n.prototype);r.prototype._create=function(){this.holder=document.createElement("ol");this.holder.className="flickity-page-dots";this.dots=[];this.handleClick=this.onClick.bind(this);this.on("pointerDown",this.parent.childUIPointerDown.bind(this.parent))};r.prototype.activate=function(){this.setDots();this.holder.addEventListener("click",this.handleClick);this.bindStartEvent(this.holder);this.parent.element.appendChild(this.holder)};r.prototype.deactivate=function(){this.holder.removeEventListener("click",this.handleClick);this.unbindStartEvent(this.holder);this.parent.element.removeChild(this.holder)};r.prototype.setDots=function(){var t=this.parent.slides.length-this.dots.length;if(t>0){this.addDots(t)}else if(t<0){this.removeDots(-t)}};r.prototype.addDots=function(t){var e=document.createDocumentFragment();var i=[];var n=this.dots.length;var s=n+t;for(var r=n;r<s;r++){var o=document.createElement("li");o.className="dot";o.setAttribute("aria-label","Page dot "+(r+1));e.appendChild(o);i.push(o)}this.holder.appendChild(e);this.dots=this.dots.concat(i)};r.prototype.removeDots=function(t){var e=this.dots.splice(this.dots.length-t,t);e.forEach(function(t){this.holder.removeChild(t)},this)};r.prototype.updateSelected=function(){if(this.selectedDot){this.selectedDot.className="dot";this.selectedDot.removeAttribute("aria-current")}if(!this.dots.length){return}this.selectedDot=this.dots[this.parent.selectedIndex];this.selectedDot.className="dot is-selected";this.selectedDot.setAttribute("aria-current","step")};r.prototype.onTap=r.prototype.onClick=function(t){var e=t.target;if(e.nodeName!="LI"){return}this.parent.uiChange();var i=this.dots.indexOf(e);this.parent.select(i)};r.prototype.destroy=function(){this.deactivate();this.allOff()};i.PageDots=r;s.extend(i.defaults,{pageDots:true});i.createMethods.push("_createPageDots");var o=i.prototype;o._createPageDots=function(){if(!this.options.pageDots){return}this.pageDots=new r(this);this.on("activate",this.activatePageDots);this.on("select",this.updateSelectedPageDots);this.on("cellChange",this.updatePageDots);this.on("resize",this.updatePageDots);this.on("deactivate",this.deactivatePageDots)};o.activatePageDots=function(){this.pageDots.activate()};o.updateSelectedPageDots=function(){this.pageDots.updateSelected()};o.updatePageDots=function(){this.pageDots.setDots()};o.deactivatePageDots=function(){this.pageDots.deactivate()};i.PageDots=r;return i});(function(t,n){if(typeof define=="function"&&define.amd){define("flickity/js/player",["ev-emitter/ev-emitter","fizzy-ui-utils/utils","./flickity"],function(t,e,i){return n(t,e,i)})}else if(typeof module=="object"&&module.exports){module.exports=n(require("ev-emitter"),require("fizzy-ui-utils"),require("./flickity"))}else{n(t.EvEmitter,t.fizzyUIUtils,t.Flickity)}})(window,function t(e,i,n){function s(t){this.parent=t;this.state="stopped";this.onVisibilityChange=this.visibilityChange.bind(this);this.onVisibilityPlay=this.visibilityPlay.bind(this)}s.prototype=Object.create(e.prototype);s.prototype.play=function(){if(this.state=="playing"){return}var t=document.hidden;if(t){document.addEventListener("visibilitychange",this.onVisibilityPlay);return}this.state="playing";document.addEventListener("visibilitychange",this.onVisibilityChange);this.tick()};s.prototype.tick=function(){if(this.state!="playing"){return}var t=this.parent.options.autoPlay;t=typeof t=="number"?t:3e3;var e=this;this.clear();this.timeout=setTimeout(function(){e.parent.next(true);e.tick()},t)};s.prototype.stop=function(){this.state="stopped";this.clear();document.removeEventListener("visibilitychange",this.onVisibilityChange)};s.prototype.clear=function(){clearTimeout(this.timeout)};s.prototype.pause=function(){if(this.state=="playing"){this.state="paused";this.clear()}};s.prototype.unpause=function(){if(this.state=="paused"){this.play()}};s.prototype.visibilityChange=function(){var t=document.hidden;this[t?"pause":"unpause"]()};s.prototype.visibilityPlay=function(){this.play();document.removeEventListener("visibilitychange",this.onVisibilityPlay)};i.extend(n.defaults,{pauseAutoPlayOnHover:true});n.createMethods.push("_createPlayer");var r=n.prototype;r._createPlayer=function(){this.player=new s(this);this.on("activate",this.activatePlayer);this.on("uiChange",this.stopPlayer);this.on("pointerDown",this.stopPlayer);this.on("deactivate",this.deactivatePlayer)};r.activatePlayer=function(){if(!this.options.autoPlay){return}this.player.play();this.element.addEventListener("mouseenter",this)};r.playPlayer=function(){this.player.play()};r.stopPlayer=function(){this.player.stop()};r.pausePlayer=function(){this.player.pause()};r.unpausePlayer=function(){this.player.unpause()};r.deactivatePlayer=function(){this.player.stop();this.element.removeEventListener("mouseenter",this)};r.onmouseenter=function(){if(!this.options.pauseAutoPlayOnHover){return}this.player.pause();this.element.addEventListener("mouseleave",this)};r.onmouseleave=function(){this.player.unpause();this.element.removeEventListener("mouseleave",this)};n.Player=s;return n});(function(i,n){if(typeof define=="function"&&define.amd){define("flickity/js/add-remove-cell",["./flickity","fizzy-ui-utils/utils"],function(t,e){return n(i,t,e)})}else if(typeof module=="object"&&module.exports){module.exports=n(i,require("./flickity"),require("fizzy-ui-utils"))}else{n(i,i.Flickity,i.fizzyUIUtils)}})(window,function t(e,i,n){function l(t){var e=document.createDocumentFragment();t.forEach(function(t){e.appendChild(t.element)});return e}var s=i.prototype;s.insert=function(t,e){var i=this._makeCells(t);if(!i||!i.length){return}var n=this.cells.length;e=e===undefined?n:e;var s=l(i);var r=e==n;if(r){this.slider.appendChild(s)}else{var o=this.cells[e].element;this.slider.insertBefore(s,o)}if(e===0){this.cells=i.concat(this.cells)}else if(r){this.cells=this.cells.concat(i)}else{var a=this.cells.splice(e,n-e);this.cells=this.cells.concat(i).concat(a)}this._sizeCells(i);this.cellChange(e,true)};s.append=function(t){this.insert(t,this.cells.length)};s.prepend=function(t){this.insert(t,0)};s.remove=function(t){var e=this.getCells(t);if(!e||!e.length){return}var i=this.cells.length-1;e.forEach(function(t){t.remove();var e=this.cells.indexOf(t);i=Math.min(e,i);n.removeFrom(this.cells,t)},this);this.cellChange(i,true)};s.cellSizeChange=function(t){var e=this.getCell(t);if(!e){return}e.getSize();var i=this.cells.indexOf(e);this.cellChange(i)};s.cellChange=function(t,e){var i=this.selectedElement;this._positionCells(t);this._getWrapShiftCells();this.setGallerySize();var n=this.getCell(i);if(n){this.selectedIndex=this.getCellSlideIndex(n)}this.selectedIndex=Math.min(this.slides.length-1,this.selectedIndex);this.emitEvent("cellChange",[t]);this.select(this.selectedIndex);if(e){this.positionSliderAtSelected()}};return i});(function(i,n){if(typeof define=="function"&&define.amd){define("flickity/js/lazyload",["./flickity","fizzy-ui-utils/utils"],function(t,e){return n(i,t,e)})}else if(typeof module=="object"&&module.exports){module.exports=n(i,require("./flickity"),require("fizzy-ui-utils"))}else{n(i,i.Flickity,i.fizzyUIUtils)}})(window,function t(e,i,o){"use strict";i.createMethods.push("_createLazyload");var n=i.prototype;n._createLazyload=function(){this.on("select",this.lazyLoad)};n.lazyLoad=function(){var t=this.options.lazyLoad;if(!t){return}var e=typeof t=="number"?t:0;var i=this.getAdjacentCellElements(e);var n=[];i.forEach(function(t){var e=s(t);n=n.concat(e)});n.forEach(function(t){new r(t,this)},this)};function s(t){if(t.nodeName=="IMG"){var e=t.getAttribute("data-flickity-lazyload");var i=t.getAttribute("data-flickity-lazyload-src");var n=t.getAttribute("data-flickity-lazyload-srcset");if(e||i||n){return[t]}}var s="img[data-flickity-lazyload], "+"img[data-flickity-lazyload-src], img[data-flickity-lazyload-srcset]";var r=t.querySelectorAll(s);return o.makeArray(r)}function r(t,e){this.img=t;this.flickity=e;this.load()}r.prototype.handleEvent=o.handleEvent;r.prototype.load=function(){this.img.addEventListener("load",this);this.img.addEventListener("error",this);var t=this.img.getAttribute("data-flickity-lazyload")||this.img.getAttribute("data-flickity-lazyload-src");var e=this.img.getAttribute("data-flickity-lazyload-srcset");this.img.src=t;if(e){this.img.setAttribute("srcset",e)}this.img.removeAttribute("data-flickity-lazyload");this.img.removeAttribute("data-flickity-lazyload-src");this.img.removeAttribute("data-flickity-lazyload-srcset")};r.prototype.onload=function(t){this.complete(t,"flickity-lazyloaded")};r.prototype.onerror=function(t){this.complete(t,"flickity-lazyerror")};r.prototype.complete=function(t,e){this.img.removeEventListener("load",this);this.img.removeEventListener("error",this);var i=this.flickity.getParentCell(this.img);var n=i&&i.element;this.flickity.cellSizeChange(n);this.img.classList.add(e);this.flickity.dispatchEvent("lazyLoad",t,n)};i.LazyLoader=r;return i});
/*!
 * Flickity v2.2.2
 * Touch, responsive, flickable carousels
 *
 * Licensed GPLv3 for open source use
 * or Flickity Commercial License for commercial use
 *
 * https://flickity.metafizzy.co
 * Copyright 2015-2021 Metafizzy
 */
(function(t,e){if(typeof define=="function"&&define.amd){define("flickity/js/index",["./flickity","./drag","./prev-next-button","./page-dots","./player","./add-remove-cell","./lazyload"],e)}else if(typeof module=="object"&&module.exports){module.exports=e(require("./flickity"),require("./drag"),require("./prev-next-button"),require("./page-dots"),require("./player"),require("./add-remove-cell"),require("./lazyload"))}})(window,function t(e){return e});
/*!
 * Flickity asNavFor v2.0.2
 * enable asNavFor for Flickity
 */
(function(t,e){if(typeof define=="function"&&define.amd){define("flickity-as-nav-for/as-nav-for",["flickity/js/index","fizzy-ui-utils/utils"],e)}else if(typeof module=="object"&&module.exports){module.exports=e(require("flickity"),require("fizzy-ui-utils"))}else{t.Flickity=e(t.Flickity,t.fizzyUIUtils)}})(window,function t(n,s){n.createMethods.push("_createAsNavFor");var e=n.prototype;e._createAsNavFor=function(){this.on("activate",this.activateAsNavFor);this.on("deactivate",this.deactivateAsNavFor);this.on("destroy",this.destroyAsNavFor);var e=this.options.asNavFor;if(!e){return}var i=this;setTimeout(function t(){i.setNavCompanion(e)})};e.setNavCompanion=function(t){t=s.getQueryElement(t);var e=n.data(t);if(!e||e==this){return}this.navCompanion=e;var i=this;this.onNavCompanionSelect=function(){i.navCompanionSelect()};e.on("select",this.onNavCompanionSelect);this.on("staticClick",this.onNavStaticClick);this.navCompanionSelect(true)};e.navCompanionSelect=function(t){var e=this.navCompanion&&this.navCompanion.selectedCells;if(!e){return}var i=e[0];var n=this.navCompanion.cells.indexOf(i);var s=n+e.length-1;var r=Math.floor(a(n,s,this.navCompanion.cellAlign));this.selectCell(r,false,t);this.removeNavSelectedElements();if(r>=this.cells.length){return}var o=this.cells.slice(n,s+1);this.navSelectedElements=o.map(function(t){return t.element});this.changeNavSelectedClass("add")};function a(t,e,i){return(e-t)*i+t}e.changeNavSelectedClass=function(e){this.navSelectedElements.forEach(function(t){t.classList[e]("is-nav-selected")})};e.activateAsNavFor=function(){this.navCompanionSelect(true)};e.removeNavSelectedElements=function(){if(!this.navSelectedElements){return}this.changeNavSelectedClass("remove");delete this.navSelectedElements};e.onNavStaticClick=function(t,e,i,n){if(typeof n=="number"){this.navCompanion.selectCell(n)}};e.deactivateAsNavFor=function(){this.removeNavSelectedElements()};e.destroyAsNavFor=function(){if(!this.navCompanion){return}this.navCompanion.off("select",this.onNavCompanionSelect);this.off("staticClick",this.onNavStaticClick);delete this.navCompanion};return n});
/*!
 * imagesLoaded v4.1.4
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */
(function(e,i){"use strict";if(typeof define=="function"&&define.amd){define("imagesloaded/imagesloaded",["ev-emitter/ev-emitter"],function(t){return i(e,t)})}else if(typeof module=="object"&&module.exports){module.exports=i(e,require("ev-emitter"))}else{e.imagesLoaded=i(e,e.EvEmitter)}})(typeof window!=="undefined"?window:this,function t(e,i){var s=e.jQuery;var r=e.console;function o(t,e){for(var i in e){t[i]=e[i]}return t}var n=Array.prototype.slice;function a(t){if(Array.isArray(t)){return t}var e=typeof t=="object"&&typeof t.length=="number";if(e){return n.call(t)}return[t]}function l(t,e,i){if(!(this instanceof l)){return new l(t,e,i)}var n=t;if(typeof t=="string"){n=document.querySelectorAll(t)}if(!n){r.error("Bad element for imagesLoaded "+(n||t));return}this.elements=a(n);this.options=o({},this.options);if(typeof e=="function"){i=e}else{o(this.options,e)}if(i){this.on("always",i)}this.getImages();if(s){this.jqDeferred=new s.Deferred}setTimeout(this.check.bind(this))}l.prototype=Object.create(i.prototype);l.prototype.options={};l.prototype.getImages=function(){this.images=[];this.elements.forEach(this.addElementImages,this)};l.prototype.addElementImages=function(t){if(t.nodeName=="IMG"){this.addImage(t)}if(this.options.background===true){this.addElementBackgroundImages(t)}var e=t.nodeType;if(!e||!h[e]){return}var i=t.querySelectorAll("img");for(var n=0;n<i.length;n++){var s=i[n];this.addImage(s)}if(typeof this.options.background=="string"){var r=t.querySelectorAll(this.options.background);for(n=0;n<r.length;n++){var o=r[n];this.addElementBackgroundImages(o)}}};var h={1:true,9:true,11:true};l.prototype.addElementBackgroundImages=function(t){var e=getComputedStyle(t);if(!e){return}var i=/url\((['"])?(.*?)\1\)/gi;var n=i.exec(e.backgroundImage);while(n!==null){var s=n&&n[2];if(s){this.addBackground(s,t)}n=i.exec(e.backgroundImage)}};l.prototype.addImage=function(t){var e=new c(t);this.images.push(e)};l.prototype.addBackground=function(t,e){var i=new u(t,e);this.images.push(i)};l.prototype.check=function(){var n=this;this.progressedCount=0;this.hasAnyBroken=false;if(!this.images.length){this.complete();return}function e(t,e,i){setTimeout(function(){n.progress(t,e,i)})}this.images.forEach(function(t){t.once("progress",e);t.check()})};l.prototype.progress=function(t,e,i){this.progressedCount++;this.hasAnyBroken=this.hasAnyBroken||!t.isLoaded;this.emitEvent("progress",[this,t,e]);if(this.jqDeferred&&this.jqDeferred.notify){this.jqDeferred.notify(this,t)}if(this.progressedCount==this.images.length){this.complete()}if(this.options.debug&&r){r.log("progress: "+i,t,e)}};l.prototype.complete=function(){var t=this.hasAnyBroken?"fail":"done";this.isComplete=true;this.emitEvent(t,[this]);this.emitEvent("always",[this]);if(this.jqDeferred){var e=this.hasAnyBroken?"reject":"resolve";this.jqDeferred[e](this)}};function c(t){this.img=t}c.prototype=Object.create(i.prototype);c.prototype.check=function(){var t=this.getIsImageComplete();if(t){this.confirm(this.img.naturalWidth!==0,"naturalWidth");return}this.proxyImage=new Image;this.proxyImage.addEventListener("load",this);this.proxyImage.addEventListener("error",this);this.img.addEventListener("load",this);this.img.addEventListener("error",this);this.proxyImage.src=this.img.src};c.prototype.getIsImageComplete=function(){return this.img.complete&&this.img.naturalWidth};c.prototype.confirm=function(t,e){this.isLoaded=t;this.emitEvent("progress",[this,this.img,e])};c.prototype.handleEvent=function(t){var e="on"+t.type;if(this[e]){this[e](t)}};c.prototype.onload=function(){this.confirm(true,"onload");this.unbindEvents()};c.prototype.onerror=function(){this.confirm(false,"onerror");this.unbindEvents()};c.prototype.unbindEvents=function(){this.proxyImage.removeEventListener("load",this);this.proxyImage.removeEventListener("error",this);this.img.removeEventListener("load",this);this.img.removeEventListener("error",this)};function u(t,e){this.url=t;this.element=e;this.img=new Image}u.prototype=Object.create(c.prototype);u.prototype.check=function(){this.img.addEventListener("load",this);this.img.addEventListener("error",this);this.img.src=this.url;var t=this.getIsImageComplete();if(t){this.confirm(this.img.naturalWidth!==0,"naturalWidth");this.unbindEvents()}};u.prototype.unbindEvents=function(){this.img.removeEventListener("load",this);this.img.removeEventListener("error",this)};u.prototype.confirm=function(t,e){this.isLoaded=t;this.emitEvent("progress",[this,this.element,e])};l.makeJQueryPlugin=function(t){t=t||e.jQuery;if(!t){return}s=t;s.fn.imagesLoaded=function(t,e){var i=new l(this,t,e);return i.jqDeferred.promise(s(this))}};l.makeJQueryPlugin();return l});
/*!
 * Flickity imagesLoaded v2.0.0
 * enables imagesLoaded option for Flickity
 */
(function(i,n){if(typeof define=="function"&&define.amd){define(["flickity/js/index","imagesloaded/imagesloaded"],function(t,e){return n(i,t,e)})}else if(typeof module=="object"&&module.exports){module.exports=n(i,require("flickity"),require("imagesloaded"))}else{i.Flickity=n(i,i.Flickity,i.imagesLoaded)}})(window,function t(e,i,s){"use strict";i.createMethods.push("_createImagesLoaded");var n=i.prototype;n._createImagesLoaded=function(){this.on("activate",this.imagesLoaded)};n.imagesLoaded=function(){if(!this.options.imagesLoaded){return}var n=this;function t(t,e){var i=n.getParentCell(e.img);n.cellSizeChange(i&&i.element);if(!n.options.freeScroll){n.positionSliderAtSelected()}}s(this.slider).on("progress",t)};return i});

/**
 * Flickity background lazyload v1.0.0
 * lazyload background cell images
 */

/*jshint browser: true, unused: true, undef: true */

( function( window, factory ) {
    // universal module definition
    /*globals define, module, require */
    if ( typeof define == 'function' && define.amd ) {
      // AMD
      define( [
        'flickity/js/index',
        'fizzy-ui-utils/utils'
      ], factory );
    } else if ( typeof module == 'object' && module.exports ) {
      // CommonJS
      module.exports = factory(
        require('flickity'),
        require('fizzy-ui-utils')
      );
    } else {
      // browser global
      factory(
        window.Flickity,
        window.fizzyUIUtils
      );
    }
  
  }( window, function factory( Flickity, utils ) {
  /*jshint strict: true */
  'use strict';
  
  Flickity.createMethods.push('_createBgLazyLoad');
  
  var proto = Flickity.prototype;
  
  proto._createBgLazyLoad = function() {
    this.on( 'select', this.bgLazyLoad );
  };
  
  proto.bgLazyLoad = function() {
    var lazyLoad = this.options.bgLazyLoad;
    if ( !lazyLoad ) {
      return;
    }
  
    // get adjacent cells, use lazyLoad option for adjacent count
    var adjCount = typeof lazyLoad == 'number' ? lazyLoad : 0;
    var cellElems = this.getAdjacentCellElements( adjCount );
  
    for ( var i=0; i < cellElems.length; i++ ) {
      var cellElem = cellElems[i];
      this.bgLazyLoadElem( cellElem );
      // select lazy elems in cell
      var children = cellElem.querySelectorAll('[data-flickity-bg-lazyload]');
      for ( var j=0; j < children.length; j++ ) {
        this.bgLazyLoadElem( children[j] );
      }
    }
  };
  
  proto.bgLazyLoadElem = function( elem ) {
    var attr = elem.getAttribute('data-flickity-bg-lazyload');
    if ( attr ) {
      new BgLazyLoader( elem, attr, this );
    }
  };
  
  // -------------------------- LazyBGLoader -------------------------- //
  
  /**
   * class to handle loading images
   */
  function BgLazyLoader( elem, url, flickity ) {
    this.element = elem;
    this.url = url;
    this.img = new Image();
    this.flickity = flickity;
    this.load();
  }
  
  BgLazyLoader.prototype.handleEvent = utils.handleEvent;
  
  BgLazyLoader.prototype.load = function() {
    this.img.addEventListener( 'load', this );
    this.img.addEventListener( 'error', this );
    // load image
    this.img.src = this.url;
    // remove attr
    this.element.removeAttribute('data-flickity-bg-lazyload');
  };
  
  BgLazyLoader.prototype.onload = function( event ) {
    this.element.style.backgroundImage = 'url(' + this.url + ')';
    this.complete( event, 'flickity-bg-lazyloaded' );
  };
  
  BgLazyLoader.prototype.onerror = function( event ) {
    this.complete( event, 'flickity-bg-lazyerror' );
  };
  
  BgLazyLoader.prototype.complete = function( event, className ) {
    // unbind events
    this.img.removeEventListener( 'load', this );
    this.img.removeEventListener( 'error', this );
  
    this.element.classList.add( className );
    this.flickity.dispatchEvent( 'bgLazyLoad', event, this.element );
  };
  
  // -----  ----- //
  
  Flickity.BgLazyLoader = BgLazyLoader;
  
  return Flickity;
  
  }));
/* flickity end ************************************** */

/* Tingle modal popup */
!function(t,o){"function"==typeof define&&define.amd?define(o):"object"==typeof exports?module.exports=o():t.tingle=o()}(this,function(){var o=!1;function t(t){this.opts=function(){for(var t=1;t<arguments.length;t++)for(var o in arguments[t])arguments[t].hasOwnProperty(o)&&(arguments[0][o]=arguments[t][o]);return arguments[0]}({},{onClose:null,onOpen:null,beforeOpen:null,beforeClose:null,stickyFooter:!1,footer:!1,cssClass:[],closeLabel:"Close",closeMethods:["overlay","button","escape"]},t),this.init()}function e(){this.modalBoxFooter&&(this.modalBoxFooter.style.width=this.modalBox.clientWidth+"px",this.modalBoxFooter.style.left=this.modalBox.offsetLeft+"px")}return t.prototype.init=function(){if(!this.modal)return function(){this.modal=document.createElement("div"),this.modal.classList.add("tingle-modal"),0!==this.opts.closeMethods.length&&-1!==this.opts.closeMethods.indexOf("overlay")||this.modal.classList.add("tingle-modal--noOverlayClose");this.modal.style.display="none",this.opts.cssClass.forEach(function(t){"string"==typeof t&&this.modal.classList.add(t)},this),-1!==this.opts.closeMethods.indexOf("button")&&(this.modalCloseBtn=document.createElement("button"),this.modalCloseBtn.type="button",this.modalCloseBtn.classList.add("tingle-modal__close"),this.modalCloseBtnIcon=document.createElement("span"),this.modalCloseBtnIcon.classList.add("tingle-modal__closeIcon"),this.modalCloseBtnIcon.innerHTML='<svg viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg"><path d="M.3 9.7c.2.2.4.3.7.3.3 0 .5-.1.7-.3L5 6.4l3.3 3.3c.2.2.5.3.7.3.2 0 .5-.1.7-.3.4-.4.4-1 0-1.4L6.4 5l3.3-3.3c.4-.4.4-1 0-1.4-.4-.4-1-.4-1.4 0L5 3.6 1.7.3C1.3-.1.7-.1.3.3c-.4.4-.4 1 0 1.4L3.6 5 .3 8.3c-.4.4-.4 1 0 1.4z" fill="#000" fill-rule="nonzero"/></svg>',this.modalCloseBtnLabel=document.createElement("span"),this.modalCloseBtnLabel.classList.add("tingle-modal__closeLabel"),this.modalCloseBtnLabel.innerHTML=this.opts.closeLabel,this.modalCloseBtn.appendChild(this.modalCloseBtnIcon),this.modalCloseBtn.appendChild(this.modalCloseBtnLabel));this.modalBox=document.createElement("div"),this.modalBox.classList.add("tingle-modal-box"),this.modalBoxContent=document.createElement("div"),this.modalBoxContent.classList.add("tingle-modal-box__content"),this.modalBox.appendChild(this.modalBoxContent),-1!==this.opts.closeMethods.indexOf("button")&&this.modal.appendChild(this.modalCloseBtn);this.modal.appendChild(this.modalBox)}.call(this),function(){this._events={clickCloseBtn:this.close.bind(this),clickOverlay:function(t){var o=this.modal.offsetWidth-this.modal.clientWidth,e=t.clientX>=this.modal.offsetWidth-15,s=this.modal.scrollHeight!==this.modal.offsetHeight;if("MacIntel"===navigator.platform&&0==o&&e&&s)return;-1!==this.opts.closeMethods.indexOf("overlay")&&!function(t,o){for(;(t=t.parentElement)&&!t.classList.contains(o););return t}(t.target,"tingle-modal")&&t.clientX<this.modal.clientWidth&&this.close()}.bind(this),resize:this.checkOverflow.bind(this),keyboardNav:function(t){-1!==this.opts.closeMethods.indexOf("escape")&&27===t.which&&this.isOpen()&&this.close()}.bind(this)},-1!==this.opts.closeMethods.indexOf("button")&&this.modalCloseBtn.addEventListener("click",this._events.clickCloseBtn);this.modal.addEventListener("mousedown",this._events.clickOverlay),window.addEventListener("resize",this._events.resize),document.addEventListener("keydown",this._events.keyboardNav)}.call(this),document.body.appendChild(this.modal,document.body.firstChild),this.opts.footer&&this.addFooter(),this},t.prototype._busy=function(t){o=t},t.prototype._isBusy=function(){return o},t.prototype.destroy=function(){null!==this.modal&&(this.isOpen()&&this.close(!0),function(){-1!==this.opts.closeMethods.indexOf("button")&&this.modalCloseBtn.removeEventListener("click",this._events.clickCloseBtn);this.modal.removeEventListener("mousedown",this._events.clickOverlay),window.removeEventListener("resize",this._events.resize),document.removeEventListener("keydown",this._events.keyboardNav)}.call(this),this.modal.parentNode.removeChild(this.modal),this.modal=null)},t.prototype.isOpen=function(){return!!this.modal.classList.contains("tingle-modal--visible")},t.prototype.open=function(){if(!this._isBusy()){this._busy(!0);var t=this;return"function"==typeof t.opts.beforeOpen&&t.opts.beforeOpen(),this.modal.style.removeProperty?this.modal.style.removeProperty("display"):this.modal.style.removeAttribute("display"),document.getSelection().removeAllRanges(),this._scrollPosition=window.pageYOffset,document.body.classList.add("tingle-enabled"),document.body.style.top=-this._scrollPosition+"px",this.setStickyFooter(this.opts.stickyFooter),this.modal.classList.add("tingle-modal--visible"),"function"==typeof t.opts.onOpen&&t.opts.onOpen.call(t),t._busy(!1),this.checkOverflow(),this}},t.prototype.close=function(t){if(!this._isBusy()){if(this._busy(!0),!1,"function"==typeof this.opts.beforeClose)if(!this.opts.beforeClose.call(this))return void this._busy(!1);document.body.classList.remove("tingle-enabled"),document.body.style.top=null,window.scrollTo({top:this._scrollPosition,behavior:"instant"}),this.modal.classList.remove("tingle-modal--visible");var o=this;o.modal.style.display="none","function"==typeof o.opts.onClose&&o.opts.onClose.call(this),o._busy(!1)}},t.prototype.setContent=function(t){return"string"==typeof t?this.modalBoxContent.innerHTML=t:(this.modalBoxContent.innerHTML="",this.modalBoxContent.appendChild(t)),this.isOpen()&&this.checkOverflow(),this},t.prototype.getContent=function(){return this.modalBoxContent},t.prototype.addFooter=function(){return function(){this.modalBoxFooter=document.createElement("div"),this.modalBoxFooter.classList.add("tingle-modal-box__footer"),this.modalBox.appendChild(this.modalBoxFooter)}.call(this),this},t.prototype.setFooterContent=function(t){return this.modalBoxFooter.innerHTML=t,this},t.prototype.getFooterContent=function(){return this.modalBoxFooter},t.prototype.setStickyFooter=function(t){return this.isOverflow()||(t=!1),t?(this.modalBox.contains(this.modalBoxFooter)&&(this.modalBox.removeChild(this.modalBoxFooter),this.modal.appendChild(this.modalBoxFooter),this.modalBoxFooter.classList.add("tingle-modal-box__footer--sticky"),e.call(this)),this.modalBoxContent.style["padding-bottom"]=this.modalBoxFooter.clientHeight+20+"px"):this.modalBoxFooter&&(this.modalBox.contains(this.modalBoxFooter)||(this.modal.removeChild(this.modalBoxFooter),this.modalBox.appendChild(this.modalBoxFooter),this.modalBoxFooter.style.width="auto",this.modalBoxFooter.style.left="",this.modalBoxContent.style["padding-bottom"]="",this.modalBoxFooter.classList.remove("tingle-modal-box__footer--sticky"))),this},t.prototype.addFooterBtn=function(t,o,e){var s=document.createElement("button");return s.innerHTML=t,s.addEventListener("click",e),"string"==typeof o&&o.length&&o.split(" ").forEach(function(t){s.classList.add(t)}),this.modalBoxFooter.appendChild(s),s},t.prototype.resize=function(){console.warn("Resize is deprecated and will be removed in version 1.0")},t.prototype.isOverflow=function(){return window.innerHeight<=this.modalBox.clientHeight},t.prototype.checkOverflow=function(){this.modal.classList.contains("tingle-modal--visible")&&(this.isOverflow()?this.modal.classList.add("tingle-modal--overflow"):this.modal.classList.remove("tingle-modal--overflow"),!this.isOverflow()&&this.opts.stickyFooter?this.setStickyFooter(!1):this.isOverflow()&&this.opts.stickyFooter&&(e.call(this),this.setStickyFooter(!0)))},{modal:t}});
/* Tingle modal popup end ************************************** */

/* Lazysizes start */
!function(e){var t=function(u,D,f){"use strict";var k,H;if(function(){var e;var t={lazyClass:"lazyload",loadedClass:"lazyloaded",loadingClass:"lazyloading",preloadClass:"lazypreload",errorClass:"lazyerror",autosizesClass:"lazyautosizes",fastLoadedClass:"ls-is-cached",iframeLoadMode:0,srcAttr:"data-src",srcsetAttr:"data-srcset",sizesAttr:"data-sizes",minSize:40,customMedia:{},init:true,expFactor:1.5,hFac:.8,loadMode:2,loadHidden:true,ricTimeout:0,throttleDelay:125};H=u.lazySizesConfig||u.lazysizesConfig||{};for(e in t){if(!(e in H)){H[e]=t[e]}}}(),!D||!D.getElementsByClassName){return{init:function(){},cfg:H,noSupport:true}}var O=D.documentElement,i=u.HTMLPictureElement,P="addEventListener",$="getAttribute",q=u[P].bind(u),I=u.setTimeout,U=u.requestAnimationFrame||I,o=u.requestIdleCallback,j=/^picture$/i,r=["load","error","lazyincluded","_lazyloaded"],a={},G=Array.prototype.forEach,J=function(e,t){if(!a[t]){a[t]=new RegExp("(\\s|^)"+t+"(\\s|$)")}return a[t].test(e[$]("class")||"")&&a[t]},K=function(e,t){if(!J(e,t)){e.setAttribute("class",(e[$]("class")||"").trim()+" "+t)}},Q=function(e,t){var a;if(a=J(e,t)){e.setAttribute("class",(e[$]("class")||"").replace(a," "))}},V=function(t,a,e){var i=e?P:"removeEventListener";if(e){V(t,a)}r.forEach(function(e){t[i](e,a)})},X=function(e,t,a,i,r){var n=D.createEvent("Event");if(!a){a={}}a.instance=k;n.initEvent(t,!i,!r);n.detail=a;e.dispatchEvent(n);return n},Y=function(e,t){var a;if(!i&&(a=u.picturefill||H.pf)){if(t&&t.src&&!e[$]("srcset")){e.setAttribute("srcset",t.src)}a({reevaluate:true,elements:[e]})}else if(t&&t.src){e.src=t.src}},Z=function(e,t){return(getComputedStyle(e,null)||{})[t]},s=function(e,t,a){a=a||e.offsetWidth;while(a<H.minSize&&t&&!e._lazysizesWidth){a=t.offsetWidth;t=t.parentNode}return a},ee=function(){var a,i;var t=[];var r=[];var n=t;var s=function(){var e=n;n=t.length?r:t;a=true;i=false;while(e.length){e.shift()()}a=false};var e=function(e,t){if(a&&!t){e.apply(this,arguments)}else{n.push(e);if(!i){i=true;(D.hidden?I:U)(s)}}};e._lsFlush=s;return e}(),te=function(a,e){return e?function(){ee(a)}:function(){var e=this;var t=arguments;ee(function(){a.apply(e,t)})}},ae=function(e){var a;var i=0;var r=H.throttleDelay;var n=H.ricTimeout;var t=function(){a=false;i=f.now();e()};var s=o&&n>49?function(){o(t,{timeout:n});if(n!==H.ricTimeout){n=H.ricTimeout}}:te(function(){I(t)},true);return function(e){var t;if(e=e===true){n=33}if(a){return}a=true;t=r-(f.now()-i);if(t<0){t=0}if(e||t<9){s()}else{I(s,t)}}},ie=function(e){var t,a;var i=99;var r=function(){t=null;e()};var n=function(){var e=f.now()-a;if(e<i){I(n,i-e)}else{(o||r)(r)}};return function(){a=f.now();if(!t){t=I(n,i)}}},e=function(){var v,m,c,h,e;var y,z,g,p,C,b,A;var n=/^img$/i;var d=/^iframe$/i;var E="onscroll"in u&&!/(gle|ing)bot/.test(navigator.userAgent);var _=0;var w=0;var M=0;var N=-1;var L=function(e){M--;if(!e||M<0||!e.target){M=0}};var x=function(e){if(A==null){A=Z(D.body,"visibility")=="hidden"}return A||!(Z(e.parentNode,"visibility")=="hidden"&&Z(e,"visibility")=="hidden")};var W=function(e,t){var a;var i=e;var r=x(e);g-=t;b+=t;p-=t;C+=t;while(r&&(i=i.offsetParent)&&i!=D.body&&i!=O){r=(Z(i,"opacity")||1)>0;if(r&&Z(i,"overflow")!="visible"){a=i.getBoundingClientRect();r=C>a.left&&p<a.right&&b>a.top-1&&g<a.bottom+1}}return r};var t=function(){var e,t,a,i,r,n,s,o,l,u,f,c;var d=k.elements;if((h=H.loadMode)&&M<8&&(e=d.length)){t=0;N++;for(;t<e;t++){if(!d[t]||d[t]._lazyRace){continue}if(!E||k.prematureUnveil&&k.prematureUnveil(d[t])){R(d[t]);continue}if(!(o=d[t][$]("data-expand"))||!(n=o*1)){n=w}if(!u){u=!H.expand||H.expand<1?O.clientHeight>500&&O.clientWidth>500?500:370:H.expand;k._defEx=u;f=u*H.expFactor;c=H.hFac;A=null;if(w<f&&M<1&&N>2&&h>2&&!D.hidden){w=f;N=0}else if(h>1&&N>1&&M<6){w=u}else{w=_}}if(l!==n){y=innerWidth+n*c;z=innerHeight+n;s=n*-1;l=n}a=d[t].getBoundingClientRect();if((b=a.bottom)>=s&&(g=a.top)<=z&&(C=a.right)>=s*c&&(p=a.left)<=y&&(b||C||p||g)&&(H.loadHidden||x(d[t]))&&(m&&M<3&&!o&&(h<3||N<4)||W(d[t],n))){R(d[t]);r=true;if(M>9){break}}else if(!r&&m&&!i&&M<4&&N<4&&h>2&&(v[0]||H.preloadAfterLoad)&&(v[0]||!o&&(b||C||p||g||d[t][$](H.sizesAttr)!="auto"))){i=v[0]||d[t]}}if(i&&!r){R(i)}}};var a=ae(t);var S=function(e){var t=e.target;if(t._lazyCache){delete t._lazyCache;return}L(e);K(t,H.loadedClass);Q(t,H.loadingClass);V(t,B);X(t,"lazyloaded")};var i=te(S);var B=function(e){i({target:e.target})};var T=function(e,t){var a=e.getAttribute("data-load-mode")||H.iframeLoadMode;if(a==0){e.contentWindow.location.replace(t)}else if(a==1){e.src=t}};var F=function(e){var t;var a=e[$](H.srcsetAttr);if(t=H.customMedia[e[$]("data-media")||e[$]("media")]){e.setAttribute("media",t)}if(a){e.setAttribute("srcset",a)}};var s=te(function(t,e,a,i,r){var n,s,o,l,u,f;if(!(u=X(t,"lazybeforeunveil",e)).defaultPrevented){if(i){if(a){K(t,H.autosizesClass)}else{t.setAttribute("sizes",i)}}s=t[$](H.srcsetAttr);n=t[$](H.srcAttr);if(r){o=t.parentNode;l=o&&j.test(o.nodeName||"")}f=e.firesLoad||"src"in t&&(s||n||l);u={target:t};K(t,H.loadingClass);if(f){clearTimeout(c);c=I(L,2500);V(t,B,true)}if(l){G.call(o.getElementsByTagName("source"),F)}if(s){t.setAttribute("srcset",s)}else if(n&&!l){if(d.test(t.nodeName)){T(t,n)}else{t.src=n}}if(r&&(s||l)){Y(t,{src:n})}}if(t._lazyRace){delete t._lazyRace}Q(t,H.lazyClass);ee(function(){var e=t.complete&&t.naturalWidth>1;if(!f||e){if(e){K(t,H.fastLoadedClass)}S(u);t._lazyCache=true;I(function(){if("_lazyCache"in t){delete t._lazyCache}},9)}if(t.loading=="lazy"){M--}},true)});var R=function(e){if(e._lazyRace){return}var t;var a=n.test(e.nodeName);var i=a&&(e[$](H.sizesAttr)||e[$]("sizes"));var r=i=="auto";if((r||!m)&&a&&(e[$]("src")||e.srcset)&&!e.complete&&!J(e,H.errorClass)&&J(e,H.lazyClass)){return}t=X(e,"lazyunveilread").detail;if(r){re.updateElem(e,true,e.offsetWidth)}e._lazyRace=true;M++;s(e,t,r,i,a)};var r=ie(function(){H.loadMode=3;a()});var o=function(){if(H.loadMode==3){H.loadMode=2}r()};var l=function(){if(m){return}if(f.now()-e<999){I(l,999);return}m=true;H.loadMode=3;a();q("scroll",o,true)};return{_:function(){e=f.now();k.elements=D.getElementsByClassName(H.lazyClass);v=D.getElementsByClassName(H.lazyClass+" "+H.preloadClass);q("scroll",a,true);q("resize",a,true);q("pageshow",function(e){if(e.persisted){var t=D.querySelectorAll("."+H.loadingClass);if(t.length&&t.forEach){U(function(){t.forEach(function(e){if(e.complete){R(e)}})})}}});if(u.MutationObserver){new MutationObserver(a).observe(O,{childList:true,subtree:true,attributes:true})}else{O[P]("DOMNodeInserted",a,true);O[P]("DOMAttrModified",a,true);setInterval(a,999)}q("hashchange",a,true);["focus","mouseover","click","load","transitionend","animationend"].forEach(function(e){D[P](e,a,true)});if(/d$|^c/.test(D.readyState)){l()}else{q("load",l);D[P]("DOMContentLoaded",a);I(l,2e4)}if(k.elements.length){t();ee._lsFlush()}else{a()}},checkElems:a,unveil:R,_aLSL:o}}(),re=function(){var a;var n=te(function(e,t,a,i){var r,n,s;e._lazysizesWidth=i;i+="px";e.setAttribute("sizes",i);if(j.test(t.nodeName||"")){r=t.getElementsByTagName("source");for(n=0,s=r.length;n<s;n++){r[n].setAttribute("sizes",i)}}if(!a.detail.dataAttr){Y(e,a.detail)}});var i=function(e,t,a){var i;var r=e.parentNode;if(r){a=s(e,r,a);i=X(e,"lazybeforesizes",{width:a,dataAttr:!!t});if(!i.defaultPrevented){a=i.detail.width;if(a&&a!==e._lazysizesWidth){n(e,r,i,a)}}}};var e=function(){var e;var t=a.length;if(t){e=0;for(;e<t;e++){i(a[e])}}};var t=ie(e);return{_:function(){a=D.getElementsByClassName(H.autosizesClass);q("resize",t)},checkElems:t,updateElem:i}}(),t=function(){if(!t.i&&D.getElementsByClassName){t.i=true;re._();e._()}};return I(function(){H.init&&t()}),k={cfg:H,autoSizer:re,loader:e,init:t,uP:Y,aC:K,rC:Q,hC:J,fire:X,gW:s,rAF:ee}}(e,e.document,Date);e.lazySizes=t,"object"==typeof module&&module.exports&&(module.exports=t)}("undefined"!=typeof window?window:{});
(function(window, factory) {
    var globalInstall = function(){
        factory(window.lazySizes);
        window.removeEventListener('lazyunveilread', globalInstall, true);
    };

    factory = factory.bind(null, window, window.document);

    if(typeof module == 'object' && module.exports){
        factory(require('lazysizes'));
    } else if (typeof define == 'function' && define.amd) {
        define(['lazysizes'], factory);
    } else if(window.lazySizes) {
        globalInstall();
    } else {
        window.addEventListener('lazyunveilread', globalInstall, true);
    }
}(window, function(window, document, lazySizes) {
    /*jshint eqnull:true */
    'use strict';
    var bgLoad, regBgUrlEscape;
    var uniqueUrls = {};

    if(document.addEventListener){
        regBgUrlEscape = /\(|\)|\s|'/;

        bgLoad = function (url, cb){
            var img = document.createElement('img');
            img.onload = function(){
                img.onload = null;
                img.onerror = null;
                img = null;
                cb();
            };
            img.onerror = img.onload;

            img.src = url;

            if(img && img.complete && img.onload){
                img.onload();
            }
        };

        addEventListener('lazybeforeunveil', function(e){
            if(e.detail.instance != lazySizes){return;}

            var tmp, load, bg, poster;
            if(!e.defaultPrevented) {

                var target = e.target;

                if(target.preload == 'none'){
                    target.preload = target.getAttribute('data-preload') || 'auto';
                }

                if (target.getAttribute('data-autoplay') != null) {
                    if (target.getAttribute('data-expand') && !target.autoplay) {
                        try {
                            target.play();
                        } catch (er) {}
                    } else {
                        requestAnimationFrame(function () {
                            target.setAttribute('data-expand', '-10');
                            lazySizes.aC(target, lazySizes.cfg.lazyClass);
                        });
                    }
                }

                tmp = target.getAttribute('data-link');
                if(tmp){
                    addStyleScript(tmp, true);
                }

                // handle data-script
                tmp = target.getAttribute('data-script');
                if(tmp){
                    addStyleScript(tmp);
                }

                // handle data-require
                tmp = target.getAttribute('data-require');
                if(tmp){
                    if(lazySizes.cfg.requireJs){
                        lazySizes.cfg.requireJs([tmp]);
                    } else {
                        addStyleScript(tmp);
                    }
                }

                // handle data-bg
                bg = target.getAttribute('data-bg');
                if (bg) {
                    e.detail.firesLoad = true;
                    load = function(){
                        target.style.backgroundImage = 'url(' + (regBgUrlEscape.test(bg) ? JSON.stringify(bg) : bg ) + ')';
                        e.detail.firesLoad = false;
                        lazySizes.fire(target, '_lazyloaded', {}, true, true);
                    };

                    bgLoad(bg, load);
                }

                // handle data-poster
                poster = target.getAttribute('data-poster');
                if(poster){
                    e.detail.firesLoad = true;
                    load = function(){
                        target.poster = poster;
                        e.detail.firesLoad = false;
                        lazySizes.fire(target, '_lazyloaded', {}, true, true);
                    };

                    bgLoad(poster, load);

                }
            }
        }, false);

    }

    function addStyleScript(src, style){
        if(uniqueUrls[src]){
            return;
        }
        var elem = document.createElement(style ? 'link' : 'script');
        var insertElem = document.getElementsByTagName('script')[0];

        if(style){
            elem.rel = 'stylesheet';
            elem.href = src;
        } else {
            elem.src = src;
        }
        uniqueUrls[src] = true;
        uniqueUrls[elem.src || elem.href] = true;
        insertElem.parentNode.insertBefore(elem, insertElem);
    }
}));
/* Lazysizes end ************************************** */

/* Rangeslider Start *********************************** */
const IonRangeSlider=function(e,t={}){let i=e,n=t,o=0,s=0,a=0,r=0,_=null,l=null,m=!1,f=!1,p=!1,d=!0,u=!1,c=!1,g=!0,h=!1,b=!1,v=!1,x=!1,y="base";const w={win:window,body:document.body,input:i,cont:null,rs:null,min:null,max:null,from:null,to:null,single:null,bar:null,line:null,s_single:null,s_from:null,s_to:null,shad_single:null,shad_from:null,shad_to:null,edge:null,grid:null,grid_labels:[]},k={x_gap:0,x_pointer:0,w_rs:0,w_rs_old:0,w_handle:0,p_gap:0,p_gap_left:0,p_gap_right:0,p_step:0,p_pointer:0,p_handle:0,p_single_fake:0,p_single_real:0,p_from_fake:0,p_from_real:0,p_to_fake:0,p_to_real:0,p_bar_x:0,p_bar_w:0,grid_gap:0,big_num:0,big:[],big_w:[],big_p:[],big_x:[]},L={w_min:0,w_max:0,w_from:0,w_to:0,w_single:0,p_min:0,p_max:0,p_from_fake:0,p_from_left:0,p_to_fake:0,p_to_left:0,p_single_fake:0,p_single_left:0},E={skin:"flat",type:"single",min:10,max:100,from:null,to:null,step:1,min_interval:0,max_interval:0,drag_interval:!1,values:[],p_values:[],from_fixed:!1,from_min:null,from_max:null,from_shadow:!1,to_fixed:!1,to_min:null,to_max:null,to_shadow:!1,prettify_enabled:!0,prettify_separator:" ",prettify:null,force_edges:!1,keyboard:!0,grid:!1,grid_margin:!0,grid_num:4,grid_snap:!1,hide_min_max:!1,hide_from_to:!1,prefix:"",postfix:"",max_postfix:"",decorate_both:!0,values_separator:" — ",input_values_separator:";",disable:!1,block:!1,extra_classes:"",scope:null,onStart:null,onChange:null,onFinish:null,onUpdate:null};"INPUT"!==i.nodeName&&console&&console.warn&&console.warn("Base element should be <input>!",i);const S={skin:i.dataset.skin,type:i.dataset.type,min:i.dataset.min,max:i.dataset.max,from:i.dataset.from,to:i.dataset.to,step:i.dataset.step,min_interval:i.dataset.minInterval,max_interval:i.dataset.maxInterval,drag_interval:i.dataset.dragInterval,values:i.dataset.values,from_fixed:i.dataset.fromFixed,from_min:i.dataset.fromMin,from_max:i.dataset.fromMax,from_shadow:i.dataset.fromShadow,to_fixed:i.dataset.toFixed,to_min:i.dataset.toMin,to_max:i.dataset.toMax,to_shadow:i.dataset.toShadow,prettify_enabled:i.dataset.prettifyEnabled,prettify_separator:i.dataset.prettifySeparator,force_edges:i.dataset.forceEdges,keyboard:i.dataset.keyboard,grid:i.dataset.grid,grid_margin:i.dataset.gridMargin,grid_num:i.dataset.gridNum,grid_snap:i.dataset.gridSnap,hide_min_max:i.dataset.hideMinMax,hide_from_to:i.dataset.hideFromTo,prefix:i.dataset.prefix,postfix:i.dataset.postfix,max_postfix:i.dataset.maxPostfix,decorate_both:i.dataset.decorateBoth,values_separator:i.dataset.valuesSeparator,input_values_separator:i.dataset.inputValuesSeparator,disable:i.dataset.disable,block:i.dataset.block,extra_classes:i.dataset.extraClasses};S.values=S.values&&S.values.split(",");for(let e in S)S.hasOwnProperty(e)&&(void 0!==S[e]&&""!==S[e]||delete S[e]);let M=i.value;void 0!==M&&""!==M&&((M=M.split(S.input_values_separator||n.input_values_separator||";"))[0]&&M[0]==+M[0]&&(M[0]=+M[0]),M[1]&&M[1]==+M[1]&&(M[1]=+M[1]),n&&n.values&&n.values.length?(E.from=M[0]&&n.values.indexOf(M[0]),E.to=M[1]&&n.values.indexOf(M[1])):(E.from=M[0]&&+M[0],E.to=M[1]&&+M[1])),Object.assign(E,n),Object.assign(E,S),n=E;let N={};const T={input:w.input,slider:null,min:n.min,max:n.max,from:n.from,from_percent:0,from_value:null,to:n.to,to_percent:0,to_value:null},q=function(e){p=!1,k.p_step=pe(n.step,!0),y="base",fe(),F(),K(),e?(f=!0,z(!0),me()):(f=!0,z(!0),re()),ie()},F=function(){const e='<span class="irs irs--'+n.skin+" "+n.extra_classes+'"></span>';w.input.insertAdjacentHTML("beforebegin",e),w.input.setAttribute("readonly","true"),w.cont=w.input.previousElementSibling,T.slider=w.cont,w.cont.innerHTML='<span class="irs"><span class="irs-line" tabindex="0"></span><span class="irs-min">0</span><span class="irs-max">1</span><span class="irs-from">0</span><span class="irs-to">0</span><span class="irs-single">0</span></span><span class="irs-grid">1</span>',w.rs=w.cont.querySelector(".irs"),w.min=w.cont.querySelector(".irs-min"),w.max=w.cont.querySelector(".irs-max"),w.from=w.cont.querySelector(".irs-from"),w.to=w.cont.querySelector(".irs-to"),w.single=w.cont.querySelector(".irs-single"),w.line=w.cont.querySelector(".irs-line"),w.grid=w.cont.querySelector(".irs-grid"),"single"===n.type?(w.cont.insertAdjacentHTML("beforeend",'<span class="irs-bar irs-bar--single"></span><span class="irs-shadow shadow-single"></span><span class="irs-handle single"><i></i><i></i><i></i></span>'),w.bar=w.cont.querySelector(".irs-bar"),w.edge=w.cont.querySelector(".irs-bar--single"),w.s_single=w.cont.querySelector(".single"),w.from.style.visibility="hidden",w.to.style.visibility="hidden",w.shad_single=w.cont.querySelector(".shadow-single")):(w.cont.insertAdjacentHTML("beforeend",'<span class="irs-bar"></span><span class="irs-shadow shadow-from"></span><span class="irs-shadow shadow-to"></span><span class="irs-handle from"><i></i><i></i><i></i></span><span class="irs-handle to"><i></i><i></i><i></i></span>'),w.bar=w.cont.querySelector(".irs-bar"),w.s_from=w.cont.querySelector(".from"),w.s_to=w.cont.querySelector(".to"),w.shad_from=w.cont.querySelector(".shadow-from"),w.shad_to=w.cont.querySelector(".shadow-to"),H()),n.hide_from_to&&(w.from.style.display="none",w.to.style.display="none",w.single.style.display="none"),Ee(),n.disable?(A(),w.input.disabled=!0):(w.input.disabled=!1,W(),C()),n.disable||(n.block?A():W()),n.drag_interval&&(w.bar.style.cursor="ew-resize")},H=function(){const e=n.min,t=n.max,i=n.from,o=n.to;i>e&&o===t?w.s_from.classList.add("type_last"):o<t&&w.s_to.classList.add("type_last")},A=function(){w.cont.insertAdjacentHTML("beforeend",'<span class="irs-disable-mask"></span>'),w.cont.classList.add("irs-disabled")},W=function(){w.cont.classList.remove(".irs-disable-mask"),w.cont.classList.remove("irs-disabled")},I=function(){w.cont.remove(),w.cont=null,w.win.removeEventListener("keydown",U.bind(this,"keyboard")),w.body.removeEventListener("touchmove",O.bind(this)),w.body.removeEventListener("mousemove",O.bind(this)),w.win.removeEventListener("touchend",R.bind(this)),w.win.removeEventListener("mouseup",R.bind(this)),w.grid_labels=[],k.big=[],k.big_w=[],k.big_p=[],k.big_x=[],cancelAnimationFrame(l)},C=function(){p||(w.body.addEventListener("touchmove",O.bind(this)),w.body.addEventListener("mousemove",O.bind(this)),w.win.addEventListener("touchend",R.bind(this)),w.win.addEventListener("mouseup",R.bind(this)),w.line.addEventListener("touchstart",B.bind(this,"click"),{passive:!0}),w.line.addEventListener("mousedown",B.bind(this,"click")),w.line.addEventListener("focus",j.bind(this)),n.drag_interval&&"double"===n.type?(w.bar.addEventListener("touchstart",X.bind(this,"both"),{passive:!0}),w.bar.addEventListener("mousedown",X.bind(this,"both"))):(w.bar.addEventListener("touchstart",B.bind(this,"click"),{passive:!0}),w.bar.addEventListener("mousedown",B.bind(this,"click"))),"single"===n.type?(w.single.addEventListener("touchstart",X.bind(this,"single"),{passive:!0}),w.s_single.addEventListener("touchstart",X.bind(this,"single"),{passive:!0}),w.shad_single.addEventListener("touchstart",B.bind(this,"click"),{passive:!0}),w.single.addEventListener("mousedown",X.bind(this,"single")),w.s_single.addEventListener("mousedown",X.bind(this,"single")),w.edge.addEventListener("mousedown",B.bind(this,"click")),w.shad_single.addEventListener("touchstart",B.bind(this,"click"),{passive:!0})):(w.single.addEventListener("touchstart",X.bind(this,null),{passive:!0}),w.single.addEventListener("mousedown",X.bind(this,null)),w.from.addEventListener("touchstart",X.bind(this,"from"),{passive:!0}),w.s_from.addEventListener("touchstart",X.bind(this,"from"),{passive:!0}),w.to.addEventListener("touchstart",X.bind(this,"to"),{passive:!0}),w.s_to.addEventListener("touchstart",X.bind(this,"to"),{passive:!0}),w.shad_from.addEventListener("touchstart",B.bind(this,"click"),{passive:!0}),w.shad_to.addEventListener("touchstart",B.bind(this,"click"),{passive:!0}),w.from.addEventListener("mousedown",X.bind(this,"from")),w.s_from.addEventListener("mousedown",X.bind(this,"from")),w.to.addEventListener("mousedown",X.bind(this,"to")),w.s_to.addEventListener("mousedown",X.bind(this,"to")),w.shad_from.addEventListener("mousedown",B.bind(this,"click")),w.shad_to.addEventListener("mousedown",B.bind(this,"click"))),n.keyboard&&w.line.addEventListener("keydown",U.bind(this,"keyboard")))},j=function(e){if(y)w.line.focus();else{let e,t;e=(t="single"===n.type?w.single:w.from).getBoundingClientRect().left,e+=t.getBoundingClientRect().width/2-1,B("single",{preventDefault:function(){},pageX:e})}},O=function(e){if(!m)return;const t=e.pageX||e.originalEvent.touches&&e.originalEvent.touches[0].pageX;k.x_pointer=t-k.x_gap,z()},R=function(e){if(!b)return;b=!1;const t=w.cont.querySelector(".state_hover");t&&t.classList.remove("state_hover"),f=!0,ie(),V(),(w.cont.contains(e.target)||m)&&le(),m=!1},X=function(e,t){t.preventDefault();const i=t.pageX||t.originalEvent.touches&&t.originalEvent.touches[0].pageX;2!==t.button&&("both"===e&&P(),e||(e=y||"from"),y=e,b=!0,m=!0,k.x_gap=w.rs.getBoundingClientRect().left,k.x_pointer=i-k.x_gap,Y(),function(e){switch(e){case"single":k.p_gap=be(k.p_pointer-k.p_single_fake),w.s_single.classList.add("state_hover");break;case"from":k.p_gap=be(k.p_pointer-k.p_from_fake),w.s_from.classList.add("state_hover","type_last"),w.s_to.classList.remove("type_last");break;case"to":k.p_gap=be(k.p_pointer-k.p_to_fake),w.s_to.classList.add("state_hover","type_last"),w.s_from.classList.remove("type_last");break;case"both":k.p_gap_left=be(k.p_pointer-k.p_from_fake),k.p_gap_right=be(k.p_to_fake-k.p_pointer),w.s_to.classList.remove("type_last"),w.s_from.classList.remove("type_last")}}(e),w.line.dispatchEvent(new Event("focus")),ie())},B=function(e,t){t.preventDefault();const i=t.pageX||t.originalEvent.touches&&t.originalEvent.touches[0].pageX;2!==t.button&&(y=e,x=!0,k.x_gap=w.rs.getBoundingClientRect().left,k.x_pointer=+(i-k.x_gap).toFixed(),f=!0,z(),w.line.dispatchEvent(new Event("focus")))},U=function(e,t){if(!(t.altKey||t.ctrlKey||t.shiftKey||t.metaKey))switch(t.which){case 83:case 65:case 40:case 37:t.preventDefault(),D(!1);break;case 87:case 68:case 38:case 39:t.preventDefault(),D(!0)}},D=function(e){let t=k.p_pointer;const i=n.step/((n.max-n.min)/100);e?t+=i:t-=i,k.x_pointer=be(k.w_rs/100*t),u=!0,z()},K=function(){if(n){if(n.hide_min_max)return w.min.style.display="none",void(w.max.style.display="none");if(n.values.length)w.min.innerHTML=ke(n.p_values[n.min]),w.max.innerHTML=ke(n.p_values[n.max]);else{const e=ve(n.min),t=ve(n.max);T.min_pretty=e,T.max_pretty=t,w.min.innerHTML=ke(e,n.min),w.max.innerHTML=ke(t,n.max)}L.w_min=w.min.offsetWidth,L.w_max=w.max.offsetWidth}},P=function(){const e=T.to-T.from;null===_&&(_=n.min_interval),n.min_interval=e},V=function(){null!==_&&(n.min_interval=_,_=null)},z=function(e){if(!n)return;if((10===++o||e)&&(o=0,k.w_rs=w.rs.offsetWidth,Q()),!k.w_rs)return;Y();let t=J();switch("both"===y&&(k.p_gap=0,t=J()),"click"===y&&(k.p_gap=k.p_handle/2,t=J(),y=n.drag_interval?"both_one":Z(t)),y){case"base":const e=(n.max-n.min)/100,i=(T.from-n.min)/e,o=(T.to-n.min)/e;k.p_single_real=be(i),k.p_from_real=be(i),k.p_to_real=be(o),k.p_single_real=he(k.p_single_real,n.from_min,n.from_max),k.p_from_real=he(k.p_from_real,n.from_min,n.from_max),k.p_to_real=he(k.p_to_real,n.to_min,n.to_max),k.p_single_fake=G(k.p_single_real),k.p_from_fake=G(k.p_from_real),k.p_to_fake=G(k.p_to_real),y=null;break;case"single":if(n.from_fixed)break;k.p_single_real=$(t),k.p_single_real=ue(k.p_single_real),k.p_single_real=he(k.p_single_real,n.from_min,n.from_max),k.p_single_fake=G(k.p_single_real);break;case"from":if(n.from_fixed)break;k.p_from_real=$(t),k.p_from_real=ue(k.p_from_real),k.p_from_real>k.p_to_real&&(k.p_from_real=k.p_to_real),k.p_from_real=he(k.p_from_real,n.from_min,n.from_max),k.p_from_real=ce(k.p_from_real,k.p_to_real,"from"),k.p_from_real=ge(k.p_from_real,k.p_to_real,"from"),k.p_from_fake=G(k.p_from_real);break;case"to":if(n.to_fixed)break;k.p_to_real=$(t),k.p_to_real=ue(k.p_to_real),k.p_to_real<k.p_from_real&&(k.p_to_real=k.p_from_real),k.p_to_real=he(k.p_to_real,n.to_min,n.to_max),k.p_to_real=ce(k.p_to_real,k.p_from_real,"to"),k.p_to_real=ge(k.p_to_real,k.p_from_real,"to"),k.p_to_fake=G(k.p_to_real);break;case"both":if(n.from_fixed||n.to_fixed)break;t=be(t+.001*k.p_handle),k.p_from_real=$(t)-k.p_gap_left,k.p_from_real=ue(k.p_from_real),k.p_from_real=he(k.p_from_real,n.from_min,n.from_max),k.p_from_real=ce(k.p_from_real,k.p_to_real,"from"),k.p_from_fake=G(k.p_from_real),k.p_to_real=$(t)+k.p_gap_right,k.p_to_real=ue(k.p_to_real),k.p_to_real=he(k.p_to_real,n.to_min,n.to_max),k.p_to_real=ce(k.p_to_real,k.p_from_real,"to"),k.p_to_fake=G(k.p_to_real);break;case"both_one":if(n.from_fixed||n.to_fixed)break;const s=$(t),a=T.from_percent,r=T.to_percent-a,_=r/2;let l=s-_,m=s+_;l<0&&(m=(l=0)+r),m>100&&(l=(m=100)-r),k.p_from_real=ue(l),k.p_from_real=he(k.p_from_real,n.from_min,n.from_max),k.p_from_fake=G(k.p_from_real),k.p_to_real=ue(m),k.p_to_real=he(k.p_to_real,n.to_min,n.to_max),k.p_to_fake=G(k.p_to_real)}"single"===n.type?(k.p_bar_x=k.p_handle/2,k.p_bar_w=k.p_single_fake,T.from_percent=k.p_single_real,T.from=de(k.p_single_real),T.from_pretty=ve(T.from),n.values.length&&(T.from_value=n.values[T.from])):(k.p_bar_x=be(k.p_from_fake+k.p_handle/2),k.p_bar_w=be(k.p_to_fake-k.p_from_fake),T.from_percent=k.p_from_real,T.from=de(k.p_from_real),T.from_pretty=ve(T.from),T.to_percent=k.p_to_real,T.to=de(k.p_to_real),T.to_pretty=ve(T.to),n.values.length&&(T.from_value=n.values[T.from],T.to_value=n.values[T.to])),ee(),te()},Y=function(){k.w_rs?(k.x_pointer<0||isNaN(k.x_pointer)?k.x_pointer=0:k.x_pointer>k.w_rs&&(k.x_pointer=k.w_rs),k.p_pointer=be(k.x_pointer/k.w_rs*100)):k.p_pointer=0},$=function(e){return e/(100-k.p_handle)*100},G=function(e){return e/100*(100-k.p_handle)},J=function(){const e=100-k.p_handle;let t=be(k.p_pointer-k.p_gap);return t<0?t=0:t>e&&(t=e),t},Q=function(){"single"===n.type?k.w_handle=w.s_single.offsetWidth:k.w_handle=w.s_from.offsetWidth,k.p_handle=be(k.w_handle/k.w_rs*100)},Z=function(e){if("single"===n.type)return"single";return e>=k.p_from_real+(k.p_to_real-k.p_from_real)/2?n.to_fixed?"from":"to":n.from_fixed?"to":"from"},ee=function(){k.w_rs&&(L.p_min=L.w_min/k.w_rs*100,L.p_max=L.w_max/k.w_rs*100)},te=function(){k.w_rs&&!n.hide_from_to&&("single"===n.type?(L.w_single=w.single.offsetWidth,L.p_single_fake=L.w_single/k.w_rs*100,L.p_single_left=k.p_single_fake+k.p_handle/2-L.p_single_fake/2,L.p_single_left=ye(L.p_single_left,L.p_single_fake)):(L.w_from=w.from.offsetWidth,L.p_from_fake=L.w_from/k.w_rs*100,L.p_from_left=k.p_from_fake+k.p_handle/2-L.p_from_fake/2,L.p_from_left=be(L.p_from_left),L.p_from_left=ye(L.p_from_left,L.p_from_fake),L.w_to=w.to.offsetWidth,L.p_to_fake=L.w_to/k.w_rs*100,L.p_to_left=k.p_to_fake+k.p_handle/2-L.p_to_fake/2,L.p_to_left=be(L.p_to_left),L.p_to_left=ye(L.p_to_left,L.p_to_fake),L.w_single=w.single.offsetWidth,L.p_single_fake=L.w_single/k.w_rs*100,L.p_single_left=(L.p_from_left+L.p_to_left+L.p_to_fake)/2-L.p_single_fake/2,L.p_single_left=be(L.p_single_left),L.p_single_left=ye(L.p_single_left,L.p_single_fake)))},ie=function(){l&&(cancelAnimationFrame(l),l=null),clearTimeout(s),s=null,n&&(ne(),b?l=requestAnimationFrame(ie):s=setTimeout(ie,300))},ne=function(){k.w_rs=w.rs.offsetWidth,k.w_rs&&(k.w_rs!==k.w_rs_old&&(y="base",v=!0),(k.w_rs!==k.w_rs_old||f)&&(K(),z(!0),oe(),n.grid&&(Te(),Me()),f=!0,k.w_rs_old=k.w_rs,se()),k.w_rs&&(m||f||u)&&((a!==T.from||r!==T.to||f||u)&&(oe(),w.bar.style.left=k.p_bar_x+"%",w.bar.style.width=k.p_bar_w+"%","single"===n.type?(w.bar.style.left="0",w.bar.style.width=k.p_bar_w+k.p_bar_x+"%",w.s_single.style.left=k.p_single_fake+"%",w.single.style.left=L.p_single_left+"%"):(w.s_from.style.left=k.p_from_fake+"%",w.s_to.style.left=k.p_to_fake+"%",(a!==T.from||f)&&(w.from.style.left=L.p_from_left+"%"),(r!==T.to||f)&&(w.to.style.left=L.p_to_left+"%"),w.single.style.left=L.p_single_left+"%"),ae(),a===T.from&&r===T.to||g||(w.input.dispatchEvent(new Event("change")),w.input.dispatchEvent(new Event("input"))),a=T.from,r=T.to,v||c||g||h||_e(),(u||x)&&(u=!1,x=!1,le()),c=!1,v=!1,h=!1),g=!1,u=!1,x=!1,f=!1))},oe=function(){if(!n)return;const e=n.values.length,t=n.p_values;let i,o,s,a,r;if(!n.hide_from_to)if("single"===n.type)e?(i=ke(t[T.from]),w.single.innerHTML=i):(a=ve(T.from),i=ke(a,T.from),w.single.innerHTML=i),te(),L.p_single_left<L.p_min+1?w.min.style.visibility="hidden":w.min.style.visibility="visible",L.p_single_left+L.p_single_fake>100-L.p_max-1?w.max.style.visibility="hidden":w.max.style.visibility="visible";else{e?(n.decorate_both?(i=ke(t[T.from]),i+=n.values_separator,i+=ke(t[T.to])):i=ke(t[T.from]+n.values_separator+t[T.to]),o=ke(t[T.from]),s=ke(t[T.to]),w.single.innerHTML=i,w.from.innerHTML=o,w.to.innerHTML=s):(a=ve(T.from),r=ve(T.to),n.decorate_both?(i=ke(a,T.from),i+=n.values_separator,i+=ke(r,T.to)):i=ke(a+n.values_separator+r,T.to),o=ke(a,T.from),s=ke(r,T.to),w.single.innerHTML=i,w.from.innerHTML=o,w.to.innerHTML=s),te();const _=Math.min(L.p_single_left,L.p_from_left),l=L.p_single_left+L.p_single_fake,m=L.p_to_left+L.p_to_fake;let f=Math.max(l,m);L.p_from_left+L.p_from_fake>=L.p_to_left?(w.from.style.visibility="hidden",w.to.style.visibility="hidden",w.single.style.visibility="visible",T.from===T.to?("from"===y?w.from.style.visibility="visible":"to"===y?w.to.style.visibility="visible":y||(w.from.style.visibility="visible"),w.single.style.visibility="hidden",f=m):(w.from.style.visibility="hidden",w.to.style.visibility="hidden",w.single.style.visibility="visible",f=Math.max(l,m))):(w.from.style.visibility="visible",w.to.style.visibility="visible",w.single.style.visibility="hidden"),_<L.p_min+1?w.min.style.visibility="hidden":w.min.style.visibility="visible",f>100-L.p_max-1?w.max.style.visibility="hidden":w.max.style.visibility="visible"}},se=function(){const e=n,t=w,i="number"==typeof e.from_min&&!isNaN(e.from_min),o="number"==typeof e.from_max&&!isNaN(e.from_max),s="number"==typeof e.to_min&&!isNaN(e.to_min),a="number"==typeof e.to_max&&!isNaN(e.to_max);let r,_,l,m;"single"===e.type?e.from_shadow&&(i||o)?(r=pe(i?e.from_min:e.min),_=pe(o?e.from_max:e.max)-r,r=be(r-k.p_handle/100*r),_=be(_-k.p_handle/100*_),r+=k.p_handle/2,t.shad_single.style.display="block",t.shad_single.style.left=r+"%",t.shad_single.style.width=_+"%"):t.shad_single.style.display="none":(e.from_shadow&&(i||o)?(r=pe(i?e.from_min:e.min),_=pe(o?e.from_max:e.max)-r,r=be(r-k.p_handle/100*r),_=be(_-k.p_handle/100*_),r+=k.p_handle/2,t.shad_from.style.display="block",t.shad_from.style.left=r+"%",t.shad_from.style.width=_+"%"):t.shad_from.style.display="none",e.to_shadow&&(s||a)?(l=pe(s?e.to_min:e.min),m=pe(a?e.to_max:e.max)-l,l=be(l-k.p_handle/100*l),m=be(m-k.p_handle/100*m),l+=k.p_handle/2,t.shad_to.style.display="block",t.shad_to.style.left=l+"%",t.shad_to.style.width=m+"%"):t.shad_to.style.display="none")},ae=function(){"single"===n.type?(n.values.length?w.input.setAttribute("value",T.from_value):w.input.setAttribute("value",T.from),w.input.dataset.from=T.from):(n.values.length?w.input.setAttribute("value",T.from_value+n.input_values_separator+T.to_value):w.input.setAttribute("value",T.from+n.input_values_separator+T.to),w.input.dataset.from=T.from,w.input.dataset.to=T.to)},re=function(){ae(),n.onStart&&"function"==typeof n.onStart&&(n.scope?n.onStart.call(n.scope,T):n.onStart(T))},_e=function(){ae(),n.onChange&&"function"==typeof n.onChange&&(n.scope?n.onChange.call(n.scope,T):n.onChange(T))},le=function(){ae(),n.onFinish&&"function"==typeof n.onFinish&&(n.scope?n.onFinish.call(n.scope,T):n.onFinish(T))},me=function(){ae(),n.onUpdate&&"function"==typeof n.onUpdate&&(n.scope?n.onUpdate.call(n.scope,T):n.onUpdate(T))},fe=function(){w.input.classList.toggle("irs-hidden-input"),d?w.input.setAttribute("tabindex","-1"):w.input.removeAttribute("tabindex"),d=!d},pe=function(e,t){let i,o,s=n.max-n.min,a=s/100;return s?(i=t?e:e-n.min,be(o=i/a)):(p=!0,0)},de=function(e){let t,i,o=n.min,s=n.max,a=o.toString().split(".")[1],r=s.toString().split(".")[1],_=0,l=0;if(0===e)return n.min;if(100===e)return n.max;a&&(_=t=a.length),r&&(_=i=r.length),t&&i&&(_=t>=i?t:i),o<0&&(o=+(o+(l=Math.abs(o))).toFixed(_),s=+(s+l).toFixed(_));let m,f=(s-o)/100*e+o,p=n.step.toString().split(".")[1];return p?f=+f.toFixed(p.length):(f/=n.step,f=+(f*=n.step).toFixed(0)),l&&(f-=l),(m=p?+f.toFixed(p.length):be(f))<n.min?m=n.min:m>n.max&&(m=n.max),m},ue=function(e){let t=Math.round(e/k.p_step)*k.p_step;return t>100&&(t=100),100===e&&(t=100),be(t)},ce=function(e,t,i){let o,s,a=n;return a.min_interval?(o=de(e),s=de(t),"from"===i?s-o<a.min_interval&&(o=s-a.min_interval):o-s<a.min_interval&&(o=s+a.min_interval),pe(o)):e},ge=function(e,t,i){let o,s,a=n;return a.max_interval?(o=de(e),s=de(t),"from"===i?s-o>a.max_interval&&(o=s-a.max_interval):o-s>a.max_interval&&(o=s+a.max_interval),pe(o)):e},he=function(e,t,i){let o=de(e);return"number"!=typeof t&&(t=n.min),"number"!=typeof i&&(i=n.max),o<t&&(o=t),o>i&&(o=i),pe(o)},be=function(e){return+(e=e.toFixed(20))},ve=function(e){return n.prettify_enabled?n.prettify&&"function"==typeof n.prettify?n.prettify(e):xe(e):e},xe=function(e){return e.toString().replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g,"$1"+n.prettify_separator)},ye=function(e,t){return n.force_edges?(e<0?e=0:e>100-t&&(e=100-t),be(e)):be(e)},we=function(){let e,t,i=n,o=T,s=i.values,a=s.length;if("string"==typeof i.min&&(i.min=+i.min),"string"==typeof i.max&&(i.max=+i.max),"string"==typeof i.from&&(i.from=+i.from),"string"==typeof i.to&&(i.to=+i.to),"string"==typeof i.step&&(i.step=+i.step),"string"==typeof i.from_min&&(i.from_min=+i.from_min),"string"==typeof i.from_max&&(i.from_max=+i.from_max),"string"==typeof i.to_min&&(i.to_min=+i.to_min),"string"==typeof i.to_max&&(i.to_max=+i.to_max),"string"==typeof i.grid_num&&(i.grid_num=+i.grid_num),i.max<i.min&&(i.max=i.min),a)for(i.p_values=[],i.min=0,i.max=a-1,i.step=1,i.grid_num=i.max,i.grid_snap=!0,t=0;t<a;t++)e=+s[t],isNaN(e)?e=s[t]:(s[t]=e,e=ve(e)),i.p_values.push(e);("number"!=typeof i.from||isNaN(i.from))&&(i.from=i.min),("number"!=typeof i.to||isNaN(i.to))&&(i.to=i.max),"single"===i.type?(i.from<i.min&&(i.from=i.min),i.from>i.max&&(i.from=i.max)):(i.from<i.min&&(i.from=i.min),i.from>i.max&&(i.from=i.max),i.to<i.min&&(i.to=i.min),i.to>i.max&&(i.to=i.max),N.from&&(N.from!==i.from&&i.from>i.to&&(i.from=i.to),N.to!==i.to&&i.to<i.from&&(i.to=i.from)),i.from>i.to&&(i.from=i.to),i.to<i.from&&(i.to=i.from)),("number"!=typeof i.step||isNaN(i.step)||!i.step||i.step<0)&&(i.step=1),"number"==typeof i.from_min&&i.from<i.from_min&&(i.from=i.from_min),"number"==typeof i.from_max&&i.from>i.from_max&&(i.from=i.from_max),"number"==typeof i.to_min&&i.to<i.to_min&&(i.to=i.to_min),"number"==typeof i.to_max&&i.from>i.to_max&&(i.to=i.to_max),o&&(o.min!==i.min&&(o.min=i.min),o.max!==i.max&&(o.max=i.max),(o.from<o.min||o.from>o.max)&&(o.from=i.from),(o.to<o.min||o.to>o.max)&&(o.to=i.to)),("number"!=typeof i.min_interval||isNaN(i.min_interval)||!i.min_interval||i.min_interval<0)&&(i.min_interval=0),("number"!=typeof i.max_interval||isNaN(i.max_interval)||!i.max_interval||i.max_interval<0)&&(i.max_interval=0),i.min_interval&&i.min_interval>i.max-i.min&&(i.min_interval=i.max-i.min),i.max_interval&&i.max_interval>i.max-i.min&&(i.max_interval=i.max-i.min)},ke=function(e,t){let i="",o=n;return o.prefix&&(i+=o.prefix),i+=e,o.max_postfix&&(o.values.length&&e===o.p_values[o.max]?(i+=o.max_postfix,o.postfix&&(i+=" ")):t===o.max&&(i+=o.max_postfix,o.postfix&&(i+=" "))),o.postfix&&(i+=o.postfix),i},Le=function(){T.min=n.min,T.max=n.max,T.from=n.from,T.from_percent=pe(T.from),T.from_pretty=ve(T.from),n.values&&(T.from_value=n.values[T.from]),T.to=n.to,T.to_percent=pe(T.to),T.to_pretty=ve(T.to),n.values&&(T.to_value=n.values[T.to])},Ee=function(){if(!n.grid)return;let e,t,i,o,s,a=n,r=a.max-a.min,_=a.grid_num,l=0,m=0,f=4,p=0,d="";for(Te(),a.grid_snap&&(_=r/a.step),_>50&&(_=50),l=be(100/_),_>4&&(f=3),_>7&&(f=2),_>14&&(f=1),_>28&&(f=0),e=0;e<_+1;e++){for(i=f,(m=be(l*e))>100&&(m=100),k.big[e]=m,o=(m-l*(e-1))/(i+1),t=1;t<=i&&0!==m;t++)d+='<span class="irs-grid-pol small" style="left: '+(p=be(m-o*t))+'%"></span>';d+='<span class="irs-grid-pol" style="left: '+m+'%"></span>',s=de(m),d+='<span class="irs-grid-text js-grid-text-'+e+'" style="left: '+m+'%">'+(s=a.values.length?a.p_values[s]:ve(s))+"</span>"}k.big_num=Math.ceil(_+1),w.cont.classList.add("irs-with-grid"),w.grid.innerHTML=d,Se()},Se=function(){for(let e=0;e<k.big_num;e++)w.grid_labels.push(w.grid.querySelector(".js-grid-text-"+e));Me()},Me=function(){const e=[],t=[],i=k.big_num;for(let n=0;n<i;n++)k.big_w[n]=w.grid_labels[n].offsetWidth,k.big_p[n]=be(k.big_w[n]/k.w_rs*100),k.big_x[n]=be(k.big_p[n]/2),e[n]=be(k.big[n]-k.big_x[n]),t[n]=be(e[n]+k.big_p[n]);n.force_edges&&(e[0]<-k.grid_gap&&(e[0]=-k.grid_gap,t[0]=be(e[0]+k.big_p[0]),k.big_x[0]=k.grid_gap),t[i-1]>100+k.grid_gap&&(t[i-1]=100+k.grid_gap,e[i-1]=be(t[i-1]-k.big_p[i-1]),k.big_x[i-1]=be(k.big_p[i-1]-k.grid_gap))),Ne(2,e,t),Ne(4,e,t);for(let e=0;e<i;e++){const t=w.grid_labels[e];k.big_x[e]!==Number.POSITIVE_INFINITY&&(t.style.marginLeft=-k.big_x[e]+"%")}},Ne=function(e,t,i){const n=k.big_num;for(let o=0;o<n;o+=e){let s=o+e/2;if(s>=n)break;const a=w.grid_labels[s];i[o]<=t[s]?a.style.visibility="visible":a.style.visibility="hidden"}},Te=function(){n.grid_margin&&(k.w_rs=w.rs.offsetWidth,k.w_rs&&("single"===n.type?k.w_handle=w.s_single.offsetWidth:k.w_handle=w.s_from.offsetWidth,k.p_handle=be(k.w_handle/k.w_rs*100),k.grid_gap=be(k.p_handle/2-.1),w.grid.style.width=be(100-k.p_handle)+"%",w.grid.style.left=k.grid_gap+"%"))},qe=function(e){i&&(c=!0,n.from=T.from,n.to=T.to,N.from=T.from,N.to=T.to,n=Object.assign(n,e),we(),Le(),fe(),I(),q(!0))};return{update:function(e){qe(e)},reset:function(){i&&(Le(),qe())},destroy:function(){i&&(fe(),i.removeAttribute("readonly"),I(),i=null,n=null)},init:function(){return we(),q(),this}}};function ionRangeSlider(e,t=null){return"string"==typeof e&&(e=document.querySelector(e)),new IonRangeSlider(e,t).init()}
/* Rangeslider END ************************************* */


/* Counter Start *********************************** */
const $ = elem => document.querySelector(elem);

const countdown = function(_config) {
  const tarDate = $(_config.target).getAttribute('data-date').split('-');
  const day = parseInt(tarDate[0]);
  const month = parseInt(tarDate[1]);
  const year = parseInt(tarDate[2]);
  let tarTime = $(_config.target).getAttribute('data-time');
  let tarhour, tarmin;

  if (tarTime != null) {
    tarTime = tarTime.split(':');
    tarhour = parseInt(tarTime[0]);
    tarmin = parseInt(tarTime[1]);
  }

  let months = [31, new Date().getFullYear() % 4 == 0 ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let dateNow = new Date();
  let dayNow = dateNow.getDate();
  let monthNow = dateNow.getMonth() + 1;
  let yearNow = dateNow.getFullYear();
  let hourNow = dateNow.getHours();
  let minNow = dateNow.getMinutes();
  let count_day = 0, count_hour = 0, count_min = 0;
  let count_day_isSet = false;
  let isOver = false;

  // Set the date we're counting down to
  const countDownDate = new Date(year, month-1, day, tarhour, tarmin, 0, 0).getTime();
    if($(_config.target+' .day .word'))
    {
        $(_config.target+' .day .word').innerHTML = _config.dayWord;  
    }
    if($(_config.target+' .hour .word'))
    { 
        $(_config.target+' .hour .word').innerHTML = _config.hourWord;
    }
    if($(_config.target+' .min .word'))
    {
        $(_config.target+' .min .word').innerHTML = _config.minWord;
    }
    if($(_config.target+' .sec .word'))
    {
        $(_config.target+' .sec .word').innerHTML = _config.secWord; 
    }
  const updateTime = () => {
    // Get todays date and time
    const now = new Date().getTime();

    // Find the distance between now an the count down date
    const distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    requestAnimationFrame(updateTime);
    if($(_config.target+' .day .num'))
    {
        $(_config.target+' .day .num').innerHTML = addZero(days);
    }
    if($(_config.target+' .hour .num'))
    {
        $(_config.target+' .hour .num').innerHTML = addZero(hours);
    }
    if($(_config.target+' .min .num'))
    {
        $(_config.target+' .min .num').innerHTML = addZero(minutes);
    }
    if($(_config.target+' .sec .num'))
    {
        $(_config.target+' .sec .num').innerHTML = addZero(seconds);
    }

    // If the count down is over, write some text
    if (distance < 0) {
      $(".countdown").innerHTML = "EXPIRED";
      window.location.href="/cart/clear";
    }
  }

  updateTime();
}

const addZero = (x) => (x < 10 && x >= 0) ? "0"+x : x;
/* Counter END *8********************************** */

/* Validation Start *********************************** */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Pristine = factory());
}(this, (function () { 'use strict';

    var lang = {
        en: {
            required: "This field is required",
            email: "This field requires a valid e-mail address",
            number: "This field requires a number",
            integer: "This field requires an integer value",
            url: "This field requires a valid website URL",
            tel: "This field requires a valid telephone number",
            maxlength: "This fields length must be < ${1}",
            minlength: "This fields length must be > ${1}",
            min: "Minimum value for this field is ${1}",
            max: "Maximum value for this field is ${1}",
            pattern: "Please match the requested format",
            equals: "The two fields do not match"
        }
    };

    function findAncestor(el, cls) {
        while ((el = el.parentElement) && !el.classList.contains(cls)) {}
        return el;
    }

    function tmpl(o) {
        var _arguments = arguments;

        return this.replace(/\${([^{}]*)}/g, function (a, b) {
            return _arguments[b];
        });
    }

    function groupedElemCount(input) {
        return input.pristine.self.form.querySelectorAll('input[name="' + input.getAttribute('name') + '"]:checked').length;
    }

    function mergeConfig(obj1, obj2) {
        for (var attr in obj2) {
            if (!(attr in obj1)) {
                obj1[attr] = obj2[attr];
            }
        }
        return obj1;
    }

    var defaultConfig = {
        classTo: 'form-group',
        errorClass: 'has-danger',
        successClass: 'has-success',
        errorTextParent: 'form-group',
        errorTextTag: 'div',
        errorTextClass: 'text-help'
    };

    var PRISTINE_ERROR = 'pristine-error';
    var SELECTOR = "input:not([type^=hidden]):not([type^=submit]), select, textarea";
    var ALLOWED_ATTRIBUTES = ["required", "min", "max", 'minlength', 'maxlength', 'pattern'];
    var EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    var MESSAGE_REGEX = /-message(?:-([a-z]{2}(?:_[A-Z]{2})?))?/; // matches, -message, -message-en, -message-en_US
    var currentLocale = 'en';
    var validators = {};

    var _ = function _(name, validator) {
        validator.name = name;
        if (validator.priority === undefined) validator.priority = 1;
        validators[name] = validator;
    };

    _('text', { fn: function fn(val) {
            return true;
        }, priority: 0 });
    _('required', { fn: function fn(val) {
            return this.type === 'radio' || this.type === 'checkbox' ? groupedElemCount(this) : val !== undefined && val !== '';
        }, priority: 99, halt: true });
    _('email', { fn: function fn(val) {
            return !val || EMAIL_REGEX.test(val);
        } });
    _('number', { fn: function fn(val) {
            return !val || !isNaN(parseFloat(val));
        }, priority: 2 });
    _('integer', { fn: function fn(val) {
            return !val || /^\d+$/.test(val);
        } });
    _('minlength', { fn: function fn(val, length) {
            return !val || val.length >= parseInt(length);
        } });
    _('maxlength', { fn: function fn(val, length) {
            return !val || val.length <= parseInt(length);
        } });
    _('min', { fn: function fn(val, limit) {
            return !val || (this.type === 'checkbox' ? groupedElemCount(this) >= parseInt(limit) : parseFloat(val) >= parseFloat(limit));
        } });
    _('max', { fn: function fn(val, limit) {
            return !val || (this.type === 'checkbox' ? groupedElemCount(this) <= parseInt(limit) : parseFloat(val) <= parseFloat(limit));
        } });
    _('pattern', { fn: function fn(val, pattern) {
            var m = pattern.match(new RegExp('^/(.*?)/([gimy]*)$'));return !val || new RegExp(m[1], m[2]).test(val);
        } });
    _('equals', { fn: function fn(val, otherFieldSelector) {
            var other = document.querySelector(otherFieldSelector);return other && (!val && !other.value || other.value === val);
        } });

    function Pristine(form, config, live) {

        var self = this;

        init(form, config, live);

        function init(form, config, live) {

            form.setAttribute("novalidate", "true");

            self.form = form;
            self.config = mergeConfig(config || {}, defaultConfig);
            self.live = !(live === false);
            self.fields = Array.from(form.querySelectorAll(SELECTOR)).map(function (input) {

                var fns = [];
                var params = {};
                var messages = {};

                [].forEach.call(input.attributes, function (attr) {
                    if (/^data-pristine-/.test(attr.name)) {
                        var name = attr.name.substr(14);
                        var messageMatch = name.match(MESSAGE_REGEX);
                        if (messageMatch !== null) {
                            var locale = messageMatch[1] === undefined ? 'en' : messageMatch[1];
                            if (!messages.hasOwnProperty(locale)) messages[locale] = {};
                            messages[locale][name.slice(0, name.length - messageMatch[0].length)] = attr.value;
                            return;
                        }
                        if (name === 'type') name = attr.value;
                        _addValidatorToField(fns, params, name, attr.value);
                    } else if (~ALLOWED_ATTRIBUTES.indexOf(attr.name)) {
                        _addValidatorToField(fns, params, attr.name, attr.value);
                    } else if (attr.name === 'type') {
                        _addValidatorToField(fns, params, attr.value);
                    }
                });

                fns.sort(function (a, b) {
                    return b.priority - a.priority;
                });

                self.live && input.addEventListener(!~['radio', 'checkbox'].indexOf(input.getAttribute('type')) ? 'input' : 'change', function (e) {
                    self.validate(e.target);
                }.bind(self));

                return input.pristine = { input: input, validators: fns, params: params, messages: messages, self: self };
            }.bind(self));
        }

        function _addValidatorToField(fns, params, name, value) {
            var validator = validators[name];
            if (validator) {
                fns.push(validator);
                if (value) {
                    var valueParams = name === "pattern" ? [value] : value.split(',');
                    valueParams.unshift(null); // placeholder for input's value
                    params[name] = valueParams;
                }
            }
        }

        /***
         * Checks whether the form/input elements are valid
         * @param input => input element(s) or a jquery selector, null for full form validation
         * @param silent => do not show error messages, just return true/false
         * @returns {boolean} return true when valid false otherwise
         */
        self.validate = function (input, silent) {
            silent = input && silent === true || input === true;
            var fields = self.fields;
            if (input !== true && input !== false) {
                if (input instanceof HTMLElement) {
                    fields = [input.pristine];
                } else if (input instanceof NodeList || input instanceof (window.$ || Array) || input instanceof Array) {
                    fields = Array.from(input).map(function (el) {
                        return el.pristine;
                    });
                }
            }

            var valid = true;

            for (var i = 0; fields[i]; i++) {
                var field = fields[i];
                if (_validateField(field)) {
                    !silent && _showSuccess(field);
                } else {
                    valid = false;
                    !silent && _showError(field);
                }
            }
            return valid;
        };

        /***
         * Get errors of a specific field or the whole form
         * @param input
         * @returns {Array|*}
         */
        self.getErrors = function (input) {
            if (!input) {
                var erroneousFields = [];
                for (var i = 0; i < self.fields.length; i++) {
                    var field = self.fields[i];
                    if (field.errors.length) {
                        erroneousFields.push({ input: field.input, errors: field.errors });
                    }
                }
                return erroneousFields;
            }
            if (input.tagName && input.tagName.toLowerCase() === "select") {
                return input.pristine.errors;
            }
            return input.length ? input[0].pristine.errors : input.pristine.errors;
        };

        /***
         * Validates a single field, all validator functions are called and error messages are generated
         * when a validator fails
         * @param field
         * @returns {boolean}
         * @private
         */
        function _validateField(field) {
            var errors = [];
            var valid = true;
            for (var i = 0; field.validators[i]; i++) {
                var validator = field.validators[i];
                var params = field.params[validator.name] ? field.params[validator.name] : [];
                params[0] = field.input.value;
                if (!validator.fn.apply(field.input, params)) {
                    valid = false;

                    if (typeof validator.msg === "function") {
                        errors.push(validator.msg(field.input.value, params));
                    } else if (typeof validator.msg === "string") {
                        errors.push(tmpl.apply(validator.msg, params));
                    } else if (validator.msg === Object(validator.msg) && validator.msg[currentLocale]) {
                        // typeof generates unnecessary babel code
                        errors.push(tmpl.apply(validator.msg[currentLocale], params));
                    } else if (field.messages[currentLocale] && field.messages[currentLocale][validator.name]) {
                        errors.push(tmpl.apply(field.messages[currentLocale][validator.name], params));
                    } else if (lang[currentLocale] && lang[currentLocale][validator.name]) {
                        errors.push(tmpl.apply(lang[currentLocale][validator.name], params));
                    }

                    if (validator.halt === true) {
                        break;
                    }
                }
            }
            field.errors = errors;
            return valid;
        }

        /***
         * Add a validator to a specific dom element in a form
         * @param elem => The dom element where the validator is applied to
         * @param fn => validator function
         * @param msg => message to show when validation fails. Supports templating. ${0} for the input's value, ${1} and
         * so on are for the attribute values
         * @param priority => priority of the validator function, higher valued function gets called first.
         * @param halt => whether validation should stop for this field after current validation function
         */
        self.addValidator = function (elem, fn, msg, priority, halt) {
            if (elem instanceof HTMLElement) {
                elem.pristine.validators.push({ fn: fn, msg: msg, priority: priority, halt: halt });
                elem.pristine.validators.sort(function (a, b) {
                    return b.priority - a.priority;
                });
            } else {
                console.warn("The parameter elem must be a dom element");
            }
        };

        /***
         * An utility function that returns a 2-element array, first one is the element where error/success class is
         * applied. 2nd one is the element where error message is displayed. 2nd element is created if doesn't exist and cached.
         * @param field
         * @returns {*}
         * @private
         */
        function _getErrorElements(field) {
            if (field.errorElements) {
                return field.errorElements;
            }
            var errorClassElement = findAncestor(field.input, self.config.classTo);
            var errorTextParent = null,
                errorTextElement = null;
            if (self.config.classTo === self.config.errorTextParent) {
                errorTextParent = errorClassElement;
            } else {
                errorTextParent = errorClassElement.querySelector('.' + self.config.errorTextParent);
            }
            if (errorTextParent) {
                errorTextElement = errorTextParent.querySelector('.' + PRISTINE_ERROR);
                if (!errorTextElement) {
                    errorTextElement = document.createElement(self.config.errorTextTag);
                    errorTextElement.className = PRISTINE_ERROR + ' ' + self.config.errorTextClass;
                    errorTextParent.appendChild(errorTextElement);
                    errorTextElement.pristineDisplay = errorTextElement.style.display;
                }
            }
            return field.errorElements = [errorClassElement, errorTextElement];
        }

        function _showError(field) {
            var errorElements = _getErrorElements(field);
            var errorClassElement = errorElements[0],
                errorTextElement = errorElements[1];

            if (errorClassElement) {
                errorClassElement.classList.remove(self.config.successClass);
                errorClassElement.classList.add(self.config.errorClass);
            }
            if (errorTextElement) {
                errorTextElement.innerHTML = field.errors.join('<br/>');
                errorTextElement.style.display = errorTextElement.pristineDisplay || '';
            }
        }

        /***
         * Adds error to a specific field
         * @param input
         * @param error
         */
        self.addError = function (input, error) {
            input = input.length ? input[0] : input;
            input.pristine.errors.push(error);
            _showError(input.pristine);
        };

        function _removeError(field) {
            var errorElements = _getErrorElements(field);
            var errorClassElement = errorElements[0],
                errorTextElement = errorElements[1];
            if (errorClassElement) {
                // IE > 9 doesn't support multiple class removal
                errorClassElement.classList.remove(self.config.errorClass);
                errorClassElement.classList.remove(self.config.successClass);
            }
            if (errorTextElement) {
                errorTextElement.innerHTML = '';
                errorTextElement.style.display = 'none';
            }
            return errorElements;
        }

        function _showSuccess(field) {
            var errorClassElement = _removeError(field)[0];
            errorClassElement && errorClassElement.classList.add(self.config.successClass);
        }

        /***
         * Resets the errors
         */
        self.reset = function () {
            for (var i = 0; self.fields[i]; i++) {
                self.fields[i].errorElements = null;
            }
            Array.from(self.form.querySelectorAll('.' + PRISTINE_ERROR)).map(function (elem) {
                elem.parentNode.removeChild(elem);
            });
            Array.from(self.form.querySelectorAll('.' + self.config.classTo)).map(function (elem) {
                elem.classList.remove(self.config.successClass);
                elem.classList.remove(self.config.errorClass);
            });
        };

        /***
         * Resets the errors and deletes all pristine fields
         */
        self.destroy = function () {
            self.reset();
            self.fields.forEach(function (field) {
                delete field.input.pristine;
            });
            self.fields = [];
        };

        self.setGlobalConfig = function (config) {
            defaultConfig = config;
        };

        return self;
    }

    /***
     *
     * @param name => Name of the global validator
     * @param fn => validator function
     * @param msg => message to show when validation fails. Supports templating. ${0} for the input's value, ${1} and
     * so on are for the attribute values
     * @param priority => priority of the validator function, higher valued function gets called first.
     * @param halt => whether validation should stop for this field after current validation function
     */
    Pristine.addValidator = function (name, fn, msg, priority, halt) {
        _(name, { fn: fn, msg: msg, priority: priority, halt: halt });
    };

    Pristine.addMessages = function (locale, messages) {
        var langObj = lang.hasOwnProperty(locale) ? lang[locale] : lang[locale] = {};

        Object.keys(messages).forEach(function (key, index) {
            langObj[key] = messages[key];
        });
    };

    Pristine.setLocale = function (locale) {
        currentLocale = locale;
    };

    return Pristine;

})));

/* Validation END *********************************** */