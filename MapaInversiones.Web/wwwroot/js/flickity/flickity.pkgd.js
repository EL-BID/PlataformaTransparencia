/*!
 * Flickity PACKAGED v2.2.0
 * Touch, responsive, flickable carousels
 *
 * Licensed GPLv3 for open source use
 * or Flickity Commercial License for commercial use
 *
 * https://flickity.metafizzy.co
 * Copyright 2015-2018 Metafizzy
 */

/**
 * Bridget makes jQuery widgets
 * v2.0.1
 * MIT license
 */

/* jshint browser: true, strict: true, undef: true, unused: true */

( function( window, factory ) ***REMOVED***
  // universal module definition
  /*jshint strict: false */ /* globals define, module, require */
  if ( typeof define == 'function' && define.amd ) ***REMOVED***
    // AMD
    define( 'jquery-bridget/jquery-bridget',[ 'jquery' ], function( jQuery ) ***REMOVED***
      return factory( window, jQuery );
***REMOVED***);
  ***REMOVED*** else if ( typeof module == 'object' && module.exports ) ***REMOVED***
    // CommonJS
    module.exports = factory(
      window,
      require('jquery')
    );
  ***REMOVED*** else ***REMOVED***
    // browser global
    window.jQueryBridget = factory(
      window,
      window.jQuery
    );
  ***REMOVED***

***REMOVED***( window, function factory( window, jQuery ) ***REMOVED***
'use strict';

// ----- utils ----- //

var arraySlice = Array.prototype.slice;

// helper function for logging errors
// $.error breaks jQuery chaining
var console = window.console;
var logError = typeof console == 'undefined' ? function() ***REMOVED******REMOVED*** :
  function( message ) ***REMOVED***
    console.error( message );
  ***REMOVED***;

// ----- jQueryBridget ----- //

function jQueryBridget( namespace, PluginClass, $ ) ***REMOVED***
  $ = $ || jQuery || window.jQuery;
  if ( !$ ) ***REMOVED***
    return;
  ***REMOVED***

  // add option method -> $().plugin('option', ***REMOVED***...***REMOVED***)
  if ( !PluginClass.prototype.option ) ***REMOVED***
    // option setter
    PluginClass.prototype.option = function( opts ) ***REMOVED***
      // bail out if not an object
      if ( !$.isPlainObject( opts ) )***REMOVED***
        return;
  ***REMOVED***
      this.options = $.extend( true, this.options, opts );
***REMOVED***;
  ***REMOVED***

  // make jQuery plugin
  $.fn[ namespace ] = function( arg0 /*, arg1 */ ) ***REMOVED***
    if ( typeof arg0 == 'string' ) ***REMOVED***
      // method call $().plugin( 'methodName', ***REMOVED*** options ***REMOVED*** )
      // shift arguments by 1
      var args = arraySlice.call( arguments, 1 );
      return methodCall( this, arg0, args );
***REMOVED***
    // just $().plugin(***REMOVED*** options ***REMOVED***)
    plainCall( this, arg0 );
    return this;
  ***REMOVED***;

  // $().plugin('methodName')
  function methodCall( $elems, methodName, args ) ***REMOVED***
    var returnValue;
    var pluginMethodStr = '$().' + namespace + '("' + methodName + '")';

    $elems.each( function( i, elem ) ***REMOVED***
      // get instance
      var instance = $.data( elem, namespace );
      if ( !instance ) ***REMOVED***
        logError( namespace + ' not initialized. Cannot call methods, i.e. ' +
          pluginMethodStr );
        return;
  ***REMOVED***

      var method = instance[ methodName ];
      if ( !method || methodName.charAt(0) == '_' ) ***REMOVED***
        logError( pluginMethodStr + ' is not a valid method' );
        return;
  ***REMOVED***

      // apply method, get return value
      var value = method.apply( instance, args );
      // set return value if value is returned, use only first value
      returnValue = returnValue === undefined ? value : returnValue;
***REMOVED***);

    return returnValue !== undefined ? returnValue : $elems;
  ***REMOVED***

  function plainCall( $elems, options ) ***REMOVED***
    $elems.each( function( i, elem ) ***REMOVED***
      var instance = $.data( elem, namespace );
      if ( instance ) ***REMOVED***
        // set options & init
        instance.option( options );
        instance._init();
  ***REMOVED*** else ***REMOVED***
        // initialize new instance
        instance = new PluginClass( elem, options );
        $.data( elem, namespace, instance );
  ***REMOVED***
***REMOVED***);
  ***REMOVED***

  updateJQuery( $ );

***REMOVED***

// ----- updateJQuery ----- //

// set $.bridget for v1 backwards compatibility
function updateJQuery( $ ) ***REMOVED***
  if ( !$ || ( $ && $.bridget ) ) ***REMOVED***
    return;
  ***REMOVED***
  $.bridget = jQueryBridget;
***REMOVED***

updateJQuery( jQuery || window.jQuery );

// -----  ----- //

return jQueryBridget;

***REMOVED***));

/**
 * EvEmitter v1.1.0
 * Lil' event emitter
 * MIT License
 */

/* jshint unused: true, undef: true, strict: true */

( function( global, factory ) ***REMOVED***
  // universal module definition
  /* jshint strict: false */ /* globals define, module, window */
  if ( typeof define == 'function' && define.amd ) ***REMOVED***
    // AMD - RequireJS
    define( 'ev-emitter/ev-emitter',factory );
  ***REMOVED*** else if ( typeof module == 'object' && module.exports ) ***REMOVED***
    // CommonJS - Browserify, Webpack
    module.exports = factory();
  ***REMOVED*** else ***REMOVED***
    // Browser globals
    global.EvEmitter = factory();
  ***REMOVED***

***REMOVED***( typeof window != 'undefined' ? window : this, function() ***REMOVED***



function EvEmitter() ***REMOVED******REMOVED***

var proto = EvEmitter.prototype;

proto.on = function( eventName, listener ) ***REMOVED***
  if ( !eventName || !listener ) ***REMOVED***
    return;
  ***REMOVED***
  // set events hash
  var events = this._events = this._events || ***REMOVED******REMOVED***;
  // set listeners array
  var listeners = events[ eventName ] = events[ eventName ] || [];
  // only add once
  if ( listeners.indexOf( listener ) == -1 ) ***REMOVED***
    listeners.push( listener );
  ***REMOVED***

  return this;
***REMOVED***;

proto.once = function( eventName, listener ) ***REMOVED***
  if ( !eventName || !listener ) ***REMOVED***
    return;
  ***REMOVED***
  // add event
  this.on( eventName, listener );
  // set once flag
  // set onceEvents hash
  var onceEvents = this._onceEvents = this._onceEvents || ***REMOVED******REMOVED***;
  // set onceListeners object
  var onceListeners = onceEvents[ eventName ] = onceEvents[ eventName ] || ***REMOVED******REMOVED***;
  // set flag
  onceListeners[ listener ] = true;

  return this;
***REMOVED***;

proto.off = function( eventName, listener ) ***REMOVED***
  var listeners = this._events && this._events[ eventName ];
  if ( !listeners || !listeners.length ) ***REMOVED***
    return;
  ***REMOVED***
  var index = listeners.indexOf( listener );
  if ( index != -1 ) ***REMOVED***
    listeners.splice( index, 1 );
  ***REMOVED***

  return this;
***REMOVED***;

proto.emitEvent = function( eventName, args ) ***REMOVED***
  var listeners = this._events && this._events[ eventName ];
  if ( !listeners || !listeners.length ) ***REMOVED***
    return;
  ***REMOVED***
  // copy over to avoid interference if .off() in listener
  listeners = listeners.slice(0);
  args = args || [];
  // once stuff
  var onceListeners = this._onceEvents && this._onceEvents[ eventName ];

  for ( var i=0; i < listeners.length; i++ ) ***REMOVED***
    var listener = listeners[i]
    var isOnce = onceListeners && onceListeners[ listener ];
    if ( isOnce ) ***REMOVED***
      // remove listener
      // remove before trigger to prevent recursion
      this.off( eventName, listener );
      // unset once flag
      delete onceListeners[ listener ];
***REMOVED***
    // trigger listener
    listener.apply( this, args );
  ***REMOVED***

  return this;
***REMOVED***;

proto.allOff = function() ***REMOVED***
  delete this._events;
  delete this._onceEvents;
***REMOVED***;

return EvEmitter;

***REMOVED***));

/*!
 * getSize v2.0.3
 * measure size of elements
 * MIT license
 */

/* jshint browser: true, strict: true, undef: true, unused: true */
/* globals console: false */

( function( window, factory ) ***REMOVED***
  /* jshint strict: false */ /* globals define, module */
  if ( typeof define == 'function' && define.amd ) ***REMOVED***
    // AMD
    define( 'get-size/get-size',factory );
  ***REMOVED*** else if ( typeof module == 'object' && module.exports ) ***REMOVED***
    // CommonJS
    module.exports = factory();
  ***REMOVED*** else ***REMOVED***
    // browser global
    window.getSize = factory();
  ***REMOVED***

***REMOVED***)( window, function factory() ***REMOVED***
'use strict';

// -------------------------- helpers -------------------------- //

// get a number from a string, not a percentage
function getStyleSize( value ) ***REMOVED***
  var num = parseFloat( value );
  // not a percent like '100%', and a number
  var isValid = value.indexOf('%') == -1 && !isNaN( num );
  return isValid && num;
***REMOVED***

function noop() ***REMOVED******REMOVED***

var logError = typeof console == 'undefined' ? noop :
  function( message ) ***REMOVED***
    console.error( message );
  ***REMOVED***;

// -------------------------- measurements -------------------------- //

var measurements = [
  'paddingLeft',
  'paddingRight',
  'paddingTop',
  'paddingBottom',
  'marginLeft',
  'marginRight',
  'marginTop',
  'marginBottom',
  'borderLeftWidth',
  'borderRightWidth',
  'borderTopWidth',
  'borderBottomWidth'
];

var measurementsLength = measurements.length;

function getZeroSize() ***REMOVED***
  var size = ***REMOVED***
    width: 0,
    height: 0,
    innerWidth: 0,
    innerHeight: 0,
    outerWidth: 0,
    outerHeight: 0
  ***REMOVED***;
  for ( var i=0; i < measurementsLength; i++ ) ***REMOVED***
    var measurement = measurements[i];
    size[ measurement ] = 0;
  ***REMOVED***
  return size;
***REMOVED***

// -------------------------- getStyle -------------------------- //

/**
 * getStyle, get style of element, check for Firefox bug
 * https://bugzilla.mozilla.org/show_bug.cgi?id=548397
 */
function getStyle( elem ) ***REMOVED***
  var style = getComputedStyle( elem );
  if ( !style ) ***REMOVED***
    logError( 'Style returned ' + style +
      '. Are you running this code in a hidden iframe on Firefox? ' +
      'See https://bit.ly/getsizebug1' );
  ***REMOVED***
  return style;
***REMOVED***

// -------------------------- setup -------------------------- //

var isSetup = false;

var isBoxSizeOuter;

/**
 * setup
 * check isBoxSizerOuter
 * do on first getSize() rather than on page load for Firefox bug
 */
function setup() ***REMOVED***
  // setup once
  if ( isSetup ) ***REMOVED***
    return;
  ***REMOVED***
  isSetup = true;

  // -------------------------- box sizing -------------------------- //

  /**
   * Chrome & Safari measure the outer-width on style.width on border-box elems
   * IE11 & Firefox<29 measures the inner-width
   */
  var div = document.createElement('div');
  div.style.width = '200px';
  div.style.padding = '1px 2px 3px 4px';
  div.style.borderStyle = 'solid';
  div.style.borderWidth = '1px 2px 3px 4px';
  div.style.boxSizing = 'border-box';

  var body = document.body || document.documentElement;
  body.appendChild( div );
  var style = getStyle( div );
  // round value for browser zoom. desandro/masonry#928
  isBoxSizeOuter = Math.round( getStyleSize( style.width ) ) == 200;
  getSize.isBoxSizeOuter = isBoxSizeOuter;

  body.removeChild( div );
***REMOVED***

// -------------------------- getSize -------------------------- //

function getSize( elem ) ***REMOVED***
  setup();

  // use querySeletor if elem is string
  if ( typeof elem == 'string' ) ***REMOVED***
    elem = document.querySelector( elem );
  ***REMOVED***

  // do not proceed on non-objects
  if ( !elem || typeof elem != 'object' || !elem.nodeType ) ***REMOVED***
    return;
  ***REMOVED***

  var style = getStyle( elem );

  // if hidden, everything is 0
  if ( style.display == 'none' ) ***REMOVED***
    return getZeroSize();
  ***REMOVED***

  var size = ***REMOVED******REMOVED***;
  size.width = elem.offsetWidth;
  size.height = elem.offsetHeight;

  var isBorderBox = size.isBorderBox = style.boxSizing == 'border-box';

  // get all measurements
  for ( var i=0; i < measurementsLength; i++ ) ***REMOVED***
    var measurement = measurements[i];
    var value = style[ measurement ];
    var num = parseFloat( value );
    // any 'auto', 'medium' value will be 0
    size[ measurement ] = !isNaN( num ) ? num : 0;
  ***REMOVED***

  var paddingWidth = size.paddingLeft + size.paddingRight;
  var paddingHeight = size.paddingTop + size.paddingBottom;
  var marginWidth = size.marginLeft + size.marginRight;
  var marginHeight = size.marginTop + size.marginBottom;
  var borderWidth = size.borderLeftWidth + size.borderRightWidth;
  var borderHeight = size.borderTopWidth + size.borderBottomWidth;

  var isBorderBoxSizeOuter = isBorderBox && isBoxSizeOuter;

  // overwrite width and height if we can get it from style
  var styleWidth = getStyleSize( style.width );
  if ( styleWidth !== false ) ***REMOVED***
    size.width = styleWidth +
      // add padding and border unless it's already including it
      ( isBorderBoxSizeOuter ? 0 : paddingWidth + borderWidth );
  ***REMOVED***

  var styleHeight = getStyleSize( style.height );
  if ( styleHeight !== false ) ***REMOVED***
    size.height = styleHeight +
      // add padding and border unless it's already including it
      ( isBorderBoxSizeOuter ? 0 : paddingHeight + borderHeight );
  ***REMOVED***

  size.innerWidth = size.width - ( paddingWidth + borderWidth );
  size.innerHeight = size.height - ( paddingHeight + borderHeight );

  size.outerWidth = size.width + marginWidth;
  size.outerHeight = size.height + marginHeight;

  return size;
***REMOVED***

return getSize;

***REMOVED***);

/**
 * matchesSelector v2.0.2
 * matchesSelector( element, '.selector' )
 * MIT license
 */

/*jshint browser: true, strict: true, undef: true, unused: true */

( function( window, factory ) ***REMOVED***
  /*global define: false, module: false */
  'use strict';
  // universal module definition
  if ( typeof define == 'function' && define.amd ) ***REMOVED***
    // AMD
    define( 'desandro-matches-selector/matches-selector',factory );
  ***REMOVED*** else if ( typeof module == 'object' && module.exports ) ***REMOVED***
    // CommonJS
    module.exports = factory();
  ***REMOVED*** else ***REMOVED***
    // browser global
    window.matchesSelector = factory();
  ***REMOVED***

***REMOVED***( window, function factory() ***REMOVED***
  'use strict';

  var matchesMethod = ( function() ***REMOVED***
    var ElemProto = window.Element.prototype;
    // check for the standard method name first
    if ( ElemProto.matches ) ***REMOVED***
      return 'matches';
***REMOVED***
    // check un-prefixed
    if ( ElemProto.matchesSelector ) ***REMOVED***
      return 'matchesSelector';
***REMOVED***
    // check vendor prefixes
    var prefixes = [ 'webkit', 'moz', 'ms', 'o' ];

    for ( var i=0; i < prefixes.length; i++ ) ***REMOVED***
      var prefix = prefixes[i];
      var method = prefix + 'MatchesSelector';
      if ( ElemProto[ method ] ) ***REMOVED***
        return method;
  ***REMOVED***
***REMOVED***
  ***REMOVED***)();

  return function matchesSelector( elem, selector ) ***REMOVED***
    return elem[ matchesMethod ]( selector );
  ***REMOVED***;

***REMOVED***));

/**
 * Fizzy UI utils v2.0.7
 * MIT license
 */

/*jshint browser: true, undef: true, unused: true, strict: true */

( function( window, factory ) ***REMOVED***
  // universal module definition
  /*jshint strict: false */ /*globals define, module, require */

  if ( typeof define == 'function' && define.amd ) ***REMOVED***
    // AMD
    define( 'fizzy-ui-utils/utils',[
      'desandro-matches-selector/matches-selector'
    ], function( matchesSelector ) ***REMOVED***
      return factory( window, matchesSelector );
***REMOVED***);
  ***REMOVED*** else if ( typeof module == 'object' && module.exports ) ***REMOVED***
    // CommonJS
    module.exports = factory(
      window,
      require('desandro-matches-selector')
    );
  ***REMOVED*** else ***REMOVED***
    // browser global
    window.fizzyUIUtils = factory(
      window,
      window.matchesSelector
    );
  ***REMOVED***

***REMOVED***( window, function factory( window, matchesSelector ) ***REMOVED***



var utils = ***REMOVED******REMOVED***;

// ----- extend ----- //

// extends objects
utils.extend = function( a, b ) ***REMOVED***
  for ( var prop in b ) ***REMOVED***
    a[ prop ] = b[ prop ];
  ***REMOVED***
  return a;
***REMOVED***;

// ----- modulo ----- //

utils.modulo = function( num, div ) ***REMOVED***
  return ( ( num % div ) + div ) % div;
***REMOVED***;

// ----- makeArray ----- //

var arraySlice = Array.prototype.slice;

// turn element or nodeList into an array
utils.makeArray = function( obj ) ***REMOVED***
  if ( Array.isArray( obj ) ) ***REMOVED***
    // use object if already an array
    return obj;
  ***REMOVED***
  // return empty array if undefined or null. #6
  if ( obj === null || obj === undefined ) ***REMOVED***
    return [];
  ***REMOVED***

  var isArrayLike = typeof obj == 'object' && typeof obj.length == 'number';
  if ( isArrayLike ) ***REMOVED***
    // convert nodeList to array
    return arraySlice.call( obj );
  ***REMOVED***

  // array of single index
  return [ obj ];
***REMOVED***;

// ----- removeFrom ----- //

utils.removeFrom = function( ary, obj ) ***REMOVED***
  var index = ary.indexOf( obj );
  if ( index != -1 ) ***REMOVED***
    ary.splice( index, 1 );
  ***REMOVED***
***REMOVED***;

// ----- getParent ----- //

utils.getParent = function( elem, selector ) ***REMOVED***
  while ( elem.parentNode && elem != document.body ) ***REMOVED***
    elem = elem.parentNode;
    if ( matchesSelector( elem, selector ) ) ***REMOVED***
      return elem;
***REMOVED***
  ***REMOVED***
***REMOVED***;

// ----- getQueryElement ----- //

// use element as selector string
utils.getQueryElement = function( elem ) ***REMOVED***
  if ( typeof elem == 'string' ) ***REMOVED***
    return document.querySelector( elem );
  ***REMOVED***
  return elem;
***REMOVED***;

// ----- handleEvent ----- //

// enable .ontype to trigger from .addEventListener( elem, 'type' )
utils.handleEvent = function( event ) ***REMOVED***
  var method = 'on' + event.type;
  if ( this[ method ] ) ***REMOVED***
    this[ method ]( event );
  ***REMOVED***
***REMOVED***;

// ----- filterFindElements ----- //

utils.filterFindElements = function( elems, selector ) ***REMOVED***
  // make array of elems
  elems = utils.makeArray( elems );
  var ffElems = [];

  elems.forEach( function( elem ) ***REMOVED***
    // check that elem is an actual element
    if ( !( elem instanceof HTMLElement ) ) ***REMOVED***
      return;
***REMOVED***
    // add elem if no selector
    if ( !selector ) ***REMOVED***
      ffElems.push( elem );
      return;
***REMOVED***
    // filter & find items if we have a selector
    // filter
    if ( matchesSelector( elem, selector ) ) ***REMOVED***
      ffElems.push( elem );
***REMOVED***
    // find children
    var childElems = elem.querySelectorAll( selector );
    // concat childElems to filterFound array
    for ( var i=0; i < childElems.length; i++ ) ***REMOVED***
      ffElems.push( childElems[i] );
***REMOVED***
  ***REMOVED***);

  return ffElems;
***REMOVED***;

// ----- debounceMethod ----- //

utils.debounceMethod = function( _class, methodName, threshold ) ***REMOVED***
  threshold = threshold || 100;
  // original method
  var method = _class.prototype[ methodName ];
  var timeoutName = methodName + 'Timeout';

  _class.prototype[ methodName ] = function() ***REMOVED***
    var timeout = this[ timeoutName ];
    clearTimeout( timeout );

    var args = arguments;
    var _this = this;
    this[ timeoutName ] = setTimeout( function() ***REMOVED***
      method.apply( _this, args );
      delete _this[ timeoutName ];
  ***REMOVED*** threshold );
  ***REMOVED***;
***REMOVED***;

// ----- docReady ----- //

utils.docReady = function( callback ) ***REMOVED***
  var readyState = document.readyState;
  if ( readyState == 'complete' || readyState == 'interactive' ) ***REMOVED***
    // do async to allow for other scripts to run. metafizzy/flickity#441
    setTimeout( callback );
  ***REMOVED*** else ***REMOVED***
    document.addEventListener( 'DOMContentLoaded', callback );
  ***REMOVED***
***REMOVED***;

// ----- htmlInit ----- //

// http://jamesroberts.name/blog/2010/02/22/string-functions-for-javascript-trim-to-camel-case-to-dashed-and-to-underscore/
utils.toDashed = function( str ) ***REMOVED***
  return str.replace( /(.)([A-Z])/g, function( match, $1, $2 ) ***REMOVED***
    return $1 + '-' + $2;
  ***REMOVED***).toLowerCase();
***REMOVED***;

var console = window.console;
/**
 * allow user to initialize classes via [data-namespace] or .js-namespace class
 * htmlInit( Widget, 'widgetName' )
 * options are parsed from data-namespace-options
 */
utils.htmlInit = function( WidgetClass, namespace ) ***REMOVED***
  utils.docReady( function() ***REMOVED***
    var dashedNamespace = utils.toDashed( namespace );
    var dataAttr = 'data-' + dashedNamespace;
    var dataAttrElems = document.querySelectorAll( '[' + dataAttr + ']' );
    var jsDashElems = document.querySelectorAll( '.js-' + dashedNamespace );
    var elems = utils.makeArray( dataAttrElems )
      .concat( utils.makeArray( jsDashElems ) );
    var dataOptionsAttr = dataAttr + '-options';
    var jQuery = window.jQuery;

    elems.forEach( function( elem ) ***REMOVED***
      var attr = elem.getAttribute( dataAttr ) ||
        elem.getAttribute( dataOptionsAttr );
      var options;
      try ***REMOVED***
        options = attr && JSON.parse( attr );
  ***REMOVED*** catch ( error ) ***REMOVED***
        // log error, do not initialize
        if ( console ) ***REMOVED***
          console.error( 'Error parsing ' + dataAttr + ' on ' + elem.className +
          ': ' + error );
    ***REMOVED***
        return;
  ***REMOVED***
      // initialize
      var instance = new WidgetClass( elem, options );
      // make available via $().data('namespace')
      if ( jQuery ) ***REMOVED***
        jQuery.data( elem, namespace, instance );
  ***REMOVED***
***REMOVED***);

  ***REMOVED***);
***REMOVED***;

// -----  ----- //

return utils;

***REMOVED***));

// Flickity.Cell
( function( window, factory ) ***REMOVED***
  // universal module definition
  /* jshint strict: false */
  if ( typeof define == 'function' && define.amd ) ***REMOVED***
    // AMD
    define( 'flickity/js/cell',[
      'get-size/get-size'
    ], function( getSize ) ***REMOVED***
      return factory( window, getSize );
***REMOVED***);
  ***REMOVED*** else if ( typeof module == 'object' && module.exports ) ***REMOVED***
    // CommonJS
    module.exports = factory(
      window,
      require('get-size')
    );
  ***REMOVED*** else ***REMOVED***
    // browser global
    window.Flickity = window.Flickity || ***REMOVED******REMOVED***;
    window.Flickity.Cell = factory(
      window,
      window.getSize
    );
  ***REMOVED***

***REMOVED***( window, function factory( window, getSize ) ***REMOVED***



function Cell( elem, parent ) ***REMOVED***
  this.element = elem;
  this.parent = parent;

  this.create();
***REMOVED***

var proto = Cell.prototype;

proto.create = function() ***REMOVED***
  this.element.style.position = 'absolute';
  this.element.setAttribute( 'aria-hidden', 'true' );
  this.x = 0;
  this.shift = 0;
***REMOVED***;

proto.destroy = function() ***REMOVED***
  // reset style
  this.unselect();
  this.element.style.position = '';
  var side = this.parent.originSide;
  this.element.style[ side ] = '';
***REMOVED***;

proto.getSize = function() ***REMOVED***
  this.size = getSize( this.element );
***REMOVED***;

proto.setPosition = function( x ) ***REMOVED***
  this.x = x;
  this.updateTarget();
  this.renderPosition( x );
***REMOVED***;

// setDefaultTarget v1 method, backwards compatibility, remove in v3
proto.updateTarget = proto.setDefaultTarget = function() ***REMOVED***
  var marginProperty = this.parent.originSide == 'left' ? 'marginLeft' : 'marginRight';
  this.target = this.x + this.size[ marginProperty ] +
    this.size.width * this.parent.cellAlign;
***REMOVED***;

proto.renderPosition = function( x ) ***REMOVED***
  // render position of cell with in slider
  var side = this.parent.originSide;
  this.element.style[ side ] = this.parent.getPositionValue( x );
***REMOVED***;

proto.select = function() ***REMOVED***
  this.element.classList.add('is-selected');
  this.element.removeAttribute('aria-hidden');
***REMOVED***;

proto.unselect = function() ***REMOVED***
  this.element.classList.remove('is-selected');
  this.element.setAttribute( 'aria-hidden', 'true' );
***REMOVED***;

/**
 * @param ***REMOVED***Integer***REMOVED*** factor - 0, 1, or -1
**/
proto.wrapShift = function( shift ) ***REMOVED***
  this.shift = shift;
  this.renderPosition( this.x + this.parent.slideableWidth * shift );
***REMOVED***;

proto.remove = function() ***REMOVED***
  this.element.parentNode.removeChild( this.element );
***REMOVED***;

return Cell;

***REMOVED***));

// slide
( function( window, factory ) ***REMOVED***
  // universal module definition
  /* jshint strict: false */
  if ( typeof define == 'function' && define.amd ) ***REMOVED***
    // AMD
    define( 'flickity/js/slide',factory );
  ***REMOVED*** else if ( typeof module == 'object' && module.exports ) ***REMOVED***
    // CommonJS
    module.exports = factory();
  ***REMOVED*** else ***REMOVED***
    // browser global
    window.Flickity = window.Flickity || ***REMOVED******REMOVED***;
    window.Flickity.Slide = factory();
  ***REMOVED***

***REMOVED***( window, function factory() ***REMOVED***
'use strict';

function Slide( parent ) ***REMOVED***
  this.parent = parent;
  this.isOriginLeft = parent.originSide == 'left';
  this.cells = [];
  this.outerWidth = 0;
  this.height = 0;
***REMOVED***

var proto = Slide.prototype;

proto.addCell = function( cell ) ***REMOVED***
  this.cells.push( cell );
  this.outerWidth += cell.size.outerWidth;
  this.height = Math.max( cell.size.outerHeight, this.height );
  // first cell stuff
  if ( this.cells.length == 1 ) ***REMOVED***
    this.x = cell.x; // x comes from first cell
    var beginMargin = this.isOriginLeft ? 'marginLeft' : 'marginRight';
    this.firstMargin = cell.size[ beginMargin ];
  ***REMOVED***
***REMOVED***;

proto.updateTarget = function() ***REMOVED***
  var endMargin = this.isOriginLeft ? 'marginRight' : 'marginLeft';
  var lastCell = this.getLastCell();
  var lastMargin = lastCell ? lastCell.size[ endMargin ] : 0;
  var slideWidth = this.outerWidth - ( this.firstMargin + lastMargin );
  this.target = this.x + this.firstMargin + slideWidth * this.parent.cellAlign;
***REMOVED***;

proto.getLastCell = function() ***REMOVED***
  return this.cells[ this.cells.length - 1 ];
***REMOVED***;

proto.select = function() ***REMOVED***
  this.cells.forEach( function( cell ) ***REMOVED***
    cell.select();
  ***REMOVED***);
***REMOVED***;

proto.unselect = function() ***REMOVED***
  this.cells.forEach( function( cell ) ***REMOVED***
    cell.unselect();
  ***REMOVED***);
***REMOVED***;

proto.getCellElements = function() ***REMOVED***
  return this.cells.map( function( cell ) ***REMOVED***
    return cell.element;
  ***REMOVED***);
***REMOVED***;

return Slide;

***REMOVED***));

// animate
( function( window, factory ) ***REMOVED***
  // universal module definition
  /* jshint strict: false */
  if ( typeof define == 'function' && define.amd ) ***REMOVED***
    // AMD
    define( 'flickity/js/animate',[
      'fizzy-ui-utils/utils'
    ], function( utils ) ***REMOVED***
      return factory( window, utils );
***REMOVED***);
  ***REMOVED*** else if ( typeof module == 'object' && module.exports ) ***REMOVED***
    // CommonJS
    module.exports = factory(
      window,
      require('fizzy-ui-utils')
    );
  ***REMOVED*** else ***REMOVED***
    // browser global
    window.Flickity = window.Flickity || ***REMOVED******REMOVED***;
    window.Flickity.animatePrototype = factory(
      window,
      window.fizzyUIUtils
    );
  ***REMOVED***

***REMOVED***( window, function factory( window, utils ) ***REMOVED***



// -------------------------- animate -------------------------- //

var proto = ***REMOVED******REMOVED***;

proto.startAnimation = function() ***REMOVED***
  if ( this.isAnimating ) ***REMOVED***
    return;
  ***REMOVED***

  this.isAnimating = true;
  this.restingFrames = 0;
  this.animate();
***REMOVED***;

proto.animate = function() ***REMOVED***
  this.applyDragForce();
  this.applySelectedAttraction();

  var previousX = this.x;

  this.integratePhysics();
  this.positionSlider();
  this.settle( previousX );
  // animate next frame
  if ( this.isAnimating ) ***REMOVED***
    var _this = this;
    requestAnimationFrame( function animateFrame() ***REMOVED***
      _this.animate();
***REMOVED***);
  ***REMOVED***
***REMOVED***;

proto.positionSlider = function() ***REMOVED***
  var x = this.x;
  // wrap position around
  if ( this.options.wrapAround && this.cells.length > 1 ) ***REMOVED***
    x = utils.modulo( x, this.slideableWidth );
    x = x - this.slideableWidth;
    this.shiftWrapCells( x );
  ***REMOVED***

  this.setTranslateX( x, this.isAnimating );
  this.dispatchScrollEvent();
***REMOVED***;

proto.setTranslateX = function( x, is3d ) ***REMOVED***
  x += this.cursorPosition;
  // reverse if right-to-left and using transform
  x = this.options.rightToLeft ? -x : x;
  var translateX = this.getPositionValue( x );
  // use 3D tranforms for hardware acceleration on iOS
  // but use 2D when settled, for better font-rendering
  this.slider.style.transform = is3d ?
    'translate3d(' + translateX + ',0,0)' : 'translateX(' + translateX + ')';
***REMOVED***;

proto.dispatchScrollEvent = function() ***REMOVED***
  var firstSlide = this.slides[0];
  if ( !firstSlide ) ***REMOVED***
    return;
  ***REMOVED***
  var positionX = -this.x - firstSlide.target;
  var progress = positionX / this.slidesWidth;
  this.dispatchEvent( 'scroll', null, [ progress, positionX ] );
***REMOVED***;

proto.positionSliderAtSelected = function() ***REMOVED***
  if ( !this.cells.length ) ***REMOVED***
    return;
  ***REMOVED***
  this.x = -this.selectedSlide.target;
  this.velocity = 0; // stop wobble
  this.positionSlider();
***REMOVED***;

proto.getPositionValue = function( position ) ***REMOVED***
  if ( this.options.percentPosition ) ***REMOVED***
    // percent position, round to 2 digits, like 12.34%
    return ( Math.round( ( position / this.size.innerWidth ) * 10000 ) * 0.01 )+ '%';
  ***REMOVED*** else ***REMOVED***
    // pixel positioning
    return Math.round( position ) + 'px';
  ***REMOVED***
***REMOVED***;

proto.settle = function( previousX ) ***REMOVED***
  // keep track of frames where x hasn't moved
  if ( !this.isPointerDown && Math.round( this.x * 100 ) == Math.round( previousX * 100 ) ) ***REMOVED***
    this.restingFrames++;
  ***REMOVED***
  // stop animating if resting for 3 or more frames
  if ( this.restingFrames > 2 ) ***REMOVED***
    this.isAnimating = false;
    delete this.isFreeScrolling;
    // render position with translateX when settled
    this.positionSlider();
    this.dispatchEvent( 'settle', null, [ this.selectedIndex ] );
  ***REMOVED***
***REMOVED***;

proto.shiftWrapCells = function( x ) ***REMOVED***
  // shift before cells
  var beforeGap = this.cursorPosition + x;
  this._shiftCells( this.beforeShiftCells, beforeGap, -1 );
  // shift after cells
  var afterGap = this.size.innerWidth - ( x + this.slideableWidth + this.cursorPosition );
  this._shiftCells( this.afterShiftCells, afterGap, 1 );
***REMOVED***;

proto._shiftCells = function( cells, gap, shift ) ***REMOVED***
  for ( var i=0; i < cells.length; i++ ) ***REMOVED***
    var cell = cells[i];
    var cellShift = gap > 0 ? shift : 0;
    cell.wrapShift( cellShift );
    gap -= cell.size.outerWidth;
  ***REMOVED***
***REMOVED***;

proto._unshiftCells = function( cells ) ***REMOVED***
  if ( !cells || !cells.length ) ***REMOVED***
    return;
  ***REMOVED***
  for ( var i=0; i < cells.length; i++ ) ***REMOVED***
    cells[i].wrapShift( 0 );
  ***REMOVED***
***REMOVED***;

// -------------------------- physics -------------------------- //

proto.integratePhysics = function() ***REMOVED***
  this.x += this.velocity;
  this.velocity *= this.getFrictionFactor();
***REMOVED***;

proto.applyForce = function( force ) ***REMOVED***
  this.velocity += force;
***REMOVED***;

proto.getFrictionFactor = function() ***REMOVED***
  return 1 - this.options[ this.isFreeScrolling ? 'freeScrollFriction' : 'friction' ];
***REMOVED***;

proto.getRestingPosition = function() ***REMOVED***
  // my thanks to Steven Wittens, who simplified this math greatly
  return this.x + this.velocity / ( 1 - this.getFrictionFactor() );
***REMOVED***;

proto.applyDragForce = function() ***REMOVED***
  if ( !this.isDraggable || !this.isPointerDown ) ***REMOVED***
    return;
  ***REMOVED***
  // change the position to drag position by applying force
  var dragVelocity = this.dragX - this.x;
  var dragForce = dragVelocity - this.velocity;
  this.applyForce( dragForce );
***REMOVED***;

proto.applySelectedAttraction = function() ***REMOVED***
  // do not attract if pointer down or no slides
  var dragDown = this.isDraggable && this.isPointerDown;
  if ( dragDown || this.isFreeScrolling || !this.slides.length ) ***REMOVED***
    return;
  ***REMOVED***
  var distance = this.selectedSlide.target * -1 - this.x;
  var force = distance * this.options.selectedAttraction;
  this.applyForce( force );
***REMOVED***;

return proto;

***REMOVED***));

// Flickity main
( function( window, factory ) ***REMOVED***
  // universal module definition
  /* jshint strict: false */
  if ( typeof define == 'function' && define.amd ) ***REMOVED***
    // AMD
    define( 'flickity/js/flickity',[
      'ev-emitter/ev-emitter',
      'get-size/get-size',
      'fizzy-ui-utils/utils',
      './cell',
      './slide',
      './animate'
    ], function( EvEmitter, getSize, utils, Cell, Slide, animatePrototype ) ***REMOVED***
      return factory( window, EvEmitter, getSize, utils, Cell, Slide, animatePrototype );
***REMOVED***);
  ***REMOVED*** else if ( typeof module == 'object' && module.exports ) ***REMOVED***
    // CommonJS
    module.exports = factory(
      window,
      require('ev-emitter'),
      require('get-size'),
      require('fizzy-ui-utils'),
      require('./cell'),
      require('./slide'),
      require('./animate')
    );
  ***REMOVED*** else ***REMOVED***
    // browser global
    var _Flickity = window.Flickity;

    window.Flickity = factory(
      window,
      window.EvEmitter,
      window.getSize,
      window.fizzyUIUtils,
      _Flickity.Cell,
      _Flickity.Slide,
      _Flickity.animatePrototype
    );
  ***REMOVED***

***REMOVED***( window, function factory( window, EvEmitter, getSize,
  utils, Cell, Slide, animatePrototype ) ***REMOVED***



// vars
var jQuery = window.jQuery;
var getComputedStyle = window.getComputedStyle;
var console = window.console;

function moveElements( elems, toElem ) ***REMOVED***
  elems = utils.makeArray( elems );
  while ( elems.length ) ***REMOVED***
    toElem.appendChild( elems.shift() );
  ***REMOVED***
***REMOVED***

// -------------------------- Flickity -------------------------- //

// globally unique identifiers
var GUID = 0;
// internal store of all Flickity intances
var instances = ***REMOVED******REMOVED***;

function Flickity( element, options ) ***REMOVED***
  var queryElement = utils.getQueryElement( element );
  if ( !queryElement ) ***REMOVED***
    if ( console ) ***REMOVED***
      console.error( 'Bad element for Flickity: ' + ( queryElement || element ) );
***REMOVED***
    return;
  ***REMOVED***
  this.element = queryElement;
  // do not initialize twice on same element
  if ( this.element.flickityGUID ) ***REMOVED***
    var instance = instances[ this.element.flickityGUID ];
    instance.option( options );
    return instance;
  ***REMOVED***

  // add jQuery
  if ( jQuery ) ***REMOVED***
    this.$element = jQuery( this.element );
  ***REMOVED***
  // options
  this.options = utils.extend( ***REMOVED******REMOVED***, this.constructor.defaults );
  this.option( options );

  // kick things off
  this._create();
***REMOVED***

Flickity.defaults = ***REMOVED***
  accessibility: true,
  // adaptiveHeight: false,
  cellAlign: 'center',
  // cellSelector: undefined,
  // contain: false,
  freeScrollFriction: 0.075, // friction when free-scrolling
  friction: 0.28, // friction when selecting
  namespaceJQueryEvents: true,
  // initialIndex: 0,
  percentPosition: true,
  resize: true,
  selectedAttraction: 0.025,
  setGallerySize: true
  // watchCSS: false,
  // wrapAround: false
***REMOVED***;

// hash of methods triggered on _create()
Flickity.createMethods = [];

var proto = Flickity.prototype;
// inherit EventEmitter
utils.extend( proto, EvEmitter.prototype );

proto._create = function() ***REMOVED***
  // add id for Flickity.data
  var id = this.guid = ++GUID;
  this.element.flickityGUID = id; // expando
  instances[ id ] = this; // associate via id
  // initial properties
  this.selectedIndex = 0;
  // how many frames slider has been in same position
  this.restingFrames = 0;
  // initial physics properties
  this.x = 0;
  this.velocity = 0;
  this.originSide = this.options.rightToLeft ? 'right' : 'left';
  // create viewport & slider
  this.viewport = document.createElement('div');
  this.viewport.className = 'flickity-viewport';
  this._createSlider();

  if ( this.options.resize || this.options.watchCSS ) ***REMOVED***
    window.addEventListener( 'resize', this );
  ***REMOVED***

  // add listeners from on option
  for ( var eventName in this.options.on ) ***REMOVED***
    var listener = this.options.on[ eventName ];
    this.on( eventName, listener );
  ***REMOVED***

  Flickity.createMethods.forEach( function( method ) ***REMOVED***
    this[ method ]();
***REMOVED*** this );

  if ( this.options.watchCSS ) ***REMOVED***
    this.watchCSS();
  ***REMOVED*** else ***REMOVED***
    this.activate();
  ***REMOVED***

***REMOVED***;

/**
 * set options
 * @param ***REMOVED***Object***REMOVED*** opts
 */
proto.option = function( opts ) ***REMOVED***
  utils.extend( this.options, opts );
***REMOVED***;

proto.activate = function() ***REMOVED***
  if ( this.isActive ) ***REMOVED***
    return;
  ***REMOVED***
  this.isActive = true;
  this.element.classList.add('flickity-enabled');
  if ( this.options.rightToLeft ) ***REMOVED***
    this.element.classList.add('flickity-rtl');
  ***REMOVED***

  this.getSize();
  // move initial cell elements so they can be loaded as cells
  var cellElems = this._filterFindCellElements( this.element.children );
  moveElements( cellElems, this.slider );
  this.viewport.appendChild( this.slider );
  this.element.appendChild( this.viewport );
  // get cells from children
  this.reloadCells();

  if ( this.options.accessibility ) ***REMOVED***
    // allow element to focusable
    this.element.tabIndex = 0;
    // listen for key presses
    this.element.addEventListener( 'keydown', this );
  ***REMOVED***

  this.emitEvent('activate');
  this.selectInitialIndex();
  // flag for initial activation, for using initialIndex
  this.isInitActivated = true;
  // ready event. #493
  this.dispatchEvent('ready');
***REMOVED***;

// slider positions the cells
proto._createSlider = function() ***REMOVED***
  // slider element does all the positioning
  var slider = document.createElement('div');
  slider.className = 'flickity-slider';
  slider.style[ this.originSide ] = 0;
  this.slider = slider;
***REMOVED***;

proto._filterFindCellElements = function( elems ) ***REMOVED***
  return utils.filterFindElements( elems, this.options.cellSelector );
***REMOVED***;

// goes through all children
proto.reloadCells = function() ***REMOVED***
  // collection of item elements
  this.cells = this._makeCells( this.slider.children );
  this.positionCells();
  this._getWrapShiftCells();
  this.setGallerySize();
***REMOVED***;

/**
 * turn elements into Flickity.Cells
 * @param ***REMOVED***Array or NodeList or HTMLElement***REMOVED*** elems
 * @returns ***REMOVED***Array***REMOVED*** items - collection of new Flickity Cells
 */
proto._makeCells = function( elems ) ***REMOVED***
  var cellElems = this._filterFindCellElements( elems );

  // create new Flickity for collection
  var cells = cellElems.map( function( cellElem ) ***REMOVED***
    return new Cell( cellElem, this );
***REMOVED*** this );

  return cells;
***REMOVED***;

proto.getLastCell = function() ***REMOVED***
  return this.cells[ this.cells.length - 1 ];
***REMOVED***;

proto.getLastSlide = function() ***REMOVED***
  return this.slides[ this.slides.length - 1 ];
***REMOVED***;

// positions all cells
proto.positionCells = function() ***REMOVED***
  // size all cells
  this._sizeCells( this.cells );
  // position all cells
  this._positionCells( 0 );
***REMOVED***;

/**
 * position certain cells
 * @param ***REMOVED***Integer***REMOVED*** index - which cell to start with
 */
proto._positionCells = function( index ) ***REMOVED***
  index = index || 0;
  // also measure maxCellHeight
  // start 0 if positioning all cells
  this.maxCellHeight = index ? this.maxCellHeight || 0 : 0;
  var cellX = 0;
  // get cellX
  if ( index > 0 ) ***REMOVED***
    var startCell = this.cells[ index - 1 ];
    cellX = startCell.x + startCell.size.outerWidth;
  ***REMOVED***
  var len = this.cells.length;
  for ( var i=index; i < len; i++ ) ***REMOVED***
    var cell = this.cells[i];
    cell.setPosition( cellX );
    cellX += cell.size.outerWidth;
    this.maxCellHeight = Math.max( cell.size.outerHeight, this.maxCellHeight );
  ***REMOVED***
  // keep track of cellX for wrap-around
  this.slideableWidth = cellX;
  // slides
  this.updateSlides();
  // contain slides target
  this._containSlides();
  // update slidesWidth
  this.slidesWidth = len ? this.getLastSlide().target - this.slides[0].target : 0;
***REMOVED***;

/**
 * cell.getSize() on multiple cells
 * @param ***REMOVED***Array***REMOVED*** cells
 */
proto._sizeCells = function( cells ) ***REMOVED***
  cells.forEach( function( cell ) ***REMOVED***
    cell.getSize();
  ***REMOVED***);
***REMOVED***;

// --------------------------  -------------------------- //

proto.updateSlides = function() ***REMOVED***
  this.slides = [];
  if ( !this.cells.length ) ***REMOVED***
    return;
  ***REMOVED***

  var slide = new Slide( this );
  this.slides.push( slide );
  var isOriginLeft = this.originSide == 'left';
  var nextMargin = isOriginLeft ? 'marginRight' : 'marginLeft';

  var canCellFit = this._getCanCellFit();

  this.cells.forEach( function( cell, i ) ***REMOVED***
    // just add cell if first cell in slide
    if ( !slide.cells.length ) ***REMOVED***
      slide.addCell( cell );
      return;
***REMOVED***

    var slideWidth = ( slide.outerWidth - slide.firstMargin ) +
      ( cell.size.outerWidth - cell.size[ nextMargin ] );

    if ( canCellFit.call( this, i, slideWidth ) ) ***REMOVED***
      slide.addCell( cell );
***REMOVED*** else ***REMOVED***
      // doesn't fit, new slide
      slide.updateTarget();

      slide = new Slide( this );
      this.slides.push( slide );
      slide.addCell( cell );
***REMOVED***
***REMOVED*** this );
  // last slide
  slide.updateTarget();
  // update .selectedSlide
  this.updateSelectedSlide();
***REMOVED***;

proto._getCanCellFit = function() ***REMOVED***
  var groupCells = this.options.groupCells;
  if ( !groupCells ) ***REMOVED***
    return function() ***REMOVED***
      return false;
***REMOVED***;
  ***REMOVED*** else if ( typeof groupCells == 'number' ) ***REMOVED***
    // group by number. 3 -> [0,1,2], [3,4,5], ...
    var number = parseInt( groupCells, 10 );
    return function( i ) ***REMOVED***
      return ( i % number ) !== 0;
***REMOVED***;
  ***REMOVED***
  // default, group by width of slide
  // parse '75%
  var percentMatch = typeof groupCells == 'string' &&
    groupCells.match(/^(\d+)%$/);
  var percent = percentMatch ? parseInt( percentMatch[1], 10 ) / 100 : 1;
  return function( i, slideWidth ) ***REMOVED***
    return slideWidth <= ( this.size.innerWidth + 1 ) * percent;
  ***REMOVED***;
***REMOVED***;

// alias _init for jQuery plugin .flickity()
proto._init =
proto.reposition = function() ***REMOVED***
  this.positionCells();
  this.positionSliderAtSelected();
***REMOVED***;

proto.getSize = function() ***REMOVED***
  this.size = getSize( this.element );
  this.setCellAlign();
  this.cursorPosition = this.size.innerWidth * this.cellAlign;
***REMOVED***;

var cellAlignShorthands = ***REMOVED***
  // cell align, then based on origin side
  center: ***REMOVED***
    left: 0.5,
    right: 0.5
***REMOVED***
  left: ***REMOVED***
    left: 0,
    right: 1
***REMOVED***
  right: ***REMOVED***
    right: 0,
    left: 1
  ***REMOVED***
***REMOVED***;

proto.setCellAlign = function() ***REMOVED***
  var shorthand = cellAlignShorthands[ this.options.cellAlign ];
  this.cellAlign = shorthand ? shorthand[ this.originSide ] : this.options.cellAlign;
***REMOVED***;

proto.setGallerySize = function() ***REMOVED***
  if ( this.options.setGallerySize ) ***REMOVED***
    var height = this.options.adaptiveHeight && this.selectedSlide ?
      this.selectedSlide.height : this.maxCellHeight;
    this.viewport.style.height = height + 'px';
  ***REMOVED***
***REMOVED***;

proto._getWrapShiftCells = function() ***REMOVED***
  // only for wrap-around
  if ( !this.options.wrapAround ) ***REMOVED***
    return;
  ***REMOVED***
  // unshift previous cells
  this._unshiftCells( this.beforeShiftCells );
  this._unshiftCells( this.afterShiftCells );
  // get before cells
  // initial gap
  var gapX = this.cursorPosition;
  var cellIndex = this.cells.length - 1;
  this.beforeShiftCells = this._getGapCells( gapX, cellIndex, -1 );
  // get after cells
  // ending gap between last cell and end of gallery viewport
  gapX = this.size.innerWidth - this.cursorPosition;
  // start cloning at first cell, working forwards
  this.afterShiftCells = this._getGapCells( gapX, 0, 1 );
***REMOVED***;

proto._getGapCells = function( gapX, cellIndex, increment ) ***REMOVED***
  // keep adding cells until the cover the initial gap
  var cells = [];
  while ( gapX > 0 ) ***REMOVED***
    var cell = this.cells[ cellIndex ];
    if ( !cell ) ***REMOVED***
      break;
***REMOVED***
    cells.push( cell );
    cellIndex += increment;
    gapX -= cell.size.outerWidth;
  ***REMOVED***
  return cells;
***REMOVED***;

// ----- contain ----- //

// contain cell targets so no excess sliding
proto._containSlides = function() ***REMOVED***
  if ( !this.options.contain || this.options.wrapAround || !this.cells.length ) ***REMOVED***
    return;
  ***REMOVED***
  var isRightToLeft = this.options.rightToLeft;
  var beginMargin = isRightToLeft ? 'marginRight' : 'marginLeft';
  var endMargin = isRightToLeft ? 'marginLeft' : 'marginRight';
  var contentWidth = this.slideableWidth - this.getLastCell().size[ endMargin ];
  // content is less than gallery size
  var isContentSmaller = contentWidth < this.size.innerWidth;
  // bounds
  var beginBound = this.cursorPosition + this.cells[0].size[ beginMargin ];
  var endBound = contentWidth - this.size.innerWidth * ( 1 - this.cellAlign );
  // contain each cell target
  this.slides.forEach( function( slide ) ***REMOVED***
    if ( isContentSmaller ) ***REMOVED***
      // all cells fit inside gallery
      slide.target = contentWidth * this.cellAlign;
***REMOVED*** else ***REMOVED***
      // contain to bounds
      slide.target = Math.max( slide.target, beginBound );
      slide.target = Math.min( slide.target, endBound );
***REMOVED***
***REMOVED*** this );
***REMOVED***;

// -----  ----- //

/**
 * emits events via eventEmitter and jQuery events
 * @param ***REMOVED***String***REMOVED*** type - name of event
 * @param ***REMOVED***Event***REMOVED*** event - original event
 * @param ***REMOVED***Array***REMOVED*** args - extra arguments
 */
proto.dispatchEvent = function( type, event, args ) ***REMOVED***
  var emitArgs = event ? [ event ].concat( args ) : args;
  this.emitEvent( type, emitArgs );

  if ( jQuery && this.$element ) ***REMOVED***
    // default trigger with type if no event
    type += this.options.namespaceJQueryEvents ? '.flickity' : '';
    var $event = type;
    if ( event ) ***REMOVED***
      // create jQuery event
      var jQEvent = jQuery.Event( event );
      jQEvent.type = type;
      $event = jQEvent;
***REMOVED***
    this.$element.trigger( $event, args );
  ***REMOVED***
***REMOVED***;

// -------------------------- select -------------------------- //

/**
 * @param ***REMOVED***Integer***REMOVED*** index - index of the slide
 * @param ***REMOVED***Boolean***REMOVED*** isWrap - will wrap-around to last/first if at the end
 * @param ***REMOVED***Boolean***REMOVED*** isInstant - will immediately set position at selected cell
 */
proto.select = function( index, isWrap, isInstant ) ***REMOVED***
  if ( !this.isActive ) ***REMOVED***
    return;
  ***REMOVED***
  index = parseInt( index, 10 );
  this._wrapSelect( index );

  if ( this.options.wrapAround || isWrap ) ***REMOVED***
    index = utils.modulo( index, this.slides.length );
  ***REMOVED***
  // bail if invalid index
  if ( !this.slides[ index ] ) ***REMOVED***
    return;
  ***REMOVED***
  var prevIndex = this.selectedIndex;
  this.selectedIndex = index;
  this.updateSelectedSlide();
  if ( isInstant ) ***REMOVED***
    this.positionSliderAtSelected();
  ***REMOVED*** else ***REMOVED***
    this.startAnimation();
  ***REMOVED***
  if ( this.options.adaptiveHeight ) ***REMOVED***
    this.setGallerySize();
  ***REMOVED***
  // events
  this.dispatchEvent( 'select', null, [ index ] );
  // change event if new index
  if ( index != prevIndex ) ***REMOVED***
    this.dispatchEvent( 'change', null, [ index ] );
  ***REMOVED***
  // old v1 event name, remove in v3
  this.dispatchEvent('cellSelect');
***REMOVED***;

// wraps position for wrapAround, to move to closest slide. #113
proto._wrapSelect = function( index ) ***REMOVED***
  var len = this.slides.length;
  var isWrapping = this.options.wrapAround && len > 1;
  if ( !isWrapping ) ***REMOVED***
    return index;
  ***REMOVED***
  var wrapIndex = utils.modulo( index, len );
  // go to shortest
  var delta = Math.abs( wrapIndex - this.selectedIndex );
  var backWrapDelta = Math.abs( ( wrapIndex + len ) - this.selectedIndex );
  var forewardWrapDelta = Math.abs( ( wrapIndex - len ) - this.selectedIndex );
  if ( !this.isDragSelect && backWrapDelta < delta ) ***REMOVED***
    index += len;
  ***REMOVED*** else if ( !this.isDragSelect && forewardWrapDelta < delta ) ***REMOVED***
    index -= len;
  ***REMOVED***
  // wrap position so slider is within normal area
  if ( index < 0 ) ***REMOVED***
    this.x -= this.slideableWidth;
  ***REMOVED*** else if ( index >= len ) ***REMOVED***
    this.x += this.slideableWidth;
  ***REMOVED***
***REMOVED***;

proto.previous = function( isWrap, isInstant ) ***REMOVED***
  this.select( this.selectedIndex - 1, isWrap, isInstant );
***REMOVED***;

proto.next = function( isWrap, isInstant ) ***REMOVED***
  this.select( this.selectedIndex + 1, isWrap, isInstant );
***REMOVED***;

proto.updateSelectedSlide = function() ***REMOVED***
  var slide = this.slides[ this.selectedIndex ];
  // selectedIndex could be outside of slides, if triggered before resize()
  if ( !slide ) ***REMOVED***
    return;
  ***REMOVED***
  // unselect previous selected slide
  this.unselectSelectedSlide();
  // update new selected slide
  this.selectedSlide = slide;
  slide.select();
  this.selectedCells = slide.cells;
  this.selectedElements = slide.getCellElements();
  // HACK: selectedCell & selectedElement is first cell in slide, backwards compatibility
  // Remove in v3?
  this.selectedCell = slide.cells[0];
  this.selectedElement = this.selectedElements[0];
***REMOVED***;

proto.unselectSelectedSlide = function() ***REMOVED***
  if ( this.selectedSlide ) ***REMOVED***
    this.selectedSlide.unselect();
  ***REMOVED***
***REMOVED***;

proto.selectInitialIndex = function() ***REMOVED***
  var initialIndex = this.options.initialIndex;
  // already activated, select previous selectedIndex
  if ( this.isInitActivated ) ***REMOVED***
    this.select( this.selectedIndex, false, true );
    return;
  ***REMOVED***
  // select with selector string
  if ( initialIndex && typeof initialIndex == 'string' ) ***REMOVED***
    var cell = this.queryCell( initialIndex );
    if ( cell ) ***REMOVED***
      this.selectCell( initialIndex, false, true );
      return;
***REMOVED***
  ***REMOVED***

  var index = 0;
  // select with number
  if ( initialIndex && this.slides[ initialIndex ] ) ***REMOVED***
    index = initialIndex;
  ***REMOVED***
  // select instantly
  this.select( index, false, true );
***REMOVED***;

/**
 * select slide from number or cell element
 * @param ***REMOVED***Element or Number***REMOVED*** elem
 */
proto.selectCell = function( value, isWrap, isInstant ) ***REMOVED***
  // get cell
  var cell = this.queryCell( value );
  if ( !cell ) ***REMOVED***
    return;
  ***REMOVED***

  var index = this.getCellSlideIndex( cell );
  this.select( index, isWrap, isInstant );
***REMOVED***;

proto.getCellSlideIndex = function( cell ) ***REMOVED***
  // get index of slides that has cell
  for ( var i=0; i < this.slides.length; i++ ) ***REMOVED***
    var slide = this.slides[i];
    var index = slide.cells.indexOf( cell );
    if ( index != -1 ) ***REMOVED***
      return i;
***REMOVED***
  ***REMOVED***
***REMOVED***;

// -------------------------- get cells -------------------------- //

/**
 * get Flickity.Cell, given an Element
 * @param ***REMOVED***Element***REMOVED*** elem
 * @returns ***REMOVED***Flickity.Cell***REMOVED*** item
 */
proto.getCell = function( elem ) ***REMOVED***
  // loop through cells to get the one that matches
  for ( var i=0; i < this.cells.length; i++ ) ***REMOVED***
    var cell = this.cells[i];
    if ( cell.element == elem ) ***REMOVED***
      return cell;
***REMOVED***
  ***REMOVED***
***REMOVED***;

/**
 * get collection of Flickity.Cells, given Elements
 * @param ***REMOVED***Element, Array, NodeList***REMOVED*** elems
 * @returns ***REMOVED***Array***REMOVED*** cells - Flickity.Cells
 */
proto.getCells = function( elems ) ***REMOVED***
  elems = utils.makeArray( elems );
  var cells = [];
  elems.forEach( function( elem ) ***REMOVED***
    var cell = this.getCell( elem );
    if ( cell ) ***REMOVED***
      cells.push( cell );
***REMOVED***
***REMOVED*** this );
  return cells;
***REMOVED***;

/**
 * get cell elements
 * @returns ***REMOVED***Array***REMOVED*** cellElems
 */
proto.getCellElements = function() ***REMOVED***
  return this.cells.map( function( cell ) ***REMOVED***
    return cell.element;
  ***REMOVED***);
***REMOVED***;

/**
 * get parent cell from an element
 * @param ***REMOVED***Element***REMOVED*** elem
 * @returns ***REMOVED***Flickit.Cell***REMOVED*** cell
 */
proto.getParentCell = function( elem ) ***REMOVED***
  // first check if elem is cell
  var cell = this.getCell( elem );
  if ( cell ) ***REMOVED***
    return cell;
  ***REMOVED***
  // try to get parent cell elem
  elem = utils.getParent( elem, '.flickity-slider > *' );
  return this.getCell( elem );
***REMOVED***;

/**
 * get cells adjacent to a slide
 * @param ***REMOVED***Integer***REMOVED*** adjCount - number of adjacent slides
 * @param ***REMOVED***Integer***REMOVED*** index - index of slide to start
 * @returns ***REMOVED***Array***REMOVED*** cells - array of Flickity.Cells
 */
proto.getAdjacentCellElements = function( adjCount, index ) ***REMOVED***
  if ( !adjCount ) ***REMOVED***
    return this.selectedSlide.getCellElements();
  ***REMOVED***
  index = index === undefined ? this.selectedIndex : index;

  var len = this.slides.length;
  if ( 1 + ( adjCount * 2 ) >= len ) ***REMOVED***
    return this.getCellElements();
  ***REMOVED***

  var cellElems = [];
  for ( var i = index - adjCount; i <= index + adjCount ; i++ ) ***REMOVED***
    var slideIndex = this.options.wrapAround ? utils.modulo( i, len ) : i;
    var slide = this.slides[ slideIndex ];
    if ( slide ) ***REMOVED***
      cellElems = cellElems.concat( slide.getCellElements() );
***REMOVED***
  ***REMOVED***
  return cellElems;
***REMOVED***;

/**
 * select slide from number or cell element
 * @param ***REMOVED***Element, Selector String, or Number***REMOVED*** selector
 */
proto.queryCell = function( selector ) ***REMOVED***
  if ( typeof selector == 'number' ) ***REMOVED***
    // use number as index
    return this.cells[ selector ];
  ***REMOVED***
  if ( typeof selector == 'string' ) ***REMOVED***
    // do not select invalid selectors from hash: #123, #/. #791
    if ( selector.match(/^[#\.]?[\d\/]/) ) ***REMOVED***
      return;
***REMOVED***
    // use string as selector, get element
    selector = this.element.querySelector( selector );
  ***REMOVED***
  // get cell from element
  return this.getCell( selector );
***REMOVED***;

// -------------------------- events -------------------------- //

proto.uiChange = function() ***REMOVED***
  this.emitEvent('uiChange');
***REMOVED***;

// keep focus on element when child UI elements are clicked
proto.childUIPointerDown = function( event ) ***REMOVED***
  // HACK iOS does not allow touch events to bubble up?!
  if ( event.type != 'touchstart' ) ***REMOVED***
    event.preventDefault();
  ***REMOVED***
  this.focus();
***REMOVED***;

// ----- resize ----- //

proto.onresize = function() ***REMOVED***
  this.watchCSS();
  this.resize();
***REMOVED***;

utils.debounceMethod( Flickity, 'onresize', 150 );

proto.resize = function() ***REMOVED***
  if ( !this.isActive ) ***REMOVED***
    return;
  ***REMOVED***
  this.getSize();
  // wrap values
  if ( this.options.wrapAround ) ***REMOVED***
    this.x = utils.modulo( this.x, this.slideableWidth );
  ***REMOVED***
  this.positionCells();
  this._getWrapShiftCells();
  this.setGallerySize();
  this.emitEvent('resize');
  // update selected index for group slides, instant
  // TODO: position can be lost between groups of various numbers
  var selectedElement = this.selectedElements && this.selectedElements[0];
  this.selectCell( selectedElement, false, true );
***REMOVED***;

// watches the :after property, activates/deactivates
proto.watchCSS = function() ***REMOVED***
  var watchOption = this.options.watchCSS;
  if ( !watchOption ) ***REMOVED***
    return;
  ***REMOVED***

  var afterContent = getComputedStyle( this.element, ':after' ).content;
  // activate if :after ***REMOVED*** content: 'flickity' ***REMOVED***
  if ( afterContent.indexOf('flickity') != -1 ) ***REMOVED***
    this.activate();
  ***REMOVED*** else ***REMOVED***
    this.deactivate();
  ***REMOVED***
***REMOVED***;

// ----- keydown ----- //

// go previous/next if left/right keys pressed
proto.onkeydown = function( event ) ***REMOVED***
  // only work if element is in focus
  var isNotFocused = document.activeElement && document.activeElement != this.element;
  if ( !this.options.accessibility ||isNotFocused ) ***REMOVED***
    return;
  ***REMOVED***

  var handler = Flickity.keyboardHandlers[ event.keyCode ];
  if ( handler ) ***REMOVED***
    handler.call( this );
  ***REMOVED***
***REMOVED***;

Flickity.keyboardHandlers = ***REMOVED***
  // left arrow
  37: function() ***REMOVED***
    var leftMethod = this.options.rightToLeft ? 'next' : 'previous';
    this.uiChange();
    this[ leftMethod ]();
***REMOVED***
  // right arrow
  39: function() ***REMOVED***
    var rightMethod = this.options.rightToLeft ? 'previous' : 'next';
    this.uiChange();
    this[ rightMethod ]();
***REMOVED***
***REMOVED***;

// ----- focus ----- //

proto.focus = function() ***REMOVED***
  // TODO remove scrollTo once focus options gets more support
  // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus#Browser_compatibility
  var prevScrollY = window.pageYOffset;
  this.element.focus(***REMOVED*** preventScroll: true ***REMOVED***);
  // hack to fix scroll jump after focus, #76
  if ( window.pageYOffset != prevScrollY ) ***REMOVED***
    window.scrollTo( window.pageXOffset, prevScrollY );
  ***REMOVED***
***REMOVED***;

// -------------------------- destroy -------------------------- //

// deactivate all Flickity functionality, but keep stuff available
proto.deactivate = function() ***REMOVED***
  if ( !this.isActive ) ***REMOVED***
    return;
  ***REMOVED***
  this.element.classList.remove('flickity-enabled');
  this.element.classList.remove('flickity-rtl');
  this.unselectSelectedSlide();
  // destroy cells
  this.cells.forEach( function( cell ) ***REMOVED***
    cell.destroy();
  ***REMOVED***);
  this.element.removeChild( this.viewport );
  // move child elements back into element
  moveElements( this.slider.children, this.element );
  if ( this.options.accessibility ) ***REMOVED***
    this.element.removeAttribute('tabIndex');
    this.element.removeEventListener( 'keydown', this );
  ***REMOVED***
  // set flags
  this.isActive = false;
  this.emitEvent('deactivate');
***REMOVED***;

proto.destroy = function() ***REMOVED***
  this.deactivate();
  window.removeEventListener( 'resize', this );
  this.allOff();
  this.emitEvent('destroy');
  if ( jQuery && this.$element ) ***REMOVED***
    jQuery.removeData( this.element, 'flickity' );
  ***REMOVED***
  delete this.element.flickityGUID;
  delete instances[ this.guid ];
***REMOVED***;

// -------------------------- prototype -------------------------- //

utils.extend( proto, animatePrototype );

// -------------------------- extras -------------------------- //

/**
 * get Flickity instance from element
 * @param ***REMOVED***Element***REMOVED*** elem
 * @returns ***REMOVED***Flickity***REMOVED***
 */
Flickity.data = function( elem ) ***REMOVED***
  elem = utils.getQueryElement( elem );
  var id = elem && elem.flickityGUID;
  return id && instances[ id ];
***REMOVED***;

utils.htmlInit( Flickity, 'flickity' );

if ( jQuery && jQuery.bridget ) ***REMOVED***
  jQuery.bridget( 'flickity', Flickity );
***REMOVED***

// set internal jQuery, for Webpack + jQuery v3, #478
Flickity.setJQuery = function( jq ) ***REMOVED***
  jQuery = jq;
***REMOVED***;

Flickity.Cell = Cell;
Flickity.Slide = Slide;

return Flickity;

***REMOVED***));

/*!
 * Unipointer v2.3.0
 * base class for doing one thing with pointer event
 * MIT license
 */

/*jshint browser: true, undef: true, unused: true, strict: true */

( function( window, factory ) ***REMOVED***
  // universal module definition
  /* jshint strict: false */ /*global define, module, require */
  if ( typeof define == 'function' && define.amd ) ***REMOVED***
    // AMD
    define( 'unipointer/unipointer',[
      'ev-emitter/ev-emitter'
    ], function( EvEmitter ) ***REMOVED***
      return factory( window, EvEmitter );
***REMOVED***);
  ***REMOVED*** else if ( typeof module == 'object' && module.exports ) ***REMOVED***
    // CommonJS
    module.exports = factory(
      window,
      require('ev-emitter')
    );
  ***REMOVED*** else ***REMOVED***
    // browser global
    window.Unipointer = factory(
      window,
      window.EvEmitter
    );
  ***REMOVED***

***REMOVED***( window, function factory( window, EvEmitter ) ***REMOVED***



function noop() ***REMOVED******REMOVED***

function Unipointer() ***REMOVED******REMOVED***

// inherit EvEmitter
var proto = Unipointer.prototype = Object.create( EvEmitter.prototype );

proto.bindStartEvent = function( elem ) ***REMOVED***
  this._bindStartEvent( elem, true );
***REMOVED***;

proto.unbindStartEvent = function( elem ) ***REMOVED***
  this._bindStartEvent( elem, false );
***REMOVED***;

/**
 * Add or remove start event
 * @param ***REMOVED***Boolean***REMOVED*** isAdd - remove if falsey
 */
proto._bindStartEvent = function( elem, isAdd ) ***REMOVED***
  // munge isAdd, default to true
  isAdd = isAdd === undefined ? true : isAdd;
  var bindMethod = isAdd ? 'addEventListener' : 'removeEventListener';

  // default to mouse events
  var startEvent = 'mousedown';
  if ( window.PointerEvent ) ***REMOVED***
    // Pointer Events
    startEvent = 'pointerdown';
  ***REMOVED*** else if ( 'ontouchstart' in window ) ***REMOVED***
    // Touch Events. iOS Safari
    startEvent = 'touchstart';
  ***REMOVED***
  elem[ bindMethod ]( startEvent, this );
***REMOVED***;

// trigger handler methods for events
proto.handleEvent = function( event ) ***REMOVED***
  var method = 'on' + event.type;
  if ( this[ method ] ) ***REMOVED***
    this[ method ]( event );
  ***REMOVED***
***REMOVED***;

// returns the touch that we're keeping track of
proto.getTouch = function( touches ) ***REMOVED***
  for ( var i=0; i < touches.length; i++ ) ***REMOVED***
    var touch = touches[i];
    if ( touch.identifier == this.pointerIdentifier ) ***REMOVED***
      return touch;
***REMOVED***
  ***REMOVED***
***REMOVED***;

// ----- start event ----- //

proto.onmousedown = function( event ) ***REMOVED***
  // dismiss clicks from right or middle buttons
  var button = event.button;
  if ( button && ( button !== 0 && button !== 1 ) ) ***REMOVED***
    return;
  ***REMOVED***
  this._pointerDown( event, event );
***REMOVED***;

proto.ontouchstart = function( event ) ***REMOVED***
  this._pointerDown( event, event.changedTouches[0] );
***REMOVED***;

proto.onpointerdown = function( event ) ***REMOVED***
  this._pointerDown( event, event );
***REMOVED***;

/**
 * pointer start
 * @param ***REMOVED***Event***REMOVED*** event
 * @param ***REMOVED***Event or Touch***REMOVED*** pointer
 */
proto._pointerDown = function( event, pointer ) ***REMOVED***
  // dismiss right click and other pointers
  // button = 0 is okay, 1-4 not
  if ( event.button || this.isPointerDown ) ***REMOVED***
    return;
  ***REMOVED***

  this.isPointerDown = true;
  // save pointer identifier to match up touch events
  this.pointerIdentifier = pointer.pointerId !== undefined ?
    // pointerId for pointer events, touch.indentifier for touch events
    pointer.pointerId : pointer.identifier;

  this.pointerDown( event, pointer );
***REMOVED***;

proto.pointerDown = function( event, pointer ) ***REMOVED***
  this._bindPostStartEvents( event );
  this.emitEvent( 'pointerDown', [ event, pointer ] );
***REMOVED***;

// hash of events to be bound after start event
var postStartEvents = ***REMOVED***
  mousedown: [ 'mousemove', 'mouseup' ],
  touchstart: [ 'touchmove', 'touchend', 'touchcancel' ],
  pointerdown: [ 'pointermove', 'pointerup', 'pointercancel' ],
***REMOVED***;

proto._bindPostStartEvents = function( event ) ***REMOVED***
  if ( !event ) ***REMOVED***
    return;
  ***REMOVED***
  // get proper events to match start event
  var events = postStartEvents[ event.type ];
  // bind events to node
  events.forEach( function( eventName ) ***REMOVED***
    window.addEventListener( eventName, this );
***REMOVED*** this );
  // save these arguments
  this._boundPointerEvents = events;
***REMOVED***;

proto._unbindPostStartEvents = function() ***REMOVED***
  // check for _boundEvents, in case dragEnd triggered twice (old IE8 bug)
  if ( !this._boundPointerEvents ) ***REMOVED***
    return;
  ***REMOVED***
  this._boundPointerEvents.forEach( function( eventName ) ***REMOVED***
    window.removeEventListener( eventName, this );
***REMOVED*** this );

  delete this._boundPointerEvents;
***REMOVED***;

// ----- move event ----- //

proto.onmousemove = function( event ) ***REMOVED***
  this._pointerMove( event, event );
***REMOVED***;

proto.onpointermove = function( event ) ***REMOVED***
  if ( event.pointerId == this.pointerIdentifier ) ***REMOVED***
    this._pointerMove( event, event );
  ***REMOVED***
***REMOVED***;

proto.ontouchmove = function( event ) ***REMOVED***
  var touch = this.getTouch( event.changedTouches );
  if ( touch ) ***REMOVED***
    this._pointerMove( event, touch );
  ***REMOVED***
***REMOVED***;

/**
 * pointer move
 * @param ***REMOVED***Event***REMOVED*** event
 * @param ***REMOVED***Event or Touch***REMOVED*** pointer
 * @private
 */
proto._pointerMove = function( event, pointer ) ***REMOVED***
  this.pointerMove( event, pointer );
***REMOVED***;

// public
proto.pointerMove = function( event, pointer ) ***REMOVED***
  this.emitEvent( 'pointerMove', [ event, pointer ] );
***REMOVED***;

// ----- end event ----- //


proto.onmouseup = function( event ) ***REMOVED***
  this._pointerUp( event, event );
***REMOVED***;

proto.onpointerup = function( event ) ***REMOVED***
  if ( event.pointerId == this.pointerIdentifier ) ***REMOVED***
    this._pointerUp( event, event );
  ***REMOVED***
***REMOVED***;

proto.ontouchend = function( event ) ***REMOVED***
  var touch = this.getTouch( event.changedTouches );
  if ( touch ) ***REMOVED***
    this._pointerUp( event, touch );
  ***REMOVED***
***REMOVED***;

/**
 * pointer up
 * @param ***REMOVED***Event***REMOVED*** event
 * @param ***REMOVED***Event or Touch***REMOVED*** pointer
 * @private
 */
proto._pointerUp = function( event, pointer ) ***REMOVED***
  this._pointerDone();
  this.pointerUp( event, pointer );
***REMOVED***;

// public
proto.pointerUp = function( event, pointer ) ***REMOVED***
  this.emitEvent( 'pointerUp', [ event, pointer ] );
***REMOVED***;

// ----- pointer done ----- //

// triggered on pointer up & pointer cancel
proto._pointerDone = function() ***REMOVED***
  this._pointerReset();
  this._unbindPostStartEvents();
  this.pointerDone();
***REMOVED***;

proto._pointerReset = function() ***REMOVED***
  // reset properties
  this.isPointerDown = false;
  delete this.pointerIdentifier;
***REMOVED***;

proto.pointerDone = noop;

// ----- pointer cancel ----- //

proto.onpointercancel = function( event ) ***REMOVED***
  if ( event.pointerId == this.pointerIdentifier ) ***REMOVED***
    this._pointerCancel( event, event );
  ***REMOVED***
***REMOVED***;

proto.ontouchcancel = function( event ) ***REMOVED***
  var touch = this.getTouch( event.changedTouches );
  if ( touch ) ***REMOVED***
    this._pointerCancel( event, touch );
  ***REMOVED***
***REMOVED***;

/**
 * pointer cancel
 * @param ***REMOVED***Event***REMOVED*** event
 * @param ***REMOVED***Event or Touch***REMOVED*** pointer
 * @private
 */
proto._pointerCancel = function( event, pointer ) ***REMOVED***
  this._pointerDone();
  this.pointerCancel( event, pointer );
***REMOVED***;

// public
proto.pointerCancel = function( event, pointer ) ***REMOVED***
  this.emitEvent( 'pointerCancel', [ event, pointer ] );
***REMOVED***;

// -----  ----- //

// utility function for getting x/y coords from event
Unipointer.getPointerPoint = function( pointer ) ***REMOVED***
  return ***REMOVED***
    x: pointer.pageX,
    y: pointer.pageY
  ***REMOVED***;
***REMOVED***;

// -----  ----- //

return Unipointer;

***REMOVED***));

/*!
 * Unidragger v2.3.0
 * Draggable base class
 * MIT license
 */

/*jshint browser: true, unused: true, undef: true, strict: true */

( function( window, factory ) ***REMOVED***
  // universal module definition
  /*jshint strict: false */ /*globals define, module, require */

  if ( typeof define == 'function' && define.amd ) ***REMOVED***
    // AMD
    define( 'unidragger/unidragger',[
      'unipointer/unipointer'
    ], function( Unipointer ) ***REMOVED***
      return factory( window, Unipointer );
***REMOVED***);
  ***REMOVED*** else if ( typeof module == 'object' && module.exports ) ***REMOVED***
    // CommonJS
    module.exports = factory(
      window,
      require('unipointer')
    );
  ***REMOVED*** else ***REMOVED***
    // browser global
    window.Unidragger = factory(
      window,
      window.Unipointer
    );
  ***REMOVED***

***REMOVED***( window, function factory( window, Unipointer ) ***REMOVED***



// -------------------------- Unidragger -------------------------- //

function Unidragger() ***REMOVED******REMOVED***

// inherit Unipointer & EvEmitter
var proto = Unidragger.prototype = Object.create( Unipointer.prototype );

// ----- bind start ----- //

proto.bindHandles = function() ***REMOVED***
  this._bindHandles( true );
***REMOVED***;

proto.unbindHandles = function() ***REMOVED***
  this._bindHandles( false );
***REMOVED***;

/**
 * Add or remove start event
 * @param ***REMOVED***Boolean***REMOVED*** isAdd
 */
proto._bindHandles = function( isAdd ) ***REMOVED***
  // munge isAdd, default to true
  isAdd = isAdd === undefined ? true : isAdd;
  // bind each handle
  var bindMethod = isAdd ? 'addEventListener' : 'removeEventListener';
  var touchAction = isAdd ? this._touchActionValue : '';
  for ( var i=0; i < this.handles.length; i++ ) ***REMOVED***
    var handle = this.handles[i];
    this._bindStartEvent( handle, isAdd );
    handle[ bindMethod ]( 'click', this );
    // touch-action: none to override browser touch gestures. metafizzy/flickity#540
    if ( window.PointerEvent ) ***REMOVED***
      handle.style.touchAction = touchAction;
***REMOVED***
  ***REMOVED***
***REMOVED***;

// prototype so it can be overwriteable by Flickity
proto._touchActionValue = 'none';

// ----- start event ----- //

/**
 * pointer start
 * @param ***REMOVED***Event***REMOVED*** event
 * @param ***REMOVED***Event or Touch***REMOVED*** pointer
 */
proto.pointerDown = function( event, pointer ) ***REMOVED***
  var isOkay = this.okayPointerDown( event );
  if ( !isOkay ) ***REMOVED***
    return;
  ***REMOVED***
  // track start event position
  this.pointerDownPointer = pointer;

  event.preventDefault();
  this.pointerDownBlur();
  // bind move and end events
  this._bindPostStartEvents( event );
  this.emitEvent( 'pointerDown', [ event, pointer ] );
***REMOVED***;

// nodes that have text fields
var cursorNodes = ***REMOVED***
  TEXTAREA: true,
  INPUT: true,
  SELECT: true,
  OPTION: true,
***REMOVED***;

// input types that do not have text fields
var clickTypes = ***REMOVED***
  radio: true,
  checkbox: true,
  button: true,
  submit: true,
  image: true,
  file: true,
***REMOVED***;

// dismiss inputs with text fields. flickity#403, flickity#404
proto.okayPointerDown = function( event ) ***REMOVED***
  var isCursorNode = cursorNodes[ event.target.nodeName ];
  var isClickType = clickTypes[ event.target.type ];
  var isOkay = !isCursorNode || isClickType;
  if ( !isOkay ) ***REMOVED***
    this._pointerReset();
  ***REMOVED***
  return isOkay;
***REMOVED***;

// kludge to blur previously focused input
proto.pointerDownBlur = function() ***REMOVED***
  var focused = document.activeElement;
  // do not blur body for IE10, metafizzy/flickity#117
  var canBlur = focused && focused.blur && focused != document.body;
  if ( canBlur ) ***REMOVED***
    focused.blur();
  ***REMOVED***
***REMOVED***;

// ----- move event ----- //

/**
 * drag move
 * @param ***REMOVED***Event***REMOVED*** event
 * @param ***REMOVED***Event or Touch***REMOVED*** pointer
 */
proto.pointerMove = function( event, pointer ) ***REMOVED***
  var moveVector = this._dragPointerMove( event, pointer );
  this.emitEvent( 'pointerMove', [ event, pointer, moveVector ] );
  this._dragMove( event, pointer, moveVector );
***REMOVED***;

// base pointer move logic
proto._dragPointerMove = function( event, pointer ) ***REMOVED***
  var moveVector = ***REMOVED***
    x: pointer.pageX - this.pointerDownPointer.pageX,
    y: pointer.pageY - this.pointerDownPointer.pageY
  ***REMOVED***;
  // start drag if pointer has moved far enough to start drag
  if ( !this.isDragging && this.hasDragStarted( moveVector ) ) ***REMOVED***
    this._dragStart( event, pointer );
  ***REMOVED***
  return moveVector;
***REMOVED***;

// condition if pointer has moved far enough to start drag
proto.hasDragStarted = function( moveVector ) ***REMOVED***
  return Math.abs( moveVector.x ) > 3 || Math.abs( moveVector.y ) > 3;
***REMOVED***;

// ----- end event ----- //

/**
 * pointer up
 * @param ***REMOVED***Event***REMOVED*** event
 * @param ***REMOVED***Event or Touch***REMOVED*** pointer
 */
proto.pointerUp = function( event, pointer ) ***REMOVED***
  this.emitEvent( 'pointerUp', [ event, pointer ] );
  this._dragPointerUp( event, pointer );
***REMOVED***;

proto._dragPointerUp = function( event, pointer ) ***REMOVED***
  if ( this.isDragging ) ***REMOVED***
    this._dragEnd( event, pointer );
  ***REMOVED*** else ***REMOVED***
    // pointer didn't move enough for drag to start
    this._staticClick( event, pointer );
  ***REMOVED***
***REMOVED***;

// -------------------------- drag -------------------------- //

// dragStart
proto._dragStart = function( event, pointer ) ***REMOVED***
  this.isDragging = true;
  // prevent clicks
  this.isPreventingClicks = true;
  this.dragStart( event, pointer );
***REMOVED***;

proto.dragStart = function( event, pointer ) ***REMOVED***
  this.emitEvent( 'dragStart', [ event, pointer ] );
***REMOVED***;

// dragMove
proto._dragMove = function( event, pointer, moveVector ) ***REMOVED***
  // do not drag if not dragging yet
  if ( !this.isDragging ) ***REMOVED***
    return;
  ***REMOVED***

  this.dragMove( event, pointer, moveVector );
***REMOVED***;

proto.dragMove = function( event, pointer, moveVector ) ***REMOVED***
  event.preventDefault();
  this.emitEvent( 'dragMove', [ event, pointer, moveVector ] );
***REMOVED***;

// dragEnd
proto._dragEnd = function( event, pointer ) ***REMOVED***
  // set flags
  this.isDragging = false;
  // re-enable clicking async
  setTimeout( function() ***REMOVED***
    delete this.isPreventingClicks;
  ***REMOVED***.bind( this ) );

  this.dragEnd( event, pointer );
***REMOVED***;

proto.dragEnd = function( event, pointer ) ***REMOVED***
  this.emitEvent( 'dragEnd', [ event, pointer ] );
***REMOVED***;

// ----- onclick ----- //

// handle all clicks and prevent clicks when dragging
proto.onclick = function( event ) ***REMOVED***
  if ( this.isPreventingClicks ) ***REMOVED***
    event.preventDefault();
  ***REMOVED***
***REMOVED***;

// ----- staticClick ----- //

// triggered after pointer down & up with no/tiny movement
proto._staticClick = function( event, pointer ) ***REMOVED***
  // ignore emulated mouse up clicks
  if ( this.isIgnoringMouseUp && event.type == 'mouseup' ) ***REMOVED***
    return;
  ***REMOVED***

  this.staticClick( event, pointer );

  // set flag for emulated clicks 300ms after touchend
  if ( event.type != 'mouseup' ) ***REMOVED***
    this.isIgnoringMouseUp = true;
    // reset flag after 300ms
    setTimeout( function() ***REMOVED***
      delete this.isIgnoringMouseUp;
***REMOVED***.bind( this ), 400 );
  ***REMOVED***
***REMOVED***;

proto.staticClick = function( event, pointer ) ***REMOVED***
  this.emitEvent( 'staticClick', [ event, pointer ] );
***REMOVED***;

// ----- utils ----- //

Unidragger.getPointerPoint = Unipointer.getPointerPoint;

// -----  ----- //

return Unidragger;

***REMOVED***));

// drag
( function( window, factory ) ***REMOVED***
  // universal module definition
  /* jshint strict: false */
  if ( typeof define == 'function' && define.amd ) ***REMOVED***
    // AMD
    define( 'flickity/js/drag',[
      './flickity',
      'unidragger/unidragger',
      'fizzy-ui-utils/utils'
    ], function( Flickity, Unidragger, utils ) ***REMOVED***
      return factory( window, Flickity, Unidragger, utils );
***REMOVED***);
  ***REMOVED*** else if ( typeof module == 'object' && module.exports ) ***REMOVED***
    // CommonJS
    module.exports = factory(
      window,
      require('./flickity'),
      require('unidragger'),
      require('fizzy-ui-utils')
    );
  ***REMOVED*** else ***REMOVED***
    // browser global
    window.Flickity = factory(
      window,
      window.Flickity,
      window.Unidragger,
      window.fizzyUIUtils
    );
  ***REMOVED***

***REMOVED***( window, function factory( window, Flickity, Unidragger, utils ) ***REMOVED***



// ----- defaults ----- //

utils.extend( Flickity.defaults, ***REMOVED***
  draggable: '>1',
  dragThreshold: 3,
***REMOVED***);

// ----- create ----- //

Flickity.createMethods.push('_createDrag');

// -------------------------- drag prototype -------------------------- //

var proto = Flickity.prototype;
utils.extend( proto, Unidragger.prototype );
proto._touchActionValue = 'pan-y';

// --------------------------  -------------------------- //

var isTouch = 'createTouch' in document;
var isTouchmoveScrollCanceled = false;

proto._createDrag = function() ***REMOVED***
  this.on( 'activate', this.onActivateDrag );
  this.on( 'uiChange', this._uiChangeDrag );
  this.on( 'deactivate', this.onDeactivateDrag );
  this.on( 'cellChange', this.updateDraggable );
  // TODO updateDraggable on resize? if groupCells & slides change
  // HACK - add seemingly innocuous handler to fix iOS 10 scroll behavior
  // #457, RubaXa/Sortable#973
  if ( isTouch && !isTouchmoveScrollCanceled ) ***REMOVED***
    window.addEventListener( 'touchmove', function() ***REMOVED******REMOVED***);
    isTouchmoveScrollCanceled = true;
  ***REMOVED***
***REMOVED***;

proto.onActivateDrag = function() ***REMOVED***
  this.handles = [ this.viewport ];
  this.bindHandles();
  this.updateDraggable();
***REMOVED***;

proto.onDeactivateDrag = function() ***REMOVED***
  this.unbindHandles();
  this.element.classList.remove('is-draggable');
***REMOVED***;

proto.updateDraggable = function() ***REMOVED***
  // disable dragging if less than 2 slides. #278
  if ( this.options.draggable == '>1' ) ***REMOVED***
    this.isDraggable = this.slides.length > 1;
  ***REMOVED*** else ***REMOVED***
    this.isDraggable = this.options.draggable;
  ***REMOVED***
  if ( this.isDraggable ) ***REMOVED***
    this.element.classList.add('is-draggable');
  ***REMOVED*** else ***REMOVED***
    this.element.classList.remove('is-draggable');
  ***REMOVED***
***REMOVED***;

// backwards compatibility
proto.bindDrag = function() ***REMOVED***
  this.options.draggable = true;
  this.updateDraggable();
***REMOVED***;

proto.unbindDrag = function() ***REMOVED***
  this.options.draggable = false;
  this.updateDraggable();
***REMOVED***;

proto._uiChangeDrag = function() ***REMOVED***
  delete this.isFreeScrolling;
***REMOVED***;

// -------------------------- pointer events -------------------------- //

proto.pointerDown = function( event, pointer ) ***REMOVED***
  if ( !this.isDraggable ) ***REMOVED***
    this._pointerDownDefault( event, pointer );
    return;
  ***REMOVED***
  var isOkay = this.okayPointerDown( event );
  if ( !isOkay ) ***REMOVED***
    return;
  ***REMOVED***

  this._pointerDownPreventDefault( event );
  this.pointerDownFocus( event );
  // blur
  if ( document.activeElement != this.element ) ***REMOVED***
    // do not blur if already focused
    this.pointerDownBlur();
  ***REMOVED***

  // stop if it was moving
  this.dragX = this.x;
  this.viewport.classList.add('is-pointer-down');
  // track scrolling
  this.pointerDownScroll = getScrollPosition();
  window.addEventListener( 'scroll', this );

  this._pointerDownDefault( event, pointer );
***REMOVED***;

// default pointerDown logic, used for staticClick
proto._pointerDownDefault = function( event, pointer ) ***REMOVED***
  // track start event position
  // Safari 9 overrides pageX and pageY. These values needs to be copied. #779
  this.pointerDownPointer = ***REMOVED***
    pageX: pointer.pageX,
    pageY: pointer.pageY,
  ***REMOVED***;
  // bind move and end events
  this._bindPostStartEvents( event );
  this.dispatchEvent( 'pointerDown', event, [ pointer ] );
***REMOVED***;

var focusNodes = ***REMOVED***
  INPUT: true,
  TEXTAREA: true,
  SELECT: true,
***REMOVED***;

proto.pointerDownFocus = function( event ) ***REMOVED***
  var isFocusNode = focusNodes[ event.target.nodeName ];
  if ( !isFocusNode ) ***REMOVED***
    this.focus();
  ***REMOVED***
***REMOVED***;

proto._pointerDownPreventDefault = function( event ) ***REMOVED***
  var isTouchStart = event.type == 'touchstart';
  var isTouchPointer = event.pointerType == 'touch';
  var isFocusNode = focusNodes[ event.target.nodeName ];
  if ( !isTouchStart && !isTouchPointer && !isFocusNode ) ***REMOVED***
    event.preventDefault();
  ***REMOVED***
***REMOVED***;

// ----- move ----- //

proto.hasDragStarted = function( moveVector ) ***REMOVED***
  return Math.abs( moveVector.x ) > this.options.dragThreshold;
***REMOVED***;

// ----- up ----- //

proto.pointerUp = function( event, pointer ) ***REMOVED***
  delete this.isTouchScrolling;
  this.viewport.classList.remove('is-pointer-down');
  this.dispatchEvent( 'pointerUp', event, [ pointer ] );
  this._dragPointerUp( event, pointer );
***REMOVED***;

proto.pointerDone = function() ***REMOVED***
  window.removeEventListener( 'scroll', this );
  delete this.pointerDownScroll;
***REMOVED***;

// -------------------------- dragging -------------------------- //

proto.dragStart = function( event, pointer ) ***REMOVED***
  if ( !this.isDraggable ) ***REMOVED***
    return;
  ***REMOVED***
  this.dragStartPosition = this.x;
  this.startAnimation();
  window.removeEventListener( 'scroll', this );
  this.dispatchEvent( 'dragStart', event, [ pointer ] );
***REMOVED***;

proto.pointerMove = function( event, pointer ) ***REMOVED***
  var moveVector = this._dragPointerMove( event, pointer );
  this.dispatchEvent( 'pointerMove', event, [ pointer, moveVector ] );
  this._dragMove( event, pointer, moveVector );
***REMOVED***;

proto.dragMove = function( event, pointer, moveVector ) ***REMOVED***
  if ( !this.isDraggable ) ***REMOVED***
    return;
  ***REMOVED***
  event.preventDefault();

  this.previousDragX = this.dragX;
  // reverse if right-to-left
  var direction = this.options.rightToLeft ? -1 : 1;
  if ( this.options.wrapAround ) ***REMOVED***
    // wrap around move. #589
    moveVector.x = moveVector.x % this.slideableWidth;
  ***REMOVED***
  var dragX = this.dragStartPosition + moveVector.x * direction;

  if ( !this.options.wrapAround && this.slides.length ) ***REMOVED***
    // slow drag
    var originBound = Math.max( -this.slides[0].target, this.dragStartPosition );
    dragX = dragX > originBound ? ( dragX + originBound ) * 0.5 : dragX;
    var endBound = Math.min( -this.getLastSlide().target, this.dragStartPosition );
    dragX = dragX < endBound ? ( dragX + endBound ) * 0.5 : dragX;
  ***REMOVED***

  this.dragX = dragX;

  this.dragMoveTime = new Date();
  this.dispatchEvent( 'dragMove', event, [ pointer, moveVector ] );
***REMOVED***;

proto.dragEnd = function( event, pointer ) ***REMOVED***
  if ( !this.isDraggable ) ***REMOVED***
    return;
  ***REMOVED***
  if ( this.options.freeScroll ) ***REMOVED***
    this.isFreeScrolling = true;
  ***REMOVED***
  // set selectedIndex based on where flick will end up
  var index = this.dragEndRestingSelect();

  if ( this.options.freeScroll && !this.options.wrapAround ) ***REMOVED***
    // if free-scroll & not wrap around
    // do not free-scroll if going outside of bounding slides
    // so bounding slides can attract slider, and keep it in bounds
    var restingX = this.getRestingPosition();
    this.isFreeScrolling = -restingX > this.slides[0].target &&
      -restingX < this.getLastSlide().target;
  ***REMOVED*** else if ( !this.options.freeScroll && index == this.selectedIndex ) ***REMOVED***
    // boost selection if selected index has not changed
    index += this.dragEndBoostSelect();
  ***REMOVED***
  delete this.previousDragX;
  // apply selection
  // TODO refactor this, selecting here feels weird
  // HACK, set flag so dragging stays in correct direction
  this.isDragSelect = this.options.wrapAround;
  this.select( index );
  delete this.isDragSelect;
  this.dispatchEvent( 'dragEnd', event, [ pointer ] );
***REMOVED***;

proto.dragEndRestingSelect = function() ***REMOVED***
  var restingX = this.getRestingPosition();
  // how far away from selected slide
  var distance = Math.abs( this.getSlideDistance( -restingX, this.selectedIndex ) );
  // get closet resting going up and going down
  var positiveResting = this._getClosestResting( restingX, distance, 1 );
  var negativeResting = this._getClosestResting( restingX, distance, -1 );
  // use closer resting for wrap-around
  var index = positiveResting.distance < negativeResting.distance ?
    positiveResting.index : negativeResting.index;
  return index;
***REMOVED***;

/**
 * given resting X and distance to selected cell
 * get the distance and index of the closest cell
 * @param ***REMOVED***Number***REMOVED*** restingX - estimated post-flick resting position
 * @param ***REMOVED***Number***REMOVED*** distance - distance to selected cell
 * @param ***REMOVED***Integer***REMOVED*** increment - +1 or -1, going up or down
 * @returns ***REMOVED***Object***REMOVED*** - ***REMOVED*** distance: ***REMOVED***Number***REMOVED***, index: ***REMOVED***Integer***REMOVED*** ***REMOVED***
 */
proto._getClosestResting = function( restingX, distance, increment ) ***REMOVED***
  var index = this.selectedIndex;
  var minDistance = Infinity;
  var condition = this.options.contain && !this.options.wrapAround ?
    // if contain, keep going if distance is equal to minDistance
    function( d, md ) ***REMOVED*** return d <= md; ***REMOVED*** : function( d, md ) ***REMOVED*** return d < md; ***REMOVED***;
  while ( condition( distance, minDistance ) ) ***REMOVED***
    // measure distance to next cell
    index += increment;
    minDistance = distance;
    distance = this.getSlideDistance( -restingX, index );
    if ( distance === null ) ***REMOVED***
      break;
***REMOVED***
    distance = Math.abs( distance );
  ***REMOVED***
  return ***REMOVED***
    distance: minDistance,
    // selected was previous index
    index: index - increment
  ***REMOVED***;
***REMOVED***;

/**
 * measure distance between x and a slide target
 * @param ***REMOVED***Number***REMOVED*** x
 * @param ***REMOVED***Integer***REMOVED*** index - slide index
 */
proto.getSlideDistance = function( x, index ) ***REMOVED***
  var len = this.slides.length;
  // wrap around if at least 2 slides
  var isWrapAround = this.options.wrapAround && len > 1;
  var slideIndex = isWrapAround ? utils.modulo( index, len ) : index;
  var slide = this.slides[ slideIndex ];
  if ( !slide ) ***REMOVED***
    return null;
  ***REMOVED***
  // add distance for wrap-around slides
  var wrap = isWrapAround ? this.slideableWidth * Math.floor( index / len ) : 0;
  return x - ( slide.target + wrap );
***REMOVED***;

proto.dragEndBoostSelect = function() ***REMOVED***
  // do not boost if no previousDragX or dragMoveTime
  if ( this.previousDragX === undefined || !this.dragMoveTime ||
    // or if drag was held for 100 ms
    new Date() - this.dragMoveTime > 100 ) ***REMOVED***
    return 0;
  ***REMOVED***

  var distance = this.getSlideDistance( -this.dragX, this.selectedIndex );
  var delta = this.previousDragX - this.dragX;
  if ( distance > 0 && delta > 0 ) ***REMOVED***
    // boost to next if moving towards the right, and positive velocity
    return 1;
  ***REMOVED*** else if ( distance < 0 && delta < 0 ) ***REMOVED***
    // boost to previous if moving towards the left, and negative velocity
    return -1;
  ***REMOVED***
  return 0;
***REMOVED***;

// ----- staticClick ----- //

proto.staticClick = function( event, pointer ) ***REMOVED***
  // get clickedCell, if cell was clicked
  var clickedCell = this.getParentCell( event.target );
  var cellElem = clickedCell && clickedCell.element;
  var cellIndex = clickedCell && this.cells.indexOf( clickedCell );
  this.dispatchEvent( 'staticClick', event, [ pointer, cellElem, cellIndex ] );
***REMOVED***;

// ----- scroll ----- //

proto.onscroll = function() ***REMOVED***
  var scroll = getScrollPosition();
  var scrollMoveX = this.pointerDownScroll.x - scroll.x;
  var scrollMoveY = this.pointerDownScroll.y - scroll.y;
  // cancel click/tap if scroll is too much
  if ( Math.abs( scrollMoveX ) > 3 || Math.abs( scrollMoveY ) > 3 ) ***REMOVED***
    this._pointerDone();
  ***REMOVED***
***REMOVED***;

// ----- utils ----- //

function getScrollPosition() ***REMOVED***
  return ***REMOVED***
    x: window.pageXOffset,
    y: window.pageYOffset
  ***REMOVED***;
***REMOVED***

// -----  ----- //

return Flickity;

***REMOVED***));

// prev/next buttons
( function( window, factory ) ***REMOVED***
  // universal module definition
  /* jshint strict: false */
  if ( typeof define == 'function' && define.amd ) ***REMOVED***
    // AMD
    define( 'flickity/js/prev-next-button',[
      './flickity',
      'unipointer/unipointer',
      'fizzy-ui-utils/utils'
    ], function( Flickity, Unipointer, utils ) ***REMOVED***
      return factory( window, Flickity, Unipointer, utils );
***REMOVED***);
  ***REMOVED*** else if ( typeof module == 'object' && module.exports ) ***REMOVED***
    // CommonJS
    module.exports = factory(
      window,
      require('./flickity'),
      require('unipointer'),
      require('fizzy-ui-utils')
    );
  ***REMOVED*** else ***REMOVED***
    // browser global
    factory(
      window,
      window.Flickity,
      window.Unipointer,
      window.fizzyUIUtils
    );
  ***REMOVED***

***REMOVED***( window, function factory( window, Flickity, Unipointer, utils ) ***REMOVED***
'use strict';

var svgURI = 'http://www.w3.org/2000/svg';

// -------------------------- PrevNextButton -------------------------- //

function PrevNextButton( direction, parent ) ***REMOVED***
  this.direction = direction;
  this.parent = parent;
  this._create();
***REMOVED***

PrevNextButton.prototype = Object.create( Unipointer.prototype );

PrevNextButton.prototype._create = function() ***REMOVED***
  // properties
  this.isEnabled = true;
  this.isPrevious = this.direction == -1;
  var leftDirection = this.parent.options.rightToLeft ? 1 : -1;
  this.isLeft = this.direction == leftDirection;

  var element = this.element = document.createElement('button');
  element.className = 'flickity-button flickity-prev-next-button';
  element.className += this.isPrevious ? ' previous' : ' next';
  // prevent button from submitting form http://stackoverflow.com/a/10836076/182183
  element.setAttribute( 'type', 'button' );
  // init as disabled
  this.disable();

  element.setAttribute( 'aria-label', this.isPrevious ? 'Previous' : 'Next' );

  // create arrow
  var svg = this.createSVG();
  element.appendChild( svg );
  // events
  this.parent.on( 'select', this.update.bind( this ) );
  this.on( 'pointerDown', this.parent.childUIPointerDown.bind( this.parent ) );
***REMOVED***;

PrevNextButton.prototype.activate = function() ***REMOVED***
  this.bindStartEvent( this.element );
  this.element.addEventListener( 'click', this );
  // add to DOM
  this.parent.element.appendChild( this.element );
***REMOVED***;

PrevNextButton.prototype.deactivate = function() ***REMOVED***
  // remove from DOM
  this.parent.element.removeChild( this.element );
  // click events
  this.unbindStartEvent( this.element );
  this.element.removeEventListener( 'click', this );
***REMOVED***;

PrevNextButton.prototype.createSVG = function() ***REMOVED***
  var svg = document.createElementNS( svgURI, 'svg');
  svg.setAttribute( 'class', 'flickity-button-icon' );
  svg.setAttribute( 'viewBox', '0 0 100 100' );
  var path = document.createElementNS( svgURI, 'path');
  var pathMovements = getArrowMovements( this.parent.options.arrowShape );
  path.setAttribute( 'd', pathMovements );
  path.setAttribute( 'class', 'arrow' );
  // rotate arrow
  if ( !this.isLeft ) ***REMOVED***
    path.setAttribute( 'transform', 'translate(100, 100) rotate(180) ' );
  ***REMOVED***
  svg.appendChild( path );
  return svg;
***REMOVED***;

// get SVG path movmement
function getArrowMovements( shape ) ***REMOVED***
  // use shape as movement if string
  if ( typeof shape == 'string' ) ***REMOVED***
    return shape;
  ***REMOVED***
  // create movement string
  return 'M ' + shape.x0 + ',50' +
    ' L ' + shape.x1 + ',' + ( shape.y1 + 50 ) +
    ' L ' + shape.x2 + ',' + ( shape.y2 + 50 ) +
    ' L ' + shape.x3 + ',50 ' +
    ' L ' + shape.x2 + ',' + ( 50 - shape.y2 ) +
    ' L ' + shape.x1 + ',' + ( 50 - shape.y1 ) +
    ' Z';
***REMOVED***

PrevNextButton.prototype.handleEvent = utils.handleEvent;

PrevNextButton.prototype.onclick = function() ***REMOVED***
  if ( !this.isEnabled ) ***REMOVED***
    return;
  ***REMOVED***
  this.parent.uiChange();
  var method = this.isPrevious ? 'previous' : 'next';
  this.parent[ method ]();
***REMOVED***;

// -----  ----- //

PrevNextButton.prototype.enable = function() ***REMOVED***
  if ( this.isEnabled ) ***REMOVED***
    return;
  ***REMOVED***
  this.element.disabled = false;
  this.isEnabled = true;
***REMOVED***;

PrevNextButton.prototype.disable = function() ***REMOVED***
  if ( !this.isEnabled ) ***REMOVED***
    return;
  ***REMOVED***
  this.element.disabled = true;
  this.isEnabled = false;
***REMOVED***;

PrevNextButton.prototype.update = function() ***REMOVED***
  // index of first or last slide, if previous or next
  var slides = this.parent.slides;
  // enable is wrapAround and at least 2 slides
  if ( this.parent.options.wrapAround && slides.length > 1 ) ***REMOVED***
    this.enable();
    return;
  ***REMOVED***
  var lastIndex = slides.length ? slides.length - 1 : 0;
  var boundIndex = this.isPrevious ? 0 : lastIndex;
  var method = this.parent.selectedIndex == boundIndex ? 'disable' : 'enable';
  this[ method ]();
***REMOVED***;

PrevNextButton.prototype.destroy = function() ***REMOVED***
  this.deactivate();
  this.allOff();
***REMOVED***;

// -------------------------- Flickity prototype -------------------------- //

utils.extend( Flickity.defaults, ***REMOVED***
  prevNextButtons: true,
  arrowShape: ***REMOVED***
    x0: 10,
    x1: 60, y1: 50,
    x2: 70, y2: 40,
    x3: 30
  ***REMOVED***
***REMOVED***);

Flickity.createMethods.push('_createPrevNextButtons');
var proto = Flickity.prototype;

proto._createPrevNextButtons = function() ***REMOVED***
  if ( !this.options.prevNextButtons ) ***REMOVED***
    return;
  ***REMOVED***

  this.prevButton = new PrevNextButton( -1, this );
  this.nextButton = new PrevNextButton( 1, this );

  this.on( 'activate', this.activatePrevNextButtons );
***REMOVED***;

proto.activatePrevNextButtons = function() ***REMOVED***
  this.prevButton.activate();
  this.nextButton.activate();
  this.on( 'deactivate', this.deactivatePrevNextButtons );
***REMOVED***;

proto.deactivatePrevNextButtons = function() ***REMOVED***
  this.prevButton.deactivate();
  this.nextButton.deactivate();
  this.off( 'deactivate', this.deactivatePrevNextButtons );
***REMOVED***;

// --------------------------  -------------------------- //

Flickity.PrevNextButton = PrevNextButton;

return Flickity;

***REMOVED***));

// page dots
( function( window, factory ) ***REMOVED***
  // universal module definition
  /* jshint strict: false */
  if ( typeof define == 'function' && define.amd ) ***REMOVED***
    // AMD
    define( 'flickity/js/page-dots',[
      './flickity',
      'unipointer/unipointer',
      'fizzy-ui-utils/utils'
    ], function( Flickity, Unipointer, utils ) ***REMOVED***
      return factory( window, Flickity, Unipointer, utils );
***REMOVED***);
  ***REMOVED*** else if ( typeof module == 'object' && module.exports ) ***REMOVED***
    // CommonJS
    module.exports = factory(
      window,
      require('./flickity'),
      require('unipointer'),
      require('fizzy-ui-utils')
    );
  ***REMOVED*** else ***REMOVED***
    // browser global
    factory(
      window,
      window.Flickity,
      window.Unipointer,
      window.fizzyUIUtils
    );
  ***REMOVED***

***REMOVED***( window, function factory( window, Flickity, Unipointer, utils ) ***REMOVED***

// -------------------------- PageDots -------------------------- //



function PageDots( parent ) ***REMOVED***
  this.parent = parent;
  this._create();
***REMOVED***

PageDots.prototype = Object.create( Unipointer.prototype );

PageDots.prototype._create = function() ***REMOVED***
  // create holder element
  this.holder = document.createElement('ol');
  this.holder.className = 'flickity-page-dots';
  // create dots, array of elements
  this.dots = [];
  // events
  this.handleClick = this.onClick.bind( this );
  this.on( 'pointerDown', this.parent.childUIPointerDown.bind( this.parent ) );
***REMOVED***;

PageDots.prototype.activate = function() ***REMOVED***
  this.setDots();
  this.holder.addEventListener( 'click', this.handleClick );
  this.bindStartEvent( this.holder );
  // add to DOM
  this.parent.element.appendChild( this.holder );
***REMOVED***;

PageDots.prototype.deactivate = function() ***REMOVED***
  this.holder.removeEventListener( 'click', this.handleClick );
  this.unbindStartEvent( this.holder );
  // remove from DOM
  this.parent.element.removeChild( this.holder );
***REMOVED***;

PageDots.prototype.setDots = function() ***REMOVED***
  // get difference between number of slides and number of dots
  var delta = this.parent.slides.length - this.dots.length;
  if ( delta > 0 ) ***REMOVED***
    this.addDots( delta );
  ***REMOVED*** else if ( delta < 0 ) ***REMOVED***
    this.removeDots( -delta );
  ***REMOVED***
***REMOVED***;

PageDots.prototype.addDots = function( count ) ***REMOVED***
  var fragment = document.createDocumentFragment();
  var newDots = [];
  var length = this.dots.length;
  var max = length + count;

  for ( var i = length; i < max; i++ ) ***REMOVED***
    var dot = document.createElement('li');
    dot.className = 'dot';
    dot.setAttribute( 'aria-label', 'Page dot ' + ( i + 1 ) );
    fragment.appendChild( dot );
    newDots.push( dot );
  ***REMOVED***

  this.holder.appendChild( fragment );
  this.dots = this.dots.concat( newDots );
***REMOVED***;

PageDots.prototype.removeDots = function( count ) ***REMOVED***
  // remove from this.dots collection
  var removeDots = this.dots.splice( this.dots.length - count, count );
  // remove from DOM
  removeDots.forEach( function( dot ) ***REMOVED***
    this.holder.removeChild( dot );
***REMOVED*** this );
***REMOVED***;

PageDots.prototype.updateSelected = function() ***REMOVED***
  // remove selected class on previous
  if ( this.selectedDot ) ***REMOVED***
    this.selectedDot.className = 'dot';
    this.selectedDot.removeAttribute('aria-current');
  ***REMOVED***
  // don't proceed if no dots
  if ( !this.dots.length ) ***REMOVED***
    return;
  ***REMOVED***
  this.selectedDot = this.dots[ this.parent.selectedIndex ];
  this.selectedDot.className = 'dot is-selected';
  this.selectedDot.setAttribute( 'aria-current', 'step' );
***REMOVED***;

PageDots.prototype.onTap = // old method name, backwards-compatible
PageDots.prototype.onClick = function( event ) ***REMOVED***
  var target = event.target;
  // only care about dot clicks
  if ( target.nodeName != 'LI' ) ***REMOVED***
    return;
  ***REMOVED***

  this.parent.uiChange();
  var index = this.dots.indexOf( target );
  this.parent.select( index );
***REMOVED***;

PageDots.prototype.destroy = function() ***REMOVED***
  this.deactivate();
  this.allOff();
***REMOVED***;

Flickity.PageDots = PageDots;

// -------------------------- Flickity -------------------------- //

utils.extend( Flickity.defaults, ***REMOVED***
  pageDots: true
***REMOVED***);

Flickity.createMethods.push('_createPageDots');

var proto = Flickity.prototype;

proto._createPageDots = function() ***REMOVED***
  if ( !this.options.pageDots ) ***REMOVED***
    return;
  ***REMOVED***
  this.pageDots = new PageDots( this );
  // events
  this.on( 'activate', this.activatePageDots );
  this.on( 'select', this.updateSelectedPageDots );
  this.on( 'cellChange', this.updatePageDots );
  this.on( 'resize', this.updatePageDots );
  this.on( 'deactivate', this.deactivatePageDots );
***REMOVED***;

proto.activatePageDots = function() ***REMOVED***
  this.pageDots.activate();
***REMOVED***;

proto.updateSelectedPageDots = function() ***REMOVED***
  this.pageDots.updateSelected();
***REMOVED***;

proto.updatePageDots = function() ***REMOVED***
  this.pageDots.setDots();
***REMOVED***;

proto.deactivatePageDots = function() ***REMOVED***
  this.pageDots.deactivate();
***REMOVED***;

// -----  ----- //

Flickity.PageDots = PageDots;

return Flickity;

***REMOVED***));

// player & autoPlay
( function( window, factory ) ***REMOVED***
  // universal module definition
  /* jshint strict: false */
  if ( typeof define == 'function' && define.amd ) ***REMOVED***
    // AMD
    define( 'flickity/js/player',[
      'ev-emitter/ev-emitter',
      'fizzy-ui-utils/utils',
      './flickity'
    ], function( EvEmitter, utils, Flickity ) ***REMOVED***
      return factory( EvEmitter, utils, Flickity );
***REMOVED***);
  ***REMOVED*** else if ( typeof module == 'object' && module.exports ) ***REMOVED***
    // CommonJS
    module.exports = factory(
      require('ev-emitter'),
      require('fizzy-ui-utils'),
      require('./flickity')
    );
  ***REMOVED*** else ***REMOVED***
    // browser global
    factory(
      window.EvEmitter,
      window.fizzyUIUtils,
      window.Flickity
    );
  ***REMOVED***

***REMOVED***( window, function factory( EvEmitter, utils, Flickity ) ***REMOVED***



// -------------------------- Player -------------------------- //

function Player( parent ) ***REMOVED***
  this.parent = parent;
  this.state = 'stopped';
  // visibility change event handler
  this.onVisibilityChange = this.visibilityChange.bind( this );
  this.onVisibilityPlay = this.visibilityPlay.bind( this );
***REMOVED***

Player.prototype = Object.create( EvEmitter.prototype );

// start play
Player.prototype.play = function() ***REMOVED***
  if ( this.state == 'playing' ) ***REMOVED***
    return;
  ***REMOVED***
  // do not play if page is hidden, start playing when page is visible
  var isPageHidden = document.hidden;
  if ( isPageHidden ) ***REMOVED***
    document.addEventListener( 'visibilitychange', this.onVisibilityPlay );
    return;
  ***REMOVED***

  this.state = 'playing';
  // listen to visibility change
  document.addEventListener( 'visibilitychange', this.onVisibilityChange );
  // start ticking
  this.tick();
***REMOVED***;

Player.prototype.tick = function() ***REMOVED***
  // do not tick if not playing
  if ( this.state != 'playing' ) ***REMOVED***
    return;
  ***REMOVED***

  var time = this.parent.options.autoPlay;
  // default to 3 seconds
  time = typeof time == 'number' ? time : 3000;
  var _this = this;
  // HACK: reset ticks if stopped and started within interval
  this.clear();
  this.timeout = setTimeout( function() ***REMOVED***
    _this.parent.next( true );
    _this.tick();
***REMOVED*** time );
***REMOVED***;

Player.prototype.stop = function() ***REMOVED***
  this.state = 'stopped';
  this.clear();
  // remove visibility change event
  document.removeEventListener( 'visibilitychange', this.onVisibilityChange );
***REMOVED***;

Player.prototype.clear = function() ***REMOVED***
  clearTimeout( this.timeout );
***REMOVED***;

Player.prototype.pause = function() ***REMOVED***
  if ( this.state == 'playing' ) ***REMOVED***
    this.state = 'paused';
    this.clear();
  ***REMOVED***
***REMOVED***;

Player.prototype.unpause = function() ***REMOVED***
  // re-start play if paused
  if ( this.state == 'paused' ) ***REMOVED***
    this.play();
  ***REMOVED***
***REMOVED***;

// pause if page visibility is hidden, unpause if visible
Player.prototype.visibilityChange = function() ***REMOVED***
  var isPageHidden = document.hidden;
  this[ isPageHidden ? 'pause' : 'unpause' ]();
***REMOVED***;

Player.prototype.visibilityPlay = function() ***REMOVED***
  this.play();
  document.removeEventListener( 'visibilitychange', this.onVisibilityPlay );
***REMOVED***;

// -------------------------- Flickity -------------------------- //

utils.extend( Flickity.defaults, ***REMOVED***
  pauseAutoPlayOnHover: true
***REMOVED***);

Flickity.createMethods.push('_createPlayer');
var proto = Flickity.prototype;

proto._createPlayer = function() ***REMOVED***
  this.player = new Player( this );

  this.on( 'activate', this.activatePlayer );
  this.on( 'uiChange', this.stopPlayer );
  this.on( 'pointerDown', this.stopPlayer );
  this.on( 'deactivate', this.deactivatePlayer );
***REMOVED***;

proto.activatePlayer = function() ***REMOVED***
  if ( !this.options.autoPlay ) ***REMOVED***
    return;
  ***REMOVED***
  this.player.play();
  this.element.addEventListener( 'mouseenter', this );
***REMOVED***;

// Player API, don't hate the ... thanks I know where the door is

proto.playPlayer = function() ***REMOVED***
  this.player.play();
***REMOVED***;

proto.stopPlayer = function() ***REMOVED***
  this.player.stop();
***REMOVED***;

proto.pausePlayer = function() ***REMOVED***
  this.player.pause();
***REMOVED***;

proto.unpausePlayer = function() ***REMOVED***
  this.player.unpause();
***REMOVED***;

proto.deactivatePlayer = function() ***REMOVED***
  this.player.stop();
  this.element.removeEventListener( 'mouseenter', this );
***REMOVED***;

// ----- mouseenter/leave ----- //

// pause auto-play on hover
proto.onmouseenter = function() ***REMOVED***
  if ( !this.options.pauseAutoPlayOnHover ) ***REMOVED***
    return;
  ***REMOVED***
  this.player.pause();
  this.element.addEventListener( 'mouseleave', this );
***REMOVED***;

// resume auto-play on hover off
proto.onmouseleave = function() ***REMOVED***
  this.player.unpause();
  this.element.removeEventListener( 'mouseleave', this );
***REMOVED***;

// -----  ----- //

Flickity.Player = Player;

return Flickity;

***REMOVED***));

// add, remove cell
( function( window, factory ) ***REMOVED***
  // universal module definition
  /* jshint strict: false */
  if ( typeof define == 'function' && define.amd ) ***REMOVED***
    // AMD
    define( 'flickity/js/add-remove-cell',[
      './flickity',
      'fizzy-ui-utils/utils'
    ], function( Flickity, utils ) ***REMOVED***
      return factory( window, Flickity, utils );
***REMOVED***);
  ***REMOVED*** else if ( typeof module == 'object' && module.exports ) ***REMOVED***
    // CommonJS
    module.exports = factory(
      window,
      require('./flickity'),
      require('fizzy-ui-utils')
    );
  ***REMOVED*** else ***REMOVED***
    // browser global
    factory(
      window,
      window.Flickity,
      window.fizzyUIUtils
    );
  ***REMOVED***

***REMOVED***( window, function factory( window, Flickity, utils ) ***REMOVED***



// append cells to a document fragment
function getCellsFragment( cells ) ***REMOVED***
  var fragment = document.createDocumentFragment();
  cells.forEach( function( cell ) ***REMOVED***
    fragment.appendChild( cell.element );
  ***REMOVED***);
  return fragment;
***REMOVED***

// -------------------------- add/remove cell prototype -------------------------- //

var proto = Flickity.prototype;

/**
 * Insert, prepend, or append cells
 * @param ***REMOVED***Element, Array, NodeList***REMOVED*** elems
 * @param ***REMOVED***Integer***REMOVED*** index
 */
proto.insert = function( elems, index ) ***REMOVED***
  var cells = this._makeCells( elems );
  if ( !cells || !cells.length ) ***REMOVED***
    return;
  ***REMOVED***
  var len = this.cells.length;
  // default to append
  index = index === undefined ? len : index;
  // add cells with document fragment
  var fragment = getCellsFragment( cells );
  // append to slider
  var isAppend = index == len;
  if ( isAppend ) ***REMOVED***
    this.slider.appendChild( fragment );
  ***REMOVED*** else ***REMOVED***
    var insertCellElement = this.cells[ index ].element;
    this.slider.insertBefore( fragment, insertCellElement );
  ***REMOVED***
  // add to this.cells
  if ( index === 0 ) ***REMOVED***
    // prepend, add to start
    this.cells = cells.concat( this.cells );
  ***REMOVED*** else if ( isAppend ) ***REMOVED***
    // append, add to end
    this.cells = this.cells.concat( cells );
  ***REMOVED*** else ***REMOVED***
    // insert in this.cells
    var endCells = this.cells.splice( index, len - index );
    this.cells = this.cells.concat( cells ).concat( endCells );
  ***REMOVED***

  this._sizeCells( cells );
  this.cellChange( index, true );
***REMOVED***;

proto.append = function( elems ) ***REMOVED***
  this.insert( elems, this.cells.length );
***REMOVED***;

proto.prepend = function( elems ) ***REMOVED***
  this.insert( elems, 0 );
***REMOVED***;

/**
 * Remove cells
 * @param ***REMOVED***Element, Array, NodeList***REMOVED*** elems
 */
proto.remove = function( elems ) ***REMOVED***
  var cells = this.getCells( elems );
  if ( !cells || !cells.length ) ***REMOVED***
    return;
  ***REMOVED***

  var minCellIndex = this.cells.length - 1;
  // remove cells from collection & DOM
  cells.forEach( function( cell ) ***REMOVED***
    cell.remove();
    var index = this.cells.indexOf( cell );
    minCellIndex = Math.min( index, minCellIndex );
    utils.removeFrom( this.cells, cell );
***REMOVED*** this );

  this.cellChange( minCellIndex, true );
***REMOVED***;

/**
 * logic to be run after a cell's size changes
 * @param ***REMOVED***Element***REMOVED*** elem - cell's element
 */
proto.cellSizeChange = function( elem ) ***REMOVED***
  var cell = this.getCell( elem );
  if ( !cell ) ***REMOVED***
    return;
  ***REMOVED***
  cell.getSize();

  var index = this.cells.indexOf( cell );
  this.cellChange( index );
***REMOVED***;

/**
 * logic any time a cell is changed: added, removed, or size changed
 * @param ***REMOVED***Integer***REMOVED*** changedCellIndex - index of the changed cell, optional
 */
proto.cellChange = function( changedCellIndex, isPositioningSlider ) ***REMOVED***
  var prevSelectedElem = this.selectedElement;
  this._positionCells( changedCellIndex );
  this._getWrapShiftCells();
  this.setGallerySize();
  // update selectedIndex
  // try to maintain position & select previous selected element
  var cell = this.getCell( prevSelectedElem );
  if ( cell ) ***REMOVED***
    this.selectedIndex = this.getCellSlideIndex( cell );
  ***REMOVED***
  this.selectedIndex = Math.min( this.slides.length - 1, this.selectedIndex );

  this.emitEvent( 'cellChange', [ changedCellIndex ] );
  // position slider
  this.select( this.selectedIndex );
  // do not position slider after lazy load
  if ( isPositioningSlider ) ***REMOVED***
    this.positionSliderAtSelected();
  ***REMOVED***
***REMOVED***;

// -----  ----- //

return Flickity;

***REMOVED***));

// lazyload
( function( window, factory ) ***REMOVED***
  // universal module definition
  /* jshint strict: false */
  if ( typeof define == 'function' && define.amd ) ***REMOVED***
    // AMD
    define( 'flickity/js/lazyload',[
      './flickity',
      'fizzy-ui-utils/utils'
    ], function( Flickity, utils ) ***REMOVED***
      return factory( window, Flickity, utils );
***REMOVED***);
  ***REMOVED*** else if ( typeof module == 'object' && module.exports ) ***REMOVED***
    // CommonJS
    module.exports = factory(
      window,
      require('./flickity'),
      require('fizzy-ui-utils')
    );
  ***REMOVED*** else ***REMOVED***
    // browser global
    factory(
      window,
      window.Flickity,
      window.fizzyUIUtils
    );
  ***REMOVED***

***REMOVED***( window, function factory( window, Flickity, utils ) ***REMOVED***
'use strict';

Flickity.createMethods.push('_createLazyload');
var proto = Flickity.prototype;

proto._createLazyload = function() ***REMOVED***
  this.on( 'select', this.lazyLoad );
***REMOVED***;

proto.lazyLoad = function() ***REMOVED***
  var lazyLoad = this.options.lazyLoad;
  if ( !lazyLoad ) ***REMOVED***
    return;
  ***REMOVED***
  // get adjacent cells, use lazyLoad option for adjacent count
  var adjCount = typeof lazyLoad == 'number' ? lazyLoad : 0;
  var cellElems = this.getAdjacentCellElements( adjCount );
  // get lazy images in those cells
  var lazyImages = [];
  cellElems.forEach( function( cellElem ) ***REMOVED***
    var lazyCellImages = getCellLazyImages( cellElem );
    lazyImages = lazyImages.concat( lazyCellImages );
  ***REMOVED***);
  // load lazy images
  lazyImages.forEach( function( img ) ***REMOVED***
    new LazyLoader( img, this );
***REMOVED*** this );
***REMOVED***;

function getCellLazyImages( cellElem ) ***REMOVED***
  // check if cell element is lazy image
  if ( cellElem.nodeName == 'IMG' ) ***REMOVED***
    var lazyloadAttr = cellElem.getAttribute('data-flickity-lazyload');
    var srcAttr = cellElem.getAttribute('data-flickity-lazyload-src');
    var srcsetAttr = cellElem.getAttribute('data-flickity-lazyload-srcset');
    if ( lazyloadAttr || srcAttr || srcsetAttr ) ***REMOVED***
      return [ cellElem ];
***REMOVED***
  ***REMOVED***
  // select lazy images in cell
  var lazySelector = 'img[data-flickity-lazyload], ' +
    'img[data-flickity-lazyload-src], img[data-flickity-lazyload-srcset]';
  var imgs = cellElem.querySelectorAll( lazySelector );
  return utils.makeArray( imgs );
***REMOVED***

// -------------------------- LazyLoader -------------------------- //

/**
 * class to handle loading images
 */
function LazyLoader( img, flickity ) ***REMOVED***
  this.img = img;
  this.flickity = flickity;
  this.load();
***REMOVED***

LazyLoader.prototype.handleEvent = utils.handleEvent;

LazyLoader.prototype.load = function() ***REMOVED***
  this.img.addEventListener( 'load', this );
  this.img.addEventListener( 'error', this );
  // get src & srcset
  var src = this.img.getAttribute('data-flickity-lazyload') ||
    this.img.getAttribute('data-flickity-lazyload-src');
  var srcset = this.img.getAttribute('data-flickity-lazyload-srcset');
  // set src & serset
  this.img.src = src;
  if ( srcset ) ***REMOVED***
    this.img.setAttribute( 'srcset', srcset );
  ***REMOVED***
  // remove attr
  this.img.removeAttribute('data-flickity-lazyload');
  this.img.removeAttribute('data-flickity-lazyload-src');
  this.img.removeAttribute('data-flickity-lazyload-srcset');
***REMOVED***;

LazyLoader.prototype.onload = function( event ) ***REMOVED***
  this.complete( event, 'flickity-lazyloaded' );
***REMOVED***;

LazyLoader.prototype.onerror = function( event ) ***REMOVED***
  this.complete( event, 'flickity-lazyerror' );
***REMOVED***;

LazyLoader.prototype.complete = function( event, className ) ***REMOVED***
  // unbind events
  this.img.removeEventListener( 'load', this );
  this.img.removeEventListener( 'error', this );

  var cell = this.flickity.getParentCell( this.img );
  var cellElem = cell && cell.element;
  this.flickity.cellSizeChange( cellElem );

  this.img.classList.add( className );
  this.flickity.dispatchEvent( 'lazyLoad', event, cellElem );
***REMOVED***;

// -----  ----- //

Flickity.LazyLoader = LazyLoader;

return Flickity;

***REMOVED***));

/*!
 * Flickity v2.2.0
 * Touch, responsive, flickable carousels
 *
 * Licensed GPLv3 for open source use
 * or Flickity Commercial License for commercial use
 *
 * https://flickity.metafizzy.co
 * Copyright 2015-2018 Metafizzy
 */

( function( window, factory ) ***REMOVED***
  // universal module definition
  /* jshint strict: false */
  if ( typeof define == 'function' && define.amd ) ***REMOVED***
    // AMD
    define( 'flickity/js/index',[
      './flickity',
      './drag',
      './prev-next-button',
      './page-dots',
      './player',
      './add-remove-cell',
      './lazyload'
    ], factory );
  ***REMOVED*** else if ( typeof module == 'object' && module.exports ) ***REMOVED***
    // CommonJS
    module.exports = factory(
      require('./flickity'),
      require('./drag'),
      require('./prev-next-button'),
      require('./page-dots'),
      require('./player'),
      require('./add-remove-cell'),
      require('./lazyload')
    );
  ***REMOVED***

***REMOVED***)( window, function factory( Flickity ) ***REMOVED***
  /*jshint strict: false*/
  return Flickity;
***REMOVED***);

/*!
 * Flickity asNavFor v2.0.1
 * enable asNavFor for Flickity
 */

/*jshint browser: true, undef: true, unused: true, strict: true*/

( function( window, factory ) ***REMOVED***
  // universal module definition
  /*jshint strict: false */ /*globals define, module, require */
  if ( typeof define == 'function' && define.amd ) ***REMOVED***
    // AMD
    define( 'flickity-as-nav-for/as-nav-for',[
      'flickity/js/index',
      'fizzy-ui-utils/utils'
    ], factory );
  ***REMOVED*** else if ( typeof module == 'object' && module.exports ) ***REMOVED***
    // CommonJS
    module.exports = factory(
      require('flickity'),
      require('fizzy-ui-utils')
    );
  ***REMOVED*** else ***REMOVED***
    // browser global
    window.Flickity = factory(
      window.Flickity,
      window.fizzyUIUtils
    );
  ***REMOVED***

***REMOVED***( window, function factory( Flickity, utils ) ***REMOVED***



// -------------------------- asNavFor prototype -------------------------- //

// Flickity.defaults.asNavFor = null;

Flickity.createMethods.push('_createAsNavFor');

var proto = Flickity.prototype;

proto._createAsNavFor = function() ***REMOVED***
  this.on( 'activate', this.activateAsNavFor );
  this.on( 'deactivate', this.deactivateAsNavFor );
  this.on( 'destroy', this.destroyAsNavFor );

  var asNavForOption = this.options.asNavFor;
  if ( !asNavForOption ) ***REMOVED***
    return;
  ***REMOVED***
  // HACK do async, give time for other flickity to be initalized
  var _this = this;
  setTimeout( function initNavCompanion() ***REMOVED***
    _this.setNavCompanion( asNavForOption );
  ***REMOVED***);
***REMOVED***;

proto.setNavCompanion = function( elem ) ***REMOVED***
  elem = utils.getQueryElement( elem );
  var companion = Flickity.data( elem );
  // stop if no companion or companion is self
  if ( !companion || companion == this ) ***REMOVED***
    return;
  ***REMOVED***

  this.navCompanion = companion;
  // companion select
  var _this = this;
  this.onNavCompanionSelect = function() ***REMOVED***
    _this.navCompanionSelect();
  ***REMOVED***;
  companion.on( 'select', this.onNavCompanionSelect );
  // click
  this.on( 'staticClick', this.onNavStaticClick );

  this.navCompanionSelect( true );
***REMOVED***;

proto.navCompanionSelect = function( isInstant ) ***REMOVED***
  if ( !this.navCompanion ) ***REMOVED***
    return;
  ***REMOVED***
  // select slide that matches first cell of slide
  var selectedCell = this.navCompanion.selectedCells[0];
  var firstIndex = this.navCompanion.cells.indexOf( selectedCell );
  var lastIndex = firstIndex + this.navCompanion.selectedCells.length - 1;
  var selectIndex = Math.floor( lerp( firstIndex, lastIndex,
    this.navCompanion.cellAlign ) );
  this.selectCell( selectIndex, false, isInstant );
  // set nav selected class
  this.removeNavSelectedElements();
  // stop if companion has more cells than this one
  if ( selectIndex >= this.cells.length ) ***REMOVED***
    return;
  ***REMOVED***

  var selectedCells = this.cells.slice( firstIndex, lastIndex + 1 );
  this.navSelectedElements = selectedCells.map( function( cell ) ***REMOVED***
    return cell.element;
  ***REMOVED***);
  this.changeNavSelectedClass('add');
***REMOVED***;

function lerp( a, b, t ) ***REMOVED***
  return ( b - a ) * t + a;
***REMOVED***

proto.changeNavSelectedClass = function( method ) ***REMOVED***
  this.navSelectedElements.forEach( function( navElem ) ***REMOVED***
    navElem.classList[ method ]('is-nav-selected');
  ***REMOVED***);
***REMOVED***;

proto.activateAsNavFor = function() ***REMOVED***
  this.navCompanionSelect( true );
***REMOVED***;

proto.removeNavSelectedElements = function() ***REMOVED***
  if ( !this.navSelectedElements ) ***REMOVED***
    return;
  ***REMOVED***
  this.changeNavSelectedClass('remove');
  delete this.navSelectedElements;
***REMOVED***;

proto.onNavStaticClick = function( event, pointer, cellElement, cellIndex ) ***REMOVED***
  if ( typeof cellIndex == 'number' ) ***REMOVED***
    this.navCompanion.selectCell( cellIndex );
  ***REMOVED***
***REMOVED***;

proto.deactivateAsNavFor = function() ***REMOVED***
  this.removeNavSelectedElements();
***REMOVED***;

proto.destroyAsNavFor = function() ***REMOVED***
  if ( !this.navCompanion ) ***REMOVED***
    return;
  ***REMOVED***
  this.navCompanion.off( 'select', this.onNavCompanionSelect );
  this.off( 'staticClick', this.onNavStaticClick );
  delete this.navCompanion;
***REMOVED***;

// -----  ----- //

return Flickity;

***REMOVED***));

/*!
 * imagesLoaded v4.1.4
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

( function( window, factory ) ***REMOVED*** 'use strict';
  // universal module definition

  /*global define: false, module: false, require: false */

  if ( typeof define == 'function' && define.amd ) ***REMOVED***
    // AMD
    define( 'imagesloaded/imagesloaded',[
      'ev-emitter/ev-emitter'
    ], function( EvEmitter ) ***REMOVED***
      return factory( window, EvEmitter );
***REMOVED***);
  ***REMOVED*** else if ( typeof module == 'object' && module.exports ) ***REMOVED***
    // CommonJS
    module.exports = factory(
      window,
      require('ev-emitter')
    );
  ***REMOVED*** else ***REMOVED***
    // browser global
    window.imagesLoaded = factory(
      window,
      window.EvEmitter
    );
  ***REMOVED***

***REMOVED***)( typeof window !== 'undefined' ? window : this,

// --------------------------  factory -------------------------- //

function factory( window, EvEmitter ) ***REMOVED***



var $ = window.jQuery;
var console = window.console;

// -------------------------- helpers -------------------------- //

// extend objects
function extend( a, b ) ***REMOVED***
  for ( var prop in b ) ***REMOVED***
    a[ prop ] = b[ prop ];
  ***REMOVED***
  return a;
***REMOVED***

var arraySlice = Array.prototype.slice;

// turn element or nodeList into an array
function makeArray( obj ) ***REMOVED***
  if ( Array.isArray( obj ) ) ***REMOVED***
    // use object if already an array
    return obj;
  ***REMOVED***

  var isArrayLike = typeof obj == 'object' && typeof obj.length == 'number';
  if ( isArrayLike ) ***REMOVED***
    // convert nodeList to array
    return arraySlice.call( obj );
  ***REMOVED***

  // array of single index
  return [ obj ];
***REMOVED***

// -------------------------- imagesLoaded -------------------------- //

/**
 * @param ***REMOVED***Array, Element, NodeList, String***REMOVED*** elem
 * @param ***REMOVED***Object or Function***REMOVED*** options - if function, use as callback
 * @param ***REMOVED***Function***REMOVED*** onAlways - callback function
 */
function ImagesLoaded( elem, options, onAlways ) ***REMOVED***
  // coerce ImagesLoaded() without new, to be new ImagesLoaded()
  if ( !( this instanceof ImagesLoaded ) ) ***REMOVED***
    return new ImagesLoaded( elem, options, onAlways );
  ***REMOVED***
  // use elem as selector string
  var queryElem = elem;
  if ( typeof elem == 'string' ) ***REMOVED***
    queryElem = document.querySelectorAll( elem );
  ***REMOVED***
  // bail if bad element
  if ( !queryElem ) ***REMOVED***
    console.error( 'Bad element for imagesLoaded ' + ( queryElem || elem ) );
    return;
  ***REMOVED***

  this.elements = makeArray( queryElem );
  this.options = extend( ***REMOVED******REMOVED***, this.options );
  // shift arguments if no options set
  if ( typeof options == 'function' ) ***REMOVED***
    onAlways = options;
  ***REMOVED*** else ***REMOVED***
    extend( this.options, options );
  ***REMOVED***

  if ( onAlways ) ***REMOVED***
    this.on( 'always', onAlways );
  ***REMOVED***

  this.getImages();

  if ( $ ) ***REMOVED***
    // add jQuery Deferred object
    this.jqDeferred = new $.Deferred();
  ***REMOVED***

  // HACK check async to allow time to bind listeners
  setTimeout( this.check.bind( this ) );
***REMOVED***

ImagesLoaded.prototype = Object.create( EvEmitter.prototype );

ImagesLoaded.prototype.options = ***REMOVED******REMOVED***;

ImagesLoaded.prototype.getImages = function() ***REMOVED***
  this.images = [];

  // filter & find items if we have an item selector
  this.elements.forEach( this.addElementImages, this );
***REMOVED***;

/**
 * @param ***REMOVED***Node***REMOVED*** element
 */
ImagesLoaded.prototype.addElementImages = function( elem ) ***REMOVED***
  // filter siblings
  if ( elem.nodeName == 'IMG' ) ***REMOVED***
    this.addImage( elem );
  ***REMOVED***
  // get background image on element
  if ( this.options.background === true ) ***REMOVED***
    this.addElementBackgroundImages( elem );
  ***REMOVED***

  // find children
  // no non-element nodes, #143
  var nodeType = elem.nodeType;
  if ( !nodeType || !elementNodeTypes[ nodeType ] ) ***REMOVED***
    return;
  ***REMOVED***
  var childImgs = elem.querySelectorAll('img');
  // concat childElems to filterFound array
  for ( var i=0; i < childImgs.length; i++ ) ***REMOVED***
    var img = childImgs[i];
    this.addImage( img );
  ***REMOVED***

  // get child background images
  if ( typeof this.options.background == 'string' ) ***REMOVED***
    var children = elem.querySelectorAll( this.options.background );
    for ( i=0; i < children.length; i++ ) ***REMOVED***
      var child = children[i];
      this.addElementBackgroundImages( child );
***REMOVED***
  ***REMOVED***
***REMOVED***;

var elementNodeTypes = ***REMOVED***
  1: true,
  9: true,
  11: true
***REMOVED***;

ImagesLoaded.prototype.addElementBackgroundImages = function( elem ) ***REMOVED***
  var style = getComputedStyle( elem );
  if ( !style ) ***REMOVED***
    // Firefox returns null if in a hidden iframe https://bugzil.la/548397
    return;
  ***REMOVED***
  // get url inside url("...")
  var reURL = /url\((['"])?(.*?)\1\)/gi;
  var matches = reURL.exec( style.backgroundImage );
  while ( matches !== null ) ***REMOVED***
    var url = matches && matches[2];
    if ( url ) ***REMOVED***
      this.addBackground( url, elem );
***REMOVED***
    matches = reURL.exec( style.backgroundImage );
  ***REMOVED***
***REMOVED***;

/**
 * @param ***REMOVED***Image***REMOVED*** img
 */
ImagesLoaded.prototype.addImage = function( img ) ***REMOVED***
  var loadingImage = new LoadingImage( img );
  this.images.push( loadingImage );
***REMOVED***;

ImagesLoaded.prototype.addBackground = function( url, elem ) ***REMOVED***
  var background = new Background( url, elem );
  this.images.push( background );
***REMOVED***;

ImagesLoaded.prototype.check = function() ***REMOVED***
  var _this = this;
  this.progressedCount = 0;
  this.hasAnyBroken = false;
  // complete if no images
  if ( !this.images.length ) ***REMOVED***
    this.complete();
    return;
  ***REMOVED***

  function onProgress( image, elem, message ) ***REMOVED***
    // HACK - Chrome triggers event before object properties have changed. #83
    setTimeout( function() ***REMOVED***
      _this.progress( image, elem, message );
***REMOVED***);
  ***REMOVED***

  this.images.forEach( function( loadingImage ) ***REMOVED***
    loadingImage.once( 'progress', onProgress );
    loadingImage.check();
  ***REMOVED***);
***REMOVED***;

ImagesLoaded.prototype.progress = function( image, elem, message ) ***REMOVED***
  this.progressedCount++;
  this.hasAnyBroken = this.hasAnyBroken || !image.isLoaded;
  // progress event
  this.emitEvent( 'progress', [ this, image, elem ] );
  if ( this.jqDeferred && this.jqDeferred.notify ) ***REMOVED***
    this.jqDeferred.notify( this, image );
  ***REMOVED***
  // check if completed
  if ( this.progressedCount == this.images.length ) ***REMOVED***
    this.complete();
  ***REMOVED***

  if ( this.options.debug && console ) ***REMOVED***
    console.log( 'progress: ' + message, image, elem );
  ***REMOVED***
***REMOVED***;

ImagesLoaded.prototype.complete = function() ***REMOVED***
  var eventName = this.hasAnyBroken ? 'fail' : 'done';
  this.isComplete = true;
  this.emitEvent( eventName, [ this ] );
  this.emitEvent( 'always', [ this ] );
  if ( this.jqDeferred ) ***REMOVED***
    var jqMethod = this.hasAnyBroken ? 'reject' : 'resolve';
    this.jqDeferred[ jqMethod ]( this );
  ***REMOVED***
***REMOVED***;

// --------------------------  -------------------------- //

function LoadingImage( img ) ***REMOVED***
  this.img = img;
***REMOVED***

LoadingImage.prototype = Object.create( EvEmitter.prototype );

LoadingImage.prototype.check = function() ***REMOVED***
  // If complete is true and browser supports natural sizes,
  // try to check for image status manually.
  var isComplete = this.getIsImageComplete();
  if ( isComplete ) ***REMOVED***
    // report based on naturalWidth
    this.confirm( this.img.naturalWidth !== 0, 'naturalWidth' );
    return;
  ***REMOVED***

  // If none of the checks above matched, simulate loading on detached element.
  this.proxyImage = new Image();
  this.proxyImage.addEventListener( 'load', this );
  this.proxyImage.addEventListener( 'error', this );
  // bind to image as well for Firefox. #191
  this.img.addEventListener( 'load', this );
  this.img.addEventListener( 'error', this );
  this.proxyImage.src = this.img.src;
***REMOVED***;

LoadingImage.prototype.getIsImageComplete = function() ***REMOVED***
  // check for non-zero, non-undefined naturalWidth
  // fixes Safari+InfiniteScroll+Masonry bug infinite-scroll#671
  return this.img.complete && this.img.naturalWidth;
***REMOVED***;

LoadingImage.prototype.confirm = function( isLoaded, message ) ***REMOVED***
  this.isLoaded = isLoaded;
  this.emitEvent( 'progress', [ this, this.img, message ] );
***REMOVED***;

// ----- events ----- //

// trigger specified handler for event type
LoadingImage.prototype.handleEvent = function( event ) ***REMOVED***
  var method = 'on' + event.type;
  if ( this[ method ] ) ***REMOVED***
    this[ method ]( event );
  ***REMOVED***
***REMOVED***;

LoadingImage.prototype.onload = function() ***REMOVED***
  this.confirm( true, 'onload' );
  this.unbindEvents();
***REMOVED***;

LoadingImage.prototype.onerror = function() ***REMOVED***
  this.confirm( false, 'onerror' );
  this.unbindEvents();
***REMOVED***;

LoadingImage.prototype.unbindEvents = function() ***REMOVED***
  this.proxyImage.removeEventListener( 'load', this );
  this.proxyImage.removeEventListener( 'error', this );
  this.img.removeEventListener( 'load', this );
  this.img.removeEventListener( 'error', this );
***REMOVED***;

// -------------------------- Background -------------------------- //

function Background( url, element ) ***REMOVED***
  this.url = url;
  this.element = element;
  this.img = new Image();
***REMOVED***

// inherit LoadingImage prototype
Background.prototype = Object.create( LoadingImage.prototype );

Background.prototype.check = function() ***REMOVED***
  this.img.addEventListener( 'load', this );
  this.img.addEventListener( 'error', this );
  this.img.src = this.url;
  // check if image is already complete
  var isComplete = this.getIsImageComplete();
  if ( isComplete ) ***REMOVED***
    this.confirm( this.img.naturalWidth !== 0, 'naturalWidth' );
    this.unbindEvents();
  ***REMOVED***
***REMOVED***;

Background.prototype.unbindEvents = function() ***REMOVED***
  this.img.removeEventListener( 'load', this );
  this.img.removeEventListener( 'error', this );
***REMOVED***;

Background.prototype.confirm = function( isLoaded, message ) ***REMOVED***
  this.isLoaded = isLoaded;
  this.emitEvent( 'progress', [ this, this.element, message ] );
***REMOVED***;

// -------------------------- jQuery -------------------------- //

ImagesLoaded.makeJQueryPlugin = function( jQuery ) ***REMOVED***
  jQuery = jQuery || window.jQuery;
  if ( !jQuery ) ***REMOVED***
    return;
  ***REMOVED***
  // set local variable
  $ = jQuery;
  // $().imagesLoaded()
  $.fn.imagesLoaded = function( options, callback ) ***REMOVED***
    var instance = new ImagesLoaded( this, options, callback );
    return instance.jqDeferred.promise( $(this) );
  ***REMOVED***;
***REMOVED***;
// try making plugin
ImagesLoaded.makeJQueryPlugin();

// --------------------------  -------------------------- //

return ImagesLoaded;

***REMOVED***);

/*!
 * Flickity imagesLoaded v2.0.0
 * enables imagesLoaded option for Flickity
 */

/*jshint browser: true, strict: true, undef: true, unused: true */

( function( window, factory ) ***REMOVED***
  // universal module definition
  /*jshint strict: false */ /*globals define, module, require */
  if ( typeof define == 'function' && define.amd ) ***REMOVED***
    // AMD
    define( [
      'flickity/js/index',
      'imagesloaded/imagesloaded'
    ], function( Flickity, imagesLoaded ) ***REMOVED***
      return factory( window, Flickity, imagesLoaded );
***REMOVED***);
  ***REMOVED*** else if ( typeof module == 'object' && module.exports ) ***REMOVED***
    // CommonJS
    module.exports = factory(
      window,
      require('flickity'),
      require('imagesloaded')
    );
  ***REMOVED*** else ***REMOVED***
    // browser global
    window.Flickity = factory(
      window,
      window.Flickity,
      window.imagesLoaded
    );
  ***REMOVED***

***REMOVED***( window, function factory( window, Flickity, imagesLoaded ) ***REMOVED***
'use strict';

Flickity.createMethods.push('_createImagesLoaded');

var proto = Flickity.prototype;

proto._createImagesLoaded = function() ***REMOVED***
  this.on( 'activate', this.imagesLoaded );
***REMOVED***;

proto.imagesLoaded = function() ***REMOVED***
  if ( !this.options.imagesLoaded ) ***REMOVED***
    return;
  ***REMOVED***
  var _this = this;
  function onImagesLoadedProgress( instance, image ) ***REMOVED***
    var cell = _this.getParentCell( image.img );
    _this.cellSizeChange( cell && cell.element );
    if ( !_this.options.freeScroll ) ***REMOVED***
      _this.positionSliderAtSelected();
***REMOVED***
  ***REMOVED***
  imagesLoaded( this.slider ).on( 'progress', onImagesLoadedProgress );
***REMOVED***;

return Flickity;

***REMOVED***));

