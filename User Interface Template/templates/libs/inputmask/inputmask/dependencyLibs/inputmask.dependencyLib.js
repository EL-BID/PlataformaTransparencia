/*!
* dependencyLibs/inputmask.dependencyLib.js
* https://github.com/RobinHerbots/Inputmask
* Copyright (c) 2010 - 2019 Robin Herbots
* Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
* Version: 4.0.9
*/

(function(factory) {
    if (typeof define === "function" && define.amd) {
        define([ "../global/window" ], factory);
***REMOVED*** else if (typeof exports === "object") {
        module.exports = factory(require("../global/window"));
***REMOVED*** else {
        window.dependencyLib = factory(window);
***REMOVED***
***REMOVED***)(function(window) {
    var document = window.document;
    function indexOf(list, elem) {
        var i = 0, len = list.length;
        for (;i < len; i++) {
            if (list[i] === elem) {
                return i;
        ***REMOVED***
    ***REMOVED***
        return -1;
***REMOVED***
    function isWindow(obj) {
        return obj != null && obj === obj.window;
***REMOVED***
    function isArraylike(obj) {
        var length = "length" in obj && obj.length, ltype = typeof obj;
        if (ltype === "function" || isWindow(obj)) {
            return false;
    ***REMOVED***
        if (obj.nodeType === 1 && length) {
            return true;
    ***REMOVED***
        return ltype === "array" || length === 0 || typeof length === "number" && length > 0 && length - 1 in obj;
***REMOVED***
    function isValidElement(elem) {
        return elem instanceof Element;
***REMOVED***
    function DependencyLib(elem) {
        if (elem instanceof DependencyLib) {
            return elem;
    ***REMOVED***
        if (!(this instanceof DependencyLib)) {
            return new DependencyLib(elem);
    ***REMOVED***
        if (elem !== undefined && elem !== null && elem !== window) {
            this[0] = elem.nodeName ? elem : elem[0] !== undefined && elem[0].nodeName ? elem[0] : document.querySelector(elem);
            if (this[0] !== undefined && this[0] !== null) {
                this[0].eventRegistry = this[0].eventRegistry || {***REMOVED***;
        ***REMOVED***
    ***REMOVED***
***REMOVED***
    function getWindow(elem) {
        return isWindow(elem) ? elem : elem.nodeType === 9 ? elem.defaultView || elem.parentWindow : false;
***REMOVED***
    DependencyLib.prototype = {
        on: function(events, handler) {
            if (isValidElement(this[0])) {
                var eventRegistry = this[0].eventRegistry, elem = this[0];
                var addEvent = function(ev, namespace) {
                    if (elem.addEventListener) {
                        elem.addEventListener(ev, handler, false);
                ***REMOVED*** else if (elem.attachEvent) {
                        elem.attachEvent("on" + ev, handler);
                ***REMOVED***
                    eventRegistry[ev] = eventRegistry[ev] || {***REMOVED***;
                    eventRegistry[ev][namespace] = eventRegistry[ev][namespace] || [];
                    eventRegistry[ev][namespace].push(handler);
            ***REMOVED***;
                var _events = events.split(" ");
                for (var endx = 0; endx < _events.length; endx++) {
                    var nsEvent = _events[endx].split("."), ev = nsEvent[0], namespace = nsEvent[1] || "global";
                    addEvent(ev, namespace);
            ***REMOVED***
        ***REMOVED***
            return this;
      ***REMOVED***
        off: function(events, handler) {
            if (isValidElement(this[0])) {
                var eventRegistry = this[0].eventRegistry, elem = this[0];
                var removeEvent = function(ev, namespace, handler) {
                    if (ev in eventRegistry === true) {
                        if (elem.removeEventListener) {
                            elem.removeEventListener(ev, handler, false);
                    ***REMOVED*** else if (elem.detachEvent) {
                            elem.detachEvent("on" + ev, handler);
                    ***REMOVED***
                        if (namespace === "global") {
                            for (var nmsp in eventRegistry[ev]) {
                                eventRegistry[ev][nmsp].splice(eventRegistry[ev][nmsp].indexOf(handler), 1);
                        ***REMOVED***
                    ***REMOVED*** else {
                            eventRegistry[ev][namespace].splice(eventRegistry[ev][namespace].indexOf(handler), 1);
                    ***REMOVED***
                ***REMOVED***
            ***REMOVED***;
                var resolveNamespace = function(ev, namespace) {
                    var evts = [], hndx, hndL;
                    if (ev.length > 0) {
                        if (handler === undefined) {
                            for (hndx = 0, hndL = eventRegistry[ev][namespace].length; hndx < hndL; hndx++) {
                                evts.push({
                                    ev: ev,
                                    namespace: namespace && namespace.length > 0 ? namespace : "global",
                                    handler: eventRegistry[ev][namespace][hndx]
                            ***REMOVED***);
                        ***REMOVED***
                    ***REMOVED*** else {
                            evts.push({
                                ev: ev,
                                namespace: namespace && namespace.length > 0 ? namespace : "global",
                                handler: handler
                        ***REMOVED***);
                    ***REMOVED***
                ***REMOVED*** else if (namespace.length > 0) {
                        for (var evNdx in eventRegistry) {
                            for (var nmsp in eventRegistry[evNdx]) {
                                if (nmsp === namespace) {
                                    if (handler === undefined) {
                                        for (hndx = 0, hndL = eventRegistry[evNdx][nmsp].length; hndx < hndL; hndx++) {
                                            evts.push({
                                                ev: evNdx,
                                                namespace: nmsp,
                                                handler: eventRegistry[evNdx][nmsp][hndx]
                                        ***REMOVED***);
                                    ***REMOVED***
                                ***REMOVED*** else {
                                        evts.push({
                                            ev: evNdx,
                                            namespace: nmsp,
                                            handler: handler
                                    ***REMOVED***);
                                ***REMOVED***
                            ***REMOVED***
                        ***REMOVED***
                    ***REMOVED***
                ***REMOVED***
                    return evts;
            ***REMOVED***;
                var _events = events.split(" ");
                for (var endx = 0; endx < _events.length; endx++) {
                    var nsEvent = _events[endx].split("."), offEvents = resolveNamespace(nsEvent[0], nsEvent[1]);
                    for (var i = 0, offEventsL = offEvents.length; i < offEventsL; i++) {
                        removeEvent(offEvents[i].ev, offEvents[i].namespace, offEvents[i].handler);
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***
            return this;
      ***REMOVED***
        trigger: function(events) {
            if (isValidElement(this[0])) {
                var eventRegistry = this[0].eventRegistry, elem = this[0];
                var _events = typeof events === "string" ? events.split(" ") : [ events.type ];
                for (var endx = 0; endx < _events.length; endx++) {
                    var nsEvent = _events[endx].split("."), ev = nsEvent[0], namespace = nsEvent[1] || "global";
                    if (document !== undefined && namespace === "global") {
                        var evnt, i, params = {
                            bubbles: true,
                            cancelable: true,
                            detail: arguments[1]
                    ***REMOVED***;
                        if (document.createEvent) {
                            try {
                                evnt = new CustomEvent(ev, params);
                        ***REMOVED*** catch (e) {
                                evnt = document.createEvent("CustomEvent");
                                evnt.initCustomEvent(ev, params.bubbles, params.cancelable, params.detail);
                        ***REMOVED***
                            if (events.type) DependencyLib.extend(evnt, events);
                            elem.dispatchEvent(evnt);
                    ***REMOVED*** else {
                            evnt = document.createEventObject();
                            evnt.eventType = ev;
                            evnt.detail = arguments[1];
                            if (events.type) DependencyLib.extend(evnt, events);
                            elem.fireEvent("on" + evnt.eventType, evnt);
                    ***REMOVED***
                ***REMOVED*** else if (eventRegistry[ev] !== undefined) {
                        arguments[0] = arguments[0].type ? arguments[0] : DependencyLib.Event(arguments[0]);
                        if (namespace === "global") {
                            for (var nmsp in eventRegistry[ev]) {
                                for (i = 0; i < eventRegistry[ev][nmsp].length; i++) {
                                    eventRegistry[ev][nmsp][i].apply(elem, arguments);
                            ***REMOVED***
                        ***REMOVED***
                    ***REMOVED*** else {
                            for (i = 0; i < eventRegistry[ev][namespace].length; i++) {
                                eventRegistry[ev][namespace][i].apply(elem, arguments);
                        ***REMOVED***
                    ***REMOVED***
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***
            return this;
    ***REMOVED***
***REMOVED***;
    DependencyLib.isFunction = function(obj) {
        return typeof obj === "function";
***REMOVED***;
    DependencyLib.noop = function() {***REMOVED***;
    DependencyLib.isArray = Array.isArray;
    DependencyLib.inArray = function(elem, arr, i) {
        return arr == null ? -1 : indexOf(arr, elem, i);
***REMOVED***;
    DependencyLib.valHooks = undefined;
    DependencyLib.isPlainObject = function(obj) {
        if (typeof obj !== "object" || obj.nodeType || isWindow(obj)) {
            return false;
    ***REMOVED***
        if (obj.constructor && !Object.hasOwnProperty.call(obj.constructor.prototype, "isPrototypeOf")) {
            return false;
    ***REMOVED***
        return true;
***REMOVED***;
    DependencyLib.extend = function() {
        var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {***REMOVED***, i = 1, length = arguments.length, deep = false;
        if (typeof target === "boolean") {
            deep = target;
            target = arguments[i] || {***REMOVED***;
            i++;
    ***REMOVED***
        if (typeof target !== "object" && !DependencyLib.isFunction(target)) {
            target = {***REMOVED***;
    ***REMOVED***
        if (i === length) {
            target = this;
            i--;
    ***REMOVED***
        for (;i < length; i++) {
            if ((options = arguments[i]) != null) {
                for (name in options) {
                    src = target[name];
                    copy = options[name];
                    if (target === copy) {
                        continue;
                ***REMOVED***
                    if (deep && copy && (DependencyLib.isPlainObject(copy) || (copyIsArray = DependencyLib.isArray(copy)))) {
                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && DependencyLib.isArray(src) ? src : [];
                    ***REMOVED*** else {
                            clone = src && DependencyLib.isPlainObject(src) ? src : {***REMOVED***;
                    ***REMOVED***
                        target[name] = DependencyLib.extend(deep, clone, copy);
                ***REMOVED*** else if (copy !== undefined) {
                        target[name] = copy;
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***
        return target;
***REMOVED***;
    DependencyLib.each = function(obj, callback) {
        var value, i = 0;
        if (isArraylike(obj)) {
            for (var length = obj.length; i < length; i++) {
                value = callback.call(obj[i], i, obj[i]);
                if (value === false) {
                    break;
            ***REMOVED***
        ***REMOVED***
    ***REMOVED*** else {
            for (i in obj) {
                value = callback.call(obj[i], i, obj[i]);
                if (value === false) {
                    break;
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***
        return obj;
***REMOVED***;
    DependencyLib.data = function(owner, key, value) {
        if (value === undefined) {
            return owner.__data ? owner.__data[key] : null;
    ***REMOVED*** else {
            owner.__data = owner.__data || {***REMOVED***;
            owner.__data[key] = value;
    ***REMOVED***
***REMOVED***;
    if (typeof window.CustomEvent === "function") {
        DependencyLib.Event = window.CustomEvent;
***REMOVED*** else {
        DependencyLib.Event = function(event, params) {
            params = params || {
                bubbles: false,
                cancelable: false,
                detail: undefined
        ***REMOVED***;
            var evt = document.createEvent("CustomEvent");
            evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
            return evt;
    ***REMOVED***;
        DependencyLib.Event.prototype = window.Event.prototype;
***REMOVED***
    return DependencyLib;
***REMOVED***);