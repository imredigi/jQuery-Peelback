/*
 * jQuery Peelback
 * Copyright 2010, Rob Flaherty
 *
 * Dual licensed under the MIT and GPL licenses
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */
 
(function($){
  $.Peelback = function(el, settings){
    
    //Caching
    var base = this;
    base.$el = $(el);
    base.el = el;
    base.$el.data("Peelback", base);
    
    //Main stuff    
    base.init = function(){
      
      //Defaults, meet Settings
      base.settings = $.extend({},$.Peelback.defaultSettings, settings);
          
      //If ad image is missing, stop the show            
      if (typeof(base.settings.adImage) !== 'string' || base.settings.adImage === ''){
        console.log('ya need an ad image');              
        return;
      }
      
      //If peel image is missing, stop the show            
      if (typeof(base.settings.peelImage) !== 'string' || base.settings.peelImage === ''){
        console.log('ya need a peel image');              
        return;
      }
      
      //Assemble
      var peelHTML = $('<div id="peelback"><a href="' + base.settings.clickURL + '" target="_blank"><img src="' + base.settings.peelImage +'" alt="" border="0" /></a><div></div></div>'),
        peelImage = peelHTML.find('img'),
        peelMask = peelHTML.find('div');
          
      $(peelImage).css({
        'width': '0',
        'height': '0',
        'z-index': '99',
        'position': 'absolute',
        'right': '0',
        'top': '0',
        '-ms-interpolation-mode': 'bicubic'
      });
    
      $(peelMask).css({
        'width': '0',
        'height': '0',
        'overflow': 'hidden',
        'position': 'absolute',
        'right': '0',
        'top': '0',
        'background': 'url(' + base.settings.adImage + ') no-repeat right top'
      });
      
      //Insert
      base.$el.prepend(peelHTML);
      
      //Auto animate option      
      if (base.settings.autoAnimate === false) {
        $(peelImage).css({'width' : '53px', 'height' : '53px'});
        $(peelMask).css({'width' : '50px', 'height' : '50px'});
      } else {
        $(peelImage).delay(500).animate({
          width: '53px', 
          height: '53px'
        }, 500);
          
        $(peelMask).delay(500).animate({
          width: '50px', 
          height: '50px'
        }, 500); 
      }      
      
      //Hover behavior
      peelHTML.hover(
        
        //Mouseover
        function(){      
          $(peelImage).stop().animate({
            width: '510px', 
            height: '510px'
          }, 500);
          
          $(peelMask).stop().animate({
            width: '490px', 
            height: '490px'
          }, 500);
            
          //If GA tracking enabled
          if (base.settings.gaTrack === true){              
            _gaq.push(['_trackEvent', 'Ad_Interaction', 'Peelback', base.settings.gaLabel]);
          }
            
        },
        
        //Mouseout
        function(){
          $(peelImage).stop().animate({
            width: '53px', 
            height: '53px'
          }, 400);
          
          $(peelMask).stop().animate({
            width: '50px', 
            height: '50px'
          }, 400);
        }
      
      );
          
    };
        
    // Run initializer
    base.init();
  };
    
  $.Peelback.defaultSettings = {
    adImage  : null,
    peelImage : null,
    clickURL : null,
    gaTrack  : false,
    gaLabel  : 'default',
    autoAnimate: true
  };
  
  $.fn.peelback = function(settings){
    return this.each(function(){
      (new $.Peelback(this, settings));
    });
  };
    
})(jQuery);
