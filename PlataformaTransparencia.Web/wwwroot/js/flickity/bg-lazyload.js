/**
 * Flickity background lazyload v1.0.1
 * lazyload background cell images
 */

/*jshint browser: true, unused: true, undef: true */

( function( window, factory ) ***REMOVED***
    // universal module definition
    /*globals define, module, require */
    if ( typeof define == 'function' && define.amd ) ***REMOVED***
      // AMD
      define( [
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
      factory(
        window.Flickity,
        window.fizzyUIUtils
      );
***REMOVED***
  
  ***REMOVED***( window, function factory( Flickity, utils ) ***REMOVED***
  /*jshint strict: true */
  'use strict';
  
  Flickity.createMethods.push('_createBgLazyLoad');
  
  var proto = Flickity.prototype;
  
  proto._createBgLazyLoad = function() ***REMOVED***
    this.on( 'select', this.bgLazyLoad );
  ***REMOVED***;
  
  proto.bgLazyLoad = function() ***REMOVED***
    var lazyLoad = this.options.bgLazyLoad;
    if ( !lazyLoad ) ***REMOVED***
      return;
***REMOVED***
  
    // get adjacent cells, use lazyLoad option for adjacent count
    var adjCount = typeof lazyLoad == 'number' ? lazyLoad : 0;
    var cellElems = this.getAdjacentCellElements( adjCount );
  
    for ( var i=0; i < cellElems.length; i++ ) ***REMOVED***
      var cellElem = cellElems[i];
      this.bgLazyLoadElem( cellElem );
      // select lazy elems in cell
      var children = cellElem.querySelectorAll('[data-flickity-bg-lazyload]');
      for ( var j=0; j < children.length; j++ ) ***REMOVED***
        this.bgLazyLoadElem( children[j] );
  ***REMOVED***
***REMOVED***
  ***REMOVED***;
  
  proto.bgLazyLoadElem = function( elem ) ***REMOVED***
    var attr = elem.getAttribute('data-flickity-bg-lazyload');
    if ( attr ) ***REMOVED***
      new BgLazyLoader( elem, attr, this );
***REMOVED***
  ***REMOVED***;
  
  // -------------------------- LazyBGLoader -------------------------- //
  
  /**
   * class to handle loading images
   */
  function BgLazyLoader( elem, url, flickity ) ***REMOVED***
    this.element = elem;
    this.url = url;
    this.img = new Image();
    this.flickity = flickity;
    this.load();
  ***REMOVED***
  
  BgLazyLoader.prototype.handleEvent = utils.handleEvent;
  
  BgLazyLoader.prototype.load = function() ***REMOVED***
    this.img.addEventListener( 'load', this );
    this.img.addEventListener( 'error', this );
    // load image
    this.img.src = this.url;
    // remove attr
    this.element.removeAttribute('data-flickity-bg-lazyload');
  ***REMOVED***;
  
  BgLazyLoader.prototype.onload = function( event ) ***REMOVED***
    this.element.style.backgroundImage = 'url("' + this.url + '")';
    this.complete( event, 'flickity-bg-lazyloaded' );
  ***REMOVED***;
  
  BgLazyLoader.prototype.onerror = function( event ) ***REMOVED***
    this.complete( event, 'flickity-bg-lazyerror' );
  ***REMOVED***;
  
  BgLazyLoader.prototype.complete = function( event, className ) ***REMOVED***
    // unbind events
    this.img.removeEventListener( 'load', this );
    this.img.removeEventListener( 'error', this );
  
    this.element.classList.add( className );
    this.flickity.dispatchEvent( 'bgLazyLoad', event, this.element );
  ***REMOVED***;
  
  // -----  ----- //
  
  Flickity.BgLazyLoader = BgLazyLoader;
  
  return Flickity;
  
  ***REMOVED***));