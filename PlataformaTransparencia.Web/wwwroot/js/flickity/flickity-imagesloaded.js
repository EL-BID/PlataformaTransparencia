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