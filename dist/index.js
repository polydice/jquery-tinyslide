'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TinySlide = function () {
  function TinySlide(elm, options) {
    _classCallCheck(this, TinySlide);

    var opts = $.extend({}, TinySlide.defaults, options);
    this.opts = opts;
    this.elm = elm;
    this.titleElms = elm.querySelectorAll(opts.title);
    this.total = this.titleElms.length || 0;
    this.currentIdx = opts.startIdx || 0;
    this.isPause = false;
    this.init(opts);
    if (opts.startIdx) {
      this.run(opts);
    }
  }

  _createClass(TinySlide, [{
    key: 'init',
    value: function init(opts) {
      this.setPause(opts).setRestart(opts).setInterval(opts);
      return this;
    }
  }, {
    key: 'setPause',
    value: function setPause(opts) {
      var theSlide = this;
      var $pause = opts.$pause || $(theSlide.elm);
      var $titles = $(theSlide.titleElms);
      $pause.on('mouseenter', function (e) {
        var $target = $(e.target).parents(opts.title);
        if (!$target.length) {
          $target = $(e.target);
        }
        var currentIdx = $target.index();
        theSlide.currentIdx = currentIdx;
        theSlide.isPause = true;
        theSlide.setCurrentStyle($titles, currentIdx, opts.activeClass);
        opts.onPause(currentIdx);
      });
      return this;
    }
  }, {
    key: 'setRestart',
    value: function setRestart(opts) {
      var theSlide = this;
      var $pause = opts.$pause || $(theSlide.elm);
      // restart event
      $pause.on('mouseleave', function () {
        theSlide.isPause = false;
        opts.onRestart(theSlide.currentIdx);
      });
      return this;
    }
  }, {
    key: 'setCurrentStyle',
    value: function setCurrentStyle($titles, currentIdx, activeClass) {
      $titles.each(function (idx, title) {
        if (idx === currentIdx) {
          $(title).addClass(activeClass);
        } else {
          $(title).removeClass(activeClass);
        }
      });
      return this;
    }
  }, {
    key: 'run',
    value: function run(opts) {
      var theSlide = this;
      var nextIdx = (theSlide.currentIdx + 1) % theSlide.total;
      this.currentIdx = nextIdx;
      var $titles = $(theSlide.elm).find(opts.title);
      this.setCurrentStyle($titles, nextIdx, opts.activeClass);
      opts.onRotate(nextIdx);
      return this;
    }
  }, {
    key: 'setInterval',
    value: function (_setInterval) {
      function setInterval(_x) {
        return _setInterval.apply(this, arguments);
      }

      setInterval.toString = function () {
        return _setInterval.toString();
      };

      return setInterval;
    }(function (opts) {
      var theSlide = this;
      var interval = opts.interval;
      setInterval(function () {
        if (!theSlide.isPause) {
          theSlide.run(opts);
        }
      }, interval);
      return this;
    })
  }]);

  return TinySlide;
}();

TinySlide.defaults = {
  startIdx: 0,
  interval: 2000,
  title: 'li',
  $pause: null,
  activeClass: 'current',
  onPause: function onPause() {},
  onRestart: function onRestart() {},
  onRotate: function onRotate() {}
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = TinySlide;
} else if (typeof define === 'function' && _typeof(define.amd) === 'object' && define.amd) {
  define('TinySlide', [], function () {
    return TinySlide;
  });
} else {
  window.TinySlide = TinySlide;
}