/**
 * Flickity fade v1.0.0
 * Fade between Flickity slides
 */

/* jshint browser: true, undef: true, unused: true */

( function( window, factory ) ***REMOVED***
    // universal module definition
    /*globals define, module, require */
    if ( typeof define == 'function' && define.amd ) ***REMOVED***
      // AMD
      define( [
        'flickity/js/index',
        'fizzy-ui-utils/utils',
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
  
  ***REMOVED***( this, function factory( Flickity, utils ) ***REMOVED***
  
  // ---- Slide ---- //
  
  var Slide = Flickity.Slide;
  
  var slideUpdateTarget = Slide.prototype.updateTarget;
  Slide.prototype.updateTarget = function() ***REMOVED***
    slideUpdateTarget.apply( this, arguments );
    if ( !this.parent.options.fade ) ***REMOVED***
      return;
***REMOVED***
    // position cells at selected target
    var slideTargetX = this.target - this.x;
    var firstCellX = this.cells[0].x;
    this.cells.forEach( function( cell ) ***REMOVED***
      var targetX = cell.x - firstCellX - slideTargetX;
      cell.renderPosition( targetX );
***REMOVED***);
  ***REMOVED***;
  
  Slide.prototype.setOpacity = function( alpha ) ***REMOVED***
    this.cells.forEach( function( cell ) ***REMOVED***
      cell.element.style.opacity = alpha;
***REMOVED***);
  ***REMOVED***;
  
  // ---- Flickity ---- //
  
  var proto = Flickity.prototype;
  
  Flickity.createMethods.push('_createFade');
  
  proto._createFade = function() ***REMOVED***
    this.fadeIndex = this.selectedIndex;
    this.prevSelectedIndex = this.selectedIndex;
    this.on( 'select', this.onSelectFade );
    this.on( 'dragEnd', this.onDragEndFade );
    this.on( 'settle', this.onSettleFade );
    this.on( 'activate', this.onActivateFade );
    this.on( 'deactivate', this.onDeactivateFade );
  ***REMOVED***;
  
  var updateSlides = proto.updateSlides;
  proto.updateSlides = function() ***REMOVED***
    updateSlides.apply( this, arguments );
    if ( !this.options.fade ) ***REMOVED***
      return;
***REMOVED***
    // set initial opacity
    this.slides.forEach( function( slide, i ) ***REMOVED***
      var alpha = i == this.selectedIndex ? 1 : 0;
      slide.setOpacity( alpha );
  ***REMOVED*** this );
  ***REMOVED***;
  
  /* ---- events ---- */
  
  proto.onSelectFade = function() ***REMOVED***
    // in case of resize, keep fadeIndex within current count
    this.fadeIndex = Math.min( this.prevSelectedIndex, this.slides.length - 1 );
    this.prevSelectedIndex = this.selectedIndex;
  ***REMOVED***;
  
  proto.onSettleFade = function() ***REMOVED***
    delete this.didDragEnd;
    if ( !this.options.fade ) ***REMOVED***
      return;
***REMOVED***
    // set full and 0 opacity on selected & faded slides
    this.selectedSlide.setOpacity( 1 );
    var fadedSlide = this.slides[ this.fadeIndex ];
    if ( fadedSlide && this.fadeIndex != this.selectedIndex ) ***REMOVED***
      this.slides[ this.fadeIndex ].setOpacity( 0 );
***REMOVED***
  ***REMOVED***;
  
  proto.onDragEndFade = function() ***REMOVED***
    // set flag
    this.didDragEnd = true;
  ***REMOVED***;
  
  proto.onActivateFade = function() ***REMOVED***
    if ( this.options.fade ) ***REMOVED***
      this.element.classList.add('is-fade');
***REMOVED***
  ***REMOVED***;
  
  proto.onDeactivateFade = function() ***REMOVED***
    if ( !this.options.fade ) ***REMOVED***
      return;
***REMOVED***
    this.element.classList.remove('is-fade');
    // reset opacity
    this.slides.forEach( function( slide ) ***REMOVED***
      slide.setOpacity('');
***REMOVED***);
  ***REMOVED***;
  
  /* ---- position & fading ---- */
  
  var positionSlider = proto.positionSlider;
  proto.positionSlider = function() ***REMOVED***
    if ( !this.options.fade ) ***REMOVED***
      positionSlider.apply( this, arguments );
      return;
***REMOVED***
  
    this.fadeSlides();
    this.dispatchScrollEvent();
  ***REMOVED***;
  
  var positionSliderAtSelected = proto.positionSliderAtSelected;
  proto.positionSliderAtSelected = function() ***REMOVED***
    if ( this.options.fade ) ***REMOVED***
      // position fade slider at origin
      this.setTranslateX( 0 );
***REMOVED***
    positionSliderAtSelected.apply( this, arguments );
  ***REMOVED***;
  
  proto.fadeSlides = function() ***REMOVED***
    if ( this.slides.length < 2 ) ***REMOVED***
      return;
***REMOVED***
    // get slides to fade-in & fade-out
    var indexes = this.getFadeIndexes();
    var fadeSlideA = this.slides[ indexes.a ];
    var fadeSlideB = this.slides[ indexes.b ];
    var distance = this.wrapDifference( fadeSlideA.target, fadeSlideB.target );
    var progress = this.wrapDifference( fadeSlideA.target, -this.x );
    progress = progress / distance;
  
    fadeSlideA.setOpacity( 1 - progress );
    fadeSlideB.setOpacity( progress );
  
    // hide previous slide
    var fadeHideIndex = indexes.a;
    if ( this.isDragging ) ***REMOVED***
      fadeHideIndex = progress > 0.5 ? indexes.a : indexes.b;
***REMOVED***
    var isNewHideIndex = this.fadeHideIndex != undefined &&
      this.fadeHideIndex != fadeHideIndex &&
      this.fadeHideIndex != indexes.a &&
      this.fadeHideIndex != indexes.b;
    if ( isNewHideIndex ) ***REMOVED***
      // new fadeHideSlide set, hide previous
      this.slides[ this.fadeHideIndex ].setOpacity( 0 );
***REMOVED***
    this.fadeHideIndex = fadeHideIndex;
  ***REMOVED***;
  
  proto.getFadeIndexes = function() ***REMOVED***
    if ( !this.isDragging && !this.didDragEnd ) ***REMOVED***
      return ***REMOVED***
        a: this.fadeIndex,
        b: this.selectedIndex,
  ***REMOVED***;
***REMOVED***
    if ( this.options.wrapAround ) ***REMOVED***
      return this.getFadeDragWrapIndexes();
***REMOVED*** else ***REMOVED***
      return this.getFadeDragLimitIndexes();
***REMOVED***
  ***REMOVED***;
  
  proto.getFadeDragWrapIndexes = function() ***REMOVED***
    var distances = this.slides.map( function( slide, i ) ***REMOVED***
      return this.getSlideDistance( -this.x, i );
  ***REMOVED*** this );
    var absDistances = distances.map( function( distance ) ***REMOVED***
      return Math.abs( distance );
***REMOVED***);
    var minDistance = Math.min.apply( Math, absDistances );
    var closestIndex = absDistances.indexOf( minDistance );
    var distance = distances[ closestIndex ];
    var len = this.slides.length;
  
    var delta = distance >= 0 ? 1 : -1;
    return ***REMOVED***
      a: closestIndex,
      b: utils.modulo( closestIndex + delta, len ),
***REMOVED***;
  ***REMOVED***;
  
  proto.getFadeDragLimitIndexes = function() ***REMOVED***
    // calculate closest previous slide
    var dragIndex = 0;
    for ( var i=0; i < this.slides.length - 1; i++ ) ***REMOVED***
      var slide = this.slides[i];
      if ( -this.x < slide.target ) ***REMOVED***
        break;
  ***REMOVED***
      dragIndex = i;
***REMOVED***
    return ***REMOVED***
      a: dragIndex,
      b: dragIndex + 1,
***REMOVED***;
  ***REMOVED***;
  
  proto.wrapDifference = function( a, b ) ***REMOVED***
    var diff = b - a;
  
    if ( !this.options.wrapAround ) ***REMOVED***
      return diff;
***REMOVED***
  
    var diffPlus = diff + this.slideableWidth;
    var diffMinus = diff - this.slideableWidth;
    if ( Math.abs( diffPlus ) < Math.abs( diff ) ) ***REMOVED***
      diff = diffPlus;
***REMOVED***
    if ( Math.abs( diffMinus ) < Math.abs( diff ) ) ***REMOVED***
      diff = diffMinus;
***REMOVED***
    return diff;
  ***REMOVED***;
  
  // ---- wrapAround ---- //
  
  var _getWrapShiftCells = proto._getWrapShiftCells;
  proto._getWrapShiftCells = function() ***REMOVED***
    if ( !this.options.fade ) ***REMOVED***
      _getWrapShiftCells.apply( this, arguments );
***REMOVED***
  ***REMOVED***;
  
  var shiftWrapCells = proto.shiftWrapCells;
  proto.shiftWrapCells = function() ***REMOVED***
    if ( !this.options.fade ) ***REMOVED***
      shiftWrapCells.apply( this, arguments );
***REMOVED***
  ***REMOVED***;
  
  return Flickity;
  
  ***REMOVED***));