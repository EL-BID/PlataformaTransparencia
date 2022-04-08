/*!
 * current-device v0.9.1 - https://github.com/matthewhudson/current-device
 * MIT Licensed
 */
!function(n,o)***REMOVED***"object"==typeof exports&&"object"==typeof module?module.exports=o():"function"==typeof define&&define.amd?define([],o):"object"==typeof exports?exports.device=o():n.device=o()***REMOVED***(window,function()***REMOVED***return function(n)***REMOVED***var o=***REMOVED******REMOVED***;function e(t)***REMOVED***if(o[t])return o[t].exports;var r=o[t]=***REMOVED***i:t,l:!1,exports:***REMOVED******REMOVED******REMOVED***;return n[t].call(r.exports,r,r.exports,e),r.l=!0,r.exports***REMOVED***return e.m=n,e.c=o,e.d=function(n,o,t)***REMOVED***e.o(n,o)||Object.defineProperty(n,o,***REMOVED***enumerable:!0,get:t***REMOVED***)***REMOVED***,e.r=function(n)***REMOVED***"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,***REMOVED***value:"Module"***REMOVED***),Object.defineProperty(n,"__esModule",***REMOVED***value:!0***REMOVED***)***REMOVED***,e.t=function(n,o)***REMOVED***if(1&o&&(n=e(n)),8&o)return n;if(4&o&&"object"==typeof n&&n&&n.__esModule)return n;var t=Object.create(null);if(e.r(t),Object.defineProperty(t,"default",***REMOVED***enumerable:!0,value:n***REMOVED***),2&o&&"string"!=typeof n)for(var r in n)e.d(t,r,function(o)***REMOVED***return n[o]***REMOVED***.bind(null,r));return t***REMOVED***,e.n=function(n)***REMOVED***var o=n&&n.__esModule?function()***REMOVED***return n.default***REMOVED***:function()***REMOVED***return n***REMOVED***;return e.d(o,"a",o),o***REMOVED***,e.o=function(n,o)***REMOVED***return Object.prototype.hasOwnProperty.call(n,o)***REMOVED***,e.p="",e(e.s=0)***REMOVED***([function(n,o,e)***REMOVED***n.exports=e(1)***REMOVED***,function(n,o,e)***REMOVED***"use strict";e.r(o);var t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(n)***REMOVED***return typeof n***REMOVED***:function(n)***REMOVED***return n&&"function"==typeof Symbol&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n***REMOVED***,r=window.device,i=***REMOVED******REMOVED***,a=[];window.device=i;var c=window.document.documentElement,d=window.navigator.userAgent.toLowerCase(),u=["googletv","viera","smarttv","internet.tv","netcast","nettv","appletv","boxee","kylo","roku","dlnadoc","pov_tv","hbbtv","ce-html"];function l(n,o)***REMOVED***return-1!==n.indexOf(o)***REMOVED***function s(n)***REMOVED***return l(d,n)***REMOVED***function f(n)***REMOVED***return c.className.match(new RegExp(n,"i"))***REMOVED***function b(n)***REMOVED***var o=null;f(n)||(o=c.className.replace(/^\s+|\s+$/g,""),c.className=o+" "+n)***REMOVED***function p(n)***REMOVED***f(n)&&(c.className=c.className.replace(" "+n,""))***REMOVED***function w()***REMOVED***i.landscape()?(p("portrait"),b("landscape"),y("landscape")):(p("landscape"),b("portrait"),y("portrait")),v()***REMOVED***function y(n)***REMOVED***for(var o in a)a[o](n)***REMOVED***i.macos=function()***REMOVED***return s("mac")***REMOVED***,i.ios=function()***REMOVED***return i.iphone()||i.ipod()||i.ipad()***REMOVED***,i.iphone=function()***REMOVED***return!i.windows()&&s("iphone")***REMOVED***,i.ipod=function()***REMOVED***return s("ipod")***REMOVED***,i.ipad=function()***REMOVED***var n="MacIntel"===navigator.platform&&navigator.maxTouchPoints>1;return s("ipad")||n***REMOVED***,i.android=function()***REMOVED***return!i.windows()&&s("android")***REMOVED***,i.androidPhone=function()***REMOVED***return i.android()&&s("mobile")***REMOVED***,i.androidTablet=function()***REMOVED***return i.android()&&!s("mobile")***REMOVED***,i.blackberry=function()***REMOVED***return s("blackberry")||s("bb10")||s("rim")***REMOVED***,i.blackberryPhone=function()***REMOVED***return i.blackberry()&&!s("tablet")***REMOVED***,i.blackberryTablet=function()***REMOVED***return i.blackberry()&&s("tablet")***REMOVED***,i.windows=function()***REMOVED***return s("windows")***REMOVED***,i.windowsPhone=function()***REMOVED***return i.windows()&&s("phone")***REMOVED***,i.windowsTablet=function()***REMOVED***return i.windows()&&s("touch")&&!i.windowsPhone()***REMOVED***,i.fxos=function()***REMOVED***return(s("(mobile")||s("(tablet"))&&s(" rv:")***REMOVED***,i.fxosPhone=function()***REMOVED***return i.fxos()&&s("mobile")***REMOVED***,i.fxosTablet=function()***REMOVED***return i.fxos()&&s("tablet")***REMOVED***,i.meego=function()***REMOVED***return s("meego")***REMOVED***,i.cordova=function()***REMOVED***return window.cordova&&"file:"===location.protocol***REMOVED***,i.nodeWebkit=function()***REMOVED***return"object"===t(window.process)***REMOVED***,i.mobile=function()***REMOVED***return i.androidPhone()||i.iphone()||i.ipod()||i.windowsPhone()||i.blackberryPhone()||i.fxosPhone()||i.meego()***REMOVED***,i.tablet=function()***REMOVED***return i.ipad()||i.androidTablet()||i.blackberryTablet()||i.windowsTablet()||i.fxosTablet()***REMOVED***,i.desktop=function()***REMOVED***return!i.tablet()&&!i.mobile()***REMOVED***,i.television=function()***REMOVED***for(var n=0;n<u.length;)***REMOVED***if(s(u[n]))return!0;n++***REMOVED***return!1***REMOVED***,i.portrait=function()***REMOVED***return screen.orientation&&Object.prototype.hasOwnProperty.call(window,"onorientationchange")?l(screen.orientation.type,"portrait"):i.ios()&&Object.prototype.hasOwnProperty.call(window,"orientation")?90!==Math.abs(window.orientation):window.innerHeight/window.innerWidth>1***REMOVED***,i.landscape=function()***REMOVED***return screen.orientation&&Object.prototype.hasOwnProperty.call(window,"onorientationchange")?l(screen.orientation.type,"landscape"):i.ios()&&Object.prototype.hasOwnProperty.call(window,"orientation")?90===Math.abs(window.orientation):window.innerHeight/window.innerWidth<1***REMOVED***,i.noConflict=function()***REMOVED***return window.device=r,this***REMOVED***,i.ios()?i.ipad()?b("ios ipad tablet"):i.iphone()?b("ios iphone mobile"):i.ipod()&&b("ios ipod mobile"):i.macos()?b("macos desktop"):i.android()?i.androidTablet()?b("android tablet"):b("android mobile"):i.blackberry()?i.blackberryTablet()?b("blackberry tablet"):b("blackberry mobile"):i.windows()?i.windowsTablet()?b("windows tablet"):i.windowsPhone()?b("windows mobile"):b("windows desktop"):i.fxos()?i.fxosTablet()?b("fxos tablet"):b("fxos mobile"):i.meego()?b("meego mobile"):i.nodeWebkit()?b("node-webkit"):i.television()?b("television"):i.desktop()&&b("desktop"),i.cordova()&&b("cordova"),i.onChangeOrientation=function(n)***REMOVED***"function"==typeof n&&a.push(n)***REMOVED***;var m="resize";function h(n)***REMOVED***for(var o=0;o<n.length;o++)if(i[n[o]]())return n[o];return"unknown"***REMOVED***function v()***REMOVED***i.orientation=h(["portrait","landscape"])***REMOVED***Object.prototype.hasOwnProperty.call(window,"onorientationchange")&&(m="orientationchange"),window.addEventListener?window.addEventListener(m,w,!1):window.attachEvent?window.attachEvent(m,w):window[m]=w,w(),i.type=h(["mobile","tablet","desktop"]),i.os=h(["ios","iphone","ipad","ipod","android","blackberry","macos","windows","fxos","meego","television"]),v(),o.default=i***REMOVED***]).default***REMOVED***);
//# sourceMappingURL=current-device.min.js.map